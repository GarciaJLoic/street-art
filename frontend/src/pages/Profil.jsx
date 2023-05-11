import React, { useState, useEffect } from "react"
import ProfilGallery from "@components/ProfilGallery"
import axios from "axios"
import Menu from "@components/Menu"
import profilPicture from "../assets/image/profilPicture.png"

function profil({ handleEditProfile, handleDeleteAccount }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    // todo changer l'url
    axios.get("http://localhost:4242/").then((res) => setUser(res.data))
  }, [])
  return (
    <div className="profil--global">
      <div className="profil--container">
        <div className="profil--title">
          <h2>Mon Compte</h2>
        </div>
        <img
          className="profil--photo"
          src={profilPicture}
          alt="Photo de profil"
        />
        <p className="profil--pseudo">{user.pseudo}COOKIEDU32</p>
        <p className="profil--points">{user.points}5467 points</p>
        <div className="profil--containerGallery">
          <ProfilGallery />
        </div>
        <div className="profile-btn">
          <button onClick={handleEditProfile} className="profile--btnMdf">
            Modifier mes informations
          </button>
          <button onClick={handleDeleteAccount} className="profile--btnSuppr">
            Supprimer mon compte
          </button>
        </div>
      </div>
      <Menu />
    </div>
  )
}

export default profil
