import React, { useState } from "react";

const AddPropertyStep4: React.FC = () => {
  const [kitchenAvailable, setKitchenAvailable] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    "Bedrooms (Listed together as a Private room)": 0,
    Bathrooms: 0,
    "Living Room": 0,
    "Lobby Lounge": 0,
    "Helpers Room": 0,
    "Swimming Pool": 0,
    Parking: 0,
    "Drivers Room": 0,
    Terrace: 0,
    Garden: 0,
    "Dining Area": 0,
  });

  const handleCountChange = (label: string, delta: number) => {
    setCounts((prev) => ({ ...prev, [label]: Math.max(0, prev[label] + delta) }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Rooms & Spaces</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please add all the rooms & spaces of your property.
        </p>

        {Object.keys(counts).slice(0, 2).map((label) => (
          <div key={label} className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">{label}</span>
            <div className="flex items-center">
              <button
                onClick={() => handleCountChange(label, -1)}
                className="px-3 py-1 border rounded-l bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{counts[label].toString().padStart(2, '0')}</span>
              <button
                onClick={() => handleCountChange(label, 1)}
                className="px-3 py-1 border rounded-r bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <span className="text-gray-700">Kitchen</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setKitchenAvailable(false)}
              className={`px-4 py-1 border rounded ${!kitchenAvailable ? "bg-gray-200" : "bg-white"}`}
            >
              No
            </button>
            <button
              onClick={() => setKitchenAvailable(true)}
              className={`px-4 py-1 border rounded ${kitchenAvailable ? "bg-gray-200" : "bg-white"}`}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-400">
        <h3 className="text-md font-semibold text-gray-800">Additional Spaces</h3>
        <p className="text-sm text-gray-600 mb-4">
          Add the other spaces available in your property (Excluding bedrooms & bathrooms)
        </p>
        <div className="divide-y">
          {Object.keys(counts).slice(2).map((label) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">{label}</span>
              <div className="flex items-center">
                <button
                  onClick={() => handleCountChange(label, -1)}
                  className="px-3 py-1 border rounded-l bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{counts[label].toString().padStart(2, '0')}</span>
                <button
                  onClick={() => handleCountChange(label, 1)}
                  className="px-3 py-1 border rounded-r bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPropertyStep4;
