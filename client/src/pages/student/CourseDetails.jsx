import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets';

const CourseDetails = () => {
    const {id}=useParams();
    const[courseData,setCourseData]=useState(null);
    const {allCourses,calculateRating  , calculateNoofLecture,calculateCourseDuration,
     ulateChapterTime}=useContext(AppContext);

    const fetchCourseData=async()=>{
      const findCourse = allCourses.find(course=>course._id===id)
      setCourseData(findCourse)
    }
    useEffect(()=>{
      fetchCourseData()
    },[])
  return  courseData ?(
<>
    <div className='flex md:flex-row flex-col-reserve gap-10 relative items-start
    justify-between md:px-36 px-8 md:pt-3 pt-20 text-left'>
     <div className='absolute top-0 left-0 w-full h-section-height 
     -z-1 b-gradient-to-b from-cyan-100/70'></div>
     
     <div className='max-w-xl z-10 text-gray-500'>
      <h1 className='md:text-course-details-heading-small
       font-semibold text-gray-800'>
      {courseData.courseTitle}</h1>
      <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0,200)}}></p>

          <div className='flex items-center space-x-2 mpt-3 pb-1'>
                <p>{calculateRating(courseData)}</p>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      className='w-3.5 h-3.5'
                      src={i < Math.floor(calculateRating(coursedata)) ? assets.star : assets.star_blank}
                      alt=''
                    />
                  ))}
                </div>
                <p className='text-blue-600'>({courseData.courseRating.length}{courseData.courseRating.length >1 ? 'ratings':'rating'})</p>
            <p>{courseData.enrolledStudents.lemgth}{courseData.courseRating.length}{courseData.courseRating.length >1 ? 'students':'student'}
             </p>
      </div> 
<p className='text-sm'>Course by <span className='text-shadow-blue-600'>GreateStack</span></p>
<div/>
<div>

</div>

    </div>
    </>
  ): <Loading/>
}

export default CourseDetails
