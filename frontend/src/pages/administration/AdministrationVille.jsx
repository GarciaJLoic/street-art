import "leaflet/dist/leaflet.css"
import {
  MapContainer,
  Marker,
  // Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet"
import osm from "../../script/osm-providers"
import { useState, useEffect } from "react"
import axios from "axios"

const AdministrationVille = () => {
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Position initiale carte XXXXXXXXXXXXXXXXXXXXXXXXXX
  //   const [villeCordonnees, setVilleCordonnees] = useState(null)
  // const villeCordonnees = {
  //     lat:46.53712,
  //     lng:2.42949
  // }
  // const zoom = 5;
  const villeCordonnees = {
    lat: 44.3398721822,
    lng: 1.206521987915,
  }
  const zoom = 14
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const [nomVille, setNomVille] = useState("")
  const [villes, setVilles] = useState(null)
  const [markerPosition, setMarkerPosition] = useState(null)
  // const [changeNomVille, setChangeNomVille] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/villes`).then((res) => {
      setVilles(res.data)
    })
  }, [])

  useEffect(() => {
    setMarkerPosition(markerPosition)
    // console.log(markerPosition)
  }, [markerPosition])

  const AddMarkerOnClick = () => {
    // function AddMarkerOnClick() {
    useMapEvents({
      // const map = useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng)
      },
    })
    return null
  }

  const validate = () => {
    setMarkerPosition(null)
  }

  return (
    <div className="bodyAdminVilleQuartier">
      <div className="map-container">
        <MapContainer center={villeCordonnees} zoom={zoom}>
          <AddMarkerOnClick />
          {markerPosition && <Marker position={markerPosition}></Marker>}
          {/* {markerPosition && <Marker position={markerPosition}><Popup>You clicked here</Popup></Marker>} */}
          <TileLayer url={osm.maptiler.url}></TileLayer>
        </MapContainer>
      </div>
      <div className="adminVilleQuartier">
        {markerPosition !== null ? (
          <form className="form">
            <input
              type="text"
              placeholder="Nom de la ville"
              // onClick={(e) => resetSearchBar(e)}
              onChange={(e) => setNomVille(e.target.value)}
              value={nomVille || ""}
            />
            <button onClick={(e) => validate(e)}>Valider</button>
          </form>
        ) : null}

        {/* <div className="handling"> */}
        <form className="form">
          {villes !== null
            ? villes.map((ville) => (
                // <div key={ville.id}>
                //   <p>{ville.nom}</p>
                // </div>
                <input
                  key={ville.id}
                  type="text"
                  // placeholder="Nom de la ville"
                  placeholder={ville.nom}
                  // onClick={(e) => resetSearchBar(e)}
                  // onChange={(e) => setVille(e.target.value)}
                  // value={ville.nom || ville}
                />
              ))
            : null}
          <button onClick={(e) => validate(e)}>Modifier</button>
          {/* </div> */}
        </form>
      </div>
    </div>
  )
}

export default AdministrationVille
