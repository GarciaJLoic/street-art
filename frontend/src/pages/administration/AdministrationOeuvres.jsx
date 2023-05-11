import { Link } from "react-router-dom"
import streetApp from "../../assets/image/streetApp.svg"

const AdministrationOeuvres = () => {
  return (
    <div className="bodyAdmin">
      <div className="headerAdmin">
        <Link className="logo" to="/">
          <img
            className="brand-nameAbout"
            src={streetApp}
            alt="logo Street App"
          ></img>
        </Link>
      </div>
      <div className="admin"></div>
    </div>
  )
}
export default AdministrationOeuvres
