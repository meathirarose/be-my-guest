import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../api/userAuthApi";
import InputField from "../../../shared/components/InputField"; 
import { showToast } from "../../../shared/utils/toastUtils"; 

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", country: "", password: "", confirmPassword: "" };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character.";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await SignUpUser(
        formData.name,
        formData.email,
        formData.country,
        formData.password,
        formData.confirmPassword
      );
      if (response && response.status === 201) {
        showToast("success", "Signup successful! Please verify your email.");
        navigate("/verify-email");
      }
    } catch (error) {
      console.error(error || "Signup failed!");
      showToast("error", "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm px-6">
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          error={errors.name}
          onChange={handleChange}
        />

        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />

        <InputField
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          error={errors.country}
          onChange={handleChange}
        />

        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          error={errors.password}
          onChange={handleChange}
        />

        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className={`w-full p-3 text-white rounded-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {loading ? (
            <>
              <span className="loader mr-2"></span> Signing Up...
            </>
          ) : (
            "VERIFY YOUR MAIL"
          )}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
