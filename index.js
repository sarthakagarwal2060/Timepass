
import dotenv from 'dotenv'
import express from 'express'
import notesRoute from './routes/notesRoute.js';
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
app.use('/notes',notesRoute)
app.get('/',(req, res) => {
  res.send("<h1>Hello world</h1>");
})

app.listen(Port,()=>{
    console.log(`Listening on ${Port}`);
    
})

