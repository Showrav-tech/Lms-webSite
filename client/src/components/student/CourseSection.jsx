import React from "react";
import { Link } from "react-router-dom";

const CourseSection = () => {
  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>

      <p className="text-sm md:text-base text-gray-500 mt-3">
  Explore our most popular courses across technology, design, business, and more.
   Learn in-demand skills from industry experts and accelerate your career.
      </p>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="inline-block mt-8 text-gray-500 border border-gray-500/30 px-10 py-3 rounded hover:bg-gray-100 transition"
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CourseSection;