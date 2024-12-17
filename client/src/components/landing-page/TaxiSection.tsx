import React from "react";
import { FaCheck } from "react-icons/fa"; 

const TaxiSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-20 text-center">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
        Wherever you go, feel at home <br />
        <span className="text-purple-700 mt-2 inline-block">
          Personalized stays with unique local <br /> 
          <span className="text-purple-700 mt-2 inline-block">experiences.</span>
          </span>
      </h2>

      <p className="text-gray-600 text-base mb-10">
        Every stay is secure – Enjoy peace of mind <br />
        with trusted bookings and protected experiences.
      </p>

      {/* Service List */}
      <div className="text-left max-w-md mx-auto mb-12">
        <div className="flex justify-between items-center py-3 border-b">
          <span className="text-purple-700 font-medium">
            Airport Pickup/Drop-off Service
          </span>
          <FaCheck className="text-green-500" />
        </div>
        <div className="flex justify-between items-center py-3 border-b">
          <span className="text-purple-700 font-medium">
            Local Guide Assistance
          </span>
          <FaCheck className="text-green-500" />
        </div>
        <div className="flex justify-between items-center py-3">
          <span className="text-purple-700 font-medium">Outdoor Activities</span>
          <FaCheck className="text-green-500" />
        </div>
      </div>

      <div>
        <button className="bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-800 transition duration-300">
          Know more about Taxi Service
        </button>
      </div>
    </section>
  );
};

export default TaxiSection;
