import { Link } from "react-router-dom"

export default function ConnectionButton() {
  return (
    <Link className="connectionLink" to="/connection">
      <button className="connection-button">Connexion</button>
    </Link>
  )
}
