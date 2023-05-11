import Menu from "../components/Menu"
import { Link } from "react-router-dom"

import streetApp from "../assets/image/streetApp.svg"
import bandeauAbout from "../assets/image/bandeauAbout.svg"
import shape1 from "../assets/image/shape1.svg"
import shape2 from "../assets/image/shape2.svg"
// import shape1About from "../assets/image/shape1About.svg"
// import shape2About from "../assets/image/shape2About.svg"
// import shape3About from "../assets/image/shape3About.svg"

export default function About() {
  return (
    // <div className="backgroundAbout">
    //   <Link className="logo" to="/">
    //     <img className="streetAppLogo" src={streetApp} alt="logo"></img>
    //   </Link>
    //   <div className="containerAbout">
    //     <h1 className="titleAbout">À propos</h1>
    //     <img className="bandeauAbout" src={bandeauAbout} alt="bandeau"></img>
    //   </div>
    //   <p className="textAbout">
    //     Street App est une application qui vous permet de découvrir les oeuvres
    //     de street art présentes autour de chez vous.<br></br>
    //     <br></br>Comment ça marche ? C'est très simple !<br></br>
    //     Il vous suffit de créer un compte et d'ouvrir les portes de
    //     l'exploration urbaine ... <br></br>
    //     <br></br>Vous aurez alors le choix de sortir dans la jungle et
    //     d'arpenter quartiers et rues afin de découvrir les oeuvres à proximité
    //     de votre position ou bien alors de prendre le temps de les découvrir au
    //     chaud chez vous et de choisir celles qui vous attirent le plus !
    //     <br></br>
    //     <br></br>L'équipe Street App vous souhaite une bonne découverte !
    //   </p>
    //   <Menu />
    // </div>
    <div className="containerAllAbout">
      <header className="headerAbout">
        <Link className="logo" to="/">
          <img
            className="brand-nameAbout"
            src={streetApp}
            alt="logo Street App"
          ></img>
        </Link>
      </header>
      <div className="containerBGAbout">
        <div className="bgShapesAbout">
          <div className="shape1About-container">
            <img className="shape1About" src={shape1} alt="shape1"></img>
          </div>
          <div className="shape2About-container">
            <img className="shape2About" src={shape2} alt="shape2"></img>
          </div>
        </div>
      </div>
      <div className="allAbout">
        <h1 className="titleAbout">À propos</h1>
        <img className="bandeauAbout" src={bandeauAbout} alt="bandeau"></img>
        <p className="textAbout">
          Street App est une application qui vous permet de découvrir les
          oeuvres de street art présentes autour de chez vous.<br></br>
          <br></br>Comment ça marche ? C'est très simple !<br></br>
          Il vous suffit de créer un compte et d'ouvrir les portes de
          l'exploration urbaine ... <br></br>
          <br></br>Vous aurez alors le choix de sortir dans la jungle et
          d'arpenter quartiers et rues afin de découvrir les oeuvres à proximité
          de votre position ou bien alors de prendre le temps de les découvrir
          au chaud chez vous et de choisir celles qui vous attirent le plus !
          <br></br>
          <br></br>L'équipe Street App vous souhaite une bonne découverte !
        </p>
      </div>
      <Menu />
    </div>
  )
}
