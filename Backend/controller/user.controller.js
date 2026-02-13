import User  from "../model/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import cloudinary from "../config/cloudinary.js";


export const  signup= async(req,res)=>{
    try {

        const {fullname,email,password }= req.body;
        const user= await User.findOne({email})

        if(user) {
            return res.status(400).json({message:"email already exists"})
        }
            const hashedpass= await bcryptjs.hash(password,10)

        const createdUser= new User({
            fullname:fullname,
            email:email,
            password:hashedpass
        })

       await createdUser.save()

       const token=jwt.sign(
        {id:createdUser._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

       )

         res.status(201).json({message:"User successfully created",
            user:{
            _id:createdUser._id,
            fullname:createdUser.fullname,
            email:createdUser.email
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

export const login =async (req,res)=>{
    try {

            const {email,password}=req.body;
            const user= await User.findOne({email})
            
            
            if(!user) {
                    return res.status(400).json({ message: "invalid credentials" });
                    }

            const isMatch = await bcryptjs.compare(password, user.password);

            if(!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });
            }

            
                const token= jwt.sign(
                    {id:user._id},
                    process.env.JWT_SECRET,
                    {expiresIn:"7d"}
                )
                res.status(200).json({message:"login successful",
                    user:{
                    _id:user._id,
                    fullname:user.fullname,
                    email:user.email
                    },
                    token
            
                }) 
            
            
    } catch (error) {
        console.log("error",error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const uploadProfilepic= async (req,res)=>{
 try {
    if(!file){
        return res.status(400).json({message:"no image file uploaded"});

    }
    const user = await User.findOne("req.user.id");
    
    if(user.profilePicId){
        await cloudinary.uploader.destroy(user.profilePicId);
    }

    const result=new Promise((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
                {
                folder:"pfps",
                transformation:[{width:300,height:300,crop:"fill"}]
                },
            //callback
            (err,result)=>{
                if(result)resolve(result);
                else reject(err);
            }

         )
         stream.end(req.file.buffer);
    });
    user.profilePic = result.secure_url;
    user.profilePicId = result.public_id;
    await user.save();
     res.json(user);

 } catch (error) {
    console.log(err);
    res.status(500).json({ msg: "Upload failed" });
 }
}