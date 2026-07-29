import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectInfo.css";

const ProjectInfo = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="project-info-container">
      {/* About Project */}
      <section className="about-project">
        <h2>What is CoralSense?</h2>
        <p>
          CoralSense is an AI-powered tool that helps in monitoring coral reefs 
          by detecting whether a coral is <b>healthy</b> or <b>bleached</b>. It uses 
          advanced <b>deep learning models</b> to analyze coral reef images and provide 
          quick and reliable results.
        </p>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <h3>Upload Image</h3>
            <p>Upload an image of a coral reef to start the analysis.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h3>AI Analysis</h3>
            <p>Our deep learning model processes the image and classifies the coral as <b>Healthy</b> or <b>Bleached</b>.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h3>Get Result</h3>
            <p>Receive an accurate prediction and insights about coral health.</p>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="technologies">
        <h2>Technologies Used</h2>
        <div className="tech-list">
          <span>React</span>
          <span>Node.js</span>
          <span>YOLOv11</span>
          <span>Roboflow API</span>
          <span>GSAP</span>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="importance">
        <h2>Why Coral Health Monitoring is Important?</h2>
        <p>
          Coral reefs support <b>25% of marine life</b>, protect coastlines from storms, 
          and contribute to global biodiversity. <b>50% of coral reefs are already lost</b>, 
          and bleaching is a major threat due to climate change. <b>Monitoring coral 
          health is crucial for conservation efforts.</b>
        </p>
      </section>
    </div>
  );
};

export default ProjectInfo;
