import React from 'react'
import '../App.css';
import { useContext } from 'react'
import noteContext from '../context/noteContext'
import NoteModal from './NoteModal';

export default function Displaynotes(props) {

    const { deletenote, waitt } = useContext(noteContext);


    //getting the id 
    const handleid = () => {
        console.log(note._id)
        waitt(note._id);
        setModalShow(true);

    }


    const { note } = props;
    const col = ["info", "warning", "primary", "success", "danger", "secondary"]

    // add note modal
    const [modalShow, setModalShow] = React.useState(false);

    return (

        <div className='col-md-4  ' >

            <div className={`  my-3 p-3 bg-${col[Math.floor(Math.random() * 6)]} bg-opacity-10 border-info  rounded-end`}>

                <h5 className="card-title">{note.Title}</h5>
                <p className="  box ">{note.Description}</p>

                <div>
                    <span className="material-symbols-outlined icon" onClick={() => { deletenote(note._id) }}>delete</span>

                    <span className="material-symbols-outlined icon" onClick={() => handleid()}>edit</span>

                    <NoteModal show={modalShow}
                        onHide={() => setModalShow(false)} />


                    <div>
                    <span className=" mx-auto ">{note.Posted}</span>




                    </div>


                </div>

            </div>


        </div>





    )
}


