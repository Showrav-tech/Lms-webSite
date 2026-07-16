import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating';
import Footer from '../../components/student/Footer';

// Configure humanize duration for short format
const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      h: () => 'h',
      m: () => 'm',
    }
  }
});

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get course data
  const getCourseData = useCallback(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      const course = enrolledCourses.find(course => course._id === courseId);
      if (course) {
        setCourseData(course);
        // Auto-expand first section
        setOpenSections({ 0: true });
      }
    }
    setLoading(false);
  }, [enrolledCourses, courseId]);

  // Toggle section
  const toggleSection = useCallback((index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  // Extract YouTube video ID
  const extractVideoId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /[?&]v=([^&#]*)/,
      /youtu\.be\/([^?#]*)/,
      /youtube\.com\/embed\/([^?#]*)/,
      /youtube\.com\/v\/([^?#]*)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // If URL is already a video ID (11 characters)
    if (url.length === 11) {
      return url;
    }
    
    return null;
  };

  // Handle watch button click
  const handleWatchClick = (lecture, chapterIndex, lectureIndex) => {
    const videoId = extractVideoId(lecture.lectureUrl);
    if (videoId) {
      setPlayerData({
        ...lecture,
        videoId: videoId,
        chapter: chapterIndex + 1,
        lecture: lectureIndex + 1
      });
    } else {
      alert('Invalid video URL. Please check the lecture URL.');
    }
  };

  // Handle mark complete
  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
  };

  useEffect(() => {
    getCourseData();
  }, [getCourseData]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading course...</div>
      </div>
    );
  }

  // If no course data
  if (!courseData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Course Not Found</h2>
          <p className="text-gray-500">You are not enrolled in this course or it doesn't exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/* Left Column - Course Structure */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          
          <div className='pt-5'>
            {courseData.courseContent?.map((chapter, chapterIndex) => (
              <div className='border border-gray-300 bg-white mb-2 rounded' key={chapterIndex}>
                <div
                  className='flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors'
                  onClick={() => toggleSection(chapterIndex)}
                  role="button"
                  aria-expanded={openSections[chapterIndex] || false}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection(chapterIndex);
                    }
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <img
                      className={`transform transition-transform duration-200 ${
                        openSections[chapterIndex] ? 'rotate-180' : ''
                      }`}
                      src={assets.down_arrow_icon}
                      alt={openSections[chapterIndex] ? 'Collapse section' : 'Expand section'}
                    />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-default'>
                    {chapter.chapterContent?.length || 0} Lectures - {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[chapterIndex] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className='md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent?.map((lecture, lectureIndex) => {
                      const isWatching = playerData?.lectureId === lecture.lectureId;
                      return (
                        <li key={lectureIndex} className='flex items-start gap-2 py-1'>
                          <img
                            src={isWatching ? assets.blue_tick_icon : assets.play_icon}
                            alt='Play icon'
                            className='w-4 h-4 mt-1 flex-shrink-0'
                          />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                            <p className='flex-1'>{lecture.lectureTitle}</p>
                            <div className='flex gap-2 items-center flex-shrink-0 ml-2'>
                              {lecture.lectureUrl && (
                                <button
                                  onClick={() => handleWatchClick(lecture, chapterIndex, lectureIndex)}
                                  className={`text-blue-500 hover:text-blue-700 transition-colors focus:outline-none px-2 py-1 rounded ${
                                    isWatching ? 'bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'
                                  }`}
                                  aria-label={`Watch ${lecture.lectureTitle}`}
                                >
                                  {isWatching ? '▶ Playing' : '▶ Watch'}
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

          {/* Rating Section */}
          <div className='flex items-center gap-2 py-3'>
            <h1 className='text-xl font-bold'>Rate this Course :</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* Right Column - Video Player */}
        <div className='md:mt-10'>
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.videoId}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
                className="w-full aspect-video"
                iframeClassName="w-full aspect-video"
                onError={(e) => {
                  console.error('YouTube error:', e);
                  alert('Failed to load video. Please try again.');
                }}
              />
              <div className='flex justify-between items-center mt-4'>
                <p className='text-sm font-medium text-gray-700'>
                  Chapter {playerData.chapter}.{playerData.lecture} - {playerData.lectureTitle}
                </p>
                <button 
                  onClick={handleMarkComplete}
                  className={`px-4 py-2 rounded transition-colors ${
                    isCompleted 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isCompleted ? '✅ Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={courseData.courseThumbnail || 'https://via.placeholder.com/640x360/4F46E5/FFFFFF?text=Select+a+Lecture'} 
                alt={courseData.courseTitle || 'Course thumbnail'}
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <div className="text-center text-white p-4">
                  <p className="text-xl font-medium">📺 Select a Lecture</p>
                  <p className="text-sm opacity-90 mt-1">Click "Watch" on any lecture to start learning</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;