import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField";

interface Address {
  id: number;
  type: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

const AddressManager: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, type: "Home", street: "", city: "", state: "", country: "", zipCode: "" }
  ]);

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        id: addresses.length + 1,
        type: "Home",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
      }
    ]);
  };

  const handleUpdateAddress = (id: number, field: string, value: string) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, [field]: value } : addr
    ));
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {addresses.map((address, index) => (
        <div key={address.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Address {index + 1}</h4>
            {addresses.length > 1 && (
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-600">Street Address</label>
              <InputField
                type="text"
                name="street"
                placeholder="Street address"
                value={address.street}
                onChange={(e) => handleUpdateAddress(address.id, 'street', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-600">City</label>
                <InputField
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => handleUpdateAddress(address.id, 'city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">State</label>
                <InputField
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => handleUpdateAddress(address.id, 'state', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">ZIP Code</label>
                <InputField
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={address.zipCode}
                  onChange={(e) => handleUpdateAddress(address.id, 'zipCode', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">Country</label>
                <InputField
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => handleUpdateAddress(address.id, 'country', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddAddress}
        className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
      >
        Add New Address
      </button>
    </div>
  );
};

export default AddressManager;