import React, { useRef } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import CustomClickOutside from "../../script/CustomClickOutside"

const ModalGetConnected = ({ open, children, onClose }) => {
  const closeModalfromOutside = useRef()

  CustomClickOutside(closeModalfromOutside, () => {})

  if (!open) return null
  // return(
  return ReactDOM.createPortal(
    <>
      <div className="overlayModal" onClick={onClose}>
        <div
          className="modalStyle login"
          ref={closeModalfromOutside}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="connecteToi">CONNECTES TOI</p>
          <button className="btnConnecteToi" onClick={onClose}>
            Fermer
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}

ModalGetConnected.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalGetConnected
