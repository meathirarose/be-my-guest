import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search properties"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
    />
  );
};

export default SearchBar;
