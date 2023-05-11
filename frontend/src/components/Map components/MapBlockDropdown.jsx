import axios from "axios"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"

const MapBlockDropdown = ({
  setVilleCordonnees,
  setFlyTo,
  setZoom,
  villeCordonnees,
  setPosUsers,
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
        setVilleCordonnees([data[0].lat, data[0].lng])
        setListeVilles(data)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (listeVilles) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/quartiers/${selectedVille}`
        )
        .then((res) => res.data)
        .then((data) => {
          const [dataVilleSelected] = listeVilles.filter(
            (e) => e.nom === selectedVille
          )
          setVilleCordonnees([dataVilleSelected.lat, dataVilleSelected.lng])

          setListeQuartiers(data)
        })
    }
  }, [selectedVille])

  useEffect(() => {
    // Modification de la position et le zoom pour le mouvement flyTo quand la liste déroulante est modifiée

    if (selectedQuartier === "Quartiers") {
      if (villeCordonnees) {
        setPosUsers(villeCordonnees)
      }
      setFlyTo(villeCordonnees)
      setZoom(12)
    } else {
      const result = listeQuartiers.filter(
        (quartier) => quartier.q === selectedQuartier
      )[0]
      setFlyTo([result.lat, result.lng])
      setZoom(14)
    }
  }, [listeQuartiers, selectedQuartier])

  const handleChangeDropdownVille = (event) => {
    setSelectedVille(event.target.value)
    setSelectedQuartier("Quartiers")
  }
  const handleChangeDropdownQuartier = (event) => {
    setSelectedQuartier(event.target.value)
  }
  // useEffect(() => {
  //   ;(selectedQuartier !== "Quartiers" && selectedVille !== "Ville"
  //     ? axios.get(
  //         `${
  //           import.meta.env.VITE_BACKEND_URL
  //         }/admin/oeuvresbyquartier/${selectedQuartier}`
  //       )
  //     : axios.get(
  //         `${
  //           import.meta.env.VITE_BACKEND_URL
  //         }/admin/oeuvresbyville/${selectedVille}`
  //       )
  //   )
  //     .then((res) => res.data)
  //     .then((data) => {
  //       console.log(data)
  //       setListeOeuvres(data)
  //     })
  //     .catch((error) => console.error(error))
  // }, [selectedVille, selectedQuartier])
  return (
    <div className="block-dropdown">
      <div className="select">
        <div className="select">
          <select
            id="dropdownVille"
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
            id="dropdownQuartier"
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
      </div>
    </div>
  )
}
MapBlockDropdown.propTypes = {
  setVilleCordonnees: PropTypes.func,
  setZoom: PropTypes.func,
  setFlyTo: PropTypes.func,
  villeCordonnees: PropTypes.array,
}
export default MapBlockDropdown
