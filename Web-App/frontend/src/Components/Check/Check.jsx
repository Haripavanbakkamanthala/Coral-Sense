import { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";

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
      },
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
        },
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
        },
      );
    }
  }, [result]);

  const processImage = (file) => {
    if (!file) return;

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
        formData,
      );

      const backendData = myApiResponse.data;

      if (backendData.is_coral === false) {
        myApiResult = "This is not a coral image.";
      } else {
        myApiResult = backendData.prediction;
      }

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

      roboflowResult = roboflowResponse.data.predicted_classes?.[0] ?? null;
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

    setResult({ predictedClass: finalResult, image });
    setLoading(false);
  };

  const normalizedPrediction = result?.predictedClass?.toLowerCase() ?? "";
  const resultClass = normalizedPrediction.includes("bleached")
    ? "bleached"
    : normalizedPrediction.includes("not a coral") ||
        normalizedPrediction.includes("not coral")
      ? "not-coral"
      : "healthy";

  return (
    <div className="check-health-container mx-auto max-w-6xl px-6 py-10 text-slate-800">
      <h2 className="text-[2rem] text-sky-700">Check Coral Health</h2>
      <p className="mt-2 text-[1rem] text-slate-600">
        Upload a coral reef image to analyse its health.
      </p>

      <div
        className={`upload-box mt-6 cursor-pointer rounded-[24px] border-2 border-dashed p-8 text-center transition-all duration-200 ${dragging ? "border-sky-600 bg-sky-50 shadow-[0_12px_30px_rgba(14,165,233,0.12)]" : "border-slate-300 bg-white/90 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"}`}
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
            className="uploaded-image mx-auto max-h-[280px] rounded-[12px] object-cover"
          />
        ) : (
          <p className="text-[1rem] text-slate-700">
            Drag and drop an image here, or{" "}
            <span className="font-semibold text-sky-700">click to upload</span>
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
        <div className="analysis-container mt-6 flex flex-col gap-6 md:flex-row">
          <div className="image-container flex-1 rounded-[20px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <p className="mb-4 text-[1.1rem] font-semibold text-sky-700">
              Input Image
            </p>
            <img
              src={image}
              alt="Uploaded coral"
              className="input-image h-[280px] w-full rounded-[12px] object-cover"
            />
          </div>

          <div className="image-container flex-1 rounded-[20px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <p className="mb-4 text-[1.1rem] font-semibold text-sky-700">
              Result
            </p>
            <div className="result-box flex min-h-[280px] items-center justify-center rounded-[12px] border border-slate-200 bg-slate-50 p-4 text-center">
              {loading ? (
                <p className="loading-text text-slate-700">Analysing...</p>
              ) : result ? (
                <div className="result-image-container w-full">
                  <img
                    src={result.image}
                    alt="Analysed coral"
                    className="result-image h-[220px] w-full rounded-[12px] object-cover"
                  />
                  <div
                    className={`result-tag mt-4 inline-block rounded-full px-4 py-2 text-sm font-semibold ${resultClass === "bleached" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}
                  >
                    {result.predictedClass}
                  </div>
                </div>
              ) : (
                <p className="placeholder-text text-slate-500">
                  Click Analyze to get the result
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          className="analyze-btn inline-flex items-center justify-center rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(14,165,233,0.22)] transition duration-200 hover:bg-sky-700 hover:shadow-[0_16px_28px_rgba(14,165,233,0.28)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
          onClick={handleAnalyze}
          disabled={!selectedFile || !base64Image || loading}
        >
          {loading ? "Analysing..." : "Analyze Coral"}
        </button>
      </div>
    </div>
  );
};

export default Check;
