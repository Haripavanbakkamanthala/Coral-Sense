import React, { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import ProjectInfo from "../ProjectInfo/ProjectInfo";

const Home = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      ".hero-content h1",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
    )
      .fromTo(
        ".hero-content p",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5",
      )
      .fromTo(".line", { height: 0 }, { height: "150px", duration: 1 }, "-=0.6")
      .fromTo(
        ".cta-button",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1,0.5)" },
        "-=0.5",
      );

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
      <div
        className="hero-section relative flex min-h-[620px] flex-col items-center justify-center overflow-hidden bg-sky-900 px-6 py-10 text-center text-white md:px-10"
        style={{
          backgroundImage: "url('/assets/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.28),transparent_35%),linear-gradient(120deg,rgba(2,6,23,0.82),rgba(8,47,73,0.68),rgba(14,116,144,0.6))]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%,rgba(34,211,238,0.12))]" />

        <div className="hero-content relative z-10 mx-auto flex max-w-5xl flex-col items-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-sm">
            AI reef intelligence
          </span>

          <h1 className="max-w-4xl text-[2.7rem] font-[800] leading-[1.08] tracking-[-0.05em] text-white md:text-[4.4rem]">
            CoralSense <br />
            <span className="text-cyan-200">AI-Powered Reef Monitoring</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium text-slate-100/90 md:text-[1.35rem]">
            CoralSense brings together marine conservation and artificial
            intelligence to help researchers, local teams, and environmental
            stakeholders detect coral stress faster. Upload a reef image and get
            real-time insights that support conservation decisions and long-term
            reef protection.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/check-health"
              className="cta-button rounded-full border border-cyan-300 bg-cyan-400/20 px-7 py-3.5 text-base text-white no-underline shadow-[0_12px_35px_rgba(34,211,238,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300/25"
            >
              Check Coral Health Now
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white no-underline backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/15"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-12 grid w-full max-w-5xl gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left shadow-[0_20px_45px_rgba(15,23,42,0.18)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/80">
              Accuracy
            </p>
            <p className="mt-2 text-3xl font-bold text-white">94%</p>
            <p className="mt-2 text-sm text-slate-100/80">
              reef health detection
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left shadow-[0_20px_45px_rgba(15,23,42,0.18)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/80">
              Speed
            </p>
            <p className="mt-2 text-3xl font-bold text-white">Instant</p>
            <p className="mt-2 text-sm text-slate-100/80">
              live image analysis
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left shadow-[0_20px_45px_rgba(15,23,42,0.18)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/80">
              Impact
            </p>
            <p className="mt-2 text-3xl font-bold text-white">24/7</p>
            <p className="mt-2 text-sm text-slate-100/80">
              marine conservation support
            </p>
          </div>
        </div>
      </div>
      <ProjectInfo />
    </>
  );
};

export default Home;
