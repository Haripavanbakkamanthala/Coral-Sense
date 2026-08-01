import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-8 w-full border-t border-slate-200 bg-white/90 px-5 py-5 text-center shadow-[0_-8px_20px_rgba(15,23,42,0.04)] backdrop-blur-md">
      <p className="text-sm text-slate-700 md:text-base">
        © 2025 Coral Conservation Initiative | All rights reserved.
      </p>
      <p className="mt-2 text-sm text-slate-600 md:text-base">
        Made with 💙 for Coral Reefs |{" "}
        <a
          href="https://ocean.org"
          className="font-bold text-sky-700 transition hover:text-sky-800 hover:underline"
        >
          Learn More
        </a>
      </p>
    </footer>
  );
};

export default Footer;
