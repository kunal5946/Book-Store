import multer from "multer";

const storage = multer.memoryStorage();
console.log("MULTER CONFIG LOADED - Limit 50MB");

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Increased limit to 50MB
});
