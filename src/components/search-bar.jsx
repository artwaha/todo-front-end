import React from "react";

const SearchBar = ({ searchQuery, updateSearchQuery }) => {
  return (
    <input
      type="search"
      value={searchQuery}
      onChange={(e) => updateSearchQuery(e.target.value)}
      className="block outline-none mx-auto py-2 mb-2 italic px-4 border border-gray-400 rounded-full text-sm"
      placeholder="type to search..."
    />
  );
};

export default SearchBar;
