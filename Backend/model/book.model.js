import mongoose from "mongoose";
const bookSchema=mongoose.Schema({

    name:String,
    price:Number,
    category:String,
    image:String,
    title:String,
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

const Book=mongoose.model("Book",bookSchema);
export default Book;