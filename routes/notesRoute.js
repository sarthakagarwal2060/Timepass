import express from "express";
import {
  deleteNote,
  getAllNotes,
  postNote,
  updateNote,
} from "../controller/notesController.js";
import isAuth from "../middleware/authMiddleware.js";

const notesRouter = express.Router();
notesRouter.use(isAuth)
notesRouter.route("/").get(getAllNotes).post(postNote);

notesRouter.route("/:id").delete(deleteNote).put(updateNote);
export default notesRouter
