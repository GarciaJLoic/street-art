import Menu from "../components/Menu"
import Cadre from "../components/Cadre"
import BlockFilter from "../components/administration/BlockFilter"
import Header from "../components/Header"
import Rectangle83 from "../assets/image/Rectangle83.svg"
import BackgroundOeuvre from "../assets/image/BackgroundOeuvre.svg"

const Oeuvre = () => {
  return (
    <div className="containerOeuvre">
      <div className="containerOeuvre2">
        <Header />
        <img className="bgOeuvre" src={BackgroundOeuvre}></img>
        <div className="allOeuvre">
          <h1 className="titleOeuvre">Oeuvres</h1>
          <img className="bandeauOeuvre" src={Rectangle83} alt="bandeau"></img>
          <BlockFilter page="oeuvre" />
          <div className="scrollableContainer">
            <Cadre alt="oeuvres" />
            <Menu />
            <div className="fadeBottom"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Oeuvre
