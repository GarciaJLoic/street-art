import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Menu from "../components/Menu"
import InscriptionButton from "../components/InscriptionButton"
import shape1 from "../assets/image/shape1.svg"
import shape2 from "../assets/image/shape2.svg"
import streetApp from "../assets/image/streetApp.svg"
import ConnectionButton from "@components/ConnectionButton"
import { UserLoaderContext } from "../contexts/UserLoaderContext"
import LogOutButton from "../components/LogoutButton"

import ModalSignUp from "../components/Modals/ModalSignUp"

export default function Home() {
  const [admin, setAdmin] = useState(false)
  const [utilisateur, setUtilisateur] = useState(false)
  const { user } = useContext(UserLoaderContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (user != null) {
      if (user.privilege_id === 1) {
        setUtilisateur(true)
      } else if (user.privilege_id === 2 || user.privilege_id === 9) {
        setAdmin(true)
      } else {
        setAdmin(false)
      }
    }
  }, [user])

  return (
    <div className="containerAll">
      <header className="header">
        <Link className="logo" to="/">
          <img
            className="brand-name"
            src={streetApp}
            alt="logo Street App"
          ></img>
        </Link>
        {!utilisateur && !admin ? <InscriptionButton /> : null}
      </header>
      {admin ? (
        <div className="menuAdmin">
          <Link className="menu--administration" to="/administrationuser">
            Administration&nbsp;→
          </Link>
        </div>
      ) : null}
      <div className="containerBG">
        <div className="bgShapes">
          <div className="shape1-container">
            <img className="shape1" src={shape1} alt="shape1"></img>
          </div>
          <div className="shape2-container">
            <img className="shape2" src={shape2} alt="shape2"></img>
          </div>
        </div>
      </div>

      <div className="titreAll">
        <h1 className="title1">Explorez la</h1>
        <h1 className="title2">jungle,</h1>
        <h2 className="title3">Découvrez ses</h2>
        <h2 className="title4">secrets.</h2>

        <div className="inscription">
          {!admin && !utilisateur ? <ConnectionButton /> : <LogOutButton />}
          {!admin && !utilisateur ? (
            <h3 className="create-account">
              Vous n'avez pas de compte ?&nbsp;
              <span
                className="signUp"
                style={{ color: "white", fontWeight: "400" }}
                onClick={() => {
                  setModalIsOpen(true)
                }}
              >
                S'inscrire
              </span>
            </h3>
          ) : null}
        </div>
        <ModalSignUp
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        ></ModalSignUp>
      </div>
      <Menu />
    </div>
  )
}
