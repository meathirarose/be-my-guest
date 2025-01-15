import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin, signInUser } from "../../api/userAuthApi";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import { showToast } from "../../shared/utils/toastUtils";
import InputField from "../../shared/components/ui/InputField";
import { LinkText } from "../../shared/components/ui/LinkText";
import { SubmitButton } from "../buttons/SubmitButton";
import { loginValidationSchema } from "../../validations/loginValidation";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const { error } = loginValidationSchema.validate(formData, {
      abortEarly: false,
    });

    if (!error) {
      setErrors({ email: "", password: "" });
      return true;
    }
    const newErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    error.details.forEach((detail) => {
      newErrors[detail.path[0] as "email" | "password"] = detail.message;
    });

    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await signInUser(formData.email, formData.password);

      if (response && response.status === 200) {
        const { user, token } = response.data;

        if(user?.role === "property-owner"){
          showToast("info", "This email is not linked to this account. Please sign in with a different account.");
        }else {
          dispatch(login({ user, token }));
          showToast("success", "Sign-in successful!");
        }

        navigate("/customer/home", { replace: true });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message || "Sign-in failed. Please try again."
          : "An unexpected error occurred.";

      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    setLoading(true);
    try {
      const { credential } = response;
      
      if (!credential) {
        throw new Error("Google login failed!");
      }

      // Sending idToken to the backend for verification
      const apiResponse = await googleLogin({ idToken: credential });
      if (apiResponse.status === 200) {
        const { user, token } = apiResponse.data;

        if(user?.role === "property-owner"){
          showToast("info", "This email is not linked to this account. Please sign in with a different account.");
        }else {
          dispatch(login({ user, token }));
          showToast("success", "Sign-in successful!");
        }
        
        navigate("/customer/home", { replace: true });
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginFailure = () => {
    showToast("error", "Google login failed. Please try again.");
    setLoading(false);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            error={errors.email}
            onChange={handleInputChange}
          />

          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            error={errors.password}
            onChange={handleInputChange}
          />

          <LinkText
            to="/forgot-password"
            text="Forgot Password?"
            ariaLabel="Forgot Password"
          />
          <SubmitButton isLoading={loading} text="SIGN IN" />
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <LinkText to="/customer/signup" text="Sign Up" ariaLabel="Sign Up" />
        </p>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
        />
      </div>
    </div>
  );
};

export default LoginForm;
