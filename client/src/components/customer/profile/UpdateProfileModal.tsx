import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  userInfo: { name: string; email: string; country: string };
  onUpdateProfile: (name: string, email: string, country: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, userInfo, onUpdateProfile }) => {
  const [name, setName] = useState(userInfo.name);
  const [country, setCountry] = useState(userInfo.country);

  useEffect(() => {
    setName(userInfo.name);
    setCountry(userInfo.country);
  }, [userInfo]);

  const handleSubmit = () => {
    onUpdateProfile(name, userInfo.email, country);
    closeModal(); // Close modal after submission
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-md shadow-lg w-1/3">
          <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>

          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
