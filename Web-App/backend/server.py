from __future__ import annotations

import io
import json
import logging
import os
import threading
from collections import Counter
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image, ImageOps, UnidentifiedImageError
from ultralytics import YOLO


BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"
PRESENCE_MODEL_PATH = MODEL_DIR / "coral-presence-v5.pt"
CONDITION_MODEL_PATH = MODEL_DIR / "coral-classifier.pt"
WASTE_MODEL_PATH = MODEL_DIR / "waste-detector.pt"
PRESENCE_CONFIG_PATH = BASE_DIR / "presence-config.json"

MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "10"))
MAX_IMAGE_PIXELS = int(os.getenv("MAX_IMAGE_PIXELS", "25000000"))
WASTE_CONFIDENCE = float(os.getenv("WASTE_CONFIDENCE", "0.25"))
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger("coral-sense")

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_MB * 1024 * 1024

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,https://coral-sense.netlify.app",
    ).split(",")
    if origin.strip()
]
CORS(app, resources={r"/*": {"origins": allowed_origins}})


def _require_file(path: Path) -> Path:
    if not path.is_file():
        raise FileNotFoundError(f"Required model file was not found: {path}")
    return path


with PRESENCE_CONFIG_PATH.open(encoding="utf-8") as config_file:
    presence_config = json.load(config_file)

CORAL_THRESHOLD = float(presence_config["coral_min_probability"])
NOT_CORAL_THRESHOLD = float(presence_config["not_coral_max_probability"])

presence_model = YOLO(str(_require_file(PRESENCE_MODEL_PATH)))
condition_model = YOLO(str(_require_file(CONDITION_MODEL_PATH)))
waste_model = YOLO(str(_require_file(WASTE_MODEL_PATH)))
inference_lock = threading.Lock()


def _open_image(uploaded_file) -> Image.Image:
    filename = Path(uploaded_file.filename or "").name
    extension = Path(filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError("Use a JPG, PNG, or WebP image.")
    if uploaded_file.mimetype not in ALLOWED_MIME_TYPES:
        raise ValueError("The uploaded file type is not supported.")

    data = uploaded_file.read(MAX_UPLOAD_MB * 1024 * 1024 + 1)
    if not data:
        raise ValueError("The uploaded image is empty.")
    if len(data) > MAX_UPLOAD_MB * 1024 * 1024:
        raise ValueError(f"The image must be smaller than {MAX_UPLOAD_MB} MB.")

    image = Image.open(io.BytesIO(data))
    image.verify()
    image = Image.open(io.BytesIO(data))
    if image.width * image.height > MAX_IMAGE_PIXELS:
        raise ValueError("The image dimensions are too large.")
    return ImageOps.exif_transpose(image).convert("RGB")


def _class_probabilities(result) -> dict[str, float]:
    if result.probs is None:
        raise RuntimeError("Classification model returned no probabilities.")
    return {
        str(result.names[index]).lower(): float(probability)
        for index, probability in enumerate(result.probs.data.tolist())
    }


def _presence_result(image: Image.Image) -> dict:
    result = presence_model.predict(source=image, imgsz=224, verbose=False)[0]
    probabilities = _class_probabilities(result)
    coral_probability = probabilities.get("coral")
    if coral_probability is None:
        raise RuntimeError("Presence model is missing the coral class.")

    if coral_probability >= CORAL_THRESHOLD:
        status = "coral"
        message = "Coral detected. Coral condition analysis was performed."
    elif coral_probability <= NOT_CORAL_THRESHOLD:
        status = "not_coral"
        message = "No coral was detected in this image."
    else:
        status = "uncertain"
        message = "Coral presence is uncertain. Upload a clearer, closer coral image."

    return {
        "status": status,
        "coral_probability": round(coral_probability, 6),
        "confidence_percent": f"{coral_probability * 100:.2f}%",
        "message": message,
    }


def _condition_result(image: Image.Image, presence_status: str) -> dict:
    if presence_status != "coral":
        return {
            "analysed": False,
            "condition": None,
            "confidence": None,
            "confidence_percent": None,
            "note": "Condition is only analysed after coral presence is confirmed.",
        }

    result = condition_model.predict(source=image, verbose=False)[0]
    probabilities = _class_probabilities(result)
    condition, confidence = max(probabilities.items(), key=lambda item: item[1])
    return {
        "analysed": True,
        "condition": condition,
        "confidence": round(confidence, 6),
        "confidence_percent": f"{confidence * 100:.2f}%",
        "probabilities": {name: round(value, 6) for name, value in probabilities.items()},
        "note": "This percentage is model confidence, not a biological health score.",
    }


def _waste_result(image: Image.Image) -> dict:
    result = waste_model.predict(
        source=image,
        conf=WASTE_CONFIDENCE,
        verbose=False,
    )[0]
    detections = []
    if result.boxes is not None:
        for box in result.boxes:
            class_id = int(box.cls.item())
            confidence = float(box.conf.item())
            x1, y1, x2, y2 = [round(value, 2) for value in box.xyxy[0].tolist()]
            detections.append({
                "class": str(result.names[class_id]),
                "confidence": round(confidence, 6),
                "confidence_percent": f"{confidence * 100:.2f}%",
                "box": {"x1": x1, "y1": y1, "x2": x2, "y2": y2},
            })

    counts = Counter(item["class"] for item in detections)
    return {
        "detected": bool(detections),
        "count": len(detections),
        "summary": dict(sorted(counts.items())),
        "detections": detections,
    }


@app.errorhandler(413)
def request_too_large(_error):
    return jsonify({"error": f"The image must be smaller than {MAX_UPLOAD_MB} MB."}), 413


@app.after_request
def security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/")
def home():
    return jsonify({"service": "Coral Sense API", "status": "ok"})


@app.get("/health")
def health():
    return jsonify({
        "status": "ok",
        "models": {
            "coral_presence": PRESENCE_MODEL_PATH.name,
            "coral_condition": CONDITION_MODEL_PATH.name,
            "waste_detection": WASTE_MODEL_PATH.name,
        },
    })


@app.post("/predict")
def predict():
    if "image" not in request.files or not request.files["image"].filename:
        return jsonify({"error": "Select an image to analyse."}), 400

    try:
        image = _open_image(request.files["image"])
        with inference_lock:
            presence = _presence_result(image)
            coral = _condition_result(image, presence["status"])
            waste = _waste_result(image)

        if coral["analysed"]:
            legacy_prediction = coral["condition"]
            legacy_confidence = coral["confidence_percent"]
            legacy_is_coral = True
        elif presence["status"] == "not_coral":
            legacy_prediction = "This is not a coral image."
            legacy_confidence = presence["confidence_percent"]
            legacy_is_coral = False
        else:
            legacy_prediction = "Coral presence is uncertain."
            legacy_confidence = presence["confidence_percent"]
            legacy_is_coral = None

        return jsonify({
            "presence": presence,
            "coral": coral,
            "waste": waste,
            "is_coral": legacy_is_coral,
            "prediction": legacy_prediction,
            "confidence": legacy_confidence,
        })
    except (UnidentifiedImageError, OSError):
        return jsonify({"error": "The uploaded file is not a valid image."}), 400
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception:
        logger.exception("Prediction failed")
        return jsonify({"error": "The image could not be analysed."}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=False)
