import React, { useEffect, useMemo, useState } from "react";
import { Tabs, Button, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Joi from "joi";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";

// ... (other imports remain the same)

const AddPropertyPage: React.FC = () => {
  // ... (existing state and other code remains the same)
  
  // Add validation state
  const [stepErrors, setStepErrors] = useState<Record<number, string[]>>({});

  // Step-specific validation schemas
  const validationSchemas = useMemo(() => ({
    2: Joi.object({
      basicInfo: propertyValidationSchema.extract('basicInfo')
    }),
    3: Joi.object({
      location: propertyValidationSchema.extract('location')
    }),
    4: Joi.object({
      roomsAndSpaces: propertyValidationSchema.extract('roomsAndSpaces')
    }),
    5: Joi.object({
      mediaUrls: propertyValidationSchema.extract('mediaUrls')
    }),
    6: Joi.object({
      pricing: propertyValidationSchema.extract('pricing')
    })
  }), []);

  // Validation helper function
  const validateStep = (step: number): boolean => {
    // Skip validation for step 1 (intro) and step 7 (summary)
    if (step === 1 || step === 7) return true;

    const schema = validationSchemas[step as keyof typeof validationSchemas];
    if (!schema) return true;

    let dataToValidate = {};
    switch (step) {
      case 2:
        dataToValidate = { basicInfo: formData.basicInfo };
        break;
      case 3:
        dataToValidate = { location: formData.location };
        break;
      case 4:
        dataToValidate = { roomsAndSpaces: formData.roomsAndSpaces };
        break;
      case 5:
        dataToValidate = { mediaUrls: formData.mediaUrls };
        break;
      case 6:
        dataToValidate = { pricing: formData.pricing };
        break;
    }

    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      setStepErrors(prev => ({ ...prev, [step]: errors }));
      errors.forEach(err => message.error(err));
      return false;
    }

    setStepErrors(prev => ({ ...prev, [step]: [] }));
    return true;
  };

  // Modified navigation handlers
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setFormData((prev) => ({ ...prev }));
      navigate(`/host/dashboard/properties/add-property-start/step-${activeStep + 1}`, { state: { id } });
    }
  };

  const handleTabChange = (key: string) => {
    const targetStep = parseInt(key);
    
    // Allow backward navigation without validation
    if (targetStep < activeStep) {
      navigate(`/host/dashboard/properties/add-property-start/step-${key}`, { state: { id } });
      return;
    }

    // For forward navigation, validate all steps up to the target
    let isValid = true;
    for (let step = activeStep; step < targetStep; step++) {
      if (!validateStep(step)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      navigate(`/host/dashboard/properties/add-property-start/step-${key}`, { state: { id } });
    }
  };

  // Modified Tabs component
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">
        <Tabs
          activeKey={activeStep.toString()}
          onChange={handleTabChange}
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
                  {stepErrors[step.id] && stepErrors[step.id].length > 0 && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
                      {stepErrors[step.id].map((error, index) => (
                        <div key={index} className="text-red-600">{error}</div>
                      ))}
                    </div>
                  )}
                  {/* ... (existing step components) */}
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

          {activeStep === steps.length ? (
            <Button
              onClick={handleFinalSubmit}
              className="bg-purple-500 text-white hover:bg-purple-600"
            >
              {isEditMode ? "Update Property" : "Publish Property"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-purple-500 text-white hover:bg-purple-600"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;