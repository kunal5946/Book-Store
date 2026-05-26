import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains { id: userId }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};