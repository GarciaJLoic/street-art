import Menu from "../components/Menu"

import Header from "../components/Header"
import bandeauAbout from "../assets/image/bandeauAbout.svg"
import aboutBG from "../assets/image/aboutBG.svg"

export default function About() {
  return (
    <>
      <img className="bgAbout" src={aboutBG} alt="background à propos"></img>
      <Header />
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
    </>
  )
}
