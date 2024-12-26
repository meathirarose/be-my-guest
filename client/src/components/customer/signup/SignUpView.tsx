import React from "react";
import SignUpFormSection from "./FormSection";
import SignUpImageSection from './ImageSection';

const SignUpView: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row h-full sm:h-screen">

      <div className="flex-1 flex justify-center items-center">
        <SignUpImageSection />
      </div>

      <div className="flex-1 flex justify-center items-center bg-white">
        <SignUpFormSection />
      </div>
    </div>
  );
};

export default SignUpView;
