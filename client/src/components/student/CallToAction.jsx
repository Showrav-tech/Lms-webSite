import React from "react";

const CallToAction = () => {
  return (
    <section
     className="py-16 px-6 bg-white">
   <div
    className="max-w-4xl mx-auto text-center">
        <h1
         className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
      Learn anything, anytime, anywhere
        </h1>

     <p className=
     "mt-6 max-w-3xl mx-auto text-lg text-gray-500 leading-8">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to help
          you achieve your goals.
        </p>

        <div 
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
         <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300">
       Get Started
         </button>
          <button className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition">
       Learn More
         <span className="text-xl">→</span>
      </button>
      </div>
      </div> 
    </section>
  );
};

export default CallToAction;