import express from "express"
import {getBook,getFreebooks,uploadBook,deleteBook}  from '../controller/book.controller.js'
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { recommendBooks } from "../controller/book.controller.js";


const router= express.Router();

router.get("/",verifyToken,getBook)
router.get("/free",getFreebooks)
router.post("/upload",verifyToken,upload.single("pdf"),uploadBook);
router.delete("/:id",verifyToken,deleteBook);
router.post("/recommend",recommendBooks);
export default router; 