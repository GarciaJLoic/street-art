// import { Link } from "react-router-dom"
import ModalSignUp from "./Modals/ModalSignUp"
import { useState } from "react"

const InscriptionButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      <button
        className="inscription-button"
        onClick={() => {
          setModalIsOpen(true)
        }}
      >
        S'inscrire
      </button>
      <ModalSignUp
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      ></ModalSignUp>
    </>
  )
}
export default InscriptionButton
