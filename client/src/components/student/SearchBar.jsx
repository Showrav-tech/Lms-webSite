import React from 'react'
import { assets } from "../../assets/assets";
const SearchBar = () => {
  return (
  
     <form className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded overflow-hidden">

  <img
    src={assets.search_icon}
    alt="search"
    className="w-10 px-3"
  />

  <input
    type="text"
    placeholder="Search for courses"
    className="w-full h-full outline-none text-gray-500/80"
  />

  <button
    type="submit"
    className="h-full bg-blue-600 text-white px-6 md:px-10 
   rounded hover:bg-blue-700 transition"
  >
    Search
  </button>

</form>
   
  )
}

export default SearchBar;
