import React from "react";
import Hero from "../../components/student/Hero";
import Companies from "../../components/student/Companies";
import CourseSection from "../../components/student/CourseSection";
import TestmonialSection from "../../components/student/TestmonialSection";
import CallToAction from "../../components/student/CallToAction";

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
   <Hero />

<Companies />

<CourseSection />
<TestmonialSection/>
<CallToAction/>
    </div>
  );
};

export default Home;