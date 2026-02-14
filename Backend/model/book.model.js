import mongoose from "mongoose";
const bookSchema=mongoose.Schema({

    name:String,
    price:Number,
    category:String,
    image:String,
    title:String,
    pdf:String,
    pdfPublicId:String,
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    genre: {
    type: [String],
    default: []
    },
    tags: {
    type: [String],
    default: []
    }


});

const Book=mongoose.model("Book",bookSchema);
export default Book;