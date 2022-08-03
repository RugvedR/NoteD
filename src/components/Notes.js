import React, { useContext, useEffect, useRef, useState } from "react";

import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

import './styles/Notes.css'


const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  let navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();

    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
  const ref = useRef(null);
  const refClose = useRef(null);


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");

  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade mymodal"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                style={{border: "none", backgroundColor: "white"}}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" ></i>
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                  
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea 
                  className="form-control rounded-2" 
                  rows="5"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                  minLength={5}
                  required
                  ></textarea>

                  {/* <input
                    type="text"
                  /> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className='closebtn'
                ref={refClose}
                type="button"
                data-bs-dismiss="modal"
                data-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="update-btn">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">

      <div className="row my-3 my-your-notes">
        <h2  >Your Notes</h2>
          <div >
          {notes.length===0 && 'No notes to display'}
          </div>

        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Notes;
