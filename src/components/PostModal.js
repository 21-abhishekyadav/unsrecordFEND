import React from 'react'
import { useContext, useEffect,useState } from 'react'
import postContext from '../context/postContext'
import noteContext from '../context/noteContext'
import Modal from 'react-bootstrap/Modal';




export default function PostModal(props) {

    const { addpost } = useContext(postContext);
    const { addnote } = useContext(noteContext);




//getting the data
const [title, settitle] = useState("");
const [subheading, setsubheading] = useState("");
const [desc, setdesc] = useState("");
const [category, setCategory] = useState("General");

const handletitle = (event) => {
    settitle(event.target.value);
}
const handlesubheading = (event) => {
    setsubheading(event.target.value);
}
const handledesc = (event) => {
    setdesc(event.target.value);
}
const handleCategory = (event) => {
  setCategory(event.target.value)
};

const handleclick = () => {
   
    const newpost = {
        Title: title,
        Subheading: subheading,
        Description: desc,
        Category: category  // Include category
    }
    addpost(newpost);
    const note={
        Title:title,
        Description:desc,
        Posted : "POSTED"
      }
    addnote(note);

    setdesc("")
    setsubheading("")
    settitle("")
    setCategory("General");  
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
          Add a new post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
        <div className="mb-3 container">
                            <label for="exampleFormControlInput1" className="form-label">Title</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name='Title' value={title} onChange={handletitle} />
                        </div>
                        <div className="mb-3 container">
                            <label for="exampleFormControlInput1" className="form-label">Subheading</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name='Title' value={subheading} onChange={handlesubheading} />
                        </div>
                        <div className="mb-3 container">
                            <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name='Description' value={desc} onChange={handledesc} />

                        </div>
                        <div className="mb-3 container">
                    <label htmlFor="categorySelect" className="form-label">Category</label>
                    <select className="form-select" id="categorySelect" value={category} onChange={handleCategory}>
                        <option value="Technology">Technology</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Education & Learning">Education & Learning</option>
                        <option value="Lifestyle & Productivity">Lifestyle & Productivity</option>
                        <option value="Entertainment & Pop Culture">Entertainment & Pop Culture</option>
                        <option value="General">General</option>
                    </select>
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
