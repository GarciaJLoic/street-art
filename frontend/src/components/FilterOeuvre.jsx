import React, { useState } from "react"
import "./styles.css"

const Oeuvre = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <div className="containerOeuvre">
      <button className="btn btn-primary" onClick={toggleDropdown}>
        Test
      </button>
      {showDropdown && (
        <div className="dropdown-container">
          <div id="scroll-container"></div>
          <svg></svg>
        </div>
      )}
    </div>
  )
}

export default Oeuvre
