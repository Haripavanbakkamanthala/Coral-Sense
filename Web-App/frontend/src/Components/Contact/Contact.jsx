import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Contact.css";

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
        }
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
        }
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
        }
      );
    }, contactRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="contact-container" ref={contactRef}>
      <h2>Meet Our Team</h2>

      {/* Team Leader */}
      <div className="team-section">
        <div className="team-member team-lead">
          <img
            src="/assets/Hari Pavan Bakkamanthala.jpeg"
            alt="Hari Pavan Bakkamanthala"
          />

          <h3>Hari Pavan Bakkamanthala</h3>
          <p>Team Leader &amp; Developer</p>

          <div className="social-links">
            <a
              href="https://github.com/Haripavanbakkamanthala"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/hari-pavan-bakkamanthala-541a28278/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="team-section">
        <div className="team-member">
          <img src="/assets/Ganesh.jpeg" alt="Ganesh Patel" />

          <h3>Ganesh Patel</h3>
          <p>Team Member</p>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/ganesh-patel-901a92370?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="team-member">
          <img src="/assets/Hrithik.jpeg" alt="Hrithik Singh" />

          <h3>Hrithik Singh</h3>
          <p>Team Member</p>

          <div className="social-links">
            <a
              href="https://github.com/Hrithik5ab"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/hrithik-singh-b5179b240?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="team-member">
          <img src="/assets/Henry.png" alt="Henry" />

          <h3>Henry</h3>
          <p>Team Member</p>

          <div className="social-links">
            <a
              href="https://github.com/WAYASSEYY"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/henry-asare-10b8b2243?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="team-member">
          <img src="/assets/holder.png" alt="Rithwik" />

          <h3>Rithwik</h3>
          <p>Team Member</p>

          <div className="social-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/rithwik-mondrathi-b16bb0408"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Guide */}
      <h2>Our Guide</h2>

      <div className="guide-section">
        <div className="guide-card">
          <img
            src="/assets/holder.png"
            alt="Dr. Yih-Ling Hedley"
          />

          <h3>Dr. Yih-Ling Hedley</h3>
          <p>Assistant Professor</p>
          <p>Coventry University, UK</p>

          <a
            href="mailto:aa0817@coventry.ac.uk"
            className="email-link"
          >
            aa0817@coventry.ac.uk
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;