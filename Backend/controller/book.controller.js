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
    const { name, title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // upload PDF to cloudinary
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

    // Check for manual inputs first
    let genres = [];
    let tags = [];

    const { manualGenre, manualTags } = req.body;

    if (manualGenre || manualTags) {
      if (manualGenre) genres.push(manualGenre);
      if (manualTags) tags = manualTags.split(',').map(t => t.trim());
    } else {
      // Only try AI if no manual data provided
      try {
        const aiResult = await generateTagsAndGenres(name);
        genres = aiResult.genres;
        tags = aiResult.tags;
      } catch (aiError) {
        console.log("AI Generation failed:", aiError);
      }
    }

    // save book
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