import React from 'react'
import {useState } from 'react'
import logo from './images/logo.png'




const reset = () => {
  const categoryData = JSON.parse(localStorage.getItem("categoryEngagement")) || {};

  // Reset all values to 0
  const resetData = {};
  for (const category in categoryData) {
    resetData[category] = 1;
  }

  // If no data existed before, initialize defaults
  if (Object.keys(resetData).length === 0) {
    const defaultCategories = [
      "Technology",
      "Health & Wellness",
      "Education & Learning",
      "Lifestyle & Productivity",
      "Entertainment & Pop Culture",
      "General"
    ];
    defaultCategories.forEach(category => {
      resetData[category] = 1;
    });
  }

  localStorage.setItem("categoryEngagement", JSON.stringify(resetData));
};


export default function Navbar() {
  const [showResetButton, setShowResetButton] = useState(false);

  const show = () => {
    if(showResetButton){
      setShowResetButton(false);
    }
    else{
    setShowResetButton(true);
    }

  };

  return (
    <div>
  <nav className="navbar" style={{
    zIndex: '100',
    width: '100%',
    height: '10vh'
  }}>
    <div style={{
      backgroundColor: '#DBD8E3',
      height: '10vh',
      width: '100%',
      position: 'fixed'
    }}>
      <div className="d-flex justify-content-between align-items-center w-100 h-100 px-3">
        <div onClick={show}>
          <img src={logo} alt="Logo" style={{ height: '10vh' }} />
        </div>
        {showResetButton && (<button className="btn btn-outline-danger" onClick={reset}>
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>)}
      </div>
    </div>
  </nav>
</div>
  )
}

