import { useState } from "react";
import axios from "axios";
import Aurora from "./Aurora";
import PixelCard from "./PixelCard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Recommend = () => {
  const [prompt, setPrompt] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!prompt) return;

    setLoading(true);
    setBooks([]);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/book/recommend`, {
        prompt
      });

      const data = res.data;

      // Handle both array (legacy) and object (new) formats for robustness
      const bookList = Array.isArray(data) ? data : (data.books || []);

      setBooks(bookList);

      if (data.fallback) {
        // Specific message requested by user
        alert("Sorry AI quota for today has been completed, please try again later. For now, please browse books in the course page.");
      }

    } catch (err) {
      console.log(err);
      alert("Error fetching recommendations");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      {/* 🌌 Aurora background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">

          {/* TITLE */}
          <h1 className="text-3xl font-semibold mb-6">
            AI Book Finder
          </h1>

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to read..."
              className="w-full sm:flex-1 p-3 rounded bg-black/40 border border-white/20"
            />

            <button
              onClick={handleRecommend}
              className="w-full sm:w-auto bg-purple-600 px-6 py-3 rounded hover:bg-purple-700"
            >
              Find
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <p className="mt-6 text-purple-300">
              Finding books...
            </p>
          )}

          {/* RESULTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {books.map((book) => (
              <PixelCard key={book._id} variant="pink">
                <img
                  src={book.image || "/bookcard.jpg"}
                  alt={book.name}
                />

                <h3 className="font-semibold">{book.name}</h3>
                <p className="text-sm text-gray-300">{book.title}</p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {book.genre?.slice(0, 2).map((g, i) => (
                    <span
                      key={i}
                      className="text-xs bg-purple-600 px-2 py-1 rounded"
                    >
                      {g}
                    </span>
                  ))}
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

export default Recommend;
