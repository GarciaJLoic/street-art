import { useState, useRef, useContext, useEffect } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import osm from "../../script/osm-providers"

import { UserLoaderContext } from "../../contexts/UserLoaderContext"
import "leaflet/dist/leaflet.css"
import MapBlockDropdown from "./MapBlockDropdown"
import MapFilterCheckbox from "./MapFilterCheckbox"
import UserMap from "./UserMap"
import ModalAddOeuvre from "../Modals/ModalAddOeuvre"

import Markers from "./Markers"
import Menu from "../Menu"
import ModalScoreMap from "./ModalScoreMap"
import menu from "../../assets/image/iconMenu.png"
import plus from "../../assets/image/iconPlus.svg"
function Map() {
  const [isRotated, setIsRotated] = useState(false)

  const [villeCordonnees, setVilleCordonnees] = useState(null)

  const [vuCheckbox, setVuCheckbox] = useState(false)
  const [markCheckbox, setMarkCheckbox] = useState(false)

  const [zoom, setZoom] = useState(12)
  const [flyTo, setFlyTo] = useState([])

  const mapRef = useRef()
  const [map, setMap] = useState(null)
  const [modalAddOeuvre, setModalAddOeuvre] = useState(false)
  const { openModal, setOpenModal, scoreOeuvre, scoreUser } =
    useContext(UserLoaderContext)
  const [posUsers, setPosUsers] = useState(
    // 44.82666547827471, -0.5653309995596228,
    { lat: 44.82986477471, lng: -0.58583099956228 }
  )
  useEffect(() => {
    setOpenModal(false)
  }, [])

  useEffect(() => {
    if (!modalAddOeuvre) {
      setIsRotated(false)
    }
  }, [modalAddOeuvre])

  return (
    <div className="map">
      <MapBlockDropdown
        villeCordonnees={villeCordonnees}
        setVilleCordonnees={setVilleCordonnees}
        setZoom={setZoom}
        setFlyTo={setFlyTo}
        setPosUsers={setPosUsers}
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
                posUsers={posUsers}
                setPosUsers={setPosUsers}
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
        <img
          src={plus}
          alt="icon plus"
          className={isRotated ? "img-rotate" : ""}
          onClick={() => {
            setModalAddOeuvre((prevState) => !prevState)
            setIsRotated((prevState) => !prevState)
          }}
        />
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

      <ModalAddOeuvre
        open={modalAddOeuvre}
        onClose={(e) => setModalAddOeuvre(false)}
        posUsers={posUsers}
      />
    </div>
  )
}

export default Map
