import React from "react";

interface AddPropertyProps {
  onAdd: () => void;
}

const AddPropertyButton: React.FC<AddPropertyProps> = ({ onAdd }) => {
  return (
    <div>
          <button
      onClick={onAdd}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      + Add Property
    </button>
    </div>

  );
};

export default AddPropertyButton;
