import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../api/userAuthApi";
import InputField from "../../shared/components/ui/InputField"; 
import { showToast } from "../../shared/utils/toastUtils"; 
import { SubmitButton } from "../buttons/SubmitButton";
import { LinkText } from "../../shared/components/ui/LinkText";
import { signUpValidationSchema } from "../../validations/user/signup";

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
    const { error } = signUpValidationSchema.validate(formData, { abortEarly: false });

    if (!error) {
      setErrors({
        name: "",
        email: "",
        country: "",
        password: "",
        confirmPassword: "",
      });
      return true;
    }

    const newErrors: { name: string; email: string; country: string; password: string; confirmPassword: string } = {
      name: "",
      email: "",
      country: "",
      password: "",
      confirmPassword: "",
    };

    error.details.forEach((detail) => {
      newErrors[detail.path[0] as keyof typeof formData] = detail.message;
    });

    setErrors(newErrors);
    return false;
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
        formData.confirmPassword,
        "customer"
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

          <SubmitButton isLoading={loading} text="VERIFY YOUR EMAIL" />

      </form>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
          <LinkText to="/customer/login" text="Sign Up" ariaLabel="Sign Up" />
      </p>
    </div>
  );
};

export default SignupForm;
