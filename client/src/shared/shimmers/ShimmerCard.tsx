import React from "react";

const ShimmerCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg bg-gray-200 animate-pulse">
      <div className="h-56 bg-gray-300"></div>

      <div className="p-5 pb-2">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div className="p-5 pt-0 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/5"></div>
        <div className="h-4 bg-gray-300 rounded w-2/5"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="flex justify-end mt-4 space-x-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
