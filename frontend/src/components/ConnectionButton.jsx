// import { Link } from "react-router-dom"
import ModalLogin from "./ModalLogin"
import { useState } from "react"

const ConnectionButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      <button
        className="connection-button"
        onClick={() => {
          setModalIsOpen(true)
        }}
      >
        Connexion
      </button>
      <ModalLogin
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      ></ModalLogin>
    </>
  )
}

export default ConnectionButton
