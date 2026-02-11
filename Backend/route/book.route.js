import express from "express"
import {getBook,getFreebooks,uploadBook}  from '../controller/book.controller.js'
import { verifyToken } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router= express.Router();

router.get("/",verifyToken,getBook)
router.get("/free",getFreebooks)
router.post("/upload",verifyToken,upload.single("pdf"),uploadBook);

export default router; 