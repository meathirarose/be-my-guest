import React, { useState } from "react";
import verifyEmailImage from "../../../assets/customer-images/signup-image.jpg";
import InputField from "../ui/InputField";
import { SubmitButton } from "../../../components/buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastUtils";
import { forgotPasswordEmailValidationSchema } from "../../../validations/forgotPasswordEmailValidation";
import { forgotPassword } from "../../../api/userAuthApi";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    const { error } = forgotPasswordEmailValidationSchema.validate({ email }, {
      abortEarly: false,
    });

    if (!error) {
      setErrors({ email: "" });
      return true;
    }
    const newErrors: { email: string; } = {
      email: "",
    };

    error.details.forEach((detail) => {
      newErrors[detail.path[0] as "email"] = detail.message;
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
      const response = await forgotPassword(email);
      if (response.status === 200) {
        showToast("success", "Password reset link sent to your email.");
        navigate("/verify-email");  
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/customer/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-106 h-96 bg-purple-400 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={verifyEmailImage}
          alt="Forgot Password"
          className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-2xl object-cover"
        />

        <div className="relative z-20 bg-purple-400 bg-opacity-20 border-2 border-purple-600 rounded-2xl p-24  flex flex-col items-center justify-center h-full">
          <div className="text-4xl font-bold px-6 mb-14 text-center">
          <span className="text-purple-700">Be My</span> <span className="text-white">Guest</span>
          </div>
          <h2 className="text-2xl font-bold leading-snug text-center text-white mb-4">
            Forgot Password?
          </h2>

          <p className="text-base text-center text-white mb-4">
            Please enter your registered email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={handleInputChange}
            />
            <div className="mt-6">
              <SubmitButton isLoading={isLoading} text="Verify Email" />
            </div>
          </form>

          <button
            className="absolute bottom-0 right-0 text-sm text-purple-700 hover:underline p-4"
            onClick={handleBack}
            type="button"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
