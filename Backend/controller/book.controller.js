import Book from "../model/book.model.js"
import cloudinary from "../config/cloudinary.js"
import { generateTagsAndGenres } from "../utils/aiTags.js";

export const getBook = async (req, res) => {
  console.log("GET /book was called");
  try {
    const book = await Book.find()
    res.status(200).json(book)
  }
  catch (error) {
    console.log("Error:", error)
    res.status(500).json(error)
  }
}

export const getFreebooks = async (req, res) => {
  try {
    const book = await Book.find()
    res.status(200).json(book)
  }
  catch (error) {
    res.status(500).json(error)
  }
}

export const uploadBook = async (req, res) => {
  try {
    const { name, title, manualGenre, manualTags } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔵 Upload PDF to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "books", chunk_size: 6_000_000 },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    let genres = [];
    let tags = [];

    // 🟢 If user manually provided tags/genre
    if (manualGenre || manualTags) {
      if (manualGenre) {
        genres.push(manualGenre.toLowerCase());
      }

      if (manualTags) {
        tags = manualTags
          .split(",")
          .map(t => t.trim().toLowerCase())
          .filter(Boolean);
      }

    } else {
      // 🟣 Otherwise use AI
      try {
        const aiResult = await generateTagsAndGenres(name);

        genres = Array.isArray(aiResult.genres)
          ? aiResult.genres.map(g => g.toLowerCase())
          : [];

        tags = Array.isArray(aiResult.tags)
          ? aiResult.tags.map(t => t.toLowerCase())
          : [];

      } catch (aiError) {
        console.log("AI Generation failed:", aiError);
      }
    }

    // 🔵 Save book to Mongo
    const newBook = new Book({
      name,
      title,
      price: 0,
      category: "paid",
      pdf: uploaded.secure_url,
      uploadedBy: req.user.id,
      pdfPublicId: uploaded.public_id,
      genre: genres,
      tags: tags
    });

    await newBook.save();

    res.status(200).json({
      message: "Upload successful",
      book: newBook
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};




export const deleteBook = async (req, res) => {
  try {
    const bookid = req.params.id;
    const userid = req.user.id;
    const book = await Book.findById(bookid);

    if (!book) {
      return res.status(400).json({ message: "Book not found" })
    }
    //delete from cloudinary using pdfpublicid stored in mongo
    if (book.pdfPublicId) {
      await cloudinary.uploader.destroy(book.pdfPublicId, { resource_type: "raw" })
    }
    //now delete the mongodb book deets
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "successfully deleted the book", id: bookid });


  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "deletion failed" });
  }
}

export const recommendBooks = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt required" });
    }

    // 🔵 Use your existing AI function
    const aiResult = await generateTagsAndGenres(prompt);

    const genres = (aiResult.genres || []).map(g => g.toLowerCase());
    const tags = (aiResult.tags || []).map(t => t.toLowerCase());

    console.log("User wants:", genres, tags);

    // 🔵 Get all books from DB
    const allBooks = await Book.find();

    // 🔥 SMART SCORING
    const scored = allBooks.map(book => {
      let score = 0;

      const bookGenres = (book.genre || []).map(g => g.toLowerCase());
      const bookTags = (book.tags || []).map(t => t.toLowerCase());

      // 🟣 TAG MATCH = strongest (money, investing etc)
      tags.forEach(t => {
        if (bookTags.some(bt => bt.includes(t))) {
          score += 5;
        }
      });

      // 🟣 GENRE MATCH = medium
      genres.forEach(g => {
        if (bookGenres.some(bg => bg.includes(g))) {
          score += 3;
        }
      });

      // 🟣 Title keyword match (very strong)
      if (book.name.toLowerCase().includes(prompt.toLowerCase())) {
        score += 8;
      }

      return { book, score };
    });

    // 🔵 Sort highest score first
    scored.sort((a, b) => b.score - a.score);

    // 🔵 Remove books with zero score
    const result = scored
      .filter(item => item.score > 0)
      .map(item => item.book);

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Recommendation failed" });
  }
};

