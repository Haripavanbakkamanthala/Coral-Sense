import { useEffect, useRef } from "react";
import gsap from "gsap";

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".contact-container",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".team-section",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.2,
        },
      );

      gsap.fromTo(
        ".guide-section",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        },
      );
    }, contactRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      className="contact-container mx-auto max-w-6xl px-6 py-10 text-slate-800"
      ref={contactRef}
    >
      <h2 className="text-[2rem] text-sky-700">Meet Our Team</h2>
      <p className="mt-4 max-w-4xl text-[1rem] leading-7 text-slate-600">
        Our team brings together five innovators with expertise in data science,
        engineering, and creative problem-solving. Together, we combine
        experience in machine learning, data visualization, and time series
        forecasting to build CoralSense—an AI-driven platform that predicts
        future reef health by integrating diverse environmental data. Our
        interactive map equips policymakers, researchers, and conservationists
        with practical insights to protect and restore reefs before it’s too
        late.
      </p>

      <div className="team-section mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="team-member rounded-[20px] border border-slate-200 bg-white/90 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <img
            src="/assets/Hari Pavan Bakkamanthala.jpeg"
            alt="Hari Pavan Bakkamanthala"
            className="mx-auto mb-4 mt-4 h-32 w-32 rounded-full border-4 border-sky-100 object-cover"
          />
          <h3 className="text-[1.1rem] text-sky-700">
            Hari Pavan Bakkamanthala
          </h3>
          <p className="mt-2 text-slate-700">
            Project Lead & Backend & API Developer
          </p>
          <p className="mt-1 text-sm text-slate-500">
            MSc Artificial Intelligence Student, Coventry University
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-amber-600">
            <a
              href="https://github.com/Haripavanbakkamanthala"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hari-pavan-bakkamanthala-541a28278/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="team-member rounded-[20px] border border-slate-200 bg-white/90 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <img
            src="/assets/paaji.jpeg"
            alt="Hrithik Singh"
            className="mx-auto mb-4 mt-4 h-32 w-32 rounded-full border-4 border-sky-100 object-cover"
          />
          <h3 className="text-[1.1rem] text-sky-700">Hrithik Singh</h3>
          <p className="mt-2 text-slate-700">Data & Model Engineer</p>
          <p className="mt-1 text-sm text-slate-500">
            MSc Data Science Student, Coventry University
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-amber-600">
            <a
              href="https://github.com/Hrithik5ab"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hrithik-singh-b5179b240?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="team-member rounded-[20px] border border-slate-200 bg-white/90 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <img
            src="/assets/wayassey.png"
            alt="Henry"
            className="mx-auto mb-4 mt-4 h-32 w-32 rounded-full border-4 border-sky-100 object-cover"
          />
          <h3 className="text-[1.1rem] text-sky-700">Henry Asare</h3>
          <p className="mt-2 text-slate-700">Testing, & Frontend Developer</p>
          <p className="mt-1 text-sm text-slate-500">
            MSc Computer Science Student, Coventry University
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-amber-600">
            <a
              href="https://github.com/WAYASSEYY"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/henry-asare-10b8b2243?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="team-member rounded-[20px] border border-slate-200 bg-white/90 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <img
            src="/assets/Ganesh.jpeg"
            alt="Ganesh Patel"
            className="mx-auto mb-4 mt-4 h-32 w-32 rounded-full border-4 border-sky-100 object-cover"
          />
          <h3 className="text-[1.1rem] text-sky-700">Ganesh Patel</h3>
          <p className="mt-2 text-slate-700">Coral Domain Researcher</p>
          <p className="mt-1 text-sm text-slate-500">
            MSc Data Science Student, Coventry University
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-amber-600">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ganesh-patel-901a92370?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="team-member rounded-[20px] border border-slate-200 bg-white/90 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <img
            src="/assets/Rithwik.jpeg"
            alt="Rithwik"
            className="mx-auto mb-4 mt-4 h-32 w-32 rounded-full border-4 border-sky-100 object-cover"
          />

          <h3 className="text-[1.1rem] text-sky-700">Rithwik</h3>
          <p className="mt-2 text-slate-700">
            Deployment & Documentation Engineer
          </p>
          <p className="mt-1 text-sm text-slate-500">
            MSc Ai and Human Factors Student, Coventry University
          </p>

          <div className="mt-4 flex justify-center gap-4 text-sm text-amber-600">
            <a
              href="https://github.com/Rithwik-Mondrathi"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/rithwik-mondrathi-b16bb0408"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-sky-700"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-[2rem] text-sky-700">Our Guide</h2>
      <div className="guide-section mt-6 rounded-[20px] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        <div className="guide-card mx-auto max-w-[360px] rounded-[20px] border border-sky-200 bg-sky-50 p-6 text-center">
          <img
            src="/assets/holder.png"
            alt="Dr. Yih-Ling Hedley"
            className="mx-auto mb-4 h-28 w-28 rounded-full object-cover"
          />
          <h3 className="text-[1.1rem] text-sky-700">Dr. Yih-Ling Hedley</h3>
          <p className="mt-2 text-slate-700">Assistant Professor</p>
          <p className="text-slate-600">Coventry University, UK</p>
          <a
            href="mailto:aa0817@coventry.ac.uk"
            className="mt-4 inline-block text-amber-600 transition hover:text-amber-700"
          >
            aa0817@coventry.ac.uk
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
