// import React, { useState, useEffect } from "react"
// import axios from "axios"
import mesPhotos from "../assets/image/mesPhotos.png"

function ProfilGallery() {
  // const [photos, setPhotos] = useState([])

  // useEffect(() => {
  //   // todo changer l'url
  //   axios.get("http://localhost:4242/").then((res) => setPhotos(res.data))
  // }, [])
  return (
    <div>
      <h2 className="profilGallery--title">Mes photos :</h2>

      <div className="profilGallery--global">
        <img src={mesPhotos} />
        {/* {photos.map((image) => (
          <div key={image.id}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default ProfilGallery
