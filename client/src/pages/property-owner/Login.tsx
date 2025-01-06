import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { SignInPropertyOwner } from "../../api/userAuthApi";
import { useDispatch } from "react-redux";
import { loginHost } from "../../redux/user/userSlice";
import { showToast } from "../../shared/utils/toastUtils";
import InputField from "../../shared/components/ui/InputField";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import bg_signin from "../../assets/property-owner-images/bg-signin.jpg";

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
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await SignInPropertyOwner(formData.email, formData.password);

      if (response && response.status === 200) {
        const { user, token } = response.data;

        dispatch(loginHost({ user, token }));
        showToast("success", "Sign-in successful!");
        navigate("/host/dashboard", { replace: true });
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
                <Link
                  to="/forgot-password"
                  className="text-blue-500 hover:underline"
                  aria-label="Forgot Password"
                >
                  Forgot Password?
                </Link>
              </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-white rounded-lg ${
                loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/host/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button className="w-full p-3 flex items-center justify-center border rounded-lg hover:bg-gray-100">
            <FcGoogle className="text-2xl mr-2" /> Continue with Google
          </button>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default LoginForm;
