import ReactDOM from "react-dom"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import React, { useRef, useState, useEffect } from "react"

import CustomClickOutside from "../../script/CustomClickOutside"
import PropTypes from "prop-types"
import { schemaAddeuvreByUser } from "../../script/joi"

const ModalAddOeuvre = ({ open, onClose, children, posUsers }) => {
  const inputRef = useRef(null)
  const [messageFromBack, setMessageFromBack] = useState(null)

  const [oeuvreData, setOeuvreData] = useState({
    valide: 0,
    nb_vu: 0,
    quartierId: 0,
    lat: posUsers.lat,
    lng: posUsers.lng,
  })
  const closeModalfromOutside = useRef()

  useEffect(() => {
    setOeuvreData({
      valide: 0,
      nb_vu: 0,
      quartierId: 0,
      lat: posUsers.lat,
      lng: posUsers.lng,
    })
  }, [posUsers])

  CustomClickOutside(closeModalfromOutside, () => {})

  const closeModalAdminOeuvre = () => {
    onClose(false)
    setOeuvreData({
      valide: 0,
      nb_vu: 0,
      quartierId: 0,
      lat: posUsers.lat,
      lng: posUsers.lng,
    })
    setMessageFromBack(null)
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
    const { error } = schemaAddeuvreByUser.validate({
      quartierId: oeuvreData.quartierId,
      lat: oeuvreData.lat,
      lng: oeuvreData.lng,
      oeuvreUrl,
    })
    if (error) {
      console.error(error)
      setMessageFromBack(`Veuillez remplir tous les champs`)
    } else {
      setMessageFromBack(`L'œuvre a bien été enregistrée`)
      axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/admin/oeuvres`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          setOeuvreData({
            valide: 0,
            nb_vu: 0,
            quartierId: 0,
            lat: posUsers.lat,
            lng: posUsers.lng,
          })
        })
        .catch((error) => console.error(error))
    }
  }

  if (!open) return null
  return ReactDOM.createPortal(
    <div className="overlayModalOeuvre" onClick={onClose}>
      {children}
      <div
        className="modalOeuvre"
        ref={closeModalfromOutside}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalAddOeuvre">
          <div className="modalAddOeuvreBackground">
            <form encType="multipart/form-data" onSubmit={hSubmit}>
              <h2>Ajoute un spot</h2>
              <label className="labelFile" htmlFor="file">
                Importer une photo
                <input id="file" type="file" name="photo" ref={inputRef} />
              </label>

              <div className="button">
                <button
                  className="buttonAddOeuvreRetour"
                  onClick={(e) => closeModalAdminOeuvre(e)}
                >
                  Retour
                </button>
                <button type="submit" className="buttonAddOeuvreValidez">
                  Validez
                </button>
              </div>
            </form>
            <p className="messageFromBack">{messageFromBack}</p>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}
ModalAddOeuvre.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
}

export default ModalAddOeuvre
