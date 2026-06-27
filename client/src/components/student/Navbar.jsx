import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <nav
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b border-gray-200 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-5 text-gray-600">

        {user && (
          <>
            <button className="cursor-pointer hover:text-blue-600">
              Become Educator
            </button>

            <span>|</span>

            <Link
              to="/my-enrollments"
              className="hover:text-blue-600"
            >
              My Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-3">

        {user && (
          <Link
            to="/my-enrollments"
            className="text-sm text-gray-600"
          >
            My Courses
          </Link>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img
              src={assets.user_icon}
              alt="User"
              className="w-7"
            />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;