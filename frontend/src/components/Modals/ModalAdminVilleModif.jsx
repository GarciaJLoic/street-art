import React, { useRef, useState, useMemo } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import CustomClickOutside from "../../script/CustomClickOutside"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import osm from "../../script/osm-providers"
import instance from "../../axios/InstanceAxiosApi"
// import axios from "axios"

const ModalAdminVilleModif = ({
  open,
  children,
  onClose,
  idVille,
  nomVille,
  lngVille,
  latVille,
  selectRef,
  resetSelect,
}) => {
  const accessToken = sessionStorage.getItem("accessToken")
  const markerRef = useRef(null)

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
  const [nouveauNomVille, setNouveauNomVille] = useState(null)
  const [erreur, setErreur] = useState(null)
  const [posVille, setPosVille] = useState(coordonneesMap)

  const closeModalfromOutside = useRef()
  CustomClickOutside(closeModalfromOutside, () => {})

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const validate = () => {
    let majNomVille = ""
    nouveauNomVille === null
      ? (majNomVille = nomVille)
      : (majNomVille = nouveauNomVille)
    if (posVille !== null && majNomVille !== null) {
      const villeDatas = [{ id: idVille, nom: majNomVille, ...posVille }]
      const mofifyVille = async () => {
        try {
          const response = await instance.put(
            `admin/villes/modify/`,
            villeDatas,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          setMessageFromBack(response.data)
        } catch (error) {
          console.error(error.message)
        }
      }
      mofifyVille()
      setMarkerPosition(null)
      setValider(true)
      setErreur(null)
      window.location.reload()
    } else {
      setErreur("informations manquantes")
    }
  }

  const closeModalAdminVille = (e) => {
    onClose(false)
    setValider(false)
    setNouveauNomVille(null)
    setMarkerPosition(null)
    setErreur(null)
    setPosVille(coordonneesMap)
    resetSelect(selectRef)
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosVille(marker.getLatLng())
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
          <h1>Modifier Ville</h1>
          <h2>{nomVille}</h2>
          <MapContainer
            center={coordonneesMap}
            zoom={zoom}
            className="leaflet-container.leaflet-touch.leaflet-retina.leaflet-safari.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom"
          >
            {latVille && lngVille ? (
              <Marker
                key={idVille}
                draggable={true}
                eventHandlers={eventHandlers}
                ref={markerRef}
                position={posVille}
                icon={myIcon.pasVu}
              ></Marker>
            ) : null}

            {markerPosition && <Marker position={markerPosition}></Marker>}
            <TileLayer url={osm.maptiler.url}></TileLayer>
          </MapContainer>
          <div className="adminVilleQuartier">
            <div className="form quartier">
              <label htmlFor="inputAdminVille">Ville:</label>
              <input
                id="inputAdminVille"
                type="text"
                placeholder={nomVille}
                onChange={(e) => setNouveauNomVille(e.target.value)}
                value={nouveauNomVille || ""}
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
ModalAdminVilleModif.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalAdminVilleModif
