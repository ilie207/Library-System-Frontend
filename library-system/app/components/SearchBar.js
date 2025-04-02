"use client";

import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search books by title, author, or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <button type="submit" className="custom_button">
              <i className="fa fa-search"></i> Search
            </button>
            {searchTerm && (
              <button
                type="button"
                className="custom_button"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
