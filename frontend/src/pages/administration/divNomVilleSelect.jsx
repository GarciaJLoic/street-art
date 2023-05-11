import { useState } from "react"
import axios from "axios"
import instance from "../../axios/InstanceAxiosApi"
import { useNavigate } from "react-router-dom"
import ModalAdminVilleModif from "../../components/Modals/ModalAdminVilleModif"

const DivNomVilleSelect = ({ nomVille, idVille, selectRef, resetSelect }) => {
  const accessToken = sessionStorage.getItem("accessToken")
  const [modalAdminVilleModif, setModalAdminVilleModif] = useState(false)
  const [villeCoordonnees, setVilleCordonnees] = useState(null)

  const navigate = useNavigate()

  const modifierSupprimer = (e) => {
    if (e === "quartier") {
      resetSelect()
      navigate(`/administrationquartier/${idVille}`, { replace: true })
    } else if (e === "modifier") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/villes/${idVille}`)
        .then((res) => {
          setVilleCordonnees(res.data)
        })
      setModalAdminVilleModif(true)
    } else if (e === "supprimer") {
      const deleteVille = async () => {
        try {
          const response = await instance.delete(`admin/villes/${idVille}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          window.location.reload()
          console.info(response.data)
        } catch (error) {
          console.error(error.message)
        }
      }
      deleteVille()
    }
  }

  const closeModalResetSelect = () => {
    setModalAdminVilleModif(false)
    resetSelect()
  }

  return (
    <div className="blocVilleSelect" key={idVille}>
      <p>{nomVille}</p>
      <select
        ref={selectRef}
        className="selectAdminVille"
        name="acces"
        id="acces"
        onChange={(e) => modifierSupprimer(e.target.value)}
      >
        <option value="edit">Edit</option>
        <option value="quartier">quartiers</option>
        <option value="modifier">modifier</option>
        <option value="supprimer">supprimer</option>
      </select>
      {villeCoordonnees ? (
        <ModalAdminVilleModif
          open={modalAdminVilleModif}
          onClose={() => closeModalResetSelect()}
          nomVille={nomVille}
          idVille={idVille}
          latVille={villeCoordonnees[0].lat}
          lngVille={villeCoordonnees[0].lng}
          resetSelect={() => resetSelect()}
          selectRef={selectRef}
        ></ModalAdminVilleModif>
      ) : null}
    </div>
  )
}
export default DivNomVilleSelect
