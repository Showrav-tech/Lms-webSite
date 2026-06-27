import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36pt-20 px-7 md:px-0
    space-y-7 text-center bg_gradient-to-b from-cyan-100/70'>

  <h1 className='md:text-home-heading-larger text-home-heading-small
  relative font-bold text-gray-800 max-w-3xl mx-auto'>Empower Your Future with Courses Tailored to <span className='
  text-blue-600'> Your Goals.
 </span><img src={assets.sketch} alt="sketch" className='md:block hidden absolute -button-7 right-0'/>
  </h1>
   <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
    Learn from expert instructors, work on real-world projects, and gain the skills
     you need to achieve your academic and career aspirations.
   </p>
   <p>Learn from experts, build real skills, and achieve your career goals.</p>
    </div>
  )
}

export default Hero
