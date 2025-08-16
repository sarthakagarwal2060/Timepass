
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
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
const Port = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('<h1>Hello world</h1>')
})

app.get('/notes/:id',(req,res)=>{
    const id = req.params.id
    const note = notes.find(note=> note.id===id)
    if(note){
      res.json(note)
    }
    else{
      res.status(404).json({message:"Data not found"})
    }

})
app.get('/notes',(req,res)=>{
  if(notes.length!=0){
    res.json(notes)
  }
  else{
    res.status(404).json({message:"Data not found"})
  }
})
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id != id);
  res.status(200).json({ message: "Note deleted" });
});
app.post("/notes", (req, res) => {
  const note = req.body;
  if (!note || !note.id || !note.content) {
    return res.status(400).json({ message: "Invalid note data" });
  }
  notes.push(note)
  console.log(note);
  res.status(201).json(note);
});
app.listen(Port,()=>{
    console.log(`Listening on ${Port}`);
    
})

