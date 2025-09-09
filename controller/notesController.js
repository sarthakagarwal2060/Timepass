// export const root = (req, res) => {
//   res.send("<h1>Hello world</h1>");
// };
import Note from "../models/notes.js";
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
export const getAllNotes = async (req, res) => {
  // if (notes.length != 0) {
  //   res.json(notes);
  // } else {
  //   res.status(404).json({ message: "Data not found" });
  // }
  try {
    const notes = await Note.find();
    res.json(notes).status(200);
  } catch {
    console.error("Error in getAIlNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getNote =async (req, res) => {
  try{
    const id = req.params.id;
    const note = await Note.findById(id)
    if(!note) return res.status(404).json({message:"Note not found"})
    return res.status(200).json(note)

  }
  catch{
    // console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteNote =async (req, res) => {
  try{
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id)
    if(!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });

  }catch{
     res.status(500).json({ message: "Internal server error" });
  }

};
export const postNote = async (req, res) => {
  // const note = req.body;
  // if (!note || !note.id || !note.content) {
  //   return res.status(400).json({ message: "Invalid note data" });
  // }
  // notes.push(note);
  // console.log(note);
  // res.status(201).json(note);
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully!" });
  } catch {
    // console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
