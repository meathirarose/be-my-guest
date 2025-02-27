import { SlidersHorizontal } from "lucide-react";
import React from "react";

const FilterButton: React.FC = () => {
  return (
    <div>
      <button className="flex items-center gap-4 px-4 py-2 h-14 w-32 border rounded-xl shadow-sm bg-white hover:bg-gray-100">
        <SlidersHorizontal className="w-5 h-5" />
        <span className="font-medium">Filters</span>
      </button>
    </div>
  );
};

export default FilterButton;
