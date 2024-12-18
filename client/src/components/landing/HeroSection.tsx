import React from "react";
import heroImage from "../../assets/images/hero-image.png";
import marariBeachImage from "../../assets/images/marari-beach.jpg";
import heroCircle from "../../assets/images/hero-circle.jpg";

const HeroSection: React.FC = () => (

  <section className="relative pt-28 pb-20 px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
    <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
      <span className="text-sm bg-purple-100 text-purple-700 px-3 py-2 rounded-full inline-block mb-10">
        ✈ Explore the wonderful Kerala!
      </span>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-snug">
        Stay, Savor & Wander:
        <br />
        <span className="text-purple-700">Your Perfect</span>{" "}
        <span className="text-black">Kerala</span>{" "}
        <span className="text-purple-700">Getaway Awaits!</span> 🌴
      </h1>
      <p className="text-gray-600 mt-8 leading-relaxed text-base sm:text-lg lg:text-xl">
      Wake up to the sound of nature, explore rustic countryside villages, and savor traditional Kerala cuisine. Whether you're a wanderer or a relaxer, Kerala has something magical for everyone. ✨
      </p>
    </div>

    <div className="lg:w-1/2 relative flex justify-center items-center z-0">
      {/* Blue Circular Background */}
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-blue-500 rounded-full top-[36.9%] -translate-y-1/4 right-18 -z-10"></div>
      
      {/* Hero circle */}
      <img
        src={heroCircle}
        alt="Feature in a circle"
        className="absolute w-20 h-20 sm:w-28 sm:h-28 lg:w-30 lg:h-30 rounded-full top-[28%] right-[16%] z-10"
      />

      {/* Main Traveler Image - Hero */}
      <img
        src={heroImage}
        alt="Traveler in Kerala"
        className="relative z-10 w-full max-w-xl sm:max-w-2xl lg:max-w-3xl drop-shadow-xl"
      />

      {/* Marari Beach Card */}
      <div className="absolute -bottom-6 right-28 bg-white shadow-lg rounded-lg p-3 flex items-center space-x-3 z-20">
        <div>
          <img
            src={marariBeachImage}
            alt="Marari Beach"
            className="w-28 h-20 rounded object-cover"
          />
          <p className="font-semibold">Marari Beach</p>
          <p className="text-xs text-yellow-500">⭐ 5.0 (24 reviews)</p>
        </div>
      </div>

      {/* Kerala Location Card */}
      <div className="absolute bottom-16 left-1/4 bg-white shadow-lg rounded-full w-28 px-4 py-0 flex items-center space-x-2 z-20">
        <div>📍</div>
        <div>
          <p className="font-semibold">Kerala</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
