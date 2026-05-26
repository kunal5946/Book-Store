import {Worker} from "bullmq"
import Book from "../model/book.model.js";
import cloudinary from "../config/cloudinary.js";
import { generateTagsAndGenres } from "../utils/aiTags.js";
import redisClient from "../config/redis.js";

const redisConnection = {
    url: process.env.REDIS_URL || process.env.REDIS_URI || "redis://localhost:6379"
};

const worker = new Worker("book-uploads", async (job) => {
    const { bookData, file } = job.data;
    const { name, title, manualGenre, manualTags, userId } = bookData;
    
    const fileBuffer = Buffer.from(file.base64, "base64");
    const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "raw", folder: "books", chunk_size: 6000000 },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
    let genres = [];
    let tags = [];
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
        try {
            const aiResult = await generateTagsAndGenres(name);
            genres = Array.isArray(aiResult.genres)
                ? aiResult.genres.map(g => g.toLowerCase())
                : [];
            tags = Array.isArray(aiResult.tags)
                ? aiResult.tags.map(t => t.toLowerCase())
                : [];
        } catch (aiError) {
            console.error(aiError);
        }
    }
    const newBook = new Book({
        name,
        title,
        price: 0,
        category: "paid",
        pdf: uploaded.secure_url,
        uploadedBy: userId,
        pdfPublicId: uploaded.public_id,
        genre: genres,
        tags: tags
    });
    await newBook.save();
    try {
        await redisClient.del(["books:all", "books:free"]);
    } catch (redisError) {
        console.error(redisError);
    }
}, {
    connection: redisConnection
});
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});
worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed`, err);
});
export default worker;