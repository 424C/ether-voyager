// src/components/HeroSection/HeroSection.js
import React from "react";
import "./hero-section.css";
import designerImage from "../../assets/Designer.png";

const HeroSection = ({ onExploreNowClick }) => {
  return (
    <div className="hero">
      <h1>Welcome to EtherVoyager</h1>
      <p>Your gateway to exploring the Ethereum blockchain.</p>
      <button onClick={onExploreNowClick}>Explore Now</button>
      <img src={designerImage} alt="Designer" className="hero-image" />
    </div>
  );
};

export default HeroSection;
