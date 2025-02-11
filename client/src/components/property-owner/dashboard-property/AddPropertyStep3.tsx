import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField";
import { PropertyLocation } from "../../../interfaces/ListPropertyDetails";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { message } from "antd";
import { MapPin } from "lucide-react";

interface Step3Props {
  data: PropertyLocation;
  onChange: (data: Partial<PropertyLocation>) => void;
}

const defaultPosition: LatLngExpression = [10.8505, 76.2711];

const AddPropertyStep3: React.FC<Step3Props> = ({ data, onChange }) => {
  const [mapPosition, setMapPosition] =
    useState<LatLngExpression>(defaultPosition);

  // update the map center
  const MapUpdater: React.FC<{ position: LatLngExpression }> = ({
    position,
  }) => {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
  };

  // Handle location fetch
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition: LatLngExpression = [latitude, longitude];
          setMapPosition(newPosition);
          await fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          message.error("Error fetching location");
        }
      );
    } else {
      message.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchAddress = async (lat: number, lon: number) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.features.length > 0) {
        const address = result.features[0].properties;
        console.log(
          "lets find what address is============================================>",
          address
        );

        const updatedData: Partial<PropertyLocation> = {
          city: address.address_line1,
          country: address.country,
          pincode: address.postcode,
          state: address.state,
          district: address.state_district,
        };

        onChange(updatedData);
      } else {
        message.error("No address found for the selected location.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      message.error("Error fetching the address");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex gap-6">
      <div className="w-1/2 bg-white rounded-2xl shadow-sm p-6 border border-gray-400">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Property Location Details
        </h2>

        <InputField
          type="text"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}          
        />

        <div
          className="mt-2 text-blue-600 cursor-pointer flex items-center gap-2"
          onClick={getCurrentLocation}
        >
          <MapPin size={16} color="black" />{" "}
          <span className="text-black underline font-semibold">
            Use your current location
          </span>
        </div>

        <InputField
          type="text"
          name="houseName"
          placeholder="House/Apartment No."
          value={data.houseName}
          onChange={(e) => onChange({ houseName: e.target.value })}
        />
        <InputField
          type="text"
          name="locality"
          placeholder="Locality/Street"
          value={data.locality}
          onChange={(e) => onChange({ locality: e.target.value })}
        />
        <InputField
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={data.pincode}
          onChange={(e) => onChange({ pincode: e.target.value })}
        />
        <InputField
          type="text"
          name="state"
          placeholder="State"
          value={data.state}
          onChange={(e) => onChange({ state: e.target.value })}
        />
        <InputField
          type="text"
          name="district"
          placeholder="District"
          value={data.district}
          onChange={(e) => onChange({ district: e.target.value })}
        />
        <InputField
          type="text"
          name="country"
          placeholder="Country"
          value={data.country}
          disabled
        />
      </div>

      <div className="w-1/2 bg-white rounded-2xl shadow-sm p-6 border border-gray-400">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Map Preview
        </h2>
        <MapContainer
          center={mapPosition}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <MapUpdater position={mapPosition} />
          <TileLayer
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${
              import.meta.env.VITE_API_KEY
            }`}
          />
          <Marker position={mapPosition} />
        </MapContainer>
      </div>
    </div>
  );
};

export default AddPropertyStep3;
