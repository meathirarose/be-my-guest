import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-100">
      <div className="w-full max-w-sm px-6 py-8 bg-white rounded-lg shadow-lg">
        <form>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Login
          </h2>

          <input
            type="text"
            name="login"
            placeholder="Mobile Number or Email Address"
            className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full p-3 text-white rounded-lg bg-purple-500 hover:bg-purple-600"
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
  );
};

export default LoginForm;
