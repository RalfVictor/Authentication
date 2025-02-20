import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";
import generateToken from "../../helpers/generateToken.js";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //400 Bad request
    res.status(400).json({ message: "All fields are required" });
  }
  const n = password.length;
  //check password length
  if (n < 6) {
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

  const token = generateToken(user._id);

  //send token

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: true,
  });

  console.log(token);

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
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  //get email from body
  const { email, password } = req.body;
  if (!email || !password) {
    //400 bad request
    return res.status(400).json({ message: "All the fields are required" });
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return res.status(400).json({ message: "User not found. Sign Up" });
  }

  //check is password matches

  if (!ismatch) {
    //400 error
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  //generate token with user id
  const token = generateToken(userExist._id);

  if (userExist && ismatch) {
    const { _id, name, email, role, photo, bio, isVerified } = userExist;
    //set token in the cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: true,
      secure: true,
    });

    //sendback the user and token in response to the client
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password Data" });
  }
});

//logout user
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out" });
});
