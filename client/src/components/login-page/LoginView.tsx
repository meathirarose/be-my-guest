import React from "react";
import LoginForm from "./FormSection";
import LoginImageSection from "./ImageSection";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">

      <div className="flex flex-1"> 
        <div className="flex-1 flex justify-center items-center">
          <LoginForm />
        </div>

        <div className="flex-1 flex justify-center items-center">
          <LoginImageSection />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
