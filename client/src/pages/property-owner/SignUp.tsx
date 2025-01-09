import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPropertyOwner } from "../../api/userAuthApi";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import bg_signup from "../../assets/property-owner-images/bg-signin.jpg";
import InputField from "../../shared/components/ui/InputField";
import { showToast } from "../../shared/utils/toastUtils";
import { LinkText } from "../../shared/components/ui/LinkText";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import {
  validateConfirmPassword,
  validateCountry,
  validateEmail,
  validateName,
  validatePassword,
} from "../../shared/utils/formValidationUtils";

const SignupPage: React.FC = () => {
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      country: "",
      password: "",
      confirmPassword: "",
    };

    // Name validation
    const nameError = validateName(formData.name);
    if (nameError) {
      newErrors.name = nameError;
      isValid = false;
    }

    // Email validation
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    // Country validation
    const countryError = validateCountry(formData.country);
    if (countryError) {
      newErrors.country = countryError;
      isValid = false;
    }

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    // Confirm Password validation
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
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
      const response = await registerPropertyOwner(
        formData.name,
        formData.email,
        formData.country,
        formData.password,
        formData.confirmPassword
      );

      if (response.status === 201) {
        showToast("success", "Verification email sent!");
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
    <div className="flex min-h-screen flex-col">
      <Header />

      <div
        className="relative flex items-center justify-center py-8 bg-cover bg-center pt-40 pb-24"
        style={{ backgroundImage: `url(${bg_signup})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative w-full max-w-sm px-6 py-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Sign Up
            </h2>

            <InputField
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
            />

            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <SubmitButton isLoading={loading} text="VERIFY YOUR EMAIL" />
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <LinkText to="/host/signin" text="Sign Up" ariaLabel="Sign Up" />
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
