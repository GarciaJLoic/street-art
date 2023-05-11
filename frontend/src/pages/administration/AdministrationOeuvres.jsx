import axios from "axios"
import { useState, useEffect } from "react"

import Header from "../../components/Header"
import AdminOeuvre from "../../components/administration/AdminOeuvres"
import BlockFilter from "../../components/administration/BlockFilter"
import ModalAdminOeuvre from "../../components/Modals/ModalAdminOeuvre"

const AdministrationOeuvres = () => {
  const [listeOeuvres, setListeOeuvres] = useState()
  const [checkboxValidateOeuvreAdmin, setCheckboxValidateOeuvreAdmin] =
    useState(false)
  const [modalAdminOeuvreAdd, setModalAdminOeuvreAdd] = useState(false)
  const [modalAdminOeuvreModify, setModalAdminOeuvreModify] = useState(false)
  const [idOeuvreToBeModified, setidOeuvreToBeModified] = useState()
  const handleClickAdd = () => {
    setModalAdminOeuvreAdd(true)
  }

  const [listeVilles, setListeVilles] = useState()
  const [selectedVille, setSelectedVille] = useState("VILLE")

  const [listeQuartiers, setListeQuartiers] = useState()
  const [selectedQuartier, setSelectedQuartier] = useState("Quartiers")

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/villesAdminPage`)
      .then((res) => res.data)
      .then((data) => {
        setListeVilles(data)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/quartiers/${selectedVille}`
      )
      .then((res) => res.data)
      .then((data) => {
        setListeQuartiers(data)
      })
      .catch((error) => console.error(error))
  }, [selectedVille])

  useEffect(() => {
    ;(selectedQuartier !== "Quartiers" && selectedVille !== "Ville"
      ? axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admin/oeuvresbyquartier/${selectedQuartier}`
        )
      : axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admin/oeuvresbyville/${selectedVille}`
        )
    )
      .then((res) => res.data)
      .then((data) => {
        setListeOeuvres(data)
      })
      .catch((error) => console.error(error))
  }, [
    selectedVille,
    selectedQuartier,
    modalAdminOeuvreModify,
    modalAdminOeuvreAdd,
  ])
  return (
    <div className="administrationOeuvres">
      <Header />
      <div className="title">
        <h2>Administration</h2>
      </div>
      <BlockFilter
        setListeOeuvres={setListeOeuvres}
        checkboxValidateOeuvreAdmin={checkboxValidateOeuvreAdmin}
        setCheckboxValidateOeuvreAdmin={setCheckboxValidateOeuvreAdmin}
        handleClickAdd={handleClickAdd}
        setSelectedVille={setSelectedVille}
        setSelectedQuartier={setSelectedQuartier}
        selectedVille={selectedVille}
        selectedQuartier={selectedQuartier}
        listeVilles={listeVilles}
        listeQuartiers={listeQuartiers}
      />
      <div className="adminOeuvres">
        {(checkboxValidateOeuvreAdmin
          ? listeOeuvres?.filter((e) => !e.valide)
          : listeOeuvres
        )?.map((oeuvre) => {
          return (
            <AdminOeuvre
              key={oeuvre.id}
              oeuvre={oeuvre}
              setListeOeuvres={setListeOeuvres}
              setModalAdminOeuvreModify={setModalAdminOeuvreModify}
              setidOeuvreToBeModified={setidOeuvreToBeModified}
            />
          )
        })}
      </div>
      <ModalAdminOeuvre
        page={"add"}
        open={modalAdminOeuvreAdd}
        onClose={(e) => setModalAdminOeuvreAdd(false)}
        listeVilles={listeVilles}
        listeQuartiers={listeQuartiers}
      ></ModalAdminOeuvre>
      <ModalAdminOeuvre
        page={"modify"}
        open={modalAdminOeuvreModify}
        onClose={(e) => setModalAdminOeuvreModify(false)}
        listeVilles={listeVilles}
        listeQuartiers={listeQuartiers}
        idOeuvreToBeModified={idOeuvreToBeModified}
        setidOeuvreToBeModified={setidOeuvreToBeModified}
      ></ModalAdminOeuvre>
    </div>
  )
}

export default AdministrationOeuvres
