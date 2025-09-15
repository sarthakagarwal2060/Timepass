// export const root = (req, res) => {
//   res.send("<h1>Hello world</h1>");
// };
import Note from "../models/notes.js";
export const getAllNotes = async (req, res) => {
 try {
   const { tag, search } = req.query;
   const filter = { userId: req.user.id };
   if (tag) filter.tags = tag;
   if (search)
     filter.$or = [
       { title: { $regex: search, $options: "i" } },
       { content: { $regex: search, $options: "i" } },
     ];
   const notes = await Note.find(filter).sort({ createdAt: -1 });
   res.status(200).json(notes);
 } catch (error) {
   console.error("Error in getAllNotes:", error);
   res.status(500).json({ message: "Internal server error" });
 }
};
// export const getNote =async (req, res) => {
//   try{
//     const id = req.params.id;
//     const note = await Note.findById(id)
//     if(!note) return res.status(404).json({message:"Note not found"})
//     return res.status(200).json(note)

//   }
//   catch{
//     // console.error("Error in updateNote controller", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const deleteNote =async (req, res) => {
    try {
      const note = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });
      if (!note) return res.status(404).json({ message: "Note not found" });
      res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
      console.error("Error in deleteNote:", error);
      res.status(500).json({ message: "Internal server error" });
    }

};
export const postNote = async (req, res) => {

  try {
    const { title, content,tags } = req.body;
    const newNote = new Note({ title, content ,tags,userId:req.user.id,createdAt:new Date()});
    await newNote.save();
    res.status(201).json({message:"Note create successfully",newNote});
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateNote = async (req, res) => {
 try {
   const { title, content, tags } = req.body;
   const note = await Note.findOneAndUpdate(
     { _id: req.params.id, userId: req.user.id},
     { title, content, tags }
   );
   if (!note) return res.status(404).json({ message: "Note not found" });
   res.status(200).json(note);
 } catch (error) {
   console.error("Error in updateNote:", error);
   res.status(500).json({ message: "Internal server error" });
 }
};
