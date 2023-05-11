import React, { useState, useEffect } from "react"
import ProfilGallery from "@components/ProfilGallery"
import Menu from "@components/Menu"
import profilPicture from "../assets/image/profilPicture.png"
import instance from "../axios/InstanceAxiosApi"

function profil({ handleEditProfile, handleDeleteAccount }) {
  const [users, setUsers] = useState([])
  const accessToken = sessionStorage.getItem("accessToken")

  // Access token check
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get("account", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        setUsers(response.data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchUsers()
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
        <div>
          {users
            ? users.map((user) => (
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
