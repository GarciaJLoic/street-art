import { useState } from "react"
import Geolocalisation from "../components/Geolocalisation"
import ModalLogin from "../components/ModalLogin"

const Geoloc = () => {
  // XXXXXXXXXXXXXXXXXXXXXX STATE modal connexion XXXXXXXXXXXXXXXXXXXX
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  return (
    <div>
      <p>OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
      <button>click</button>
      <Geolocalisation />
      {/* XXXXXXXXXXXXXXXXXXX OUVERTURE FERMETURE MODAL XXXXXXXXXXXXXXXXXXXX */}
      <button
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
      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
    </div>
  )
}

export default Geoloc
