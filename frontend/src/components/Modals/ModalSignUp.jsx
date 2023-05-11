import React, { useRef, useState } from "react"
import axios from "axios"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import CustomClickOutside from "../../script/CustomClickOutside"

const ModalLogin = ({ open, children, onClose }) => {
  // newProfile populating datas
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  // Incorrect form entries handling
  const [redPassword, setRedPassword] = useState(false)
  const [redPassword2, setRedPasswordConfirmation] = useState(false)
  const [redFirstName, setRedFirstName] = useState(false)
  const [redLastName, setRedLastName] = useState(false)
  const [redPseudo, setRedPseudo] = useState(false)
  const [redEmail, setRedEmail] = useState(false)

  const closeModalfromOutside = useRef()
  CustomClickOutside(closeModalfromOutside, () => {
    setFirstName("")
    setLastName("")
    setPseudo("")
    setEmail("")
    setPassword("")
    setPasswordConfirmation("")
    setRedFirstName(false)
    setRedLastName(false)
    setRedPseudo(false)
    setRedEmail(false)
    setRedPassword(false)
    setRedPassword(false)
  })

  const validateSignUp = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setRedPassword(true)
    } else if (password !== passwordConfirmation) {
      setRedPasswordConfirmation(true)
    } else if (lastName === undefined) {
      setRedLastName(true)
    } else if (firstName === undefined) {
      setRedFirstName(true)
    } else if (pseudo === undefined) {
      setRedPseudo(true)
    } else if (email === undefined) {
      setRedEmail(true)
    } else {
      let newProfile = {
        firstName,
        lastName,
        pseudo,
        email,
        password,
      }
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/signup`, newProfile)

        .then((res) => {
          if (res.data.errors) {
            // console.log(res.data.errors.email)
            // console.log(res.data.errors.password)
            console.error(res.data.errors)
          } else {
            window.location = "/"
          }
        })
        .catch((err) => {
          console.error(err)
        })

      // await axios
      // .get(`${import.meta.env.VITE_BACKEND_URL}/oeuvresfornewuser`)

      // .then((res) => {
      // ICI ON CHARGE LE USER CONTEXT AVEC TOUTES LES OEUVRES
      // .catch((err) => {
      //   console.error(err)
      // })

      setFirstName("")
      setLastName("")
      setPseudo("")
      setEmail("")
      setPassword("")
      setPasswordConfirmation("")
      newProfile = null
    }
  }
  if (!open) return null
  return ReactDOM.createPortal(
    <>
      {children}
      <div className="overlayModalLogin signUpBackGround" onClick={onClose}>
        <div
          className="modalStyle signUpModal"
          ref={closeModalfromOutside}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="profil--title">
            <h2>Inscription</h2>
          </div>

          <form className="form">
            <input
              className={redFirstName ? "red" : null}
              type="username"
              placeholder="Votre prénom"
              autoComplete="username"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName || ""}
            />
            <input
              className={redLastName ? "red" : null}
              type="username"
              placeholder="Votrer nom"
              autoComplete="username"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName || ""}
            />
            <input
              className={redPseudo ? "red" : null}
              type="username"
              placeholder="Votre Pseudo"
              autoComplete="username"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo || ""}
            />
            <input
              className={redEmail ? "red" : null}
              type="email"
              placeholder="email"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              value={email || ""}
            />
            <input
              className={redPassword ? "red" : null}
              type="password"
              placeholder="mot de passe, 6 caratères minimum"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
            <input
              className={redPassword2 ? "red" : null}
              type="password"
              placeholder="Confirmation de votre mot de passe"
              autoComplete="new-password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              value={passwordConfirmation || ""}
            />
          </form>
          <button
            className="profileBtnValSignUp"
            onClick={(e) => validateSignUp(e)}
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
