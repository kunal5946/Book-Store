    import express from "express"
    import {signup,login, uploadProfilepic,logout} from "../controller/user.controller.js"
    import { verifyToken } from "../middleware/auth.middleware.js"
    import { upload } from "../middleware/upload.middleware.js";
    const router=express.Router()
    router.post("/signup",signup)
    router.post("/login",login)
    router.post("/uploadProfilePic",verifyToken,upload.single("image"), uploadProfilepic )
    router.post("/logout",logout)
    export default router;


