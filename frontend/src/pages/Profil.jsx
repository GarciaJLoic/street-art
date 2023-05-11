import React, { useState, useEffect, useRef } from "react"
import Modal from "react-modal"
import ProfilGallery from "@components/ProfilGallery"
import Menu from "@components/Menu"
import { Link } from "react-router-dom"
import profilPicture from "../assets/image/profilPicture.png"
import Header from "@components/Header"
import axios from "axios"
import instance from "../axios/InstanceAxiosApi"

function Profil() {
  const accessToken = sessionStorage.getItem("accessToken")
  const [user, setUser] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAccountDeleted, setIsAccountDeleted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const inputRef = useRef()

  // FUNCTION UPLOAD FICHIER
  function hSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("avatar", inputRef.current.files[0])
    // Todo changer api
    axios.post("http://your.backend/api/avatar", formData)
  }

  // supprimer le compte
  const handleDeleteAccount = () => {
    if (isModalOpen) {
      setIsAccountDeleted(true)
    }
    setIsModalOpen(true)
  }

  const handleCancelDelete = () => {
    setIsModalOpen(false)
  }

  // modifier le profil
  const handleEditProfile = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  // Access token check
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get("account", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        setUser(response.data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="profil--global">
      <Header />
      <div className="profil--container">
        <div className="profil--title">
          <h2>Mon Compte</h2>
        </div>
        <img
          className="profil--photo"
          src={profilPicture}
          alt="Photo de profil"
        />
        <div>
          {user
            ? user.map((user) => (
                <div key={user.pseudo}>
                  <p className="profil--pseudo">{user.pseudo}</p>
                  <p className="profil--points">"score"{user.score}</p>
                </div>
              ))
            : null}
        </div>
        <div className="profil--containerGallery">
          <ProfilGallery />
        </div>
        <div className="profil-btn">
          <button onClick={handleEditProfile} className="profil--btnMdf">
            Modifier mes informations
          </button>
          <Modal
            style={{ overlay: { background: "transparent" } }}
            isOpen={showModal}
            onRequestClose={handleEditProfile}
            contentLabel="Modifier mes informations"
            className="profil--editModal"
          >
            <p className="profil--editPara profil--title">Modifier ma photo</p>
            <form encType="multipart/form-data" onSubmit={hSubmit}>
              <input
                className="profil--input"
                type="file"
                name="monfichier"
                ref={inputRef}
              />
              <button className="profil--sendEdit" type="submit">
                Envoyer
              </button>
            </form>
            <button className="profil--closeEdit" onClick={handleCloseModal}>
              Fermer
            </button>
          </Modal>

          <div>
            <button onClick={handleDeleteAccount} className="profil--btnSuppr">
              Supprimer mon compte
            </button>
            <Modal
              style={{ overlay: { background: "transparent" } }}
              isOpen={isModalOpen}
              onRequestClose={handleCancelDelete}
              contentLabel="Confirmation de suppression de compte"
              className="profil--deleteModal"
            >
              {!isAccountDeleted ? (
                <div>
                  <p className="profil--delete">
                    Voulez-vous vraiment supprimer votre compte ?
                  </p>
                  <button
                    className="profil--BtnY"
                    onClick={handleDeleteAccount}
                  >
                    Oui
                  </button>
                  <button className="profil--BtnN" onClick={handleCancelDelete}>
                    Non
                  </button>
                </div>
              ) : (
                <div>
                  <p className="profil--delete">
                    Votre compte a été supprimé avec succès.
                  </p>
                  <Link to="/" className="profil--BtnOK">
                    OK
                  </Link>
                </div>
              )}
            </Modal>
          </div>
        </div>
      </div>
      <Menu />
    </div>
  )
}

export default Profil
