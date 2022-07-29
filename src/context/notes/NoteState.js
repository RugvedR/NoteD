import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMjNjZThkOTE2NWQyNmQ3OWUzMjE0In0sImlhdCI6MTY1ODk5MzkxNn0.CMxkEx7SaTqMgLq6N5YDoRjVTBy3CRUuOCvZDF6rXfM",
      }
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMjNjZThkOTE2NWQyNmQ3OWUzMjE0In0sImlhdCI6MTY1ODk5MzkxNn0.CMxkEx7SaTqMgLq6N5YDoRjVTBy3CRUuOCvZDF6rXfM",
      },
      body: JSON.stringify({title, description, tag}),
    });

    console.log("adding a new note")
    const note = {
      _id: "62e2b175626151507f7c4196",
      user: "62e23ce8d9165d26d79e3214",
      title: title,
      description: description,
      tag: tag,
      date: "2022-07-28T15:55:33.510Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMjNjZThkOTE2NWQyNmQ3OWUzMjE0In0sImlhdCI6MTY1ODk5MzkxNn0.CMxkEx7SaTqMgLq6N5YDoRjVTBy3CRUuOCvZDF6rXfM",
      }
    });
    const json = response.json();
    console.log(json)

    console.log("deleting the note with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMjNjZThkOTE2NWQyNmQ3OWUzMjE0In0sImlhdCI6MTY1ODk5MzkxNn0.CMxkEx7SaTqMgLq6N5YDoRjVTBy3CRUuOCvZDF6rXfM",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
