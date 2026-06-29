
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || "");

  const onSearchhandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchhandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
    >
      <img src={assets.search_icon} alt="search" className="w-10 px-3" />

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-500/80"
      />

      <button
        type="submit"
        className="h-full bg-blue-600 text-white px-8 md:px-10 hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;