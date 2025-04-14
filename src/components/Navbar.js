import React from 'react'
import {useState } from 'react'
import logo from './images/logo.png'




const reset = () => {  // Remove async (not needed)
  try {
    const categoryData = JSON.parse(localStorage.getItem("categoryEngagement")) || {};
    const defaultCategories = [
      "Technology",
      "Health & Wellness",
      // ... other categories ...
    ];

    // Reset existing categories or initialize defaults
    const resetData = {};
    const categoriesToReset = Object.keys(categoryData).length > 0 
      ? Object.keys(categoryData) 
      : defaultCategories;

    categoriesToReset.forEach(category => {
      resetData[category] = 0;
    });

    localStorage.setItem("categoryEngagement", JSON.stringify(resetData)); // No await
    return { success: true, message: "Reset successful!" };
  } catch (error) {
    console.error("Reset failed:", error);
    return { success: false, message: "Reset failed!" };
  }
};

// Click handler
const handleResetClick = () => {
  const result = reset(); // No await needed
  alert(result.message); // Show feedback
  
  // Optional: Refresh the page or update UI
  // window.location.reload(); 
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
        {showResetButton && (<button className="btn btn-outline-danger" onClick={handleResetClick}>
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>)}
      </div>
    </div>
  </nav>
</div>
  )
}

