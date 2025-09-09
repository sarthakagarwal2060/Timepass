import dotenv from "dotenv";
import express from "express";
import router  from "./routes/notesRoute.js";
import dbConnect from "./config/dbConnect.js";
import { rateLimiter } from "./middleware/rateLimitter.js";
import cors from 'cors'
dotenv.config();
dbConnect()
// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];
const Port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(rateLimiter)
app.use("/notes", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
app.listen(Port, () => {
  console.log(`Listening on ${Port}`);
});
