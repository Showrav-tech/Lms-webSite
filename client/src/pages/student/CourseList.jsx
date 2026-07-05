import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../../context/appContext";
import { assets } from "../../assets/assets";

import SearchBar from "../../components/student/SearchBar";
import CourseCard from "../../components/student/CourseCard";

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);

  const { input } = useParams();

  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses.length > 0) {
      const tempCourses = [...allCourses];

      if (input) {
        setFilteredCourse(
          tempCourses.filter((course) =>
            course.courseTitle
              .toLowerCase()
              .includes(input.toLowerCase())
          )
        );
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

  return (
    <div className="relative md:px-36 px-8 pt-20 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">
            Course List
          </h1>

          <p className="mt-2 text-gray-500">
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 cursor-pointer"
            >
              Home
            </span>{" "}
            / Course List
          </p>
        </div>

        <SearchBar data={input} />
      </div>

      {/* Search Tag */}
      {input && (
        <div className="inline-flex items-center gap-3 border rounded px-4 py-2 mt-8 text-gray-600">
          <p>{input}</p>

          <img
            src={assets.cross_icon}
            alt="Remove"
            className="cursor-pointer"
            onClick={() => navigate("/course-list")}
          />
        </div>
      )}

      {/* Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-16">
        {filteredCourse.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;