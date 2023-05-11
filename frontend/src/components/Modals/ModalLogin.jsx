import React, { useRef, useState } from "react"
import axios from "axios"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

import CustomClickOutside from "../../script/CustomClickOutside"

const ModalLogin = ({ open, children, onClose }) => {
  const [pseudo, setPseudo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [infoUtilisateur, setinfoUtilisateur] = useState("")

  const closeModalfromOutside = useRef()
  CustomClickOutside(closeModalfromOutside, () => {
    setPseudo("")
    setEmail("")
    setPassword("")
  })

  const validateLogin = (e) => {
    e.preventDefault()

    let loginInfo = {
      pseudo,
      email,
      password,
    }
    // console.log("pseudo............", pseudo)
    // console.log("loginInfo............", loginInfo)
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, loginInfo, {
        withCredentials: true,
        credentials: "include",
      })

      .then((res) => {
        if (res.data.errors) {
          // console.log(res.data.errors.email)
          // console.log(res.data.errors.password)
          console.error(res.data.errors)
        } else {
          // setUserInfo(res.data)
          const accessToken = res.data.accessToken
          sessionStorage.setItem("accessToken", accessToken)
          window.location = "/"
        }
      })
      .catch((err) => {
        console.error(err)
      })
    setPseudo("")
    setEmail("")
    setPassword("")
    loginInfo = null
  }

  if (!open) return null
  return ReactDOM.createPortal(
    <>
      {children}
      <div className="overlayModalLogin" onClick={onClose}>
        {/* ============= onClick={(e) => e.stopPropagation()}  <========= "isole ce composant de l'event listener onClick" */}
        <div
          className="modalStyle login"
          ref={closeModalfromOutside}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="profil--title ">
            <h2 className="black">Connexion</h2>
          </div>
          <form className="form">
            <input
              type="username"
              placeholder="Pseudo ou adresse mail"
              autoComplete="username"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo || ""}
            />
            {/* <input
              type="email"
              placeholder="email"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
            /> */}
            <input
              type="password"
              placeholder="mot de passe, 6 caratères minimum"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
          </form>
          {/* <button className="profile--btnSuppr" onClick={onClose}>
            Close
          </button> */}
          <button
            className="profile--btnSuppr"
            onClick={(e) => validateLogin(e)}
          >
            Valider
          </button>
        </div>
      </div>
    </>,
    // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    document.getElementById("portal")
    // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  )
}
ModalLogin.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}
export default ModalLogin
