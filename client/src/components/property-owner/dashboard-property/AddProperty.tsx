import React, { useEffect, useState } from "react";
import { Tabs, Button, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import AddPropertyStep1 from "./AddPropertyStep1";
import AddPropertyStep2 from "./AddPropertyStep2";
import AddPropertyStep3 from "./AddPropertyStep3";
import AddPropertyStep4 from "./AddPropertyStep4";
import AddPropertyStep5 from "./AddPropertyStep5";
import AddPropertyStep6 from "./AddPropertyStep6";
import AddPropertyStep7 from "./AddPropertyStep7";

const { TabPane } = Tabs;

interface PropertyBasicInfo {
  propertyName: string,
  buildYear: string,
  liveAtProperty: boolean,
  contactEmail: string,
  contactMobile: string,
  contactLandline: string,
}

interface PropertyLocation {
  houseName: string,
  locality: string,
  pincode: string, 
  country: string,
  state: string, 
  city: string,
}

interface RoomsAndSpaces {
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

interface PropertyPricing {
  price: string,
  availability: string,
}

interface PropertyFormData {
  basicInfo: PropertyBasicInfo,
  location: PropertyLocation,
  roomsAndSpaces: RoomsAndSpaces,
  media: File[],
  pricing: PropertyPricing,
}


const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<PropertyFormData>({
    basicInfo: {
      propertyName: "",
      buildYear: "",
      liveAtProperty: false,
      contactEmail: "",
      contactMobile: "",
      contactLandline: "",
    },
    location: {
      houseName: "",
      locality: "",
      pincode: "",
      country: "",
      state: "",
      city: "",
    },
    roomsAndSpaces: {
      bedrooms: 0,
      bathrooms: 0,
      livingRoom: 0,
      lobbyLounge: 0,
      helpersRoom: 0,
      swimmingPool: 0,
      parking: 0,
      driversRoom: 0,
      terrace: 0,
      garden: 0,
      diningArea: 0,
      kitchenAvailable: false,
    },
    media: [],
    pricing: {
      price: "",
      availability: "",
    },
  });

  // Extract the current step from the URL
  const getCurrentStep = () => {
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart === "add-property-start") return "1";
    return lastPart.split("-")[1] || "1";
  };

  const activeStep = parseInt(getCurrentStep());

  const steps = [
    { id: 1, label: "Get Started" },
    { id: 2, label: "Step 1: Basic Details" },
    { id: 3, label: "Step 2: Location" },
    { id: 4, label: "Step 3: Rooms & Spaces" },
    { id: 5, label: "Step 4: Photos & Videos" },
    { id: 6, label: "Step 5: Pricing & Availability" },
    { id: 7, label: "Step 5: Publish & Live" },
  ];

  const updateBasicInfo = (data: Partial<PropertyBasicInfo>) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {...prev.basicInfo, ...data},
    }));
  };

  const updateLocation = (data: Partial<PropertyLocation>) => {
    setFormData(prev => ({
      ...prev,
      location: {...prev.location, ...data},
    }));
  };

  const updateRoomsAndSpaces = (data: Partial<RoomsAndSpaces>) => {
    setFormData(prev => ({
      ...prev,
      roomsAndSpaces: {...prev.roomsAndSpaces, ...data},
    }));
  };

  const updateMedia = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      media: files,
    }));
  };

  const updatePricing = (data: Partial<PropertyPricing>) => {
    setFormData(prev => ({
      ...prev,
      pricing: {...prev.pricing, ...data}
    }));
  };

  const handleFinalSubmit = async () => {
    try {
      const submitData = new FormData();

      submitData.append('basicInfo', JSON.stringify(formData.basicInfo));
      submitData.append('location', JSON.stringify(formData.location));
      submitData.append('roomsAndSpaces', JSON.stringify(formData.roomsAndSpaces));
      submitData.append('pricing', JSON.stringify(formData.pricing));

      formData.media.forEach((file, index) => {
        submitData.append(`media_${index}`, file);
      });

      const response = await fetch('/api/property/list-property', {
        method: 'POST',
        body: submitData,
    });

    if( response.ok){
      message.success('Property listed successfully');
      navigate('/host/dashboard/properties');
    }else{
      throw new Error('Failed to submit property');
    }
    } catch (error) {
      console.error('Error submitting property:', error);
      message.error('Failed to submit property');
    }
  }

  const handleNext = () => {
    if (activeStep < steps.length) {
      navigate(
        `/host/dashboard/properties/add-property-start/step-${activeStep + 1}`
      );
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      navigate(
        `/host/dashboard/properties/add-property-start/step-${activeStep - 1}`
      );
    }
  };

  useEffect(() => {
    if (location.pathname === "/host/dashboard/properties/add-property-start") {
      navigate("/host/dashboard/properties/add-property-start/step-1", {
        replace: true,
      });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex-1 flex flex-col ">
      <div className="flex-1">
        <Tabs
          activeKey={activeStep.toString()}
          onChange={(key) =>
            navigate(
              `/host/dashboard/properties/add-property-start/step-${key}`
            )
          }
          centered
          type="card"
          tabBarStyle={{
            fontWeight: 500,
            fontSize: 14,
          }}
          className="custom-tabs"
        >
          {steps.map((step) => (
            <TabPane tab={step.label} key={step.id.toString()}>
              {activeStep === step.id && (
                <>
                  {step.id === 1 && <AddPropertyStep1 />}
                  {step.id === 2 && (<AddPropertyStep2 data={formData.basicInfo} onChange={updateBasicInfo}/>)}                  
                  {step.id === 3 && (<AddPropertyStep3 data={formData.location} onChange={updateLocation}/>)}                  
                  {step.id === 5 && (<AddPropertyStep4 data={formData.roomsAndSpaces} onChange={updateRoomsAndSpaces}/>)}                  
                  {step.id === 4 && (<AddPropertyStep5 data={formData.media} onChange={updateMedia}/>)}                  
                  {step.id === 6 && (<AddPropertyStep6 data={formData.pricing} onChange={updatePricing}/>)}                  
                  {step.id === 7 && (<AddPropertyStep7 data={formData} onChange={handleFinalSubmit}/>)}                  
                </>
              )}
            </TabPane>
          ))}
        </Tabs>

        {/* Navigation Buttons */}
        <div className="mb-6 mt-6 flex justify-between">
          <Button
            disabled={activeStep === 1}
            onClick={handlePrevious}
            className="bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50"
          >
            Previous
          </Button>

          <Button
            disabled={activeStep === steps.length}
            onClick={handleNext}
            className="bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
