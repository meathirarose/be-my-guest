import React, { useEffect } from "react";
import { Tabs, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import AddPropertyStep1 from "./AddPropertyStep1";
import AddPropertyStep2 from "./AddPropertyStep2";
import AddPropertyStep3 from "./AddPropertyStep3";
import AddPropertyStep4 from "./AddPropertyStep4";
import AddPropertyStep5 from "./AddPropertyStep5";
import AddPropertyStep6 from "./AddPropertyStep6";
import AddPropertyStep7 from "./AddPropertyStep7";

const { TabPane } = Tabs;

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    // If we're at the root add-property-start URL, redirect to step-1
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
                  {step.id === 2 && <AddPropertyStep2 />}
                  {step.id === 3 && <AddPropertyStep3 />}
                  {step.id === 4 && <AddPropertyStep4 />}
                  {step.id === 5 && <AddPropertyStep5 />}
                  {step.id === 6 && <AddPropertyStep6 />}
                  {step.id === 7 && <AddPropertyStep7 />}
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
