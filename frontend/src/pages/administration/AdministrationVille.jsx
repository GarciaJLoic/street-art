import "leaflet/dist/leaflet.css"
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import Header from "@components/Header"
import ModalAdminVille from "@components/Modals/ModalAdminVille"
import DivNomVilleSelect from "./divNomVilleSelect"
import NavigationAdmin from "@components/administration/NavigationAdmin"

const AdministrationVille = () => {
  // const accessToken = sessionStorage.getItem("accessToken")
  const [modalAdminVille, setModalAdminVille] = useState(false)

  const selectRefArray = useRef([])

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  const [villes, setVilles] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/villes`).then((res) => {
      setVilles(res.data)
    })
  }, [modalAdminVille])

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  const resetSelect = (e) => {
    // Loop through the refs and reset the select element for each component
    selectRefArray.current.forEach((ref) => {
      ref.current.selectedIndex = 0
    })
  }

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  return (
    <div className="bodyAdmin ">
      <div className="admin">
        <Header />
        <div className="adminUserTitle">
          <h2>Administration</h2>
        </div>
        <div className="blocUtilisateur">
          <h1>Villes</h1>
          <button
            className="buttonAjouterVille"
            onClick={(e) => setModalAdminVille(true)}
          >
            Ajouter une ville
          </button>
          <div className="usersAdmin">
            {villes !== null
              ? villes.map((ville, index) => (
                  <DivNomVilleSelect
                    nomVille={ville.nom}
                    idVille={ville.id}
                    key={index}
                    // key={ville.id}
                    selectRef={
                      (selectRefArray.current[index] =
                        selectRefArray.current[index] || React.createRef())
                    }
                    resetSelect={(e) => resetSelect(e)}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
      <ModalAdminVille
        open={modalAdminVille}
        onClose={(e) => setModalAdminVille(false)}
      ></ModalAdminVille>
      <NavigationAdmin />
    </div>
  )
}

export default AdministrationVille
