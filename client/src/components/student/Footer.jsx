import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-12 border-b border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <img src={assets.logo_dark} alt="Logo" className="h-10" />

            <p className="mt-6 text-sm text-white/70 leading-7">
              This platform completely transformed the way I learn.
              The courses are well-structured, easy to follow, and packed
              with practical knowledge that I could apply immediately.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-5">Company</h2>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
            <a href="#" className="hover:text-white transition">
                  Home
                </a>
       </li>
              <li>
         <a href="#" className="hover:text-white transition">
                About Us
                </a>
              </li>
              <li>
           <a href="#" className="hover:text-white transition"> Contact Us </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-5">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-white/70 mb-5">
              Get the latest news, articles, and resources delivered to
              your inbox every week.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-md bg-gray-800 border border-gray-700 outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-5 rounded-r-md transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-white/60 py-5">
        © 2026 GreatStack. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;