import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="about-container" ref={aboutRef}>
      {/* What Are Coral Reefs? */}
      <section className="coral-intro section">
        <h2>What Are Coral Reefs?</h2>
        <p>Coral reefs are marine ecosystems that support 25% of marine life. They provide habitat, coastal protection, and economic benefits.</p>
        <img src="/assets/healthy-coral.png" alt="Healthy Coral Reef" />
      </section>

      {/* What Is Coral Bleaching? */}
      <section className="two-column section">
        <img src="/assets/bleached-coral.png" alt="Bleached Coral" />
        <div className="text">
          <h2>What Is Coral Bleaching?</h2>
          <p>Coral bleaching occurs when corals expel algae due to stress (temperature rise, pollution), turning white and vulnerable.</p>
        </div>
      </section>

      {/* How Coral Bleaching Occurs */}
      <section className="bleaching-comparison section">
        <div className="text">
          <h2>How Coral Bleaching Occurs</h2>
          <p>Corals depend on symbiotic algae for nutrients. Rising sea temperatures or pollution stress the corals, causing them to expel these algae, leading to bleaching.</p>
        </div>
        <img src="/assets/healthy-vs-bleached.png" alt="Healthy vs. Bleached Coral" />
      </section>

      {/* Why Should We Care & How Can We Help? */}
      <section className="final-section section">
        <div className="box">
          <h2>Why Should We Care?</h2>
          <ul>
            <li>50% of coral reefs are already lost.</li>
            <li>They protect coastlines from storms.</li>
            <li>Support marine biodiversity and economies.</li>
          </ul>
        </div>
        <div className="box">
          <h2>How Can We Help?</h2>
          <ul>
            <li>Reduce carbon footprint by using clean energy.</li>
            <li>Use reef-safe sunscreen when swimming.</li>
            <li>Support organizations working on coral conservation.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
