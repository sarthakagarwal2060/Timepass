import dotenv from "dotenv";
import express from "express";
import notesRoute from "./routes/notesRoute.js";
import authRoute from "./routes/authRoute.js";
import dbConnect from "./config/dbConnect.js";
import { rateLimiter } from "./middleware/rateLimitter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
dbConnect();

const Port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(rateLimiter);
app.use("/notes", notesRoute);
app.use("/auth", authRoute);
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
app.listen(Port, () => {
  console.log(`Listening on ${Port}`);
});
