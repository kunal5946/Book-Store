import express from "express"
import {getBook,getFreebooks}  from '../controller/book.controller.js'
import { verifyToken } from "../middleware/auth.middleware.js";

const router= express.Router();

router.get("/",verifyToken,getBook)
router.get("/free",getFreebooks)

export default router; 