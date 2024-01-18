import React, { useEffect, useState } from 'react'
import "./Overlay.css"
const Overlay = ({ children, closeModal }) => {
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    }
  }, [])
  return (
    <>
      <div className="modal ">
        <div onClick={closeModal} className="overlay"></div>
        {children}
      </div>
    </>
  )
}

export default Overlay
