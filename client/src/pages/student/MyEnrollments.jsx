import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';

const MyEnrollments = () => {
  const navigate = useNavigate();
  const { enrolledCourses, calculateCourseDuration, loading } = useContext(AppContext);
  
  // State for progress tracking (this should come from backend)
  const [progressArray, setProgressArray] = useState([]);

  // Calculate progress for each course
  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      // In production, fetch progress from backend
      // For now, generate mock progress
      const progress = enrolledCourses.map((course) => {
        const totalLectures = calculateTotalLectures(course);
        const completed = Math.floor(Math.random() * (totalLectures + 1));
        return {
          lectureCompleted: completed,
          totalLectures: totalLectures
        };
      });
      setProgressArray(progress);
    }
  }, [enrolledCourses]);

  // Helper to calculate total lectures
  const calculateTotalLectures = (course) => {
    if (!course || !course.courseContent) return 0;
    let total = 0;
    course.courseContent.forEach(chapter => {
      if (chapter && chapter.chapterContent) {
        total += chapter.chapterContent.length;
      }
    });
    return total;
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Loading your enrollments...</div>
      </div>
    );
  }

  // Handle empty state
  if (!enrolledCourses || enrolledCourses.length === 0) {
    return (
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">You haven't enrolled in any courses yet.</p>
          <button 
            onClick={() => navigate('/courses')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='md:px-36 px-8 pt-10'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <div className="overflow-x-auto mt-10">
        <table className='min-w-full border'>
          <thead className='text-gray-900 border-gray-500/20 text-sm text-left bg-gray-50'>
            <tr>
              <th className='px-4 py-3 font-semibold'>Course</th>
              <th className='px-4 py-3 font-semibold max-sm:hidden'>Duration</th>
              <th className='px-4 py-3 font-semibold max-sm:hidden'>Progress</th>
              <th className='px-4 py-3 font-semibold'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {enrolledCourses.map((course, index) => (
              <tr key={course._id || index} className='border-b border-gray-500/20 hover:bg-gray-50/50 transition-colors'>
                <td className='md:px-4 pl-2 md:pl-4 py-3'>
                  <div className='flex items-center space-x-3'>
                    <img 
                      className='w-14 sm:w-24 md:w-28 object-cover rounded' 
                      src={course.courseThumbnail || '/placeholder-course.jpg'} 
                      alt={course.courseTitle || 'Course'} 
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='mb-1 max-sm:text-sm font-medium text-gray-800 truncate'>
                        {course.courseTitle || 'Untitled Course'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  {calculateCourseDuration ? calculateCourseDuration(course) : 'N/A'}
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  {progressArray[index] ? 
                    `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures} Lectures` : 
                    '0/0 Lectures'}
                </td>
                <td className='px-4 py-3'>
                  <button 
                    className='px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
                    onClick={() => {
                      if (course._id) {
                        navigate(`/player/${course._id}`);
                      } else {
                        console.error('Course ID is missing');
                      }
                    }}
                  >
                    {progressArray[index] && progressArray[index].totalLectures > 0 && 
                     progressArray[index].lectureCompleted === progressArray[index].totalLectures 
                      ? '✅ Completed' 
                      : '▶ Continue'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollments;