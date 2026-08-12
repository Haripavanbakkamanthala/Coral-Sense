import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        },
      );
    });
  }, []);

  return (
    <div className="project-info-container mx-auto max-w-6xl px-6 py-12 text-slate-800">
      <section className="about-project rounded-[28px] border border-slate-200 bg-white/80 p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <h2 className="text-[1.9rem] text-sky-700">What is CoralSense?</h2>
        <p className="mt-3 text-[1rem] leading-7 text-slate-600">
          CoralSense is an AI-powered coral health monitoring system designed to
          help identify whether reef ecosystems are healthy or under severe
          environmental stress. By combining computer vision with marine
          science, the platform makes it easier for researchers, conservation
          groups, and environmental stakeholders to assess reef conditions
          quickly and consistently.
        </p>
        <p className="mt-4 text-[1rem] leading-7 text-slate-600">
          The project was created to address a growing global challenge: coral
          reefs are rapidly degrading because of rising sea temperatures,
          pollution, ocean acidification, and destructive human activity.
          CoralSense supports early detection and informed action by turning
          image-based observations into actionable insights.
        </p>
      </section>

      <section className="how-it-works mt-8 rounded-[28px] border border-slate-200 bg-white/80 p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <h2 className="text-[1.9rem] text-sky-700">How It Works</h2>
        <div className="steps mt-6 grid gap-6 md:grid-cols-3">
          <div className="step rounded-[20px] border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 p-5 shadow-[0_10px_25px_rgba(14,165,233,0.08)]">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-sky-700 shadow-sm">
              1
            </span>
            <h3 className="text-[1.1rem] text-slate-800">Upload Image</h3>
            <p className="mt-2 text-slate-600">
              Users upload a coral reef image captured during field observation,
              underwater surveys, or remote monitoring activities.
            </p>
          </div>
          <div className="step rounded-[20px] border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 p-5 shadow-[0_10px_25px_rgba(14,165,233,0.08)]">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-sky-700 shadow-sm">
              2
            </span>
            <h3 className="text-[1.1rem] text-slate-800">AI Analysis</h3>
            <p className="mt-2 text-slate-600">
              The model analyzes visual patterns, colour changes, tissue damage,
              and bleaching indicators to classify the coral as{" "}
              <b className="text-amber-600">Healthy</b> or{" "}
              <b className="text-amber-600">Bleached</b>.
            </p>
          </div>
          <div className="step rounded-[20px] border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 p-5 shadow-[0_10px_25px_rgba(14,165,233,0.08)]">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-sky-700 shadow-sm">
              3
            </span>
            <h3 className="text-[1.1rem] text-slate-800">Get Result</h3>
            <p className="mt-2 text-slate-600">
              The result is returned in seconds, helping teams quickly identify
              reef stress, prioritize assessments, and support protection plans.
            </p>
          </div>
        </div>
      </section>

      <section className="technologies mt-8 rounded-[28px] border border-slate-200 bg-white/80 p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <h2 className="text-[1.9rem] text-sky-700">Technologies Used</h2>
        <div className="tech-list mt-4 flex flex-wrap gap-3">
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            React
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            Node.js
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            YOLOv11
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            Roboflow API
          </span>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            GSAP
          </span>
        </div>
      </section>

      <section className="importance mt-8 rounded-[28px] border border-slate-200 bg-white/80 p-7 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <h2 className="text-[1.9rem] text-sky-700">
          Why Coral Health Monitoring is Important?
        </h2>
        <p className="mt-3 text-[1rem] leading-7 text-slate-600">
          Coral reefs support{" "}
          <b className="text-amber-600">25% of marine life</b>, protect
          coastlines from storms, provide food and income for coastal
          communities, and play a critical role in the planet’s biodiversity.
          Yet, climate change, warming oceans, pollution, and excessive human
          activity have pushed many reef systems into decline.
        </p>
        <p className="mt-4 text-[1rem] leading-7 text-slate-600">
          <b className="text-amber-600">50% of coral reefs are already lost</b>,
          and bleaching is one of the clearest warning signs of ecosystem
          stress. By tracking coral health early and regularly, conservation
          teams can act faster, protect fragile habitats, and support reef
          recovery before the damage becomes irreversible.
        </p>
      </section>
    </div>
  );
};

export default ProjectInfo;
