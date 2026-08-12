import { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"
).replace(/\/$/, "");
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Check = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert("Please select a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Please select an image smaller than 10 MB.");
      return;
    }

    if (image) URL.revokeObjectURL(image);
    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
    setResult(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    processImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const resetAnalysis = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setSelectedFile(null);
    setImage(null);
    setResult(null);
    setLoading(false);

    const input = document.getElementById("fileInput");
    if (input) input.value = "";
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
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(`${API_URL}/predict`, formData, {
        timeout: 120000,
      });
      setResult({ ...response.data, image });
    } catch (error) {
      const message =
        error.response?.data?.error ||
        "The analysis service is unavailable. Check that the backend is running.";
      setResult({ error: message, image });
    } finally {
      setLoading(false);
    }
  };

  const predictedClass =
    result?.coral?.condition ||
    (result?.presence?.status === "not_coral"
      ? "Not coral"
      : result?.presence?.status === "uncertain"
        ? "Uncertain"
        : "");
  const normalizedPrediction = predictedClass.toLowerCase();
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
          accept="image/jpeg,image/png,image/webp"
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
                  {result.error ? (
                    <p className="mt-4 text-sm font-semibold text-rose-700">
                      {result.error}
                    </p>
                  ) : (
                    <div className="mt-4 space-y-2 text-sm">
                      <div
                        className={`result-tag inline-block rounded-full px-4 py-2 font-semibold ${resultClass === "bleached" ? "bg-rose-100 text-rose-700" : resultClass === "not-coral" ? "bg-slate-200 text-slate-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {predictedClass}
                        {result.coral?.confidence_percent
                          ? ` — ${result.coral.confidence_percent} confidence`
                          : ""}
                      </div>
                      <p className="text-slate-600">
                        {result.presence?.message}
                      </p>
                      <p className="font-medium text-slate-700">
                        {result.waste?.detected
                          ? `Waste detected: ${Object.entries(
                              result.waste.summary,
                            )
                              .map(([name, count]) => `${name} (${count})`)
                              .join(", ")}`
                          : "No waste detected."}
                      </p>
                      {result.coral?.note && (
                        <p className="text-xs text-slate-500">
                          {result.coral.note}
                        </p>
                      )}
                    </div>
                  )}
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

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="analyze-btn inline-flex items-center justify-center rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(14,165,233,0.22)] transition duration-200 hover:bg-sky-700 hover:shadow-[0_16px_28px_rgba(14,165,233,0.28)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
          onClick={handleAnalyze}
          disabled={!selectedFile || loading}
        >
          {loading ? "Analysing..." : "Analyze Coral"}
        </button>

        {result && !loading && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-sky-400 hover:text-sky-700"
            onClick={resetAnalysis}
          >
            Add A New Image
          </button>
        )}
      </div>
    </div>
  );
};

export default Check;
