import React from "react";

const Aboutme = () => {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <span className="hero-subtitle">— HELLO WORLD</span>
        <h1 className="hero-title">
          I am Konal,<br />
          a logic crafter,<br />
          coding systems<br />
          that dominate.
        </h1>
        <p className="hero-quote">"If it’s not efficient, it’s not mine."</p>
      </div>

      {/* Social Links & GoReveler */}
      <div className="bottom-right-container">
        <div className="social-bstns">

        <a href="https://www.linkedin.com/in/konal-puri-54a1271b5/" className="social-btn" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://www.instagram.com/pkonal" className="social-btn" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        </div>
        <a href="/" className="goreveler-btn" rel="noopener noreferrer">
          Go to GoRevler
        </a>
      </div>
    </div>
  );
};

export default Aboutme;
