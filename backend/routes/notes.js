const express = require('express');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

const router = express.Router();


// ROUTE 1: Fetch all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id });
        res.json(notes);
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be at least 5 characters').isLength({min: 5}),

], async (req, res)=>{

    try {
        
        const {title, description, tag } = req.body;
        
        // if there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
       
        const savedNote = await note.save();
        
        res.json(savedNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    })

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id',fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;

    //create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note});

})
    
module.exports = router
