import "leaflet/dist/leaflet.css"
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import Header from "@components/Header"
import { useParams } from "react-router-dom"
import ModalAdminQuartier from "@components/Modals/ModalAdminQuartier"
import DivNomQuartierSelect from "./divNomQuartierSelect"
import NavigationAdmin from "@components/administration/NavigationAdmin"

const AdministrationQuartier = () => {
  const idVille = useParams()
  // const accessToken = sessionStorage.getItem("accessToken")
  const [modalAdminQuartier, setModalAdminQuartier] = useState(false)
  const selectRefArray = useRef([])
  const [villeCoordonnees, setVilleCordonnees] = useState(null)
  const [quartiersCoordonnees, setQuartiersCordonnees] = useState(null)
  // const [modalAdminQuartierModif, setModalAdminQuartierModif ] = useState(false)
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/quartiers/ville/${idVille.id}`)
      .then((res) => {
        setQuartiersCordonnees(res.data)
      })
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/villes/${idVille.id}`)
      .then((res) => {
        setVilleCordonnees(res.data)
        // console.log("setVilleCordonnees....",res.data);
      })
  }, [])

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const closeModalResetSelect = () => {
    setModalAdminQuartier(false)
    resetSelect()
  }

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
          <h1>Quartiers</h1>
          <button
            className="buttonAjouterVille"
            onClick={(e) => setModalAdminQuartier(true)}
          >
            Ajouter un quartier
          </button>
          <div className="usersAdmin">
            {quartiersCoordonnees !== null
              ? quartiersCoordonnees.map((quartierCoordonnees, index) => (
                  <DivNomQuartierSelect
                    nomQuartier={quartierCoordonnees.q}
                    idQuartier={quartierCoordonnees.id}
                    nomVille={quartierCoordonnees.ville}
                    key={index}
                    selectRef={
                      (selectRefArray.current[index] =
                        selectRefArray.current[index] || React.createRef())
                    }
                    resetSelect={(e) => resetSelect(e)}
                    idVille={idVille}
                    // modalAdminQuartierModif={modalAdminQuartierModif}
                    // setModalAdminQuartierModif={(e)=>setModalAdminQuartierModif(e)}
                  />
                ))
              : null}
          </div>
          {/* <Link className="retourAdmin" to="/administrationville">
            <p>Retour</p>
          </Link> */}
          <NavigationAdmin />
        </div>
      </div>
      {villeCoordonnees && quartiersCoordonnees ? (
        <ModalAdminQuartier
          open={modalAdminQuartier}
          onClose={() => closeModalResetSelect()}
          nomVille={villeCoordonnees[0].nom}
          idVille={idVille}
          latVille={villeCoordonnees[0].lat}
          lngVille={villeCoordonnees[0].lng}
          quartiersCoordonnees={quartiersCoordonnees}
          resetSelect={() => resetSelect()}
          // selectRef={selectRef}
        ></ModalAdminQuartier>
      ) : null}
    </div>
  )
}

export default AdministrationQuartier
