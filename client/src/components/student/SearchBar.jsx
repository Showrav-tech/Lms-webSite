import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const SearchBar = ({ data, allCourses }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update input when data prop changes (from URL params)
  useEffect(() => {
    setInput(data || "");
  }, [data]);

  // Generate suggestions based on input
  useEffect(() => {
    if (input && input.trim().length > 0) {
      const searchTerm = input.toLowerCase().trim();
      const matched = allCourses
        .filter(course => 
          course.courseTitle.toLowerCase().includes(searchTerm)
        )
        .map(course => course.courseTitle)
        .slice(0, 5);
      
      setSuggestions(matched);
      setShowSuggestions(matched.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, allCourses]);

  const onSearchHandler = (e) => {
    e.preventDefault();
    const searchTerm = input.trim();
    
    if (searchTerm) {
      navigate("/course-list/" + encodeURIComponent(searchTerm));
      setShowSuggestions(false);
    } else {
      navigate("/course-list");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    navigate("/course-list/" + encodeURIComponent(suggestion));
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    navigate("/course-list");
  };

  return (
    <div className="relative max-w-xl w-full">
      <form
        onSubmit={onSearchHandler}
        className="md:h-14 h-12 flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
      >
        <img src={assets.search_icon} alt="search" className="w-10 px-3" />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for courses"
          className="w-full h-full outline-none text-gray-500/80"
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Delay hiding to allow click on suggestion
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />

        {input && (
          <button
            type="button"
            onClick={clearSearch}
            className="h-full px-2 text-gray-400 hover:text-gray-600 transition"
          >
            <img src={assets.cross_icon} alt="Clear" className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="h-full bg-blue-600 text-white px-8 md:px-10 hover:bg-blue-700 transition whitespace-nowrap"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-50" />
              <span className="text-gray-700">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;