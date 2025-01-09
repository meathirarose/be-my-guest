import React, { ReactNode } from "react";

interface ImageSectionProps {
  backgroundImage: string;
  foregroundImage?: string;
  text: string | ReactNode;
  isFullWidth?: boolean;
  textAlignment?: "left" | "center" | "right";
  textPosition?: string;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  backgroundImage,
  foregroundImage,
  text,
  isFullWidth = false,
  textAlignment = "left",
  textPosition = "",
}) => {
  return (
    <div
      className={`flex-1 flex items-center justify-center relative px-8 py-12 bg-purple-600 rounded-2xl mb-2 mr-2 h-[100%] ${
        isFullWidth ? "w-full sm:w-[40%]" : "w-[40%]"
      }`}
    >
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute bottom-0 top-0 opacity-20 w-full h-full rounded-2xl object-cover z-10"
      />

      {/* Content Box */}
      <div className="relative z-20 bg-purple-400 bg-opacity-20 border-2 border-purple-300 rounded-2xl p-10 w-full sm:w-[80%] h-full max-w-2xl text-white shadow-2xl flex items-center justify-start">
      <p
          className={`text-3xl sm:text-5xl font-bold leading-snug ${
            textAlignment === "center"
              ? "text-center"
              : textAlignment === "right"
              ? "text-right"
              : "text-left"
          } ${textPosition}`}
        >
          {text}
        </p>
      </div>

      {/* Foreground Image */}
      <img
        src={foregroundImage}
        className="absolute bottom-12 right-14 w-80 h-auto object-contain z-30"
      />
    </div>
  );
};

export default ImageSection;
