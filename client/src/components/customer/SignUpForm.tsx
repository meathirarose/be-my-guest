import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../api/userAuthApi";
import InputField from "../../shared/components/ui/InputField"; 
import { showToast } from "../../shared/utils/toastUtils"; 
import { SubmitButton } from "../buttons/SubmitButton";
import { LinkText } from "../../shared/components/ui/LinkText";
import { validateConfirmPassword, validateCountry, validateEmail, validateName, validatePassword } from "../../shared/utils/formValidationUtils";

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
    //name validation
    const nameError = validateName(formData.name);
    if(nameError) {
      newErrors.name = nameError;
      isValid = false;
    }
    //email validation
    const emailError = validateEmail(formData.email);
    if(emailError) {
      newErrors.email = emailError;
      isValid = false;
    }
    //country validation
    const countryError = validateCountry(formData.country);
    if(countryError) {
      newErrors.country = countryError;
      isValid = false;
    }
    //password validation
    const passwordError = validatePassword(formData.password);
    if(passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }
    //confirmPassword validation
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if(confirmPasswordError) {
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
