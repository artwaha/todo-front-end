import React from "react";

const SearchBar = ({ tasks, updateTasks }) => {
  const handleSearch = (e) => {
    let searchQuery = e.target.value.toLowerCase();

    let filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery)
    );

    updateTasks(filteredTasks);
  };

  return (
    <input
      type="search"
      onChange={handleSearch}
      className="block outline-none mx-auto py-2 mb-2 italic px-4 border border-gray-400 rounded-full text-sm"
      placeholder="type to search..."
    />
  );
};

export default SearchBar;
