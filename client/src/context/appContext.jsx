import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || 'USD';
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]); // ✅ Initialize as empty array
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch all courses
  const fetchAllCourses = async () => {
    try {
      setLoading(true);
    
      setAllCourses(dummyCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchUserEnrolledCourses = async () => {
    try {
      setLoading(true);
   
      setEnrolledCourses(dummyCourses);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate rating for a course
  const calculateRating = (course) => {
    if (!course) return 0;
    
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }

    const totalRating = course.courseRatings.reduce(
      (sum, item) => sum + (item.rating || 0),
      0
    );

    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  // Calculate time for a chapter
  const calculateChapterTime = (chapter) => {
    if (!chapter || !chapter.chapterContent) return '0m';
    
    let time = 0;

    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration || 0;
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true
    });
  };

 
  const calculateCourseDuration = (course) => {
    if (!course || !course.courseContent) return '0m';
    
    let time = 0;

    course.courseContent.forEach((chapter) => {
      if (chapter && chapter.chapterContent) {
        chapter.chapterContent.forEach((lecture) => {
          time += lecture.lectureDuration || 0;
        });
      }
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true
    });
  };

  const calculateNoofLecture = (course) => {
    if (!course || !course.courseContent) return 0;
    
    let totalLectures = 0;

    course.courseContent.forEach((chapter) => {
      if (chapter && Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });

    return totalLectures;
  };

  // Enroll in a course
  const enrollInCourse = async (courseId) => {
    try {
      // Check if already enrolled
      if (enrolledCourses.some(course => course._id === courseId)) {
        console.log('Already enrolled in this course');
        return false;
      }

      const courseToEnroll = allCourses.find(course => course._id === courseId);
      if (courseToEnroll) {
        setEnrolledCourses(prev => [...prev, courseToEnroll]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return false;
    }
  };


  const isEnrolled = (courseId) => {
    return enrolledCourses.some(course => course._id === courseId);
  };

  // Fetch data on mount
  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses(); 
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
    enrolledCourses,
    fetchUserEnrolledCourses,
    enrollInCourse,
    isEnrolled, 
    loading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};