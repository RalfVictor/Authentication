import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //attempt to find and delete user

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({ message: "User deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Cannot Delete User" });
  }

  //check if use exist
});
