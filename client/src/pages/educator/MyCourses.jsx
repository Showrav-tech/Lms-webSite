import React, { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { assets } from '../../assets/assets';

const MyCourses = () => {
  const { currency, allCourses, calculateCourseDuration, calculateNoofLecture } = useContext(AppContext);
  
  // Filter only published courses
  const courses = allCourses.filter(course => course.isPublished !== false);

  // Calculate total earnings
  const totalEarnings = courses.reduce((total, course) => {
    const earning = course.coursePrice * (1 - (course.discount || 0) / 100);
    return total + earning;
  }, 0);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  // Get thumbnail with fallback
  const getThumbnail = (course) => {
    if (course.courseThumbnail) {
      return course.courseThumbnail;
    }
    // Use a default placeholder - you can replace with any image
    return 'https://via.placeholder.com/48x32/4F46E5/FFFFFF?text=Course';
  };

  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5 w-full'>
        {/* Total Earnings Summary */}
        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 shadow-card border border-green-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt="earning_icon" className="w-10 h-10" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {currency} {totalEarnings.toFixed(2)}
              </p>
              <p className='text-base text-gray-500'>
                Total Earnings
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.my_course_icon} alt="courses_icon" className="w-10 h-10" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {courses.length}
              </p>
              <p className='text-base text-gray-500'>
                Total Courses
              </p>
            </div>
          </div>
        </div>

        {/* My Courses Section */}
        <div className='w-full'>
          <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
          <div className='flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
            <div className='w-full overflow-x-auto'>
              <table className='w-full overflow-hidden'>
                <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                  <tr>
                    <th className='px-4 py-3 font-semibold truncate'>Course Title</th>
                    <th className='px-4 py-3 font-semibold truncate'>Price</th>
                    <th className='px-4 py-3 font-semibold truncate'>Discount</th>
                    <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                    <th className='px-4 py-3 font-semibold truncate'>Students</th>
                    <th className='px-4 py-3 font-semibold truncate hidden md:table-cell'>Duration</th>
                    <th className='px-4 py-3 font-semibold truncate hidden lg:table-cell'>Lectures</th>
                    <th className='px-4 py-3 font-semibold truncate'>Published On</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-gray-500'>
                  {courses?.map((course, index) => {
                    const earning = course.coursePrice * (1 - (course.discount || 0) / 100);
                    const duration = calculateCourseDuration ? calculateCourseDuration(course) : 'N/A';
                    const lectures = calculateNoofLecture ? calculateNoofLecture(course) : 0;
                    
                    return (
                      <tr key={course._id || index} className='border-b border-gray-500/20 hover:bg-gray-50 transition-colors'>
                        <td className='px-4 py-3 truncate'>
                          <div className='flex items-center space-x-3'>
                            <img 
                              src={getThumbnail(course)} 
                              alt={course.courseTitle || 'Course'}
                              className='w-12 h-8 rounded object-cover'
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x32/4F46E5/FFFFFF?text=Course';
                              }}
                            />
                            <span className='truncate'>{course.courseTitle || 'Untitled Course'}</span>
                          </div>
                        </td>
                        <td className='px-4 py-3 truncate'>
                          {currency} {course.coursePrice?.toFixed(2) || '0.00'}
                        </td>
                        <td className='px-4 py-3 truncate'>
                          {course.discount || 0}%
                        </td>
                        <td className='px-4 py-3 truncate font-medium text-green-600'>
                          {currency} {earning.toFixed(2)}
                        </td>
                        <td className='px-4 py-3 truncate'>
                          {course.enrolledStudents?.length || 0}
                        </td>
                        <td className='px-4 py-3 truncate hidden md:table-cell'>
                          {duration}
                        </td>
                        <td className='px-4 py-3 truncate hidden lg:table-cell'>
                          {lectures}
                        </td>
                        <td className='px-4 py-3 truncate'>
                          {formatDate(course.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Empty State */}
            {courses.length === 0 && (
              <div className='flex flex-col items-center justify-center py-12'>
                <img src={assets.my_course_icon} alt="No courses" className='w-16 h-16 opacity-50' />
                <p className='text-gray-500 mt-4'>No courses created yet</p>
                <p className='text-gray-400 text-sm'>Start by creating your first course</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;