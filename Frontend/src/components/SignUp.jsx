import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'

const SignUp = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-base-200">
      
      <div className="relative w-[400px] p-6 rounded-lg shadow-lg bg-base-100">
        
        {/* Close button */}
        <Link
          to="/"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </Link>

        <h3 className="font-bold text-lg mb-4">Sign Up</h3>

        {/* name */}
        <div className="mt-4 space-y-1">
          <span>Enter your full name</span>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-md outline-none"
          />
        </div>

        {/* email */}
        <div className="mt-4 space-y-1">
          <span>Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md outline-none"
          />
        </div>

        {/* password */}
        <div className="mt-4 space-y-1">
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md outline-none"
          />
        </div>

        {/* actions */}
        <div className="mt-6 flex justify-between items-center">
          <button className="bg-green-200 rounded p-2 w-20 hover:bg-green-500 transition">
            Sign up
          </button>

          <p className="text-sm">
            Have Account?{" "}
            <button onClick={()=>document.getElementById("login_modal").showModal()} className="underline text-blue-500">
              Login
            </button>
            <Login/>
          </p>
        </div>

      </div>
    </div>
  )
}

export default SignUp
