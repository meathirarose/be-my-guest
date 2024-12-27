import React from "react";
import hostImage from "../../../assets/property-owner-images/host-main-image.jpg";

const HostFirstSection: React.FC = () => (
  <section className="relative w-full flex flex-col lg:flex-row items-center justify-between bg-purple-100">

    <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 flex flex-col justify-center px-4 lg:px-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-snug">
        Earn From What You Own –         
        <span className="text-purple-700"> List Your Place & Get Paid with Every Stay!</span>
      </h1>
      <p className="text-gray-600 mt-8 leading-relaxed text-base sm:text-lg lg:text-xl">
        Join us. We’ll help you every step of the way.
      </p>
    </div>

    <div className="lg:w-1/2 h-full flex justify-end items-center">
      <img
        src={hostImage}
        alt="Traveler in Kerala"
        className="w-full h-auto object-cover drop-shadow-xl"
      />
    </div>
  </section>
);

export default HostFirstSection;
