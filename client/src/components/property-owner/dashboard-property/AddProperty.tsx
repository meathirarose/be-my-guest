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
import { fetchPropertyById, listProperty, updateProperty, } from "../../../api/listPropertyApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { PropertyBasicInfo, PropertyFormData, PropertyLocation, PropertyPricing, RoomsAndSpaces,} from "../../../interfaces/ListPropertyDetails";
import { RotateCw } from "lucide-react";

const { TabPane } = Tabs;

const AddPropertyPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userId = user?.user?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id || null;
  const isEditMode = Boolean(id);

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
    mediaUrls: [],
    pricing: {
      price: "",
      availability: "",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (isEditMode && id) {
        try {
          setLoading(true);
          const response = await fetchPropertyById(id);
          if (response.data) {
            setFormData(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching property:", error);
          message.error("Failed to fetch property data");
          navigate("/host/dashboard/properties");
        } finally {
          setTimeout(() => setLoading(false), 0);
        }
      } else {
        setLoading(false);
      }
    };
    if (isEditMode && id && loading) {
      fetchPropertyData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  // Extract the current step from the URL
  const getCurrentStep = () => {
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart === "add-property-start") return "1";
    return lastPart.split("-")[1] || "1";
  };

  const activeStep = parseInt(getCurrentStep());

  const steps = [
    { id: 1, label: `${isEditMode ? "Edit" : "Get"} Started` },
    { id: 2, label: "Step 1: Basic Details" },
    { id: 3, label: "Step 2: Location" },
    { id: 4, label: "Step 3: Rooms & Spaces" },
    { id: 5, label: "Step 4: Photos & Videos" },
    { id: 6, label: "Step 5: Pricing & Availability" },
    { id: 7, label: "Step 5: Publish & Live" },
  ];

  const updateBasicInfo = (data: Partial<PropertyBasicInfo>) => {
    setFormData((prev) => ({ ...prev, basicInfo: { ...prev.basicInfo, ...data },}));
  };

  const updateLocation = (data: Partial<PropertyLocation>) => {
    setFormData((prev) => ({ ...prev, location: { ...prev.location, ...data },}));
  };

  const updateRoomsAndSpaces = (data: Partial<RoomsAndSpaces>) => {
    setFormData((prev) => ({ ...prev, roomsAndSpaces: { ...prev.roomsAndSpaces, ...data },}));
  };

  const updateMedia = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, mediaUrls: urls,}));
  };

  const updatePricing = (data: Partial<PropertyPricing>) => {
    setFormData((prev) => ({ ...prev, pricing: { ...prev.pricing, ...data },}));
  };

  const handleFinalSubmit = async () => {
    try {
      let response;

      if (isEditMode) {
        response = await updateProperty(id, { ...formData });
        message.success("Property added successfully");
      } else {
        response = await listProperty({ ...formData }, userId);
        message.success("Property added successfully");
      }

      if (response.status === 200) {
        navigate("/host/dashboard/properties");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      message.error("Failed to submit property");
    }
  };

  const handleNext = () => {
    setFormData((prev) => ({ ...prev }));
    navigate(`/host/dashboard/properties/add-property-start/step-${activeStep + 1}`, { state: { id } });
  };

  const handlePrevious = () => {
    if (activeStep > 1) navigate(`/host/dashboard/properties/add-property-start/step-${activeStep - 1}`,{ state: { id } });
  };

  useEffect(() => {
    if (location.pathname === "/host/dashboard/properties/add-property-start") {
      navigate("/host/dashboard/properties/add-property-start/step-1", {
        replace: true,
      });
    }
  }, [location.pathname, navigate]);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <RotateCw color="#9333ea" />{" "}
      </div>
    );

  return (
    <div className="flex-1 flex flex-col ">
      <div className="flex-1">
        <Tabs
          activeKey={activeStep.toString()}
          onChange={(key) =>
            navigate(`/host/dashboard/properties/add-property-start/step-${key}`,{ state: { id } })
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
                  {step.id === 1 && (<AddPropertyStep1 isEditMode={isEditMode} /> )}
                  {step.id === 2 && (<AddPropertyStep2 data={formData.basicInfo} onChange={updateBasicInfo} /> )}
                  {step.id === 3 && (<AddPropertyStep3 data={formData.location} onChange={updateLocation} /> )}
                  {step.id === 4 && (<AddPropertyStep4 data={formData.roomsAndSpaces} onChange={updateRoomsAndSpaces} /> )}
                  {step.id === 5 && (<AddPropertyStep5 data={formData.mediaUrls} onChange={updateMedia} /> )}
                  {step.id === 6 && (<AddPropertyStep6 data={formData.pricing} onChange={updatePricing} /> )}
                  {step.id === 7 && (<AddPropertyStep7 data={formData} onChange={handleFinalSubmit} isEditMode={isEditMode} /> )}
                </>
              )}
            </TabPane>
          ))}
        </Tabs>
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