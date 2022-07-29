import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "62e23e12d9165d26d79e3218",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "My title",
          "description": "this is a demo note description",
          "tag": "personal",
          "date": "2022-07-28T07:43:36.796Z",
          "__v": 0
        },
        {
            "_id": "62e23e28d9185d26d79e3218",
            "user": "62e23ce8d9165d26d79e3214",
            "title": "My title",
            "description": "this is a demo note description",
            "tag": "personal",
            "date": "2022-07-28T07:43:36.796Z",
            "__v": 0
        },
        {
          "_id": "62e23e28d9565d26d79e3218",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "lookout",
          "description": "lookout for the new image that you have there",
          "tag": "personal",
          "date": "2022-07-28T07:43:36.796Z",
          "__v": 0
        },
        {
          "_id": "62e23e28d9164d26d79e3218",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "New pic",
          "description": "delete this new pic here",
          "tag": "personal",
          "date": "2022-07-28T07:43:36.796Z",
          "__v": 0
        },  
        {
          "_id": "62e2b175626151507f7c4196",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "very important note",
          "description": "just kidding, its nothing ;)",
          "tag": "personal",
          "date": "2022-07-28T15:55:33.510Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial);

      // Add a note
      const addNote = (title, description, tag)=>{
        // TODO: API Call
        const note = {
          "_id": "62e2b175626151507f7c4196",
          "user": "62e23ce8d9165d26d79e3214",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-07-28T15:55:33.510Z",
          "__v": 0
        };
        setNotes(notes.concat(note))

      }

      // Delete a note
      const deleteNote = (id)=>{
        // TODO: API Call
        console.log("deleting the note with id" + id)
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
      }

      // Edit a note
      const editNote = ()=>{
        
      }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;