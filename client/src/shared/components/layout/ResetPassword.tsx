import React, { useState } from "react";
import InputField from "../ui/InputField";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { validatePassword } from "../../utils/formValidationUtils";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastUtils";
import { resetPassword } from "../../../api/userAuthApi";

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
      setConfirmPassword(value);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {

        const token = new URLSearchParams(window.location.search).get("token");
        console.log(token, "token ondetto from reset password");
        if(!token) {
          showToast("error", "Invalid reset password link.");
          navigate("/customer/login");
          return;
        }
        const response = await resetPassword(password, confirmPassword, token);
        
        showToast("success", response.data.message || "Password successfully reset!");
        navigate("/customer/login");
      } catch (error) {
        showToast("error", "Something went wrong. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
  };

  const handleBack = () => {
    navigate("/customer/login");
  };

  return (
    <div className="relative flex flex-col h-screen bg-cover bg-center">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-100 p-14 rounded-lg shadow-md w-full max-w-md relative">
          <div className="text-4xl font-bold px-6 mb-14 text-center">
            <span className="text-purple-700">Be My</span> Guest
          </div>

          <h2 className="text-2xl font-bold text-gray-700 text-center mb-7">
            Reset Password
          </h2>

          <p className="text-gray-600 text-center mb-3">
            Please enter and confirm your new password.
          </p>

          <form onSubmit={handleSubmit} className="relative">
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
              className="absolute bottom right-0 text-sm text-purple-700 hover:underline p-2"
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
