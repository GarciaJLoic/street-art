import React, { useRef } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
// import User from "./User"
import CustomClickOutside from "../../script/CustomClickOutside"

const ModalAdminUser = ({ open, children, onClose }) => {
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
          {/* <User/> */}
          <button onClick={onClose}>Close Modal</button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}

ModalAdminUser.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalAdminUser
