import axios from "axios"
import L from "leaflet"
import React, { useEffect, useState, useMemo, useRef } from "react"
import MapFlyTo from "./MapFlyTo"
import { Marker, Popup } from "react-leaflet"
import PropTypes from "prop-types"
import validationPosition from "../script/validationPosition"

const Markers = ({ markCheckbox, vuCheckbox, flyTo, zoom, map }) => {
  const [listeOeuvres, setListeOeuvres] = useState([])
  const [validationPosUsers, setValidationPosUsers] = useState("Nop")
  const [posUsers, setPosUsers] = useState([
    44.83862654144651, -0.5825808773447223,
  ])
  const markerRef = useRef(null)
  const myIcon = {
    vu: L.icon({
      iconUrl: "http://localhost:5000/assets/images/vu.png",
      iconSize: [25, 41],
    }),
    pasVu: L.icon({
      iconUrl: "http://localhost:5000/assets/images/pasVu.png",
      iconSize: [25, 41],
    }),
    mark: L.icon({
      iconUrl: "http://localhost:5000/assets/images/mark.png",
      iconSize: [25, 41],
    }),
    users: L.icon({
      iconUrl: "http://localhost:5000/assets/images/users.png",
      iconSize: [41, 41],
    }),
  } // Icones des spots la map
  useEffect(() => {
    axios
      .get("http://localhost:5000/oeuvresformap")
      .then((res) => res.data)
      .then((data) => {
        setListeOeuvres(data)
      })
  }, [])

  useEffect(() => {
    // Provoque le re-render de la map en modifiant listeOeuvre
    setListeOeuvres((curr) => {
      return [...curr]
    })
  }, [markCheckbox, vuCheckbox])

  // useEffect(() => {
  //   // Ajoute la classe qui gére l'opacité
  //   const spots = document.getElementsByClassName("leaflet-marker-icon")
  //   if (spots.length !== 0) {
  //     const elems = [...spots]
  //     elems.forEach((e) => {
  //       e.classList.add("transitionOpacityOn")
  //     })
  //   }
  // }, [flyTo, posUsers, listeOeuvres])

  useEffect(() => {
    const dragable = document.querySelector(".leaflet-marker-draggable")
    dragable.style.zIndex = 9000
  }, [])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosUsers(marker.getLatLng())
        }
      },
    }),
    []
  )
  return (
    <>
      <Marker
        position={posUsers}
        draggable={true}
        eventHandlers={eventHandlers}
        ref={markerRef}
        icon={myIcon.users}
      ></Marker>
      {map &&
        listeOeuvres // filtre les oeuvres selon leur type
          .filter(
            (f) =>
              (markCheckbox // Si le bouton favoris est actif prende en compte le type d'oeuvre
                ? f.mark === 1
                : vuCheckbox // Sinon prendre en compte l'état de découverte
                ? f.decouverte === 1
                : f.decouverte === 0) ||
              (vuCheckbox ? f.decouverte === 1 : f.decouverte === 0)
          )
          .map(
            (
              donnee,
              id // fait apparaître les spots
            ) => (
              <Marker
                eventHandlers={{
                  click: () =>
                    validationPosition.handleButtonClick(
                      donnee.lat,
                      donnee.lng,
                      posUsers.lat,
                      posUsers.lng,
                      setValidationPosUsers
                    ),
                }}
                key={id}
                position={[donnee.lat, donnee.lng]}
                icon={
                  markCheckbox && donnee.mark === 1
                    ? myIcon.mark
                    : donnee.decouverte === 1
                    ? myIcon.vu
                    : myIcon.pasVu
                }
              >
                <Popup>{validationPosUsers}</Popup>
              </Marker>
            )
          )}
      {/* Component qui gère les movement de carte */}
      {flyTo ? <MapFlyTo position={flyTo} zoom={zoom} duration={1} /> : ""}
    </>
  )
}
Markers.propTypes = {
  markCheckbox: PropTypes.bool,
  vuCheckbox: PropTypes.bool,
  flyTo: PropTypes.array,
  myIcon: PropTypes.object,
  zoom: PropTypes.number,
  map: PropTypes.object,
}
export default Markers
