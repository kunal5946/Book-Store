import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";
import GlassSurface from './GlassSurface'

const Navbar = ({ onSearch }) => {

  const { authUser, setAuthUser } = useAuth()
  console.log(authUser)

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li ><Link to="/course">Course</Link></li>
      <li><a>Contact</a></li>
      <li><Link to="/profile">Profile</Link></li>
    </>
  );

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setSticky(true)
      }
      else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handlescroll)
    return () => {
      window.removeEventListener('scroll', handlescroll)
    }

  }, [])

  return (

    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 z-50 right-0">
      {/* 🔥 CHANGED: Replaced Tailwind blur background with GlassSurface */}
      <GlassSurface
        width="100%"
        height={80}
        borderRadius={20}
        displace={0.3}
        distortionScale={-120}
        redOffset={2}
        greenOffset={4}
        blueOffset={8}
        brightness={70}
        opacity={0.9}
        mixBlendMode="normal"
        className={`rounded-2xl ${sticky ? "border border-base-300 shadow-xl transition-all duration-300" : ""}`}
      >
        {/* 🔥 END OF CHANGE */}

        <div className="navbar shadow-sm">

          {/* LEFT */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>

            <Link to="/" className="text-2xl font-bold cursor-pointer ml-2">
              Book Store
            </Link>
          </div>

          <div className="navbar-end space-x-3">

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                {navItems}
              </ul>
            </div>

            {/* RIGHT */}
            <div className="hidden md:block p-2">
              <label className="input shadow-[0_8px_25px_rgba(59,130,246,0.4)]">
                <svg className="h-[1em] opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  required
                  placeholder="Search"
                  onChange={(e) => {
                    if (onSearch) {
                      onSearch(e.target.value)
                    }
                  }}
                />
              </label>
            </div>

            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={toggleTheme}
                value="synthwave"
              />
              <svg className="swap-off h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41..." />
              </svg>
              <svg className="swap-on h-7 w-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14..." />
              </svg>
            </label>

            {
              authUser ? (
                <Logout />
              ) : (
                <div>
                  <a
                    className="bg-black text-white p-3 rounded-md hover:bg-slate-800 duration-300 cursor-pointer shadow-[0_8px_25px_rgba(59,130,246,0.4)]"
                    onClick={() => document.getElementById("login_modal").showModal()}
                  >
                    Login
                  </a>
                  <Login />
                </div>
              )
            }

          </div>
        </div>

      </GlassSurface>
      {/* 🔥 END GlassSurface wrapper */}

    </div>

  );
};

export default Navbar;
