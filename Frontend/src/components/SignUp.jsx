import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Login from "./Login";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  // Function to open the Login modal
  const openLoginModal = () => {
    const loginModal = document.getElementById("login_modal");
    if (loginModal) loginModal.showModal();
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div id="signup_modal" className="border shadow-md p-5 rounded-md relative">
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Signup</h3>

            {/* Name */}
            <div className="mt-9 space-y-1">
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-80 p-2 border rounded-md outline-none"
                {...register("name", { required: true })}
              />
              <br />
              {errors.name && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Email */}
            <div className="mt-9 space-y-1">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 p-2 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Password */}
            <div className="mt-9 space-y-1">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 p-2 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            {/* Signup + Login link */}
            <div className="mt-10 flex justify-between">
              <button className="bg-green-200 border-none rounded p-2 w-20 transition transform-transition hover:scale-105 hover:bg-green-500">
                Signup
              </button>
              <div>
                <p className="mt-4">
                  Have account?{" "}
                  <button
                    type="button"
                    onClick={openLoginModal}
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Mount the Login component */}
      <Login />
    </>
  );
};

export default SignUp;
