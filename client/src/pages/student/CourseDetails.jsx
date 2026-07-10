import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import { AppContext } from '../../context/appContext';
import Loading from '../../components/student/Loading';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    }
  }
});

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(AppContext) || {};

  const {
    allCourses = [],
    calculateRating = () => 0,
    calculateNoofLecture = () => 0,
    calculateCourseDuration = () => '',
    calculateChapterTime = () => '',
    currency = '$',
    user = null,
  } = context;


  const extractVideoId = (url) => {
    console.log('🔍 Extracting video ID from URL:', url);
    
    if (!url) {
      console.log('❌ URL is empty');
      return null;
    }

    const watchMatch = url.match(/[?&]v=([^&#]*)/);
    if (watchMatch && watchMatch[1]) {
      console.log('✅ Found video ID via watch?v=:', watchMatch[1]);
      return watchMatch[1];
    }

    const shortMatch = url.match(/youtu\.be\/([^?#]*)/);
    if (shortMatch && shortMatch[1]) {
      console.log('✅ Found video ID via youtu.be/:', shortMatch[1]);
      return shortMatch[1];
    }

    const embedMatch = url.match(/youtube\.com\/embed\/([^?#]*)/);
    if (embedMatch && embedMatch[1]) {
      console.log('✅ Found video ID via embed/:', embedMatch[1]);
      return embedMatch[1];
    }

    const shortsMatch = url.match(/youtube\.com\/shorts\/([^?#]*)/);
    if (shortsMatch && shortsMatch[1]) {
      console.log('✅ Found video ID via shorts/:', shortsMatch[1]);
      return shortsMatch[1];
    }

  
    const vMatch = url.match(/youtube\.com\/v\/([^?#]*)/);
    if (vMatch && vMatch[1]) {
      console.log('✅ Found video ID via v/:', vMatch[1]);
      return vMatch[1];
    }

    console.log('❌ Could not extract video ID from URL');
    return null;
  };

  const handlePreviewClick = useCallback((lectureUrl, lectureTitle) => {
    console.log('🎬 Preview button clicked for:', lectureTitle);
    console.log('📎 Lecture URL:', lectureUrl);
    
    if (!lectureUrl) {
      alert('No video URL available for this lecture');
      return;
    }
    const videoId = extractVideoId(lectureUrl);
    console.log('📹 Extracted Video ID:', videoId);

    if (videoId) {
      if (videoId.length === 11) {
        console.log('✅ Valid video ID, opening player');
        setPlayerData({ 
          videoId: videoId,
          title: lectureTitle 
        });
      } else {
        console.log('❌ Invalid video ID length:', videoId.length);
        alert(`Invalid video ID. Expected 11 characters, got ${videoId.length}`);
      }
    } else {
      alert('Could not extract YouTube video ID from the URL. Please check the URL format.');
    }
  }, []);

  const closePreview = useCallback(() => {
    console.log('🔴 Closing video preview');
    setPlayerData(null);
  }, []);

  const fetchCourseData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (allCourses.length > 0) {
        const findCourse = allCourses.find((course) => course._id === id);
        if (findCourse) {
          console.log('📚 Course found:', findCourse.courseTitle);

          findCourse.courseContent?.forEach((chapter, chapterIdx) => {
            chapter.chapterContent?.forEach((lecture, lectureIdx) => {
              if (lecture.isPreviewFree) {
                console.log(`🎥 Preview lecture found:`, {
                  chapter: chapterIdx,
                  lecture: lectureIdx,
                  title: lecture.lectureTitle,
                  url: lecture.lectureUrl
                });
              }
            });
          });
          setCourseData(findCourse);
        } else {
          console.error('Course not found with id:', id);
        }
      } else {
        console.log('No courses loaded yet');
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, allCourses]);

  useEffect(() => {
    if (user && courseData) {
      const enrolled = courseData.enrolledStudents?.some(
        (student) => student._id === user._id || student === user._id
      );
      setIsAlreadyEnrolled(!!enrolled);
    }
  }, [user, courseData]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const toggleSection = useCallback((index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  if (isLoading || !courseData) {
    return <Loading />;
  }

  const discountedPrice = courseData.coursePrice - 
    (courseData.discount * courseData.coursePrice) / 100;

  return (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-3 pt-20 text-left'>
        {/* Background gradient */}
        <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>

        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-course-details-heading-small font-semibold text-gray-800'>
            {courseData.courseTitle}
          </h1>
          
          <p
            className='pt-4 md:text-base text-sm'
            dangerouslySetInnerHTML={{ 
              __html: courseData.courseDescription?.slice(0, 200) || '' 
            }}
          />
          <div className='flex items-center space-x-2 mt-3 pb-1 flex-wrap gap-y-2'>
            <p>{calculateRating(courseData)}</p>
            <div className='flex'>
           {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className='w-3.5 h-3.5'
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
           alt={i < Math.floor(calculateRating(courseData)) ? 'Star filled' : 'Star empty'}
                />
    ))}
        </div>
            <p className='text-blue-600'>
              ({courseData.courseRating?.length || 0}{' '}
              {(courseData.courseRating?.length || 0) > 1 ? 'ratings' : 'rating'})
            </p>
            <p>
              {courseData.enrolledStudents?.length || 0}{' '}
              {(courseData.enrolledStudents?.length || 0) > 1 ? 'students' : 'student'}
      </p>
          </div>
          <p className='text-sm'>
            Course by <span className='text-blue-600'>GreatStack</span>
          </p>

      <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
           <div className='pt-5'>
              {courseData.courseContent?.map((chapter, index) => (
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
                              src={assets.play_icon}
                        alt='Play icon'
                              className='w-4 h-4 mt-1 flex-shrink-0'
                            />
                            <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                              <p className='flex-1'>{lecture.lectureTitle}</p>
                              <div className='flex gap-2 items-center flex-shrink-0 ml-2'>
                                {lecture.isPreviewFree && (
                         <button
                                    onClick={() => {
                                      console.log('👆 Preview button clicked directly');
                                handlePreviewClick(lecture.lectureUrl, lecture.lectureTitle);
                                    }}
                                    className='text-blue-500 hover:text-blue-700 transition-colors focus:outline-none focus:underline px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded'
                             aria-label={`Preview ${lecture.lectureTitle}`}
                                  >
                                    ▶ Preview
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

          {/* Course Description */}
          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <div
              className='pt-3 rich-text prose max-w-none'
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription || '' }}
            />
          </div>
        </div>

        {/* Right Column - Course Card */}
        <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] sticky top-20">
          {/* Video or Thumbnail */}
          {playerData ? (
            <div className="relative">
              <button
                onClick={closePreview}
                className="absolute top-2 right-2 z-20 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close video preview"
              >
                ✕
              </button>
              <div className="bg-black aspect-video flex items-center justify-center">
                <YouTube
                  videoId={playerData.videoId}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0,
                    },
                  }}
                  className="w-full"
                  iframeClassName="w-full aspect-video"
                  onError={(e) => {
                    console.error('❌ YouTube error:', e);
                    alert('Failed to load video. Please try again.');
                    setPlayerData(null);
                  }}
                  onReady={(e) => {
                    console.log('✅ YouTube player ready for video:', playerData.videoId);
                  }}
                />
              </div>
            </div>
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt={`${courseData.courseTitle} course thumbnail`}
              className="w-full"
              loading="lazy"
            />
          )}

          <div className="p-5">
            {/* Time left notice */}
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="Time left clock icon"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price
              </p>
            </div>

            {/* Pricing */}
            <div className="flex gap-3 items-center pt-2 flex-wrap">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {discountedPrice.toFixed(2)}
              </p>

              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice.toFixed(2)}
              </p>

              <p className="md:text-lg text-green-600 font-medium">
                {courseData.discount}% off
              </p>
            </div>

            {/* Course stats */}
            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500 flex-wrap">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="Star icon" className="w-4 h-4" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40 hidden sm:block"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="Clock icon" className="w-4 h-4" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40 hidden sm:block"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="Lesson icon" className="w-4 h-4" />
                <p>{calculateNoofLecture(courseData)} lessons</p>
              </div>
            </div>

            {/* Enroll Button */}
            <button
              onClick={() => {
                if (isAlreadyEnrolled) {
                  alert('You are already enrolled in this course!');
                  return;
                }
                console.log('Enrolling in course:', courseData._id);
              }}
              className={`md:mt-6 mt-4 w-full py-3 rounded font-medium transition-colors ${
                isAlreadyEnrolled
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
              disabled={isAlreadyEnrolled}
            >
              {isAlreadyEnrolled ? "✅ Already Enrolled" : "Enroll Now"}
            </button>

            {/* What's in the course */}
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course
              </p>

              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500 space-y-1">
                <li>Lifetime access with free updates</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and source code</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(CourseDetails);