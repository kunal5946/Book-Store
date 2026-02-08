import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Upload = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Upload a Book</h1>
            <p className="text-base-content/70 mt-2">
              Share knowledge with others. Upload your PDF and make it available to everyone.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-base-100 shadow-2xl rounded-2xl p-8 grid md:grid-cols-2 gap-10">

            {/* LEFT INFO */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4">
                Contribute to Library
              </h2>
              <p className="text-base-content/70 mb-4">
                Upload study material, books, or notes.  
                Other students will be able to read it instantly.
              </p>

              <ul className="space-y-2 text-sm">
                <li>1. PDF only</li>
                <li>2. Max size: 10MB</li>
                <li>3. Visible to all users</li>
              </ul>
            </div>

            {/* FORM */}
            <form className="space-y-5">

              {/* Book name */}
              <div>
                <label className="label">
                  <span className="label-text">Book Name</span>
                </label>
                <input
                  type="text"
                  placeholder="enter book title"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Author */}
              <div>
                <label className="label">
                  <span className="label-text">Author</span>
                </label>
                <input
                  type="text"
                  placeholder="enter author's name"
                  className="input input-bordered w-full"
                />
              </div>

              {/* PDF upload */}
              <div>
                <label className="label">
                  <span className="label-text py-1">Upload PDF</span>
                </label>
                <input type="file" className="file-input file-input-primary" />
              </div>

              {/* BUTTON */}
              <button className="btn btn-primary w-full text-lg">
                Upload Book 🚀
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Upload;
