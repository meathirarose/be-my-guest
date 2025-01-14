import React, { useState } from "react";
import InputField from "../../shared/components/ui/InputField";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../shared/utils/toastUtils";
import { forgotPasswordEmailValidationSchema } from "../../validations/forgotPasswordEmailValidation";
import { forgotPassword } from "../../api/userAuthApi";

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
    const { error } = forgotPasswordEmailValidationSchema.validate(email, {
      abortEarly: false,
    });

    if (!error) {
      setErrors({ email: ""});
      return true;
    }
    const newErrors: { email: string;} = {
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
        showToast("success","Password reset link sent to your email.");
        navigate("/customer/login");  
      }
    } catch (error) {
      console.error(error);
      showToast("error","Something went wrong, please try again.");
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
            Forgot Password?
          </h2>

          <p className="text-gray-600 text-center mb-3">
            Please enter your registered email to change the password.
          </p>

          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              error={errors.email}
              onChange={handleInputChange}
            />
            <div className="mt-6">
              <SubmitButton isLoading={isLoading} text="Verify Email" />
            </div>

            <button
              className="absolute bottom-0 right-0 text-sm text-purple-700 hover:underline p-4"
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

export default ForgotPassword;
