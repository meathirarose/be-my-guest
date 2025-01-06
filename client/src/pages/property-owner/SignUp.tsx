import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPropertyOwner } from "../../api/userAuthApi";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import bg_signup from "../../assets/property-owner-images/bg-signin.jpg";
import InputField from "../../shared/components/ui/InputField";
import { showToast } from "../../shared/utils/toastUtils"; 

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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

            {/* Replace individual inputs with InputField */}
            <InputField
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.fullName}
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-white rounded-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {loading ? "Processing..." : "VERIFY YOUR MAIL"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
