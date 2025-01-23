import React from "react";

interface FooterProps {
  onBack: () => void;
  onNext: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBack, onNext }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full px-6 py-4 bg-white shadow-lg flex justify-end gap-4">
      <button
        onClick={onBack}
        className="px-6 py-3 bg-purple-600 text-white font-medium text-sm rounded-lg shadow hover:bg-purple-700 transition"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="px-6 py-3 bg-purple-600 text-white font-medium text-sm rounded-lg shadow hover:bg-purple-700 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Footer;
