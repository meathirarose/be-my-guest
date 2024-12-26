import React from "react";
import verifyEmailImage from "../../assets/customer-images/signup-image.jpg"; 

const VerifyEmailPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-106 h-96 bg-purple-600 rounded-2xl overflow-hidden shadow-xl">
        
        <img
          src={verifyEmailImage}
          alt="Email Verification"
          className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-2xl object-cover"
        />

        <div className="relative z-20 bg-purple-400 bg-opacity-20 border-2 border-purple-600 rounded-2xl p-24 text-white flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold leading-snug text-center mb-4">
            Verify Your Email
          </h2>

          <p className="text-base text-center mb-4">
            A verification email has been sent to your inbox. <br />
            Please verify your email to complete the registration process.
          </p>

          <p className="text-sm text-center">
            Didn't receive the email?{" "}
            <a href="/resend-email" className="text-blue-400 hover:underline">
              Click here to resend
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmailPage;
