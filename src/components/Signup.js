import React from 'react'
import {  useState } from 'react'
import {useNavigate} from "react-router-dom";
import bg from './images/bg.png'

export default function Signup() {
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({name:"",email:"",password:""});
    const host = "https://unsrecordbend.onrender.com"

    const handlesubmit=async(event)=>{

        event.preventDefault();

        const name = credentials.name;
        const email = credentials.email;
        const password= credentials.password;

        
        const resposne = await fetch(`${host}/auth/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password })

        });
        const json = await resposne.json()
        if((!json.error) && (json.authtoken)){
            console.log("success")
            //save authtoken
            localStorage.setItem('token',json.authtoken);
            navigate("/home");

        }
        else{
            alert(json.error)
        }
    }

    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }




    return (
        <div className="container mt-5" style={{
            backgroundImage:`url(${bg})`,
            width :'80vw',
            height: '111vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
        }}>
            <h1>Signup Now</h1>
            <h5>Join the hub of creativity—create, share, and connect through notes</h5>
            <form onSubmit={handlesubmit} style={{
                width:'40%',
            }}>
            <div className="mb-3 my-5 fs-4">
                    <label  className="form-label "><>Name</></label>
                    <input type="text" className="form-control"  placeholder="enter your name" value={credentials.name} onChange={onchange} name="name"/>
                </div>
                <div className="mb-3 fs-4">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onchange} placeholder="name@example.com" value={credentials.email} name="email" />
                </div>
                <label  className="form-label fs-4">Create your password</label>
                <input type="password" id="inputPassword5" className="form-control" value={credentials.password} onChange={onchange} name="password"/>
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long
                </div>
                <div className="col-auto my-3">
                    <button type="submit" className="btn btn-primary mb-3" on >Signup</button>
                </div>
            </form>

        </div>
    )
}
