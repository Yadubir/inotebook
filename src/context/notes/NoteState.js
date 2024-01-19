import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
            "_id": "565165656",
            "user": "yadubir",
            "title": "Yadubir's notes",
            "description": "Hey I'm Yadubir"
        },
        {
            "_id": "5656115656",
            "user": "yadubir",
            "title": "Yadubir's notes",
            "description": "What's up"
        }
    ]

const [notes,setNotes] = useState(notesInitial)

const addNote = (title,description)=>{
    console.log("Adding a new node")
    //TODO API call
    const note = {
        "_id": "5656555656",
        "user": "yadubir",
        "title": title,
        "description": description
    }
    setNotes(notes.concat(note))
}

const deleteNote = (id)=>{
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
}

const editNote = (id,title,description)=>{
    console.log("Edit note clicked")
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id===id) {
            element.title = title;
            element.description = description;
        }
    }
}

return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
        {props.children}
    </NoteContext.Provider>
);
}
export default NoteState;