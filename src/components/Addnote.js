import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const Addnote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    
    const [note, setNote] = useState({title: "", description:""});
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description);
        setNote({title: "", description:""})
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})     // {...note, [e.target.name]: e.target.value} means is dont change the vale of note but the name with value
    }
  return (
    <div className="container my-3">
      <h2>Add your notes</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"  onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"  onChange={onChange}
            value={note.description}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
