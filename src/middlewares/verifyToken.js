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

    // Check if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp <= currentTimestamp) {
      console.error("Error: Token expired");
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }

    console.log("decoded: ", decoded);

    req.userId = decoded._id;

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(400).json({ message: "Invalid token." });
  }
};

export default verifyToken;
