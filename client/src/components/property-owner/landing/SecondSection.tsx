import React from "react";
import testimonial1 from "../../../assets/property-owner-images/testimonial-1.png";
import testimonial2 from "../../../assets/property-owner-images/testimonial-2.png";
import testimonial3 from "../../../assets/property-owner-images/testimonial-3.png";

import hostExperience1 from "../../../assets/property-owner-images/host-experience-1.png";
import hostExperience2 from "../../../assets/property-owner-images/host-experience-2.png"; 

const SecondSection: React.FC = () => {
  return (
    <div className="font-sans relative">
      {/* Header Section */}
      <section className="text-left py-20 bg-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-loose mb-16">
          <span className="block pl-12">Host Unique Stays,</span>
          <span className="block pl-24">Anywhere You Are</span>
        </h1>
      </section>

      {/* Testimonials Section */}
      <section className="bg-purple-100 pt-32 pb-12 relative">
        <div className="flex flex-wrap justify-center gap-20 -mt-48 relative z-10">
          {/* Images overlapping both sections */}
          <img
            src={testimonial1}
            alt="Testimonial 1"
            className="w-80 h-80 object-cover rounded-lg shadow-md border-2 border-white"
          />
          <img
            src={testimonial2}
            alt="Testimonial 2"
            className="w-80 h-80 object-cover rounded-lg shadow-md border-2 border-white"
          />
          <img
            src={testimonial3}
            alt="Testimonial 3"
            className="w-80 h-80 object-cover rounded-lg shadow-md border-2 border-white"
          />
        </div>
        <p className="text-lg italic text-center max-w-2xl mx-auto mt-8 mb-8">
          Opening my home to guests transformed me into an entrepreneur and
          paved the way to financial independence. <br />
          <span className="font-semibold">– Anna from Kottayam</span>
        </p>
      </section>

        {/* Call to Action Section */}
      <section className="text-center bg-purple-100 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          Be a Host, Be a Storyteller – <br />
          Welcome Guests from Around the World.
        </h2>
        <button className="px-6 py-3 bg-purple-600 text-white text-lg font-bold rounded-md shadow-md hover:bg-purple-700 transition">
          Try Hosting
        </button>
      </section>

      {/* New Section: Host Space and Experience */}
      <section className="bg-purple-100 py-20">
        <div className="flex flex-wrap justify-center gap-10">
          {/* First Card */}
          <div className="text-center">
            <img
              src={hostExperience1}
              alt="Host your space"
              className="w-72 h-72 object-cover rounded-lg shadow-md mb-8"
            />
            <p className="text-xl font-semibold">Host your space</p>
          </div>

          {/* Second Card */}
          <div className="text-center">
            <img
              src={hostExperience2}
              alt="Host your experience"
              className="w-72 h-72 object-cover rounded-lg shadow-md mb-8"
            />
            <p className="text-xl font-semibold">Host your experience</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SecondSection;
