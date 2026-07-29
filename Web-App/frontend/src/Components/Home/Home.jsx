import React, { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import "./Home.css";
import ProjectInfo from "../ProjectInfo/ProjectInfo";

const Home = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Fade in & slide up the text
    tl.fromTo(".hero-content h1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(".hero-content p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .fromTo(".line", { height: 0 }, { height: "150px", duration: 1 }, "-=0.6") // Line drawing effect
      .fromTo(".cta-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1,0.5)" }, "-=0.5");

    // Add a slight floating effect to the CTA button
    gsap.to(".cta-button", {
      y: 5,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });

  }, []);

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1>CoralSense <br />AI-Powered Reef Monitoring</h1>
          <p>Analyze coral health using deep learning. Upload an image and get real-time predictions.</p>
        </div>
        <div className="line"></div>
        <div className="cta-container">
          <Link to="/check-health" className="cta-button">Check Coral Health Now</Link>
        </div>
      </div>
      <ProjectInfo />
    </>
  );
};

export default Home;
