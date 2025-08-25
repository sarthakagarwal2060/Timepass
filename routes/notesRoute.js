import express from 'express'
import { deleteNote, getAllNotes, getNote, postNote } from '../controller/notesController.js'
console.log({ deleteNote, getAllNotes, getNote, postNote });

const router = express.Router()
router.get('/',getAllNotes)
router.get('/:id',getNote)
router.delete('/:id',deleteNote)
router.post('/',postNote)
export default router