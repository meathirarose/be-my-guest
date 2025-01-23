import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField"; 
import { Button, message } from "antd";

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      message.error("Please fill out both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // Simulate password change success
    message.success("Password successfully changed!");
    
    // Reset the fields after the operation
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-md mx-auto p-6  shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>

      <InputField
        type="password"
        name="password"
        placeholder="Enter new password"
        value={password}
        error={passwordError}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError("");
        }}
      />
      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        value={confirmPassword}
        error={confirmPasswordError}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError(""); 
        }}
      />

      <div className="mt-6 flex space-x-4">
        <Button type="primary" onClick={handleChangePassword} className="w-32">
          Save
        </Button>
        <Button
          type="default"
          onClick={() => {
            setPassword("");
            setConfirmPassword("");
          }}
          className="w-32"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
