import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        },
      );
    });
  }, []);

  return (
    <div
      className="about-container mx-auto max-w-6xl px-6 py-10 text-slate-800"
      ref={aboutRef}
    >
      <section className="coral-intro section mb-6 rounded-[20px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        <h2 className="text-[1.8rem] text-sky-700">What Are Coral Reefs?</h2>
        <p className="mt-3 text-[1rem] leading-7 text-slate-600">
          Coral reefs are among the most diverse and valuable ecosystems on the
          planet. They provide shelter and food for marine species, protect
          coastlines from erosion and storms, and support fisheries and tourism
          economies in many regions. In short, reefs are not only beautiful
          underwater landscapes—they are essential to both nature and human
          life.
        </p>
        <p className="mt-4 text-[1rem] leading-7 text-slate-600">
          These ecosystems are especially important because they support a large
          share of marine biodiversity while acting as natural barriers during
          extreme weather events. Their decline has direct consequences for
          wildlife, local communities, and global environmental health.
        </p>
        <img
          src="/assets/coral-reef.jpg"
          alt="Healthy Coral Reef"
          className="mt-5 w-full rounded-[12px] object-cover"
        />
      </section>

      <section className="two-column section mb-6 flex flex-col gap-6 rounded-[20px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] md:flex-row md:items-center">
        <img
          src="/assets/bleached-coral.png"
          alt="Bleached Coral"
          className="w-full rounded-[12px] object-cover md:w-1/2"
        />
        <div className="text md:w-1/2">
          <h2 className="text-[1.8rem] text-sky-700">
            What Is Coral Bleaching?
          </h2>
          <p className="mt-3 text-[1rem] leading-7 text-slate-600">
            Coral bleaching is a stress response in which corals expel the algae
            that live inside their tissues. These algae provide colour and much
            of the coral’s energy through photosynthesis. When waters become too
            warm, polluted, or chemically stressed, the coral loses these
            helpful organisms and becomes pale or white.
          </p>
          <p className="mt-4 text-[1rem] leading-7 text-slate-600">
            Although corals may survive a bleaching event temporarily, they are
            much more vulnerable to disease and mortality if the stress
            continues. This makes bleaching a major indicator of reef
            degradation.
          </p>
        </div>
      </section>

      <section className="bleaching-comparison section mb-6 flex flex-col gap-6 rounded-[20px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] md:flex-row md:items-center">
        <div className="text md:w-1/2">
          <h2 className="text-[1.8rem] text-sky-700">
            How Coral Bleaching Occurs
          </h2>
          <p className="mt-3 text-[1rem] leading-7 text-slate-600">
            Corals live in a delicate balance with microscopic algae called
            zooxanthellae. These algae supply the coral with energy and give it
            its vibrant colour. When ocean temperatures rise above normal
            levels, or when the reef is exposed to pollution, runoff, and
            environmental stress, this relationship breaks down.
          </p>
          <p className="mt-4 text-[1rem] leading-7 text-slate-600">
            Once the algae are expelled, the coral becomes white and visibly
            bleached. If the stress is prolonged, recovery becomes difficult,
            and entire reef systems can collapse if corrective action is not
            taken.
          </p>
        </div>
        <img
          src="/assets/healthy-vs-bleached.png"
          alt="Healthy vs. Bleached Coral"
          className="w-full rounded-[12px] object-cover md:w-1/2"
        />
      </section>

      <section className="final-section section flex flex-col gap-6 md:flex-row">
        <div className="box flex-1 rounded-[20px] border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-[1.6rem] text-amber-700">Why Should We Care?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            <li>50% of coral reefs are already lost or severely damaged.</li>
            <li>They protect coastlines from storm surge and erosion.</li>
            <li>
              They support biodiversity, fisheries, tourism, and livelihoods.
            </li>
            <li>
              Healthy reefs are essential for climate resilience and ocean
              balance.
            </li>
          </ul>
        </div>
        <div className="box flex-1 rounded-[20px] border border-sky-200 bg-sky-50 p-6">
          <h2 className="text-[1.6rem] text-sky-700">How Can We Help?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            <li>
              Reduce carbon emissions and support clean energy transitions.
            </li>
            <li>
              Use reef-safe sunscreen and reduce pollution in coastal areas.
            </li>
            <li>
              Support marine conservation projects and restoration initiatives.
            </li>
            <li>
              Use tools like CoralSense to improve reef monitoring and action.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
