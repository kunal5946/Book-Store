import Book from "../model/book.model.js"
import cloudinary from "../config/cloudinary.js"
import redisClient from "../config/redis.js";
import { generateTagsAndGenres } from "../utils/aiTags.js";
import { addUploadJob } from "../utils/uploadQueue.js";

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

    await addUploadJob({
      name,
      title,
      manualGenre,
      manualTags,
      userId: req.user.id
    }, req.file);

    res.status(202).json({
      message: "Book is being processed in the background"
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

    // 1. Normalization: Lowercase, trim, and replace spaces with underscores to create a standardized cache key
    const normalizedPrompt = prompt.trim().toLowerCase().replace(/\s+/g, "_");
    const cacheKey = `ai:rec:${normalizedPrompt}`;

    // 2. Cache-Aside Pattern: Query Redis first to avoid costly AI API queries and minimize latency
    let cachedData = null;
    try {
      cachedData = await redisClient.get(cacheKey);
    } catch (redisError) {
      // Defensive Fallback: If Redis is down, log the error but allow the request to proceed directly to MongoDB/AI
      console.error("Redis read error in recommendBooks, bypassing cache:", redisError);
    }

    // 3. Cache Hit: Return the stored results instantly (source metadata added for verification)
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      return res.status(200).json({
        ...parsed,
        source: "Redis Cache"
      });
    }

    // 4. Cache Miss: Execute the normal database search and AI tagging logic
    let genres = [];
    let tags = [];
    let isFallback = false;

    // TRY AI FIRST
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

    // GET BOOKS
    const allBooks = await Book.find();

    // SCORING
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

    // Structure response payload
    let finalResponse;
    if (result.length === 0) {
      if (isFallback) {
        finalResponse = {
          books: allBooks.slice(0, 6),
          fallback: true
        };
      } else {
        finalResponse = { books: [], fallback: false };
      }
    } else {
      finalResponse = { books: result, fallback: isFallback };
    }

    // 5. Cache Write: Save the compiled response to Redis with a TTL of 24 Hours (86400 seconds)
    try {
      await redisClient.setEx(cacheKey, 86400, JSON.stringify(finalResponse));
    } catch (redisError) {
      // Defensive Fallback: If Redis write fails, log the issue but do not block the user response
      console.error("Redis write error in recommendBooks:", redisError);
    }

    // Return the response, marking the source as a live calculation
    res.status(200).json({
      ...finalResponse,
      source: "Live API"
    });

  } catch (err) {
    console.log("Recommendation error:", err);

    // HARD FALLBACK (never freeze UI)
    const allBooks = await Book.find();
    res.status(200).json({
      books: allBooks.slice(0, 6),
      fallback: true,
      source: "Live API (Fallback)"
    });
  }
};
