import React, { useContext } from "react"; 
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContext } from "../../context/appContext";

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-24 md:py-28 md:px-40 px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-5 max-w-2xl mx-auto leading-7">
        Explore our most popular courses across technology, design, business, and more.<br/>
        Learn in-demand skills from industry experts and accelerate your career.
      </p>
      <div className="grid grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
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