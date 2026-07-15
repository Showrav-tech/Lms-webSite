import React, { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { dummyStudentEnrolled, assets } from '../../assets/assets';

const StudentsEnrolled = () => {
  const { currency } = useContext(AppContext);
  
  // Use the dummy data from assets
  const students = dummyStudentEnrolled || [];

  // Format date function
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

  // Get student avatar with fallback
  const getAvatar = (student) => {
    if (student.student?.imageUrl) {
      return student.student.imageUrl;
    }
    const name = student.student?.name || 'Student';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4F46E5&color=fff`;
  };

  // If no students enrolled
  if (!students || students.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <img src={assets.my_course_icon} alt="No students" className="w-20 h-20 mx-auto opacity-50" />
          <h3 className="text-xl font-semibold text-gray-600 mt-4">No Students Enrolled</h3>
          <p className="text-gray-400 text-sm mt-2">Start promoting your courses to get students</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        {/* Header with total count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Students Enrolled</h2>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-700">{students.length}</span> students
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <div className="w-full overflow-x-auto">
            <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell w-12">#</th>
                  <th className="px-4 py-3 font-semibold min-w-[150px]">Student Name</th>
                  <th className="px-4 py-3 font-semibold min-w-[150px]">Course Title</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell min-w-[120px]">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {students.map((item, index) => (
                  <tr 
                    key={item.student?._id || index} 
                    className="border-b border-gray-500/20 hover:bg-gray-50 transition-colors"
                  >
                    {/* Serial Number */}
                    <td className="px-4 py-3 text-center hidden sm:table-cell text-gray-400">
                      {index + 1}
                    </td>
                    
                    {/* Student Name with Avatar */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={getAvatar(item)} 
                          alt={item.student?.name || 'Student'}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.student?.name || 'Student')}&background=4F46E5&color=fff`;
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-800 truncate">
                            {item.student?.name || 'Unknown Student'}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    {/* Course Title */}
                    <td className="px-4 py-3">
                      <span className="truncate block max-w-[150px]">
                        {item.courseTitle || 'Untitled Course'}
                      </span>
                    </td>
                    
                    {/* Date */}
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-500">
                      {formatDate(item.purchaseDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards - Simplified */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-2xl font-semibold text-gray-800">{students.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="text-2xl font-semibold text-gray-800">
              {new Set(students.map(s => s.courseTitle)).size}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StudentsEnrolled;