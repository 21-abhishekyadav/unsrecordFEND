import React from 'react'
import { Link } from "react-router-dom";
import logo from './images/logo.png'
export default function Footer() {





    return (
        <div >
            <nav className="navbar " style={{
                zIndex: '100',
                width: '16vw',
                height: '10vh',
                padding: '0px'
            }}>
                <div style={{
                    backgroundColor: '#333',
                    height: '10vh',
                    width: '100%',
                    color :'white',
                    display:'flex',
                    alignItems:'center',        
                    justifyContent:'center',

                }}>
                    © Final year project 
                    <br></br>
                    Abhishek Yadav CSE A
                    

                </div>

            </nav>
        </div>
    )
}

