import React from 'react'
import { useContext, useEffect,useState } from 'react'
import postContext from '../context/postContext'
import noteContext from '../context/noteContext'
import Modal from 'react-bootstrap/Modal';


export default function NoteModal(props) {

    const {  editnote } = useContext(noteContext);

    //getting the data
const [title, settitle] = useState("");
const [desc, setdesc] = useState("");
const handletitle = (event) => {
    settitle(event.target.value);
}
const handledesc = (event) => {
    setdesc(event.target.value);
}
const handleclick = () => {
    const newnote = {
        Title: title,
        Description: desc
    }
    editnote(newnote);
    setdesc("")
    settitle("")
    props.onHide();
}


    return (
        <div>

<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit note
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
        <div className="mb-3 container">
                            <label for="exampleFormControlInput1" className="form-label">New title</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name='Title' value={title} onChange={handletitle} />
                        </div>
                        <div className="mb-3 container">
                            <label for="exampleFormControlTextarea1" className="form-label">New description</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name='Description' value={desc} onChange={handledesc} />

                        </div>
      </Modal.Body>
      <Modal.Footer>

        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" 
        onClick={handleclick}>Save</button>
      </Modal.Footer>
    </Modal>
        </div>
    )
}



