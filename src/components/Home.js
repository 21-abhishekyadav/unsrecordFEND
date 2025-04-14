import React from 'react';
import Notes from './Notes';
import PostModal from './PostModal';


import { useContext, useState } from 'react'
import noteContext from '../context/noteContext'
export default function Home() {

  const { addnote } = useContext(noteContext);

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  const handletitle = (event) => {
    settitle(event.target.value);
  }
  const handledesc = (event) => {
    setdesc(event.target.value);
  }
  const handleclick = () => {
    const note = {
      Title: title,
      Description: desc,
      
    }
    addnote(note);
    settitle("")
    setdesc("")

  }

  const col = ["info", "warning", "primary", "success", "danger", "secondary"]

  // add post modal
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div style={{

      display: 'flex', flexDirection: 'column',
    }}>
      <div  style={{ display: 'flex',width:'80vw' }}>
        <div  style={{width: '50%',}}>

          <div className="mb-3 container ">
            <h1 className='container my-3'>Create a new note </h1>
            <label for="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" name='Title' value={title} onChange={handletitle} placeholder="your title here" />
          </div>
          <div className="mb-3 container">
            <label for="exampleFormControlTextarea1" className="form-label">Description</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" name='Description' value={desc} onChange={handledesc} placeholder=" enter your description" />

          </div>
          <div class="col-auto container">
            <button type="submit" class="btn btn-primary mb-3" onClick={handleclick}>Add Note</button>
          </div>
        </div>

        

        <div class="col-auto container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',

        }}>

          <div class="col-auto container" style={{
            width: '100%',
          }}>



            <button onClick={() => setModalShow(true)}          
              style={{
                backgroundColor: '#e6d7fa',
                verticalAlign: 'center',
                border: '0px',
                width: '100%',
                height: '270px',
                fontSize: '50px',
              

              }}>add a new post</button>
            <PostModal show={modalShow}
          onHide={() => setModalShow(false)} />
          </div>

        </div>


      </div>

      <hr className='container' />
      <div className='container'>
        <Notes />
      </div>


    </div>

  )
}
