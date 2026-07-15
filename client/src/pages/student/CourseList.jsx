import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../../context/appContext";
import { assets } from "../../assets/assets";

import SearchBar from "../../components/student/SearchBar";
import CourseCard from "../../components/student/CourseCard";
import Footer from "../../components/student/Footer";

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();

  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses.length > 0) {
      const tempCourses = [...allCourses];

      if (input && input.trim().length > 0) {
        const filtered = tempCourses.filter((course) =>
          course.courseTitle
            .toLowerCase()
            .includes(input.toLowerCase().trim())
        );
        setFilteredCourse(filtered);
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

  // Clear search
  const clearSearch = () => {
    navigate("/course-list");
  };

  return (
    <div className="relative md:px-36 px-8 pt-20 text-left min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">
            Course List
          </h1>

          <p className="mt-2 text-gray-500">
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Home
            </span>{" "}
            / Course List
          </p>
        </div>

        <SearchBar data={input} allCourses={allCourses} />
      </div>

      {/* Search Input Display */}
      {input && input.trim().length > 0 && (
        <div className="mt-8">
          <div className="inline-flex items-center gap-3 border rounded px-4 py-2 text-gray-600 bg-gray-50">
            <span className="text-sm text-gray-400">Search:</span>
            <p className="font-medium">{input}</p>

            <img
              src={assets.cross_icon}
              alt="Remove"
              className="cursor-pointer w-4 h-4 hover:opacity-70 transition-opacity"
              onClick={clearSearch}
            />
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="my-16">
        {filteredCourse.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing {filteredCourse.length} course{filteredCourse.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCourse.map((course, index) => (
                <CourseCard key={course._id || index} course={course} />
              ))}
            </div>
          </>
        ) : (
          /* Not Found State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <img 
                src={assets.search_icon} 
                alt="Not found" 
                className="w-24 h-24 mx-auto opacity-30 mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Courses Found
              </h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any courses matching "<span className="font-medium text-gray-700">{input}</span>"
              </p>
              
              <p className="text-gray-400 text-sm">
                Try searching with different keywords
              </p>

              <button
                onClick={clearSearch}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseList;