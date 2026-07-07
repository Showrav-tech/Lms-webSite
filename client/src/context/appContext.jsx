import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  const navigate = useNavigate();

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }

    const totalRating = course.courseRatings.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  const calculateChapterTime = (chapter) => {
    let time = 0;

    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  const calculateNoofLecture = (course) => {
    let totalLectures = 0;

    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });

    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLecture,
    isEducator,
    setIsEducator,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};