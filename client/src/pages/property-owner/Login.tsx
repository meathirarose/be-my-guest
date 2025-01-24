import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { SignInPropertyOwner } from "../../api/userAuthApi";
import { useDispatch } from "react-redux";
import { loginHost } from "../../redux/user/userSlice";
import { showToast } from "../../shared/utils/toastUtils";
import InputField from "../../shared/components/ui/InputField";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import bg_signin from "../../assets/property-owner-images/bg-signin.jpg";
import { loginValidationSchema } from "../../validations/loginValidation";
import { LinkText } from "../../shared/components/ui/LinkText";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { SocialLoginButton } from "../../components/buttons/SocialLoginButtons";
import axios from "axios";

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
      const response = await SignInPropertyOwner(
        formData.email,
        formData.password
      );

      if (response && response.status === 200) {
        const { user, token } = response.data;

        dispatch(loginHost({ user, token }));
        showToast("success", "Sign-in successful!");
        if (user?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/host/dashboard", { replace: true });
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.errors?.[0]?.message || err.response?.data?.error[0] ||
          "Sign-in failed. Please try again.";
        console.log(
          "Error message from login page of property owner:",
          errorMessage
        );
        showToast("error", errorMessage);
      } else {
        console.error("Unexpected error:", err);
        showToast("error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Component */}
      <Header />

      <div
        className="relative flex-grow flex items-center justify-center bg-cover bg-center pt-40 pb-24 pl-1"
        style={{ backgroundImage: `url(${bg_signin})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative w-full max-w-sm px-6 py-8 bg-white rounded-lg shadow-lg z-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Login
            </h2>

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

            <div className="flex justify-start mt-2">
              <LinkText
                to="/forgot-password"
                text="Forgot Password?"
                ariaLabel="Forgot Password"
              />
            </div>
            <SubmitButton isLoading={loading} text="SIGN IN" />
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <LinkText to="/host/signup" text="Sign Up" ariaLabel="Sign Up" />
          </p>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <SocialLoginButton
            icon={<FcGoogle className="text-2xl" />}
            text="Continue with Google"
            onClick={handleGoogleLogin}
          />
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default LoginForm;
