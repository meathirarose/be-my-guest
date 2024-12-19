import React from "react";
import signupImage from "../../assets/images/signup-image.jpg";

const SignupImageSection: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center relative px-8 py-12 bg-purple-600 rounded-2xl mb-2 mr-2 h-[100%] w-full sm:w-[40%]">

      <img
        src={signupImage}
        alt="Traveler"
        className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-2xl object-cover z-18"
      />

      <div className="relative z-10 bg-purple-400 bg-opacity-20 border-2 border-purple-300 rounded-2xl p-10 w-full sm:w-[80%] h-full max-w-2xl text-white shadow-2xl flex items-center justify-center">
        <p className="text-3xl sm:text-5xl font-bold leading-snug text-center">
          Join us today and <br />
          explore the beauty <br />
          of Kerala’s <br />
          countryside!
        </p>
      </div>

    </div>
  );
};

export default SignupImageSection;
