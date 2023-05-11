import axios from "axios"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"

const MapBlockDropdown = ({
  setVilleCordonnees,
  setFlyTo,
  setZoom,
  villeCordonnees,
}) => {
  const [selectedQuartier, setSelectedQuartier] = useState("Quartiers")
  const [listeQuartiers, setListeQuartiers] = useState()

  useEffect(() => {
    axios
      .get("http://localhost:5000/villes")
      .then((res) => res.data)
      .then((data) => {
        setVilleCordonnees([data[0].lat, data[0].lng])
      })
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:5000/quartiers")
      .then((res) => res.data)
      .then((data) => {
        setListeQuartiers(data)
      })
  }, [])

  useEffect(() => {
    // Modification de la position et le zoom pour le mouvement flyTo quand la liste déroulante est modifiée

    if (selectedQuartier === "Quartiers") {
      setFlyTo(villeCordonnees)
      setZoom(12)
    } else {
      const result = listeQuartiers.filter(
        (quartier) => quartier.q === selectedQuartier
      )[0]
      setFlyTo([result.lat, result.lng])
      setZoom(13)
    }
  }, [selectedQuartier])

  const handleChangeDropdown = (event) => {
    setSelectedQuartier(event.target.value)
  }

  return (
    <div className="block-dropdown">
      <div className="select">
        <select
          id="dropdown"
          value={selectedQuartier}
          onChange={handleChangeDropdown}
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
  )
}
MapBlockDropdown.propTypes = {
  setVilleCordonnees: PropTypes.func,
  setZoom: PropTypes.func,
  setFlyTo: PropTypes.func,
  villeCordonnees: PropTypes.array,
}
export default MapBlockDropdown
