import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
const getlogin = async (req, res) => {
  try {
    return res.status(200).json({
      error: "Email not valid!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Internal server error" });
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Incomplete credentials" });
    }

    const registered = await User.findOne({ email });
    if (registered) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ _id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = await generateToken(user._id);
          
      return res.status(201).cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: false
          }).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    }
    return res.status(400).json({ message: "Invalid Credentials!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export { registerUser, loginUser, getlogin };
