import React, { useEffect } from "react";
import { Tabs, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import AddPropertyStep1 from "./AddPropertyStep1";
import AddPropertyStep2 from "./AddPropertyStep2";
import AddPropertyStep3 from "./AddPropertyStep3";
import AddPropertyStep4 from "./AddPropertyStep4";
import AddPropertyStep5 from "./AddPropertyStep5";

const { TabPane } = Tabs;

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current step from the URL
  const currentStep = location.pathname.split("/").pop();
  const activeStep = currentStep ? parseInt(currentStep.split("-")[1]) : 1;

  const steps = [
    { id: 1, label: "Get Started" },
    { id: 2, label: "Step 1: Tell us about your place" },
    { id: 3, label: "Step 2: Make it shine" },
    { id: 4, label: "Step 3: Add engaging local activities" },
    { id: 5, label: "Step 4: Publish & Go Live" },
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
    if (!currentStep) {
      navigate("/host/dashboard/properties/add-property-start/step-1");
    }
  }, [currentStep, navigate]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-purple-50 px-6 ">
        <Tabs
          activeKey={activeStep.toString()}
          onChange={(key) =>
            navigate(
              `/host/dashboard/properties/add-property-start/step-${key}`
            )
          }
          centered
          tabBarGutter={32}
          type="card"
          tabBarStyle={{
            fontWeight: 500,
            fontSize: 16,
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
