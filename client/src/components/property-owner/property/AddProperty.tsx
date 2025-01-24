import React, { useState } from "react";
import { Tabs, Button } from "antd";
import Sidebar from "../common/SideBar";
import Header from "../common/Header";

const { TabPane } = Tabs;

const AddPropertyPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: "Get Started" },
    { id: 2, label: "Step 1: Tell us about your place" },
    { id: 3, label: "Step 2: Make it shine" },
    { id: 4, label: "Step 3: Add engaging local activities" },
    { id: 5, label: "Step 4: Publish & Go Live" },
  ];

  const handleNext = () => {
    if (activeStep < steps.length) setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const renderStepContent = (stepId: number) => {
    switch (stepId) {
      case 1:
        return <div>Welcome to the Add Property process. Let’s get started!</div>;
      case 2:
        return <div>Step 1: Provide details about your property.</div>;
      case 3:
        return <div>Step 2: Add stunning photos of your property.</div>;
      case 4:
        return <div>Step 3: Highlight local activities around your property.</div>;
      case 5:
        return <div>Step 4: Review your details and publish.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 bg-gray-50 px-6 py-28">
          <Tabs
            activeKey={activeStep.toString()}
            onChange={(key) => setActiveStep(parseInt(key))}
            tabBarStyle={{
              marginBottom: 24,
              fontWeight: 500,
              fontSize: 16,
            }}
            tabBarGutter={32}
            centered
            type="card"
          >
            {steps.map((step) => (
              <TabPane tab={step.label} key={step.id.toString()}>
                <div className="py-6">{renderStepContent(step.id)}</div>
              </TabPane>
            ))}
          </Tabs>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              disabled={activeStep === 1}
              onClick={handlePrevious}
              className="bg-gray-300 disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              type="primary"
              disabled={activeStep === steps.length}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
