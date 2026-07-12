import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';

const Player = () => {
  const {enrolledCourses,calculateChapterTime}=useContext(AppContext)
  const {courseId}=useParams();
  const [courseData,setCourseData]=useState(null);
const [openSections,setOpenSections]=useState({});

const [playerData,setPlayerData]=useState(null);


  const getCourseData=()=>{
enrolledCourses.map((course)=>{
  if(course._id===courseId){
    setCourseData(course)
  }
})

  }
  const toggleSection = useCallback((index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

useEffect(()=>{
  getCourseData()
},[enrolledCourses])

  return (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 
    gap-10 md:px-36'>

      {/* Left colum */}

      <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>
     <div className='pt-5'>
               {courseData &&  courseData.courseContent?.map((chapter, index) => (
                        <div className='border border-gray-300 bg-white mb-2 rounded' key={index}>
                      <div
                   className='flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors'
                            onClick={() => toggleSection(index)}
                            role="button"
                            aria-expanded={openSections[index] || false}
                      tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleSection(index);
                              }
                            }}
                          >            <div className='flex items-center gap-2'>
                              <img
                                className={`transform transition-transform duration-200 ${
                         openSections[index] ? 'rotate-180' : ''
                                }`}
                     src={assets.down_arrow_icon}
                                alt={openSections[index] ? 'Collapse section' : 'Expand section'}
                              />
                              <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                            </div>
                            <p className='text-sm md:text-default'>
                              {chapter.chapterContent?.length || 0} Lectures - {calculateChapterTime(chapter)}
                            </p>
                          </div>
        
                          <div
                       className={`overflow-hidden transition-all duration-300 ${
                              openSections[index] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                              {chapter.chapterContent?.map((lecture, i) => {
                                console.log(`Lecture ${i}:`, {
                                  title: lecture.lectureTitle,
                           isPreviewFree: lecture.isPreviewFree,
                                  url: lecture.lectureUrl
                                });
                                return (
                                  <li key={i} className='flex items-start gap-2 py-1'>
                                    <img
                                      src={false ? assets.blue_tick_icon : assets.play_icon}
                                alt='Play icon'
                                      className='w-4 h-4 mt-1 flex-shrink-0'
                                    />
                                    <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                                      <p className='flex-1'>{lecture.lectureTitle}</p>
                                      <div className='flex gap-2 items-center flex-shrink-0 ml-2'>
                                        {lecture.lectureUrl && (
                                 <button
                                            onClick={() =>setPlayerData( {
                                           ...lecture,chapter: index +1,lecture:i+1
                                            })}
                                            className='text-blue-500 hover:text-blue-700 transition-colors focus:outline-none focus:underline px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded'
                                     aria-label={`Preview ${lecture.lectureTitle}`}
                                          >
                                            ▶ Watch
                                   </button>
                                        )}
                                        <p>
                                          {shortEnglishHumanizer(lecture.lectureDuration * 60 * 1000, {
                                            units: ['h', 'm'],
                                    round: true,
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
      </div>
          {/* Right colum */}

      <div>
        <img src={courseData ? courseData.courseThumbnail : ''} alt="" />
      </div>
    </div>
    </>
  )
}

export default Player
