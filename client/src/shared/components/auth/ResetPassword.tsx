import React, { useState } from "react";
import verifyEmailImage from "../../../assets/customer-images/signup-image.jpg";
import InputField from "../ui/InputField";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../api/userAuthApi";
import { resetPasswordValidationSchema } from "../../../validations/user/resetPassword";
import axios from "axios";
import { message } from "antd";
// import {jwtDecode} from "jwt-decode";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      console.log(value);
      setConfirmPassword(value);
    }
  };

  const validateForm = () => {
    const { error } = resetPasswordValidationSchema.validate(
      { password, confirmPassword },
      { abortEarly: false, }
    );

    if (!error) {
      setErrors({ password: "", confirmPassword: "" });
      return true;
    }
    const newErrors: { password: string; confirmPassword: string } = {
      password: "",
      confirmPassword: "",
    };

    error.details.forEach((detail) => {
      newErrors[detail.path[0] as "password" | "confirmPassword"] =
        detail.message;
    });
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const token = new URLSearchParams(window.location.search).get("token");
      // const decodedToken = jwtDecode(token);

      if (!token) {
        message.error("Invalid reset password link."); 
        // navigate("/customer/login");
        return;
      }
      const response = await resetPassword(password, confirmPassword, token);
      message.success(response.data.message);
      if (response.data.role === "customer") {
        navigate("/customer/login");
      } else if (response.data.role === "property-owner") {
        navigate("/host/signin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred";
          message.error(errorMessage);
      } else {
        message.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/customer/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-106 h-1/2 bg-purple-400 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={verifyEmailImage}
          alt="Email Verification"
          className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-2xl object-cover"
        />

        <div className="relative z-20 bg-purple-500 bg-opacity-20 border-2 border-purple-600 rounded-2xl p-24 flex flex-col items-center justify-center h-full">
          <div className="text-4xl font-bold px-6 mb-14 text-center">
            <span className="text-purple-700">Be My</span>{" "}
            <span className="text-white">Guest</span>
          </div>
          <h2 className="text-2xl font-bold leading-snug text-center text-white mb-4">
            Reset Your Password
          </h2>

          <p className="text-base text-center text-white mb-4">
            Please enter and confirm your new password.
          </p>

          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <InputField
              type="password"
              name="password"
              placeholder="New Password"
              value={password}
              error={errors.password}
              onChange={handleInputChange}
            />
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              error={errors.confirmPassword}
              onChange={handleInputChange}
            />
            <div className="mt-6">
              <SubmitButton isLoading={isLoading} text="Reset Password" />
            </div>

            <button
              className="absolute right-0 text-sm text-purple-700 hover:underline p-2"
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
