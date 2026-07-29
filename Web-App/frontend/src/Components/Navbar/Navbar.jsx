import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import { gsap } from "gsap";
import { useEffect } from "react";


const Navbar = () => {

  useEffect(() => {
    gsap.fromTo(
      ".navbar",
      { opacity: 0, y: -50 },  // Start hidden above
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" } // Animate to visible
    );

    gsap.fromTo(
      ".nav-links li",
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out"} // Stagger effect
    );
  }, []);


  return (
    <nav className="navbar">
        <h1 className="logo">CoralSense</h1>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Coral Reefs</Link></li>
            <li><Link to="/check-health">Check Coral Health</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar