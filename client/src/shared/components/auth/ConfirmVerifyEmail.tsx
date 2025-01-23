import React, { useEffect, useState } from "react";
import verifyEmailImage from "../../../assets/customer-images/signup-image.jpg"; 
import { VerifyEmail } from "../../../api/userAuthApi";
import { useNavigate } from "react-router-dom";

const ConfirmVerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get("token");
      if (!token) {
        console.error("Verification token is missing.");
        return;
      }

      try {
        const response = await VerifyEmail(token);

        // Check the user's role and set it
        if (response && response.data.user && response.data.user.role) {
          setRole(response.data.user.role);
        } else {
          console.error("Role information is missing in the response.");
        }
      } catch (error) {
        console.error("Error during email verification:", error);
      }
    };

    verifyEmail();
  }, []);

  // Handle navigation based on the user's role
  const handleLoginRedirect = () => {
    if (role === "property-owner") {
      navigate("/host/signin");
    } else {
      navigate("/customer/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[45%] h-4/5 bg-purple-600 rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={verifyEmailImage}
          alt="Email Verification"
          className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-3xl object-cover"
        />
        <div className="relative z-20 bg-purple-400 bg-opacity-30 border-2 border-purple-300 rounded-3xl p-10 text-white flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold leading-snug text-center mb-6">
            Your Email is Verified!
          </h2>

          <p className="text-lg text-center mb-10">
            You can now continue to the login page.
          </p>

          <button
            onClick={handleLoginRedirect}
            className="w-60 p-4 bg-purple-800 text-white rounded-lg hover:bg-purple-600 text-center block"
          >
            CONTINUE TO LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmVerifyEmailPage;
