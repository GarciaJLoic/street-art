import Menu from "../components/Menu"
import Cadre from "../components/Cadre"
import Filter from "@components/Filter"
import { Link } from "react-router-dom"
import oeuvres1 from "../assets/image/oeuvres1.png"
import Rectangle83 from "../assets/image/Rectangle83.svg"

const Oeuvre = () => {
  return (
    <div className="containerOeuvre">
      <div className="containerOeuvre2">
        <Link className="lienPageHome" to="/Home">
          <h4 className="titleStreet">
            Street <span id="colorTittle">App</span>
          </h4>
        </Link>
        <img src={Rectangle83} alt="rectangle" className="rectangle" />
        <h1 className="titleOeuvre">OEUVRES</h1>
        <Filter className="filterOeuvre" />
        <Cadre photo={oeuvres1} alt="oeuvres" />
        <Cadre photo={oeuvres1} alt="oeuvres" />
        <Cadre photo={oeuvres1} alt="oeuvres" />
        <Menu />
      </div>
    </div>
  )
}
export default Oeuvre
