import axios from "axios"
import { useState, useEffect } from "react"
import Menu from "../components/Menu"
import Cadre from "../components/Cadre"
import BlockFilterOeuvre from "../components/BlockFilterOeuvre"
import Header from "../components/Header"
import Rectangle83 from "../assets/image/Rectangle83.svg"
import BackgroundOeuvre from "../assets/image/BackgroundOeuvre.svg"

const Oeuvre = () => {
  const [listeOeuvres, setListeOeuvres] = useState([])

  const [listeVilles, setListeVilles] = useState()
  const [selectedVille, setSelectedVille] = useState("Ville")

  const [listeQuartiers, setListeQuartiers] = useState()
  const [selectedQuartier, setSelectedQuartier] = useState("Quartiers")
  useEffect(() => {
    if (selectedVille === "Ville") {
      fetch("http://localhost:5000/oeuvres")
        .then((response) => response.json())
        .then((data) => setListeOeuvres(data))
    }
  }, [selectedVille])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/villes`)
      .then((res) => res.data)
      .then((data) => {
        setListeVilles(data)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/quartiers/${selectedVille}`
      )
      .then((res) => res.data)
      .then((data) => {
        setListeQuartiers(data)
      })
      .catch((error) => console.error(error))
  }, [selectedVille])

  useEffect(() => {
    ;(selectedQuartier !== "Quartiers" && selectedVille !== "Ville"
      ? axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admin/oeuvresbyquartier/${selectedQuartier}`
        )
      : selectedVille !== "Ville"
      ? axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admin/oeuvresbyville/${selectedVille}`
        )
      : axios.get(`${import.meta.env.VITE_BACKEND_URL}/oeuvres`)
    )
      .then((res) => res.data)
      .then((data) => {
        setListeOeuvres(data)
      })
      .catch((error) => console.error(error))
  }, [selectedVille, selectedQuartier])
  return (
    <div className="containerOeuvre">
      <div className="containerOeuvre2">
        <Header />
        <img className="bgOeuvre" src={BackgroundOeuvre}></img>
        <div className="allOeuvre">
          <h1 className="titleOeuvre">Oeuvres</h1>
          <img className="bandeauOeuvre" src={Rectangle83} alt="bandeau"></img>
          <BlockFilterOeuvre
            page="oeuvre"
            setSelectedVille={setSelectedVille}
            setSelectedQuartier={setSelectedQuartier}
            selectedVille={selectedVille}
            selectedQuartier={selectedQuartier}
            listeVilles={listeVilles}
            listeQuartiers={listeQuartiers}
          />
          <div className="scrollableContainer">
            <Cadre alt="oeuvres" listeOeuvres={listeOeuvres} />
            <Menu />
            <div className="fadeTop"></div>
            <div className="blackBottom"></div>
            <div className="fadeBottom"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Oeuvre
