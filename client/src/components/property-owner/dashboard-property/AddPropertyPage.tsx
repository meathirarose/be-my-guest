import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const steps = [
    { id: 1, label: "Get Started", path: "/properties/add-property-start" },
    { id: 2, label: "Step 2: Tell us about your place", path: "/properties/add-property-start/step-2" },
    { id: 3, label: "Step 3: Make it shine", path: "/properties/add-property-start/step-3" },
    { id: 4, label: "Step 4: Publish & Go Live", path: "/properties/add-property-start/step-4" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="tabs flex gap-4 mb-6">
        {steps.map((step) => (
          <Button
            key={step.id}
            type="primary"
            onClick={() => handleNavigation(step.path)}
          >
            {step.label}
          </Button>
        ))}
      </div>
      <Outlet /> 
    </div>
  );
};

export default AddPropertyPage;
