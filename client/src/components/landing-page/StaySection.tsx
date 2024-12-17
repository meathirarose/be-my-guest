import React from "react";
import bookingImage from "../../assets/images/booking.jpg";
import localExperienceImage from "../../assets/images/local-experience.jpeg";
import handpickedStayImage from "../../assets/images/handpicked-stay.jpg";

const MiddleSection: React.FC = () => {
  return (
    <section className="bg-white py-10 px-6 lg:px-20 text-center">
      {/* for sub-heading */}
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-10">
        Experience the Authentic <br />
        <span className="mt-2 inline-block">Charm of Kerala —</span> <br />
        <span className="mt-2 inline-block text-purple-700">
          Your Dream Stay Awaits!
        </span>
      </h2>


      <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-6">
        {/* for booking image card */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-sm">
          <img
            src={bookingImage}
            alt="Effortless Booking"
            className="w-full h-full object-cover rounded-md mb-6"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Effortless Booking
          </h3>
          <p className="text-gray-600 text-sm">
            Browse, book, and enjoy unique countryside stays with just a few
            clicks.
          </p>
        </div>

        {/* for local experience image card */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-sm">
          <img
            src={localExperienceImage}
            alt="Authentic Local Experiences"
            className="w-full h-full object-cover rounded-md mb-6"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Authentic Local Experiences
          </h3>
          <p className="text-gray-600 text-sm">
            Enjoy local activities and savor traditional cuisine prepared just
            for you.
          </p>
        </div>

        {/* for handpicked stay image card */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-sm">
          <img
            src={handpickedStayImage}
            alt="Handpicked Stays"
            className="w-full h-full object-cover rounded-md mb-6"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Handpicked Stays
          </h3>
          <p className="text-gray-600 text-sm">
            Verified hosts, authentic stays, and personalized service at every
            step.
          </p>
        </div>
      </div>

      {/* get started button - middle */}
      <div className="mt-8">
        <button className="bg-purple-700 text-white px-10 py-2 rounded-full text-lg font-semibold hover:bg-purple-800">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default MiddleSection;
