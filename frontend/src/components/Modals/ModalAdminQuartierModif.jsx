import React, { useRef, useState, useMemo } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import CustomClickOutside from "../../script/CustomClickOutside"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import osm from "../../script/osm-providers"
import instance from "../../axios/InstanceAxiosApi"
// import axios from "axios"

const ModalAdminQuartierModif = ({
  open,
  children,
  onClose,
  nomVille,
  lngVille,
  latVille,
  quartierLat,
  quartierLng,
  nomQuartier,
  idQuartier,
  selectRef,
  resetSelect,
}) => {
  const accessToken = sessionStorage.getItem("accessToken")
  const markerRef = useRef(null)
  const coordQuartier = {
    lat: quartierLat,
    lng: quartierLng,
  }
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
  const [nouveauNomQuartier, setNouveauNomQuartier] = useState(null)
  const [erreur, setErreur] = useState(null)
  const [posQuartier, setPosQuartier] = useState(coordQuartier)

  const closeModalfromOutside = useRef()
  CustomClickOutside(closeModalfromOutside, () => {})

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const validate = () => {
    let majNomQuartier = ""
    nouveauNomQuartier === null
      ? (majNomQuartier = nomQuartier)
      : (majNomQuartier = nouveauNomQuartier)
    if (posQuartier !== null && majNomQuartier !== null) {
      const quartierDatas = [
        { id: idQuartier, nom: majNomQuartier, ...posQuartier },
      ]
      const mofifyQuartier = async () => {
        try {
          const response = await instance.put(
            `admin/quartier/modify/`,
            quartierDatas,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          setMessageFromBack(response.data)
        } catch (error) {
          console.error(error.message)
        }
      }
      mofifyQuartier()
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
    setNouveauNomQuartier(null)
    setMarkerPosition(null)
    setErreur(null)
    setPosQuartier(coordQuartier)
    resetSelect(selectRef)
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosQuartier(marker.getLatLng())
        }
      },
    }),
    []
  )

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
          <h1>Modifier quartier</h1>
          <h2>{nomVille}</h2>
          <MapContainer
            center={coordonneesMap}
            zoom={zoom}
            className="leaflet-container.leaflet-touch.leaflet-retina.leaflet-safari.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom"
          >
            {quartierLat && quartierLng ? (
              <Marker
                key={idQuartier}
                draggable={true}
                eventHandlers={eventHandlers}
                ref={markerRef}
                position={posQuartier}
                icon={myIcon.pasVu}
              >
                <Popup>{nomQuartier}</Popup>
              </Marker>
            ) : null}

            {/* <AddMarkerOnClick /> */}
            {markerPosition && <Marker position={markerPosition}></Marker>}
            <TileLayer url={osm.maptiler.url}></TileLayer>
          </MapContainer>
          <div className="adminVilleQuartier">
            <div className="form quartier">
              <label htmlFor="inputAdminVille">Quartier:</label>
              <input
                id="inputAdminVille"
                type="text"
                placeholder={nomQuartier}
                onChange={(e) => setNouveauNomQuartier(e.target.value)}
                value={nouveauNomQuartier || ""}
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
ModalAdminQuartierModif.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalAdminQuartierModif
