import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from './images/logo.png'
export default function Navbar() {
  

  
  

  return (
    <div >
      <nav className="navbar " style={{
        zIndex:'100',
        width:'100%',
        height:'10vh'
        }}>
          <div  style={{
        backgroundColor: '#DBD8E3',
        height :'10vh',
        width:'100%',  
        
        position:'fixed'                 
      }}>
          <div>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" style={{height:'10vh' }} />
          </Link> 
          
                        
        </div>

          </div>
        
      </nav>
    </div>
  )
}

