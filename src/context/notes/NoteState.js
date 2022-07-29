import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "62e23e28d9165d26d79e3218",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "My title",
          "description": "this is a demo note description",
          "tag": "personal",
          "date": "2022-07-28T07:43:36.796Z",
          "__v": 0
        },
        {
            "_id": "62e23e28d9165d26d79e3218",
            "user": "62e23ce8d9165d26d79e3214",
            "title": "My title",
            "description": "this is a demo note description",
            "tag": "personal",
            "date": "2022-07-28T07:43:36.796Z",
            "__v": 0
        },
        {
          "_id": "62e23e28d9165d26d79e3218",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "lookout",
          "description": "lookout for the new image that you have there",
          "tag": "personal",
          "date": "2022-07-28T07:43:36.796Z",
          "__v": 0
        },
        {
          "_id": "62e23e28d9165d26d79e3218",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "New pic",
          "description": "delete this new pic here",
          "tag": "personal",
          "date": "2022-07-28T07:43:36.796Z",
          "__v": 0
        },  
        {
          "_id": "62e2b175626251507f7c4196",
          "user": "62e23ce8d9165d26d79e3214",
          "title": "very important note",
          "description": "just kidding, its nothing ;)",
          "tag": "personal",
          "date": "2022-07-28T15:55:33.510Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;