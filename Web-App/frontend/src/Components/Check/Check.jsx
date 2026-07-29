import { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import "./Check.css";

const Check = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".check-health-container",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    if (image) {
      gsap.fromTo(
        ".analysis-container",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  }, [image]);

  useEffect(() => {
    if (result) {
      gsap.fromTo(
        ".result-box",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  }, [result]);

  const processImage = (file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
    setResult(null);

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      setBase64Image(base64String);
    };

    reader.onerror = () => {
      alert("The selected image could not be read.");
      setBase64Image(null);
    };

    reader.readAsDataURL(file);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    processImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];
    processImage(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !base64Image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    setResult(null);

    let myApiResult = null;
    let roboflowResult = null;

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const myApiResponse = await axios.post(
        "http://127.0.0.1:5001/predict",
        formData
      );

      myApiResult = myApiResponse.data.prediction;

      console.log("Local API result:", myApiResult);
    } catch (error) {
      console.error("Local API failed:", error);
    }

    try {
      const roboflowResponse = await axios({
        method: "POST",
        url: "https://classify.roboflow.com/coral-reef-bleach-detection/2",
        params: {
          api_key: "t7w2f6CHZP3iCelMtVzY",
        },
        data: base64Image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      roboflowResult =
        roboflowResponse.data.predicted_classes?.[0] ?? null;

      console.log("Roboflow result:", roboflowResult);
    } catch (error) {
      console.error("Roboflow API failed:", error);
    }

    let finalResult;

    if (myApiResult) {
      finalResult = myApiResult;
    } else if (roboflowResult) {
      finalResult = roboflowResult;
    } else {
      finalResult = "API error or server down";
    }

    setResult({
      predictedClass: finalResult,
      image,
    });

    setLoading(false);
  };

  const normalizedPrediction =
    result?.predictedClass?.toLowerCase() ?? "";

  const resultClass = normalizedPrediction.includes("bleached")
    ? "bleached"
    : "healthy";

  return (
    <div className="check-health-container">
      <h2>Check Coral Health</h2>

      <p>Upload a coral reef image to analyse its health.</p>

      <br />

      <div
        className={`upload-box ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          document.getElementById("fileInput")?.click();
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded coral"
            className="uploaded-image"
          />
        ) : (
          <p>
            Drag and drop an image here, or{" "}
            <span>click to upload</span>
          </p>
        )}

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
      </div>

      {image && (
        <div className="analysis-container">
          <div className="image-container">
            <p>Input Image</p>

            <img
              src={image}
              alt="Uploaded coral"
              className="input-image"
            />
          </div>

          <div className="image-container">
            <p>Result</p>

            <div className="result-box">
              {loading ? (
                <p className="loading-text">Analysing...</p>
              ) : result ? (
                <div className="result-image-container">
                  <img
                    src={result.image}
                    alt="Analysed coral"
                    className="result-image"
                  />

                  <div className={`result-tag ${resultClass}`}>
                    {result.predictedClass}
                  </div>
                </div>
              ) : (
                <p className="placeholder-text">
                  Click Analyze to get the result
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={!selectedFile || !base64Image || loading}
      >
        {loading ? "Analysing..." : "Analyze Coral"}
      </button>
    </div>
  );
};

export default Check;