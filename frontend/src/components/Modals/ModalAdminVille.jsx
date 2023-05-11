import React, { useRef, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import CustomClickOutside from "../../script/CustomClickOutside"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import osm from "../../script/osm-providers"
import instance from "../../axios/InstanceAxiosApi"

const ModalAdminVille = ({ open, children, onClose }) => {
  const accessToken = sessionStorage.getItem("accessToken")
  // Centrage de la carte sur la France
  const villeCordonnees = {
    lat: 46.53712,
    lng: 2.42949,
  }
  const zoom = 5

  const [nomVille, setNomVille] = useState("")
  const [valider, setValider] = useState(null)
  const [markerPosition, setMarkerPosition] = useState(null)
  // const [messageFromBack, setMessageFromBack] = useState(null)

  const closeModalfromOutside = useRef()
  CustomClickOutside(closeModalfromOutside, () => {})
  useEffect(() => {
    setMarkerPosition(markerPosition)
  }, [markerPosition])

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng)
      },
    })
  }
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const validate = () => {
    const villeDatas = [{ nom: nomVille, ...markerPosition }]

    const insertVille = async () => {
      try {
        const response = await instance.post("villes/add", villeDatas, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        console.info(response.data)
      } catch (error) {
        console.error(error.message)
      }
    }
    insertVille()
    setMarkerPosition(null)
    setNomVille(null)
    setValider(true)
    window.location.reload()
  }
  const closeModalAdminVille = () => {
    onClose(false)
    setValider(false)
  }

  if (!open) return null
  return ReactDOM.createPortal(
    <div>
      {children}
      <div className="overlayModalAdminVille" onClick={onClose}>
        <div
          className="modalStyleModalAdminVille adminVille"
          ref={closeModalfromOutside}
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Ajouter une ville</h1>
          <MapContainer
            center={villeCordonnees}
            zoom={zoom}
            className="leaflet-container.leaflet-touch.leaflet-retina.leaflet-safari.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom"
          >
            <AddMarkerOnClick />
            {markerPosition && <Marker position={markerPosition}></Marker>}
            <TileLayer url={osm.maptiler.url}></TileLayer>
          </MapContainer>
          <div className="adminVilleQuartier">
            <div className="form">
              <label htmlFor="inputAdminVille">Ville:</label>
              <input
                id="inputAdminVille"
                type="text"
                placeholder="Nom de la ville"
                onChange={(e) => setNomVille(e.target.value)}
                value={nomVille || ""}
              />
            </div>
            <div className="validationVille">
              {!valider ? (
                <button
                  className="buttonModalAdminVille"
                  onClick={(e) => validate(e)}
                >
                  Valider
                </button>
              ) : (
                <button
                  className="buttonModalAdminVille"
                  onClick={(e) => closeModalAdminVille(e)}
                >
                  Valider
                </button>
              )}
              <button
                className="buttonModalAdminVille"
                onClick={(e) => closeModalAdminVille(e)}
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}
ModalAdminVille.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalAdminVille
