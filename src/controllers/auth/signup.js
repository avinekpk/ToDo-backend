import Users from "../../models/users.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import generateToken from "../../middlewares/generateAuthToken.js";

config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are mandatory" });
    return;
  }

  const emailCheck = await Users.findOne({ email });
  if (emailCheck) {
    res.status(400).json({ message: "Email is already registered" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Users({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default signup;
