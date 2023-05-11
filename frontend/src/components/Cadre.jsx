import { useState, useEffect } from "react"

import bgCadreOeuvre from "../assets/image/bgCadreOeuvre.svg"

const Cadre = () => {
  const [oeuvre, setOeuvre] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/oeuvres")
      .then((response) => response.json())
      .then((data) => setOeuvre(data))
  }, [])

  return (
    <>
      <div className="containerCadre">
        <div className="picture">
          <ul className="mapOeuvre">
            {oeuvre.map((oeuvre) => (
              <li key={oeuvre.id}>
                <div
                  className="imageWrapper"
                  style={{ backgroundImage: `url(${bgCadreOeuvre})` }}
                >
                  <img
                    className="cadreOeuvre"
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/oeuvres/${
                      oeuvre.url_photo
                    }`}
                    alt={oeuvre.titre}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Cadre
