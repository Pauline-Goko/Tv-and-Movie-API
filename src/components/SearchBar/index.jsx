import React from "react";
import { useState } from "react";
import "./style.css";

const SearchBar = ({onSearch}) => {
  const [searchValue, setSearchValue] = useState("");
  const handleInput = (event) => {
    setSearchValue(event.target.value);
    console.log("I am typing", event.target.value);
  };
  const handleSearchClick = () => {
    console.log("I am searching", searchValue);
    onSearch(searchValue)
  };
  return (
    <div className="nav">
        <p className="movie">Movie</p>
      <input className="input"
        type="text"
        placeholder="search"
        value={searchValue}
        onChange={handleInput} 
      />
      <button onClick={handleSearchClick} className="btnSearch">Search</button>
     
    </div>
  );
};
export default SearchBar;

