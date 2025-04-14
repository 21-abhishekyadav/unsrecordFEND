import React from 'react'
import Display from './Displaynotes';
import { useContext, useEffect } from 'react'
import noteContext from '../context/noteContext'
import {useNavigate} from "react-router-dom";
import Displaynotes from './Displaynotes';

export default function Notes() {
    const navigate = useNavigate();
    const {notes,getnotes} =useContext(noteContext);
    useEffect(()=>{
        if(localStorage.getItem('token')){
        getnotes()
        }
        else{
            navigate("/signup");
        }
    },[])
  return (
    
      

       <div className='row '>
        
        <h1> Your private notes here </h1>
        {notes.map((note)=> {return < Displaynotes note = {note}/>})}

      </div>

  )
}
