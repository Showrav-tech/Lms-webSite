import React, { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  const rating = calculateRating(course);
  const reviewCount = course.courseRatings?.length || 0;
  const discountedPrice = (
    course.coursePrice - (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'
    >
      <img className='w-full' src={course.courseThumbnail} alt={course.courseTitle} />

      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator.name}</p>

        <div className='flex items-center space-x-2'>
          <p>{rating}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                className='w-3.5 h-3.5'
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                alt=''
              />
            ))}
          </div>
          <p className='text-gray-500'>({reviewCount})</p>
        </div>

        <p className='text-base font-semibold text-gray-800'>
          {currency}
          {discountedPrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;