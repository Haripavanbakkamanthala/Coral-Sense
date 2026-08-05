from pathlib import Path
import io
import os

import numpy as np

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image, UnidentifiedImageError
from ultralytics import YOLO


app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://coral-sense.netlify.app",
            ]
        }
    },
)


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "coral-classifier.pt"

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model file was not found: {MODEL_PATH}"
    )

model = YOLO(str(MODEL_PATH))


def image_looks_like_coral(image: Image.Image) -> bool:
    """Reject obvious non-coral uploads before classification."""
    rgb = np.asarray(image.convert("RGB"))

    if rgb.size == 0:
        return False

    gray = np.asarray(image.convert("L"))
    contrast = float(gray.std())
    saturation = float(
        np.asarray(image.convert("HSV"))[:, :, 1].mean() / 255.0
    )
    brightness = float(np.asarray(image.convert("HSV"))[:, :, 2].mean() / 255.0)

    if contrast < 18:
        return False

    if saturation < 0.08 or brightness > 0.95:
        return False

    red = rgb[:, :, 0].astype(float)
    green = rgb[:, :, 1].astype(float)
    blue = rgb[:, :, 2].astype(float)

    greenish = float(((green > red * 0.85) & (green > blue * 0.8)).mean())
    blueish = float(((blue > red * 0.85) & (blue > green * 0.8)).mean())

    if greenish < 0.18 and blueish < 0.18:
        return False

    return True


@app.route("/", methods=["GET"])
def home():
    return """
    <h1>🪸 Coral Reef Health API</h1>
    <p>Welcome to the Coral Reef Health Analysis API!</p>
    <p>
        Use the <code>/predict</code> endpoint to analyse
        coral reef images.
    </p>
    """


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({
            "error": "No image file was uploaded."
        }), 400

    uploaded_file = request.files["image"]

    if uploaded_file.filename == "":
        return jsonify({
            "error": "No image was selected."
        }), 400

    try:
        image_data = uploaded_file.read()

        image = Image.open(
            io.BytesIO(image_data)
        ).convert("RGB")

        if not image_looks_like_coral(image):
            return jsonify({
                "is_coral": False,
                "prediction": "This is not a coral image.",
                "confidence": "0%",
            })

        results = model.predict(
            source=image,
            save=False,
            verbose=False,
        )

        probabilities = results[0].probs

        if probabilities is None:
            return jsonify({
                "error": "The model did not return classification results."
            }), 500

        class_id = int(probabilities.top1)
        predicted_class = results[0].names[class_id]
        confidence = float(probabilities.top1conf) * 100

        return jsonify({
            "is_coral": True,
            "prediction": predicted_class,
            "confidence": f"{confidence:.2f}%",
        })

    except UnidentifiedImageError:
        return jsonify({
            "error": "The uploaded file is not a valid image."
        }), 400

    except Exception as error:
        print(f"Prediction error: {error}")

        return jsonify({
            "error": "The image could not be analysed."
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False,
    )