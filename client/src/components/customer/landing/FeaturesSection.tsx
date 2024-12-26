import React from "react";
import features1 from "../../../assets/customer-images/features1.png";
import features2 from "../../../assets/customer-images/features2.png";
import features3 from "../../../assets/customer-images/features3.png";

const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-20 text-center">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-14 leading-tight">
        <span className="text-purple-700">Effortlessly</span> view and manage your bookings,
        <br />
        check your calendar, and message your host,
        <br />
        <span className="text-purple-700">all in one place.</span>
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Stay List Card */}
        <div className="max-w-sm flex flex-col items-center">
          <img
            src={features1}
            alt="Stay List"
            className="w-75 h-60 object-cover rounded-lg mb-6"
          />
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Stay List</h3>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Explore beautifully detailed listings of stays</span><br /> 
            discover every feature, amenity, and unique <br /> 
            touch to find the perfect home for your <br />
            journey.
          </p>
        </div>

        {/* Calendar Card */}
        <div className="max-w-sm flex flex-col items-center">
          <img
            src={features2}
            alt="Calendar"
            className="w-75 h-60 object-cover rounded-lg mb-6"
          />
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Calendar</h3>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Plan your stays with ease</span>,<br /> 
            explore availability, review pricing, and<br /> 
            make informed bookings, all tailored to <br />
            your schedule and budget.
          </p>
        </div>

        {/* Messages Card */}
        <div className="max-w-sm flex flex-col items-center">
          <img
            src={features3}
            alt="Messages"
            className="w-75 h-60 object-cover rounded-lg mb-6"
          />
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Messages</h3>
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Stay connected effortlessly.</span><br /> 
            message your hosts instantly and get <br />
            support whenever you need it for a <br />
            seamless travel experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
