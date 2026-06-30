import { createContext, useEffect, useState } from 'react';
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

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
      (sum, r) => sum + r.rating,
      0
    );

    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};