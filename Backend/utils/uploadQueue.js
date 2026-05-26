import { Queue } from "bullmq"

const redisConnection={
    url: process.env.REDIS_URL || process.env.REDIS_URI || "redis://localhost:6379"
};

const uploadQueue= new Queue("book-uploads",{
    connection:redisConnection
});

export const addUploadJob=async(bookData,file)=>{
    const fileBase64= file.buffer.toString("base64");
    await uploadQueue.add("process-upload",{
        bookData,
        file:{
            base64:fileBase64,
            originalname:file.originalname,
            mimetype:file.mimetype
        }
    },
    {
        attempts:3,
        backoff:{
            type:"exponential",
            delay:5000
        }
    });
}