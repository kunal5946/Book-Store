import React, { useEffect, useState } from "react";
import axios from "axios";
import LiquidEther from "./LiquidEther";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TiltedCard from './TiltedCard';
import SplitText from "./SplitText";
import PixelCard from './PixelCard';
import { setStyle } from "motion";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({});
  const [userBooks, setUserBooks] = useState([]);
  const [imagePreview, setImagePreview] = useState("/userprof.jpg");


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("Users"));
        const token = localStorage.getItem("token");
        if (storedUser) {
          setUser(storedUser);

          const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
          const res = await axios.get("http://localhost:4000/book", config);
          // Filtering logic: Assuming book has uploadedBy field matching user ID
          const bookData = res.data.filter((book) => book.uploadedBy === storedUser._id);
          console.log("Fetched books:", res.data);
          setUserBooks(bookData);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchBooks();
  }, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Users"));
    if (storedUser) {
      setUser(storedUser);
      setImagePreview(storedUser.profilepic || "/userprof.jpg");
    }
  }, []);

  const handlePfpChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("please select an image");
      return;
    }
    const previousImage = imagePreview;
    const temporaryPreview = URL.createObjectURL(file);
    setImagePreview(temporaryPreview);
    const formdata = new FormData();
    formdata.append("image", file);

    const loadingToast = toast.loading("Uploading profile picture...");

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post("http://localhost:4000/users/uploadProfilePic", formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setUser(res.data)
      setImagePreview(res.data.profilepic);
      localStorage.setItem("Users", JSON.stringify(res.data));
      toast.dismiss(loadingToast);
      toast.success("image saved");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("upload failed");
      console.log(error);
      setImagePreview(previousImage);
      URL.revokeObjectURL(temporaryPreview);

    }
  }

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;
    const loadingBook = toast.loading("Deleting book");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,

          }
        },
      )
      toast.dismiss(loadingBook);
      toast.success("Book successfully deleted")
      setUserBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    } catch (error) {
      toast.dismiss(loadingBook);
      toast.error("Deletion failed");
    }


  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Optional overlay for readability */}
      <div className="fixed inset-0 bg-black/40 z-0" />

      {/* Foreground content */}
      <div className="relative z-10 pt-16"> {/* pt-16 offsets the fixed navbar (64px height) */}
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
            <TiltedCard
              imageSrc={imagePreview}
              altText=""
              captionText={user.fullname}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip
              displayOverlayContent
              overlayContent={
                <div className="tilted-card-demo-text">
                  <h1 className="text-2xl font-semibold">{user.fullname}</h1>
                </div>

              }
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-semibold">
                <SplitText
                  text={user.fullname}
                  className="text-2xl font-semibold text-center md:text-left"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  showCallback
                />
              </h1>
              <p className="text-gray-300">{user.email}</p>
              <p className="text-sm mt-1 text-purple-300">
                {userBooks.length} Uploads
              </p>
              <div className="mt-4">
                <label
                  htmlFor="pfpUpload"
                  className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition"
                >
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  id="pfpUpload"
                  className="hidden"
                  onChange={handlePfpChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-xl font-semibold mb-6">My Uploads</h2>

          {/* Upload Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBooks.map((book) => (
              <PixelCard key={book._id} variant="pink">
                <div className="w-full h-full flex flex-col p-4">
                  <a
                    href={`https://docs.google.com/gview?url=${book.pdf}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col overflow-hidden min-h-0"
                  >
                    <img
                      src={book.image || "/bookcard.jpg"}
                      alt={book.name}
                      className="w-full h-36 object-cover rounded-lg mb-3 flex-shrink-0"
                    />
                    <h3 className="font-semibold text-lg line-clamp-1 flex-shrink-0" title={book.name}>{book.name}</h3>
                    <p className="text-gray-300 text-sm line-clamp-3 overflow-hidden text-ellipsis">{book.title}</p>
                  </a>

                  <div className="mt-2 flex-shrink-0 flex justify-end">
                    <button
                      className="bg-red-600 px-4 py-1.5 rounded text-sm hover:bg-red-700 transition-transform transform hover:scale-105 z-20 relative"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(book._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>

        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
