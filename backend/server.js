import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const PORT = 8000;
const CLIENT_URL = "http://localhost:3000";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is Running in Port ${port}`);
    });
  } catch (error) {
    console.log("Failed to Start Server", error.message);
    process.exit(1);
  }
};

server();
