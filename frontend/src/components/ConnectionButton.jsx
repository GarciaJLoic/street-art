import { Link } from "react-router-dom"

import arrow from "../assets/image/arrow.svg"

export default function ConnectionButton() {
  return (
    <Link className="connectionLink" to="/connection">
      <button className="connection-button">
        Connexion <img src={arrow} style={{ width: "20px" }}></img>
      </button>
    </Link>
  )
}
