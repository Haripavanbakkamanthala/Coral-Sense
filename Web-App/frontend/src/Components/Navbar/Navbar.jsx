import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    gsap.fromTo(
      ".navbar",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
    );

    gsap.fromTo(
      ".nav-links li",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    );
  }, []);

  return (
    <nav className="navbar flex w-[95%] max-w-6xl justify-between rounded-[18px]  px-6 py-7  backdrop-blur-md md:px-8">
      <h1 className="logo text-[24px] font-bold uppercase tracking-[0.12em] text-sky-800">
        CoralSense
      </h1>
      <ul className="nav-links flex list-none items-center gap-4 md:gap-10">
        <li>
          <Link
            to="/"
            className="text-[16px] font-medium text-slate-700 transition hover:text-sky-700 md:text-[18px]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-[16px] font-medium text-slate-700 transition hover:text-sky-700 md:text-[18px]"
          >
            About Coral Reefs
          </Link>
        </li>
        <li>
          <Link
            to="/check-health"
            className="text-[16px] font-medium text-slate-700 transition hover:text-sky-700 md:text-[18px]"
          >
            Check Coral Health
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-[16px] font-medium text-slate-700 transition hover:text-sky-700 md:text-[18px]"
          >
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
