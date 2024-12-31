import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginHost } from "../../redux/user/userSlice"; 
import { SignInPropertyOwner } from "../../api/userAuthApi";
import { toast } from "react-toastify"; 
import Header from '../../shared/components/Header';
import Footer from '../../shared/components/Footer';
import bg_signin from "../../assets/property-owner-images/bg-signin.jpg";

const LoginForm: React.FC = () => {
  const [loginInput, setLoginInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    try {
      const response = await SignInPropertyOwner(
        loginInput.includes("@") ? loginInput : undefined, 
        loginInput.includes("@") ? undefined : Number(loginInput) 
      );

      const { user, token } = response.data; 
      dispatch(loginHost({ user, token }));
      navigate("/host-home");

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#a855f7", 
          color: "#fff", 
          borderRadius: "8px", 
          padding: "10px 20px",
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Sign-in failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }

      toast.error(error || "An error occurred during sign-in!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#a855f7", 
          color: "#fff", 
          borderRadius: "8px", 
          padding: "10px 20px",
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Component */}
      <Header />

      <div
        className="relative flex-grow flex items-center justify-center bg-cover bg-center pt-52 pb-24 pl-1"
        style={{ backgroundImage: `url(${bg_signin})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative w-full max-w-sm px-6 py-8 bg-white rounded-lg shadow-lg z-10">
          <form onSubmit={handleLogin}>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Login
            </h2>

            <input
              type="text"
              name="login"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="Mobile Number or Email Address"
              className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default LoginForm;
