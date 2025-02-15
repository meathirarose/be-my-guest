import React, { useState } from "react";
import InputField from "../../../shared/components/ui/InputField";
import { Button, message, Spin } from "antd"; // Add Spin to imports
import { changePassword } from "../../../api/userAuthApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axios from "axios";

const PasswordTab: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const email = user.user?.email;
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  const handleChangePassword = async () => {
    try {
      if (!password || !confirmPassword) {
        message.error("Please fill out both fields.");
        return;
      }
  
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        return;
      }
  
      if(!email) {
        message.error("User email is not found");
        return;
      }

      setIsLoading(true); // Start loading
      await changePassword(password, confirmPassword, email);
      message.success("Password successfully changed!");
  
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || "An error occurred";
        message.error(errorMessage);
      } else {
        message.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
    }
  };

  return (
    <Spin spinning={isLoading} tip="Updating password...">
      <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-xl">
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
            disabled={isLoading}
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
            disabled={isLoading}
          />

          <div className="mt-6 flex space-x-4">
            <Button
              onClick={handleChangePassword}
              className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Save Changes'}
            </Button>
            <Button
              onClick={() => {
                setPassword("");
                setConfirmPassword("");
              }}
              className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-xl hover:bg-gray-500"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
      </div>
    </Spin>
  );
};

export default PasswordTab;