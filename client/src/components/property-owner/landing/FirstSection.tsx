import React from "react";
import hostImage from "../../../assets/property-owner-images/host-image1.png";

const HeroSection: React.FC = () => (

  <section className="relative pt-28 pb-20 px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
    <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-snug">
        Earn From What You Own –         
        <span className="text-purple-700"> List Your Place & Get Paid with Every Stay!</span>{" "}
      </h1>
      <p className="text-gray-600 mt-8 leading-relaxed text-base sm:text-lg lg:text-xl">
        Join us. we’ll help you every
        step of the way      
      </p>
    </div>

    <div className="lg:w-1/2 relative flex justify-center items-center z-0">

      {/* Main Traveler Image - Hero */}
      <img
        src={hostImage}
        alt="Traveler in Kerala"
        className="relative z-10 w-[60%] max-w-xl sm:max-w-2xl lg:max-w-3xl drop-shadow-xl"
      />

    </div>
  </section>
);

export default HeroSection;
