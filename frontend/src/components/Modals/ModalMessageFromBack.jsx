import React, { useRef } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import CustomClickOutside from "../../script/CustomClickOutside"

const ModalMessageFromBack = ({ open, children, onClose, message }) => {
  const closeModalfromOutside = useRef()

  CustomClickOutside(closeModalfromOutside, () => {})

  if (!open) return null
  return ReactDOM.createPortal(
    <>
      {children}
      <div className="overlayModalLogin" onClick={onClose}>
        <div
          className="modalStyle login"
          ref={closeModalfromOutside}
          onClick={(e) => e.stopPropagation()}
        >
          <p>{message}</p>
          <button onClick={onClose}>Close Modal</button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}

ModalMessageFromBack.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalMessageFromBack
