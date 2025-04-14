import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StickyContainer, Sticky } from 'react-sticky';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleclick = () => {
    localStorage.removeItem('token');
    navigate("/");
    alert("logged out successfully")
  }



  return (
    <div style={{

      height: '100vh',
      

    }}>

      <nav style={{
        width: '18vw',
        minHeight: '100%',
      }}>
        <div>
          <div style={{
        height :'90vh',
        width:'17vw',  
        backgroundColor: '#5C5470', 
        position:'fixed'                 


      }} >
            {!localStorage.getItem('token') ?
            
              <div  role="search" style={{
                marginTop:'30vh',
                display: 'flex',
                left:'20px',
                position:'fixed'                 
              }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">         
                <Link  className="bi bi-postcard-heart-fill fs-2 text-decoration-none" aria-current="page" to="/" style={{
                 
                  color: 'white',
                }}>   Posts </Link>
              </li>
              <br/>

              <li>
              
                <p class="fst-italic text-white fs-6">Create notes, 
                share ideas,<br></br>
                 and spark inspiration<br></br>
                 —join us!</p>
              </li>
                  <li>
                  <Link className="bi bi-box-arrow-in-right fs-4 text-decoration-none"  aria-current="page"  to="/login" style={{
                 
                  color: 'white',
                }}> Login</Link>
                  </li>
                  <li>
                  <Link className="bi bi-check-circle-fill fs-4 text-decoration-none"  aria-current="page"  to="/signup" style={{
                 
                  color: 'white',
                }}> Sign Up</Link>
                  </li>                        
                </ul>
                </div>
              :

              <div style={{
                marginTop:'30vh',
                display: 'flex',
                left:'20px',
                position:'fixed'                 
              }} >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li>         
                <Link  className="bi bi-postcard-heart-fill fs-2 text-decoration-none" aria-current="page" to="/" style={{
                  
                  color: 'white',

                }}> Posts </Link>
              </li>
                           
              <li className="nav-item">
                <Link className="bi bi-house-door-fill fs-2 text-decoration-none" aria-current="page" to="/home"  style={{
                 
                  color: 'white',
                }}> Home </Link>
              </li>

              <li className="nav-item">
                <Link className="bi bi-person-circle fs-2 text-decoration-none" aria-current="page" to="/about"  style={{
                
                  color: 'white',
                }}> Profile </Link>
              </li>

              <li>
              <button className="bi bi-box-arrow-left fs-4 text-decoration-none" onClick={handleclick} 
              style={{
                marginTop:'20vh',
                border:'0px',
                backgroundColor:'#5C5470',
                color:'white',
              }}
              > Logout</button>
                </li>
              
            </ul>

              </div>

              

            }

          </div>


        </div>
      </nav>

    </div>
  )
}

