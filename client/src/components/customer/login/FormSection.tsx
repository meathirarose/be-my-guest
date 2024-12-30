import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../../api/userAuthApi";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/user/userSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError(null); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await signInUser(formData.email, formData.password);

      if (response && response.status === 200) {
        const { user, token } = response.data;
        dispatch(login({ user, token })); 
        navigate("/user-home", { replace: true }); 
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Sign-in failed. Please try again."); 
      } else {
        setError("An unexpected error occurred."); 
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="relative mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              <i className="fas fa-eye"></i>
            </span>
          </div>

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
