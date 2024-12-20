import React, { useEffect } from "react";
import verifyEmailImage from "../assets/images/signup-image.jpg"; 
import { VerifyEmail } from "../api/userApi";

const ConfirmVerifyEmailPage: React.FC = () => {

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get("token");
      console.log(token);
        try {
          const response = await VerifyEmail(token);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
    }
    verifyEmail();
  },[]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-106 h-96 bg-purple-600 rounded-2xl overflow-hidden shadow-xl">
        
        <img
          src={verifyEmailImage}
          alt="Email Verification"
          className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-2xl object-cover"
        />

        <div className="relative z-20 bg-purple-400 bg-opacity-20 border-2 border-purple-300 rounded-2xl p-6 text-white flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold leading-snug text-center mb-4">
            Your mail is verified!
          </h2>

          <p className="text-base text-center mb-4">
            Please continue to login.
          </p>

          <button className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            CONTINUE TO LOGIN
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmVerifyEmailPage;
