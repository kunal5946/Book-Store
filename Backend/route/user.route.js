    import express from "express"
    import {signup,login, uploadProfilepic} from "../controller/user.controller.js"
    import { verifyToken } from "../middleware/auth.middleware.js"
    import { upload } from "../middleware/upload.middleware.js";
    const router=express.Router()
    router.post("/signup",signup)
    router.post("/login",login)
    router.post("/upload-pfp",verifyToken,upload.single("image"), uploadProfilepic )
    export default router;

