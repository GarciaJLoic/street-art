import { useState } from "react"

const Filter = () => {
  const [displayQuartier, setDisplayQuartier] = useState("")
  const [displayVille, setDisplayVille] = useState("")

  const change = () => {
    setDisplayVille(true)
  }

  const listQuartierB = () => {
    return (
      <select className="listQ" name="QuartierB">
        <option value="1">Bastide Niel</option>
        <option value="2">Bacalan</option>
        <option value="3">Le Burck</option>
        <option value="4">Saint Augustin</option>
        <option value="5">Le prèche</option>
        <option value="6">Montaigne</option>
        <option value="7">Chartrons</option>
        <option value="8">Victor Hugo</option>
        <option value="9">Bègles</option>
        <option value="10">Nansouty</option>
      </select>
    )
  }

  const listQuartierN = () => {
    return (
      <select className="listQ" name="QuartierN">
        <option value="1">Cimiez</option>
        <option value="2">Promenade des Anglais</option>
        <option value="3">Centre Ville</option>
        <option value="4">Le Port</option>
      </select>
    )
  }

  return (
    <div className="bloc">
      <div className="blocVilles">
        <button id="buttonV" onClick={change}>
          VILLES
        </button>
        {displayVille && (
          <select
            onChange={(e) => {
              setDisplayQuartier(e.target.value)
            }}
            className="listV"
            name="Villes"
          >
            <option></option>
            <option value="1">Bordeaux</option>
            <option value="2">Nice</option>
          </select>
        )}
      </div>
      <div className="blocQuartiers">
        <button id="buttonQ">QUARTIERS</button>
        {displayQuartier === "1" ? listQuartierB() : null}
        {displayQuartier === "2" ? listQuartierN() : null}
      </div>
    </div>
  )
}
export default Filter
