const BlockFilter = ({
  checkboxValidateOeuvreAdmin,
  setCheckboxValidateOeuvreAdmin,
  handleClickAdd,
  setSelectedVille,
  setSelectedQuartier,
  selectedVille,
  selectedQuartier,
  listeVilles,
  listeQuartiers,
}) => {
  const handleChangeDropdownVille = (event) => {
    setSelectedVille(event.target.value)
    setSelectedQuartier("Quartiers")
  }
  const handleChangeDropdownQuartier = (event) => {
    setSelectedQuartier(event.target.value)
  }
  const handleCheckboxChange = (func) => {
    func((prevState) => !prevState)
  }

  return (
    <div className="admin-block-filter">
      <button
        className="ajoutOeuvre"
        type="button"
        onClick={() => {
          handleClickAdd()
        }}
      >
        Ajouter une oeuvre
      </button>
      <div className="select">
        <select
          id="dropdownVille"
          value={selectedVille}
          onChange={handleChangeDropdownVille}
        >
          <option value="Ville">Ville</option>
          {listeVilles && listeVilles.length !== 0
            ? listeVilles.map((ville, id) => (
                <option key={ville.nom + id} value={ville.nom}>
                  {ville.nom}
                </option>
              ))
            : ""}
        </select>
        <select
          id="dropdownQuartier"
          value={selectedQuartier}
          onChange={handleChangeDropdownQuartier}
        >
          <option value="Quartiers">Quartiers</option>

          {listeQuartiers && listeQuartiers.length !== 0
            ? listeQuartiers.map((quartier, id) => (
                <option key={quartier.q + id} value={quartier.q}>
                  {quartier.q}
                </option>
              ))
            : ""}
        </select>
      </div>
      <p className="filterValidateOeuvre">
        <label htmlFor="validate">Oeuvres à valider :</label>
        <input
          className="checkbox"
          type="checkbox"
          name="validate"
          id="validate"
          checked={checkboxValidateOeuvreAdmin}
          onChange={() => handleCheckboxChange(setCheckboxValidateOeuvreAdmin)}
        />
        <label htmlFor="validate" className="checkbox-label-validate">
          {" "}
        </label>
      </p>
    </div>
  )
}
export default BlockFilter
