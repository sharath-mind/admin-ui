import React from "react";
import { SearchIcon } from "../../Assets/icons";
import { DEBOUNCE_DELAY } from "../../constants";
import { debounce2 } from "../../util";
import "./search-bar.css";

const SearchBar = ({ handleSearch, searchKey }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="text-input">
        <input
          type="text"
          placeholder="search by name, email or role"
          onChange={debounce2(handleChange, DEBOUNCE_DELAY)}
        />
        <div
          className="search-btn"
          onClick={() => handleSearch(searchKey)}
          title="Search"
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
