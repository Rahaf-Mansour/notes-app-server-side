const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel");

// Getting all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Creating a new one
router.post("/", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      creationDate: req.body.creationDate,
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Getting one note by id
router.get("/:id", getNote, async (req, res) => {
  res.json(res.note);
});

// Updating one note by id
router.patch("/:id", getNote, async (req, res) => {
  try {
    if (req.body.title != null) {
      res.note.title = req.body.title;
    }
    if (req.body.content != null) {
      res.note.content = req.body.content;
    }
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deleting one note by id
router.delete("/:id", getNote, async (req, res) => {
  try {
    await res.note.deleteOne();
    res.json({ message: "Deleted note" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getNote(req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ error: "The note isn't found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  res.note = note;
  next();
}

module.exports = router;
