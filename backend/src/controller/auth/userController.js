import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //400 Bad request
    res.status(400).json({ message: "All fields are required" });
  }

  //check password length
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be of atleast 6 characters" });
  }

  //check if user already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already Exists." });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { _id, name, email, role, photo, bio, isVerified } = user;
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
