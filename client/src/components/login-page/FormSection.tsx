import React from "react";
import { FcGoogle } from "react-icons/fc";

const LoginForm: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm px-6">


        {/* Username Field */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Password Field */}
        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
            <i className="fas fa-eye"></i>
          </span>
        </div>

        {/* Sign-in Button */}
        <button
          disabled
          className="w-full p-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
        >
          SIGNIN
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            SignUp
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button className="w-full p-3 flex items-center justify-center border rounded-lg hover:bg-gray-100">
          <FcGoogle className="text-2xl mr-2" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
