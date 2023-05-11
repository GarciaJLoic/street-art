import ModalAdminQuartierModif from "@components/Modals/ModalAdminQuartierModif"
import { useState } from "react"
import axios from "axios"
import instance from "../../axios/InstanceAxiosApi"

const DivNomVilleSelect = ({
  nomVille,
  idVille,
  selectRef,
  resetSelect,
  nomQuartier,
  idQuartier,
}) => {
  const accessToken = sessionStorage.getItem("accessToken")
  const [modalAdminQuartierModif, setModalAdminQuartierModif] = useState(false)
  const [villeCoordonnees, setVilleCordonnees] = useState(null)
  const [quartiersCoordonnees, setQuartiersCordonnees] = useState(null)

  const modifierSupprimer = (e) => {
    if (e === "modifier") {
      // utilisé pour le focus de la ville sélectionnée
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/villes/${idVille.id}`)
        .then((res) => {
          setVilleCordonnees(res.data)
        })

      // utilisé pour importer le quartiers sélectionné
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/quartiers/${idQuartier}`)
        .then((res) => res.data)
        .then((data) => {
          setQuartiersCordonnees(data)
        })
      resetSelect()
      setModalAdminQuartierModif(true)
    } else if (e === "supprimer") {
      const deleteQuartier = async () => {
        try {
          const response = await instance.delete(
            `admin/quartier/${idQuartier}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )

          window.location.reload()
          const messageFromBack = response.data
          console.info(messageFromBack)
        } catch (error) {
          console.error(error.message)
        }
      }
      deleteQuartier()
    }
  }

  const closeModalResetSelect = () => {
    setModalAdminQuartierModif(false)
    resetSelect()
  }

  return (
    <div className="blocVilleSelect" key={idVille}>
      <p>{nomQuartier}</p>
      <select
        ref={selectRef}
        className="selectAdminVille"
        name="acces"
        id="acces"
        onChange={(e) => modifierSupprimer(e.target.value)}
      >
        <option value="edit">Edit</option>
        <option value="modifier">Modifier</option>
        <option value="supprimer">Supprimer</option>
      </select>

      {villeCoordonnees && quartiersCoordonnees ? (
        <ModalAdminQuartierModif
          open={modalAdminQuartierModif}
          onClose={() => closeModalResetSelect()}
          nomVille={nomVille}
          idVille={idVille}
          latVille={villeCoordonnees[0].lat}
          lngVille={villeCoordonnees[0].lng}
          quartierLat={quartiersCoordonnees[0].lat}
          quartierLng={quartiersCoordonnees[0].lng}
          idQuartier={idQuartier}
          resetSelect={() => resetSelect()}
          selectRef={selectRef}
          nomQuartier={nomQuartier}
        ></ModalAdminQuartierModif>
      ) : null}
    </div>
  )
}
export default DivNomVilleSelect
