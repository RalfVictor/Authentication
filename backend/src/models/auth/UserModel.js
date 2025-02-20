import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide your name."],
    },
    email: {
      type: String,
      required: [true, "Please give an Email"],
      unique: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add Password"],
    },
    photo: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/19819005?v=4",
    },
    bio: {
      type: String,
      default: "I am a new user.",
    },

    role: {
      type: String,
      enum: ["user", "admin", "creator"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, minimize: true }
);

//hash password before saving

UserSchema.pre("save", async function (next) {
  //check if password is not modified
  if (!this.isModified("password")) {
    return next();
  }

  //save the hashed password => bcrypt
  //generate salt
  const salt = await bcrypt.genSalt(10);

  //hash password with salt
  const hashedPassword = await bcrypt.hash(this.password, salt);
  //set the password to hasshed password
  this.password = hashedPassword;

  //call next
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
