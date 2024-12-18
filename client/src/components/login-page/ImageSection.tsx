import React from "react";
import loginImage from "../../assets/images/login-img.png";
import loginCircle from "../../assets/images/login-circle-bg.png";

const LoginImageSection: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center relative px-8 py-12 bg-purple-600 rounded-2xl mb-2 mr-2 h-[100%] w-[40%]">

      <img
        src={loginCircle}
        alt="Background Circle"
        className="absolute bottom-0 left-0 w-80 h-93 object-contain opacity-60 z-10 rounded-tl-2xl rounded-bl-3xl"
      />

      <div className="relative z-10 bg-purple-400 bg-opacity-20 border-2 border-purple-300 rounded-2xl p-10 w-[80%] h-[100%] max-w-2xl text-white shadow-2xl">
        <p className="text-4xl mt-5 ml-6 font-bold leading-snug">
          Start your journey by <br /> 
          one click, explore <br /> 
          beautiful Kerala <br /> 
          countryside!
        </p>
      </div>

      <img
        src={loginImage}
        alt="Traveler"
        className="absolute bottom-12 right-14 w-80 h-auto object-contain z-20"
      />
    </div>
  );
};

export default LoginImageSection;
