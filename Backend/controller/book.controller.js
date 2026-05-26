import Book from "../model/book.model.js"
import cloudinary from "../config/cloudinary.js"
import redisClient from "../config/redis.js";
import { generateTagsAndGenres } from "../utils/aiTags.js";

export const getBook = async (req, res) => {
  console.log("GET /book was called");

  try{
    let cachedBooks=null;

    try{
      cachedBooks=await redisClient.get("books:all");

    }catch(redisError){
      console.log(redisError)
    }
    if(cachedBooks){
      return res.status(200).json(JSON.parse(cachedBooks));
    }
    const book=await Book.find();

    try{
      await redisClient.setEx("books:all",3600,JSON.stringify(book));
    }catch(redisError){
      console.error(redisError);
    }
    res.status(200).json(book);

  }catch(error){
      console.log("Error:", error);
    res.status(500).json(error);
  }
}

export const getFreebooks = async (req, res) => {
 try{
    let cachedFree=null;
    try{
      cachedFree=await redisClient.get("books:free");

    }catch(redisError){
       console.error(redisError);
    }
    if(cachedFree){
      return res.status(200).json(JSON.parse(cachedFree));

    }
    const book=await Book.find();
    try{
      await redisClient.setEx("books:free",3600,JSON.stringify(book));

    }catch(rediserror){
      console.error(rediserror);
    }
    res.status(200).json(book);
  }catch(error){
    res.status(500).json(error);
  }
}

export const uploadBook = async (req, res) => {
  try {
    const { name, title, manualGenre, manualTags } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // upload PDF to Cloudinary
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

    //  If user manually provided tags/genre
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
      //  Otherwise use AI
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

    // Save book to Mongo
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

    try{
      await redisClient.del(["books:all","books:free"]);
    }catch(rediserror){
      console.error(rediserror);
    }
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
    try{
      await redisClient.del(["books:all","books:free"]);

    }catch(rediserror){
      console.error(rediserror);
    }
    
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

    let genres = [];
    let tags = [];
    let isFallback = false;

    //  TRY AI FIRST
    try {
      const aiResult = await generateTagsAndGenres(prompt);

      genres = (aiResult.genres || []).map(g => g.toLowerCase());
      tags = (aiResult.tags || []).map(t => t.toLowerCase());

      console.log("AI result:", genres, tags);

      // FIX: If AI returned nothing, trigger fallback
      if (genres.length === 0 && tags.length === 0) {
        throw new Error("AI returned empty results");
      }

    } catch (aiErr) {
      console.log("AI quota hit → using fallback");
      isFallback = true;

      // FALLBACK: use prompt words as tags
      const words = prompt.toLowerCase().split(" ");

      genres = words;
      tags = words;
    }

    //  GET BOOKS
    const allBooks = await Book.find();

    //  SCORING
      const scored = allBooks.map(book => {
        let score = 0;

        const bookGenres = (book.genre || []).map(g => g.toLowerCase());
        const bookTags = (book.tags || []).map(t => t.toLowerCase());

        // tag match
        tags.forEach(t => {
          if (bookTags.some(bt => bt.includes(t))) {
            score += 5;
          }
        });

        // genre match
        genres.forEach(g => {
          if (bookGenres.some(bg => bg.includes(g))) {
            score += 3;
          }
        });

        // title match
        if (book.name.toLowerCase().includes(prompt.toLowerCase())) {
          score += 8;
        }

        return { book, score };
      });

      scored.sort((a, b) => b.score - a.score);

      const result = scored
        .filter(item => item.score > 0)
        .map(item => item.book);

      //  ALWAYS RETURN SOMETHING
      if (result.length === 0) {
        // If AI failed AND keyword search failed, return random books + message
        if (isFallback) {
          return res.json({
            books: allBooks.slice(0, 6),
            fallback: true
          });
        }
        return res.json({ books: [], fallback: false });
      }

      res.json({ books: result, fallback: isFallback });

    } catch (err) {
      console.log("Recommendation error:", err);

      //  HARD FALLBACK (never freeze UI)
      const allBooks = await Book.find();
      // Return explicit message flag for frontend to handle
      res.json({
        books: allBooks.slice(0, 6),
        fallback: true
      });
    }
};
