import React, { useRef } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import User from "../../pages/administration/User"
import CustomClickOutside from "../../script/CustomClickOutside"

const ModalAdminUser = ({
  open,
  children,
  onClose,
  avatar,
  nom,
  prenom,
  pseudo,
  email,
  privilege,
}) => {
  const closeModalfromOutside = useRef()

  CustomClickOutside(closeModalfromOutside, () => {})

  if (!open) return null
  return ReactDOM.createPortal(
    <>
      {children}
      <div className="overlayModalAdminUser" onClick={onClose}>
        <div
          className="modalStyleModalAdminUser adminUser"
          ref={closeModalfromOutside}
          onClick={(e) => e.stopPropagation()}
        >
          <User
            avatar={avatar}
            pseudo={pseudo}
            nom={nom}
            prenom={prenom}
            email={email}
            privilege={privilege}
            onClose={onClose}
          />
          <button className="buttonModalAdminUser" onClick={onClose}>
            Fermer
          </button>
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
