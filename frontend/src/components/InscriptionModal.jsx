import React from "react"

function InscriptionModal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Inscription Form</h2>
        {/* your form elements */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default InscriptionModal
