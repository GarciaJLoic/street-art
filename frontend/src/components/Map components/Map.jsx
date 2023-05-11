import { useState, useRef, useContext, useEffect } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import osm from "../../script/osm-providers"

import { UserLoaderContext } from "../../contexts/UserLoaderContext"
import "leaflet/dist/leaflet.css"
import MapBlockDropdown from "./MapBlockDropdown"
import MapFilterCheckbox from "./MapFilterCheckbox"
import UserMap from "./UserMap"

import Markers from "./Markers"
import Menu from "../Menu"
import ModalScoreMap from "./ModalScoreMap"
import menu from "../../assets/image/iconMenu.png"
import plus from "../../assets/image/iconPlus.png"
function Map() {
  const [villeCordonnees, setVilleCordonnees] = useState(null)

  const [vuCheckbox, setVuCheckbox] = useState(false)
  const [markCheckbox, setMarkCheckbox] = useState(false)

  const [zoom, setZoom] = useState(12)
  const [flyTo, setFlyTo] = useState([])

  const mapRef = useRef()
  const [map, setMap] = useState(null)

  const { openModal, setOpenModal, scoreOeuvre, scoreUser } =
    useContext(UserLoaderContext)

  useEffect(() => {
    setOpenModal(false)
  }, [])

  return (
    <div className="map">
      <MapBlockDropdown
        villeCordonnees={villeCordonnees}
        setVilleCordonnees={setVilleCordonnees}
        setZoom={setZoom}
        setFlyTo={setFlyTo}
      />

      <div className="map-container">
        {villeCordonnees ? (
          <MapContainer
            center={villeCordonnees}
            ref={mapRef}
            zoom={zoom}
            whenReady={(mapInstance) => setMap(mapInstance)}
          >
            <TileLayer
              url={osm.maptiler.url}
              // attribution={osm.maptiler.attribution}
            ></TileLayer>

            {
              <Markers
                markCheckbox={markCheckbox}
                vuCheckbox={vuCheckbox}
                flyTo={flyTo}
                zoom={zoom}
                map={map}
              />
            }
          </MapContainer>
        ) : (
          ""
        )}
        {openModal && (
          <ModalScoreMap
            closeModal={setOpenModal}
            scoreOeuvre={scoreOeuvre}
            scoreUser={scoreUser}
          />
        )}
      </div>
      <div className="buttonBlock">
        <img src={plus} alt="icon plus" />

        <MapFilterCheckbox
          vuCheckbox={vuCheckbox}
          setVuCheckbox={setVuCheckbox}
          markCheckbox={markCheckbox}
          setMarkCheckbox={setMarkCheckbox}
        />
        <img className="opacity" src={menu} alt="menu" />
        <Menu />
      </div>
      <UserMap />
    </div>
  )
}

export default Map
