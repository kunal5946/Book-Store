import Book from "../model/book.model.js"


export const getBook=async(req,res)=>{
console.log("GET /book was called");
    try{
        const book= await Book.find()
        res.status(200).json(book)
    }
    catch(error){
            console.log("Error:",error)
            res.status(500).json(error)
    }
}