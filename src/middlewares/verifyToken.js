import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("Error: No token provided");
    return res.status(401).json({ message: "Access denied. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded._id;

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(400).json({ message: "Invalid token." });
  }
};

export default verifyToken;
