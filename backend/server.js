import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import { error } from "node:console";

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
app.use(cookieParser());

//routes
const routefiles = fs.readdirSync("./src/routes");

routefiles.forEach((file) => {
  //use dynamic import
  import(`./src/routes/${file}`).then((route) => {
    app.use("/api/v1", route.default);
  })
  .catch((error) => {
    console.log("Failed to load route file",error);
  });
});

const server = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is Running in Port ${port}`);
    });
  } catch (error) {
    console.log("Failed to Start Server", error.message);
    process.exit(1);
  }
};

server();
