import "dotenv/config";
import express from "express";
import "./config/redis.js"
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userroute from "./route/user.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true
}
));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;

// connect mongo
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

// routes
app.use("/book", bookRoute);
app.use("/users", userroute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
