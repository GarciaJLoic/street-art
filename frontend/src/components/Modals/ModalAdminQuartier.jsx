import React, { useRef, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import CustomClickOutside from "../../script/CustomClickOutside"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet"
import osm from "../../script/osm-providers"
import instance from "../../axios/InstanceAxiosApi"
// import axios from "axios"

const ModalAdminQuartier = ({
  open,
  children,
  onClose,
  nomVille,
  idVille,
  lngVille,
  latVille,
  quartiersCoordonnees,
  selectRef,
  resetSelect,
}) => {
  const accessToken = sessionStorage.getItem("accessToken")
  const coordonneesMap = {
    lat: latVille,
    lng: lngVille,
  }
  const zoom = 11
  const myIcon = {
    pasVu: L.icon({
      iconUrl: `${import.meta.env.VITE_BACKEND_URL}/assets/images/pasVu.png`,
      iconSize: [25, 41],
    }),
  }
  const [valider, setValider] = useState(null)
  const [markerPosition, setMarkerPosition] = useState(null)
  const [messageFromBack, setMessageFromBack] = useState(null)
  const [nomQuartier, setNomQuartier] = useState(null)
  const [erreur, setErreur] = useState(null)

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
    if (markerPosition !== null && nomQuartier !== null) {
      const quartierDatas = [
        { ville_id: idVille, nom: nomQuartier, ...markerPosition },
      ]
      const insertQuartier = async () => {
        try {
          const response = await instance.post(`quartier/add/`, quartierDatas, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          setMessageFromBack(response.data)
        } catch (error) {
          console.error(error.message)
        }
      }
      insertQuartier()
      setMarkerPosition(null)
      setValider(true)
      setErreur(null)
    } else {
      setErreur("informations manquantes")
    }
  }

  const closeModalAdminVille = (e) => {
    onClose(false)
    setValider(false)
    setNomQuartier(null)
    setMarkerPosition(null)
    setErreur(null)
    resetSelect(selectRef)
    window.location.reload()
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
          <h1>Ajouter un quartier</h1>
          <h2>{nomVille}</h2>
          <MapContainer
            center={coordonneesMap}
            zoom={zoom}
            className="leaflet-container.leaflet-touch.leaflet-retina.leaflet-safari.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom"
          >
            {quartiersCoordonnees
              ? quartiersCoordonnees.map((quartierCoordonnees) => (
                  <Marker
                    key={quartierCoordonnees.id}
                    position={[
                      quartierCoordonnees.lat,
                      quartierCoordonnees.lng,
                    ]}
                    icon={myIcon.pasVu}
                  >
                    <Popup>{quartierCoordonnees.q}</Popup>
                  </Marker>
                ))
              : null}

            <AddMarkerOnClick />
            {markerPosition && <Marker position={markerPosition}></Marker>}
            <TileLayer url={osm.maptiler.url}></TileLayer>
          </MapContainer>
          <div className="adminVilleQuartier">
            <div className="form quartier">
              <label htmlFor="inputAdminVille">Quartier:</label>
              {/* <label className="quartier" htmlFor="inputAdminVille">Quartier:</label> */}
              <input
                id="inputAdminVille"
                type="text"
                placeholder="Nom du quartier"
                onChange={(e) => setNomQuartier(e.target.value)}
                value={nomQuartier || ""}
              />
            </div>
            <p className="errormessage">{erreur}</p>
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
                  {messageFromBack}, retour
                </button>
              )}
              <button
                className="buttonModalAdminVille"
                onClick={(e) => closeModalAdminVille(e)}
              >
                retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}
ModalAdminQuartier.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalAdminQuartier
