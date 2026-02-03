import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bookRoute from "./route/book.route.js"
import cors from "cors"
import userroute from "./route/user.route.js"

const app=express()
app.use(cors())
dotenv.config()
app.use(express.json())
const PORT = process.env.PORT || 4001
const URI=process.env.mongoDBURI



//connect to mongodb
mongoose.connect(URI).then(()=>console.log("mongo DB connected")).catch(err=>console.log("error is :",err))


//defining routes
app.use("/book",bookRoute)
app.use("/users",userroute)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)  
})
