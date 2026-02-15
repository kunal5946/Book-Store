import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LaserFlow from "./LaserFlow";
import toast from "react-hot-toast";
import axios from "axios";


const Upload = () => {

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Select a file");
      return;
    }
    const loadingToast = toast.loading("Uploading...");
    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("name", name);
      formdata.append("pdf", file);
      const token = localStorage.getItem("token");


      await axios.post(`${import.meta.env.VITE_API_URL}/book/upload`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.dismiss(loadingToast);
      toast.success("uploaded");
    } catch (error) {
      console.log(error.response?.data);
      toast.dismiss(loadingToast);
      toast.error("upload failed");
    }
  }

  return (

    <>


      <Navbar />

      {/* Header Section with LaserFlow Background */}
      <div className="relative">
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <LaserFlow
            horizontalBeamOffset={0.1}
            verticalBeamOffset={-0.35}
            color="#CF9EFF"
            horizontalSizing={0.5}
            verticalSizing={2}
            wispDensity={1.2}
            wispSpeed={15}
            wispIntensity={5}
            flowSpeed={0.35}
            flowStrength={0.25}
            fogIntensity={0.45}
            fogScale={0.3}
            fogFallSpeed={0.6}
            decay={1.1}
            falloffStart={1.2}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Header Content */}
        {/* Header Content (Spacing only) */}
        <div className="relative z-10 pt-28 pb-10 max-w-4xl mx-auto px-4">

        </div>
      </div>

      {/* Card Section  */}
      <div className="relative z-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* CARD */}
          <div className="bg-base-100 shadow-2xl rounded-2xl p-8 grid md:grid-cols-2 gap-10">

            {/* LEFT INFO */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
                Contribute to Library
              </h2>
              <p className="text-base-content/70 mb-4">
                Upload study material, books, or notes. Other students will be able to read it instantly.
              </p>
              <ul className="space-y-2 text-sm text-base-content/70">
                <li>1. PDF only</li>
                <li>2. Max size: 10MB</li>
                <li>3. Visible to all users</li>
              </ul>
            </div>



            {/* FORM */}
            <form className="space-y-5" onSubmit={handleUpload}>
              {/* Book name */}
              <div>
                <label className="label">
                  <span className="label-text">Book Name</span>
                </label>
                <input
                  type="text"
                  placeholder="enter book title"
                  className="input input-bordered w-full"
                  onChange={(e) => {
                    setName(e.target.value);
                  }
                  }
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
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }
                  }
                />
              </div>

              {/* PDF upload */}
              <div>
                <label className="label">
                  <span className="label-text py-1">Upload PDF</span>
                </label>
                <input type="file" name="pdf" className="file-input file-input-primary w-full"
                  onChange={
                    (e) => {
                      setFile(e.target.files[0])
                    }
                  }
                />
              </div>

              {/* BUTTON */}
              <button type="submit" className="btn btn-primary w-full text-lg hover:scale-[1.04] transition">
                Upload Book
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
