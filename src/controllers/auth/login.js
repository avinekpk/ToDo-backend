import Users from "../../models/users.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import generateToken from "../../middlewares/generateAuthToken.js";

config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are mandatory" });
    return;
  }

  const user = await Users.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const token = generateToken(user);

  res.status(200).json({ message: "Logged in successfully", user, token });
};

export default login;
