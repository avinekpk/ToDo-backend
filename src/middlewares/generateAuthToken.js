import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const generateToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default generateToken;
