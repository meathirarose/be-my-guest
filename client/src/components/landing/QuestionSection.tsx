import React from "react";
import { HiChevronDown } from "react-icons/hi";

const QuestionSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-28 px-12 lg:px-20 text-center">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
        <span className="text-purple-700 mt-3 inline-block">
          Your Questions <br /> 
          <span className="text-purple-700 mt-3 inline-block">Answered</span>
          </span>
      </h2>

      {/* Service List */}
      <div className="text-left max-w-md mx-auto mb-12">
        
        <div className="flex justify-between items-center py-5 border-b">
          <span className="font-medium text-gray-600">
            Top Questions
          </span>
          <HiChevronDown className="text-black" />
        </div> 

      </div>

    </section>
  );
};

export default QuestionSection;
