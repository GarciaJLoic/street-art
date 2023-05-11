import ReactDOM from "react-dom"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import React, { useRef, useState, useEffect } from "react"
import MapFlyTo from "../../components/Map components/MapFlyTo"
import CustomClickOutside from "../../script/CustomClickOutside"
import PropTypes from "prop-types"
import { schemaAdminOeuvre } from "../../script/joi"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import osm from "../../script/osm-providers"

const ModalAdminOeuvre = ({
  page,
  listeVilles,
  listeQuartiers,
  open,
  onClose,
  children,
  idOeuvreToBeModified,
  setidOeuvreToBeModified,
}) => {
  const inputRef = useRef(null)
  const [messageFromBack, setMessageFromBack] = useState(null)
  const [markerPosition, setMarkerPosition] = useState(null)

  const [zoom, setZoom] = useState(12)
  const [flyTo, setFlyTo] = useState([])
  const [listeQuartiersModal, setListeQuartiersModal] = useState(listeQuartiers)
  const [selectedVilleModal, setSelectedVilleModal] = useState("VILLE")
  const [selectedQuartierModal, setSelectedQuartierModal] =
    useState("Quartiers")
  const [nbrPoints, setNbrPoints] = useState(0)
  const [radioValidate, setRadioValidate] = useState("1")

  const [oeuvreData, setOeuvreData] = useState({ valide: 1, nb_vu: 0 })
  const [posMapModal, setPosMapModal] = useState({
    lat: 46.53712,
    lng: 2.42949,
  })
  const closeModalfromOutside = useRef()

  CustomClickOutside(closeModalfromOutside, () => {})

  const closeModalAdminOeuvre = () => {
    onClose(false)
    setOeuvreData({ valide: 1, nb_vu: 0 })
    setSelectedVilleModal("VILLE")
    setSelectedQuartierModal("Quartiers")
    setPosMapModal({
      lat: 46.53712,
      lng: 2.42949,
    })
    setFlyTo(null)
    setRadioValidate("1")
    setNbrPoints(0)
    setMessageFromBack(null)
    setidOeuvreToBeModified(0)
  }
  const handleChangeDropdownVille = (event) => {
    setSelectedVilleModal(event.target.value)
    setSelectedQuartierModal("Quartiers")
  }
  const handleChangeDropdownQuartier = (event) => {
    setSelectedQuartierModal(event.target.value)
  }
  const handleChangeNbrPoints = (event) => {
    setNbrPoints(event.target.value)
    setOeuvreData((prevState) => ({
      ...prevState,
      points: event.target.value,
    }))
  }
  const handleRadioChange = (event) => {
    setRadioValidate(event.target.value)
    setOeuvreData((prevState) => ({
      ...prevState,
      valide: parseInt(event.target.value),
    }))
  }
  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng)
        setOeuvreData((prevState) => ({
          ...prevState,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }))
      },
    })
  }

  const hSubmit = async (evt) => {
    evt.preventDefault()
    const formData = new FormData()
    let oeuvreUrl
    formData.append("photo", inputRef.current.files[0])
    formData.append("data", JSON.stringify(oeuvreData))

    if (inputRef.current.files[0]) {
      oeuvreUrl = inputRef.current.files[0]
    } else {
      oeuvreUrl = oeuvreData.oeuvreUrl
    }
    const { error } = schemaAdminOeuvre.validate({
      quartierId: oeuvreData.quartierId,
      lat: oeuvreData.lat,
      lng: oeuvreData.lng,
      oeuvreUrl,
      points: oeuvreData.points,
    })
    if (error) {
      console.error(error)
      setMessageFromBack(`Veuillez remplir tous les champs`)
    } else if (page === "modify" && idOeuvreToBeModified) {
      setMessageFromBack(`L'œuvre a bien été modifié`)
      axios({
        method: "PUT",
        url: `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/oeuvres/${idOeuvreToBeModified}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).catch((error) => console.error(error))
    } else {
      axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/admin/oeuvres`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          setMessageFromBack(`L'œuvre a bien été enregistrée`)
          setOeuvreData({ valide: 1, nb_vu: 0 })
          setSelectedVilleModal("VILLE")
          setSelectedQuartierModal("Quartiers")
          setNbrPoints(0)
          setMarkerPosition(null)
          setPosMapModal({
            lat: 46.53712,
            lng: 2.42949,
          })
          setFlyTo(null)
        })
        .catch((error) => console.error(error))
    }
  }
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/quartiers/${selectedVilleModal}`
      )
      .then((res) => res.data)
      .then((data) => {
        setListeQuartiersModal(data)
        if (listeVilles) {
          const [ville] = listeVilles.filter(
            (e) => e.nom === selectedVilleModal
          )

          if (ville && selectedQuartierModal === "Quartiers") {
            setPosMapModal({ lat: ville?.lat, lng: ville?.lng })
            setFlyTo([ville.lat, ville.lng])
          }
        }
      })
      .catch((error) => console.error(error))
  }, [selectedVilleModal])

  useEffect(() => {
    // Modification de la position et le zoom pour le mouvement flyTo quand la liste déroulante est modifiée

    if (selectedQuartierModal === "Quartiers") {
      setFlyTo(posMapModal)

      setZoom(12)
    } else {
      const [result] = listeQuartiersModal.filter(
        (quartier) => quartier.q === selectedQuartierModal
      )
      if (result) {
        setOeuvreData((prevState) => ({ ...prevState, quartierId: result.id }))
        setFlyTo([result.lat, result.lng])
        setZoom(15)
      }
    }
  }, [selectedQuartierModal])

  useEffect(() => {
    if (page === "modify" && idOeuvreToBeModified) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admin/oeuvresQuartierVille/${idOeuvreToBeModified}`
        )
        .then((res) => res.data)
        .then(([data]) => {
          if (data) {
            setNbrPoints(data.points)
            setSelectedVilleModal(data.nomVille)
            setSelectedQuartierModal(data.nomQuartier)
            setMarkerPosition({ lat: data.lat, lng: data.lng })
            setRadioValidate(data.valide.toString())
            setFlyTo([data.lat, data.lng])
            setOeuvreData((prevState) => ({
              ...prevState,
              quartierId: data.quartier_id,
              valide: 1,
              lat: data.lat,
              lng: data.lng,
              oeuvreUrl: data.url_photo,
              points: data.points,
              nb_vu: 0,
            }))
          }
        })
        .catch((error) => console.error(error))
    }
  }, [idOeuvreToBeModified])
  if (!open) return null
  return ReactDOM.createPortal(
    <div className="overlayModalAdminOeuvre" onClick={onClose}>
      {children}
      <div className="modalAdminOeuvreBackground">
        <div
          className="modalAdminOeuvre"
          ref={closeModalfromOutside}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>{page === "add" ? "Ajout" : "Modifier"} Oeuvre</h1>
          <div className="mapOeuvre">
            <MapContainer
              center={posMapModal}
              zoom={zoom}
              className="leaflet-container.leaflet-touch.leaflet-retina.leaflet-safari.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom"
            >
              <AddMarkerOnClick />
              {markerPosition && <Marker position={markerPosition}></Marker>}
              {flyTo ? (
                <MapFlyTo position={flyTo} zoom={zoom} duration={1} />
              ) : (
                ""
              )}
              <TileLayer url={osm.maptiler.url}></TileLayer>
            </MapContainer>
          </div>
          <form encType="multipart/form-data" onSubmit={hSubmit}>
            <label className="labelFile" htmlFor="file">
              Importer une photo
              <input id="file" type="file" name="photo" ref={inputRef} />
            </label>
            <div className="select">
              <label htmlFor="dropdownVille">
                Ville :
                <select
                  id="dropdownVille"
                  value={selectedVilleModal}
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
              </label>
              <label htmlFor="dropdownQuartier">
                Quartier :
                <select
                  id="dropdownQuartier"
                  value={selectedQuartierModal}
                  onChange={handleChangeDropdownQuartier}
                >
                  <option value="Quartiers">Quartiers</option>

                  {listeQuartiersModal && listeQuartiersModal.length !== 0
                    ? listeQuartiersModal.map((quartier, id) => (
                        <option key={quartier.q + id} value={quartier.q}>
                          {quartier.q}
                        </option>
                      ))
                    : ""}
                </select>
              </label>

              <label htmlFor="nbrPoints">
                Nombre de points :
                <input
                  id="nbrPoints"
                  type="text"
                  value={nbrPoints}
                  onChange={(e) => handleChangeNbrPoints(e)}
                />
              </label>
            </div>
            <div className="validationBlock">
              <p className="validationMessage">Validation</p>
              <label className="validate validateChoix1">
                Oui
                <input
                  id="validateChoix1"
                  name="validation"
                  value="1"
                  type="radio"
                  checked={radioValidate === "1"}
                  onChange={(e) => handleRadioChange(e)}
                />
              </label>
              <label className="validate validateChoix2">
                Non
                <input
                  id="validateChoix2"
                  name="validation"
                  value="0"
                  type="radio"
                  checked={radioValidate === "0"}
                  onChange={(e) => handleRadioChange(e)}
                />
              </label>
            </div>

            <p className="messageFromBack">{messageFromBack}</p>
            <div className="button">
              <button type="submit" className="buttonModalAdminOeuvre">
                Valider
              </button>
              <button
                className="buttonModalAdminOeuvre"
                onClick={(e) => closeModalAdminOeuvre(e)}
              >
                Retour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}
ModalAdminOeuvre.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalAdminOeuvre
