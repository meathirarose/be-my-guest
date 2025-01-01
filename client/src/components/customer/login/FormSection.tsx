import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../../api/userAuthApi";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/user/userSlice";
import { showToast } from "../../../shared/utils/toastUtils"; 
import InputField from "../../../shared/components/InputField"; 

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
      const response = await signInUser(formData.email, formData.password);

      if (response && response.status === 200) {
        const { user, token } = response.data;

        dispatch(login({ user, token }));
        showToast("success", "Sign-in successful!"); 
        navigate("/user-home", { replace: true });
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
          <Link to="/signup" className="text-blue-500 hover:underline">
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
  );
};

export default LoginForm;
