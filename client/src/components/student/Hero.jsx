import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
<div className="w-full bg-gradient-to-b from-cyan-100/70 to-white flex flex-col items-center justify-center px-6 pt-16 md:pt-20 pb-10 text-center">
      <h1 className="relative max-w-4xl text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
        Empower Your Future with Courses Tailored to{" "}
        <span className="text-blue-600">Your Goals.</span>

        <img
          src={assets.sketch}
          alt=""
          className="hidden md:block absolute -bottom-5 right-8"
        />
      </h1>

      <p className="hidden md:block mt-7 max-w-2xl text-lg text-gray-500">
        Learn from expert instructors, work on real-world projects, and gain
        the skills you need to achieve your academic and career aspirations.
      </p>

      <p className="md:hidden mt-6 max-w-sm text-gray-500">
        Learn from experts, build real skills, and achieve your career goals.
      </p>

      <div className="mt-10 w-full flex justify-center">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;