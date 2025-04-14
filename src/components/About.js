import React from 'react'
import { useState, useEffect } from 'react'
import img from './images/img.png'
import title from './images/title.png'




export default function About() {
  const userinfo = {}
  const [user, Setuser] = useState(userinfo)

  const host = "https://unsrecordbend.onrender.com"

  const getdetails = async () => {
    const resposne = await fetch(`${host}/auth/getuser`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await resposne.json()
    Setuser(json)
  }
  useEffect(() => {
    getdetails();

  }, [])

  return (
    <div className=''>
      <p className='fs-2 m-5 fst-italic'> The ultimate hub for note sharing and discovery<br />
        You, our passionate contributors, are what make this community so special !
      </p>

      <div className="container d-flex flex-rowreverse" style={{
        backgroundColor: '#ded1ff',
        paddingRight: '10px',
        borderRight:'20px solid  #5C5470',
        borderRadius: '200px',
        margin: '30px',
        width: '50%'



      }}>
        <div className="container d-flex flex-rowreverse" style={{
          backgroundColor: 'white',
          padding: '10px',
        borderRight:'20px solid  white',
        borderRadius: '200px',

          
        }}>
          <div className="me-md-4 mb-3 mb-md-0" style={{ width: '120px' }}>
                <img 
                  src={img} 
                  alt="Profile" 
                  className="img-fluid rounded-circle" 
                  style={{ border: '3px solid #ded1ff' }}
                />
              </div>
          <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0px'
          }}>
            <div className=" container fs-2 fw-bold" style={{

            }} >
              {user.name}<br />
              {user.email}
    
            </div>
          </div>

        </div>

      </div>
      
      <div  className ='d-flex justify-content-end ' >
        <img src={title} alt="img" style={{ 
          width: '51%',
          borderLeft:'20px solid  #5C5470',
          borderRadius: '200px',
          padding:'30px',

       }} />
      </div>

    </div>

  )
}
