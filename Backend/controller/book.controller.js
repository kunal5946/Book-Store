import Book from "../model/book.model.js"
import cloudinary from "../config/cloudinary.js"

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
            return res.status(400).json({ message: "No file uploaded,please upload a file" })
        }

        //  Wrap Cloudinary upload stream in a Promise to handle async upload properly
        
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

        const newBook = new Book({
            name,
            title,
            price: 0,
            category: "paid",
            pdf: uploaded.secure_url,
            uploadedBy: req.user.id,
            pdfPublicId: uploaded.public_id,
        });

        await newBook.save();
        res.status(200).json({ message: "Upload successful", book: newBook });

    } catch (error) {
         console.log(error);
    res.status(500).json({ message: error.message });
    }
}