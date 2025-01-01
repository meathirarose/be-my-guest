import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginHost } from "../../redux/user/userSlice";
import { SignInPropertyOwner } from "../../api/userAuthApi";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";
import bg_signin from "../../assets/property-owner-images/bg-signin.jpg";
import InputField from "../../shared/components/InputField";
import { showToast } from "../../shared/utils/toastUtils";

const LoginForm: React.FC = () => {
  const [loginInput, setLoginInput] = useState<string>("");
  const [errors, setErrors] = useState<{ login?: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInput = () => {
    const validationErrors: { login?: string } = {};
    if (!loginInput.trim()) {
      validationErrors.login = "Mobile Number or Email Address is required.";
    } else if (!loginInput.includes("@") && isNaN(Number(loginInput))) {
      validationErrors.login = "Enter a valid email or mobile number.";
    }
    return validationErrors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await SignInPropertyOwner(
        loginInput.includes("@") ? loginInput : undefined,
        loginInput.includes("@") ? undefined : Number(loginInput)
      );

      const { user, token } = response.data;
      dispatch(loginHost({ user, token }));
      navigate("/host-home");
      showToast("success", "Login successful!");
    } catch (err) {
      if (err instanceof Error) {
        setErrors({
          login: err.message || "Sign-in failed. Please try again.",
        });
      } else {
        setErrors({ login: "An unexpected error occurred." });
      }
      showToast("error", "Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">

      {/* Header Component */}
      <Header />

      <div
        className="relative flex-grow flex items-center justify-center bg-cover bg-center pt-52 pb-24 pl-1"
        style={{ backgroundImage: `url(${bg_signin})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative w-full max-w-sm px-6 py-8 bg-white rounded-lg shadow-lg z-10">
          <form onSubmit={handleLogin}>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Login
            </h2>

            <InputField
              type="text"
              name="login"
              placeholder="Mobile Number or Email Address"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              error={errors.login}
            />

            <button
              type="submit"
              className={`w-full p-3 text-white rounded-lg hover:bg-purple-600 ${
                Object.keys(errors).length > 0
                  ? "bg-red-500 border-red-500 focus:ring-red-500 hover:bg-red-700"
                  : "bg-purple-500 focus:ring-purple-500"
              }`}
            >
              SIGN IN
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/host-signup" className="text-blue-500 hover:underline">
              SignUp
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
