import React from "react";

interface PropertyData {
  bedrooms: number,
  bathrooms: number,
  livingRoom: number,
  lobbyLounge: number,
  helpersRoom: number,
  swimmingPool: number,
  parking: number, 
  driversRoom: number,
  terrace: number,
  garden: number,
  diningArea: number,
  kitchenAvailable: boolean,
}

interface Step4Props {
  data: PropertyData;
  onChange: (data: Partial<PropertyData>) => void;
}

const AddPropertyStep4: React.FC<Step4Props> = ({ data, onChange }) => {
  const handleCountChange = (name: string, delta: number) => {
    const currentValue = data[name as keyof typeof data] as number;
    onChange({ [name]: Math.max(0, currentValue + delta) });
  };

  const handleKitchenChange = (value: boolean) => {
    onChange({ kitchenAvailable: value });
  }

  const roomTypes = [
    "bedrooms",
    "bathrooms",
    "livingRoom",
    "lobbyLounge",
    "helpersRoom",
    "swimmingPool",
    "parking",
    "driversRoom",
    "terrace",
    "garden",
    "diningArea"
  ];

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-400">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Rooms & Spaces</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please add all the rooms & spaces of your property.
        </p>

        {roomTypes.slice(0, 2).map((roomType) => (
          <div key={roomType} className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">{formatLabel(roomType)}</span>
            <div className="flex items-center">
              <button
                onClick={() => handleCountChange(roomType, -1)}
                className="px-3 py-1 border rounded-l bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">
              {data[roomType as keyof typeof data].toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => handleCountChange(roomType, 1)}
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
              onClick={() => handleKitchenChange(false)}
              className={`px-4 py-1 border rounded ${!data.kitchenAvailable ? "bg-gray-200" : "bg-white"}`}
            >
              No
            </button>
            <button
              onClick={() => handleKitchenChange(true)}
              className={`px-4 py-1 border rounded ${data.kitchenAvailable ? "bg-gray-200" : "bg-white"}`}
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
          {roomTypes.slice(2).map((roomType) => (
            <div key={roomType} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">{formatLabel(roomType)}</span>
              <div className="flex items-center">
                <button
                  onClick={() => handleCountChange(roomType, -1)}
                  className="px-3 py-1 border rounded-l bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">
                  {data[roomType as keyof typeof data].toString().padStart(2, '0')}
                </span>
                <button
                  onClick={() => handleCountChange(roomType, 1)}
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
