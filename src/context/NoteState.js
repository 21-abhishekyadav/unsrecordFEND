import React, { useState } from 'react'
import noteContext from './noteContext';

export default function NoteState(props) {
    const host = "https://unsrecordbend.onrender.com"
    const allnotes =[]

    const [notes, SetNote] = useState(allnotes)

    //get all notes
    const getnotes=async()=>{

        //API CALL
        const resposne = await fetch(`${host}/notes/fetchnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

        });
        const json = await resposne.json()
        SetNote(json);
        

    }

    // add a note 
    const addnote = async (newnote) => {
        const Title = newnote.Title;
        const Description = newnote.Description;
        const Posted = newnote.Posted;


        //API CALL
        const resposne = await fetch(`${host}/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ Title, Description,Posted })

        });
        const json = resposne.json()
        getnotes()
    }

    //delete a note
    const deletenote = async(id) => {
        //console.log("deleting the node with id "+id);
        const note = notes.filter((notes) => { return notes._id !== id })
        SetNote(note);

        //API CALL
        const resposne = await fetch(`${host}/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },


        });
        const json = resposne.json()
    }

    const [iid, Setid] = useState("")
        const waitt=(idd)=>{
            Setid(idd);
        }
    

    // edit a note
    const editnote = async (newnote) => {
        
        

        const Title = newnote.Title;
        const Description = newnote.Description;


        //API CALL

        const resposne = await fetch(`${host}/notes/updatenotes/${iid}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ Title, Description,  })

        });
        const json = await resposne.json()
    

        getnotes();
    }

    return (
        <noteContext.Provider value={{ notes, addnote, deletenote, editnote ,getnotes,waitt}}>
            {props.children}
        </noteContext.Provider>
    )
}

