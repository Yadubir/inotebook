import {useContext} from 'react'
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    // const {editNote} = context;
    // const {addNote} = context;
    const { note, updateNote} = props;

    // const handleClick=(e)=>{
    //     e.preventDefault();
    //     editNote(note._id,note.title, note.description);
    // }

    return (
        <div className='col-md-3'>
            <div className="card my-2">
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2 d" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2 d" onClick={()=>{updateNote(note)}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
