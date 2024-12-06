import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
const router = Router();
router.post("/login", async (req, res) => {
  // Login logic here
  const { username, password, email } = req.body;

  if ((!username && !email) || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }
  if (!email) {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }
    // Login Successful, create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.set("Authorization", `Bearer ${token}`);
    return res.send({ message: "Login Successful" });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }
    // Login Successful, create token
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
      },
      process.env.JWT_SECRET
    );
    res.set("Authorization", `Bearer ${token}`);
    return res.send({ message: "Login Successful" });
  }
});

router.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.send({ message: "User created successfully" });
});

export default router;
