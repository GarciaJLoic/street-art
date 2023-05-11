import axios from "axios"
import { useState, useEffect } from "react"

const BlockFilter = ({
  setListeOeuvres,
  checkboxValidateOeuvreAdmin,
  setCheckboxValidateOeuvreAdmin,
}) => {
  const [listeVilles, setListeVilles] = useState()
  const [selectedVille, setSelectedVille] = useState("VILLE")

  const [listeQuartiers, setListeQuartiers] = useState()
  const [selectedQuartier, setSelectedQuartier] = useState("Quartiers")

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/villes`)
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
  }, [selectedVille, selectedQuartier])

  const handleChangeDropdownVille = (event) => {
    setSelectedVille(event.target.value)
    setSelectedQuartier("Quartiers")
  }
  const handleChangeDropdownQuartier = (event) => {
    setSelectedQuartier(event.target.value)
  }
  const handleCheckboxChange = (func) => {
    func((prevState) => !prevState)
  }
  return (
    <div className="admin-block-filter">
      <button className="ajoutOeuvre" type="button">
        Ajouter une oeuvre
      </button>
      <div className="select">
        <select
          id="dropdown"
          value={selectedVille}
          onChange={handleChangeDropdownVille}
        >
          <option value="Ville">Ville</option>
          {listeVilles && listeVilles.length !== 0
            ? listeVilles.map((ville, id) => (
                <option key={ville.nom + id} value={ville.nom}>
                  {ville.nom}
                </option>
              ))
            : ""}
        </select>
        <select
          id="dropdown"
          value={selectedQuartier}
          onChange={handleChangeDropdownQuartier}
        >
          <option value="Quartiers">Quartiers</option>

          {listeQuartiers && listeQuartiers.length !== 0
            ? listeQuartiers.map((quartier, id) => (
                <option key={quartier.q + id} value={quartier.q}>
                  {quartier.q}
                </option>
              ))
            : ""}
        </select>
      </div>
      <p className="filterValidateOeuvre">
        <label htmlFor="validate">Oeuvres à valider :</label>
        <input
          className="checkbox"
          type="checkbox"
          name="validate"
          id="validate"
          checked={checkboxValidateOeuvreAdmin}
          onChange={() => handleCheckboxChange(setCheckboxValidateOeuvreAdmin)}
        />
        <label htmlFor="validate" className="checkbox-label-validate">
          {" "}
        </label>
      </p>
    </div>
  )
}
export default BlockFilter
