import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Testimonials
        </h2>

        <p className="mt-4 max-w-3xl mx-auto text-gray-500 text-base leading-8">
          Hear from our learners as they share their journeys of
          transformation, success, and how our platform has made a
          difference in their lives.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Top */}
            <div className="flex items-center gap-4 bg-gray-100 px-6 py-5">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {testimonial.name}
                </h3>

                <p className="text-gray-600">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="w-5 h-5"
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className="mt-6 text-gray-600 leading-8">
                {testimonial.feedback}
              </p>

            
              <a
                href="#"
                className="inline-block mt-8 text-blue-600 underline hover:text-blue-800"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;