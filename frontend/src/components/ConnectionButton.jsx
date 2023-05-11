// import { Link } from "react-router-dom"
import ModalLogin from "./Modals/ModalLogin"
import { useState } from "react"
import arrow from "../assets/image/arrow.svg"
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
        Connexion<img src={arrow} style={{ width: "20px" }}></img>
      </button>
      <ModalLogin
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      ></ModalLogin>
    </>
  )
}

export default ConnectionButton
