import PropTypes from "prop-types"

const MapFilterCheckbox = ({
  vuCheckbox,
  setVuCheckbox,
  markCheckbox,
  setMarkCheckbox,
}) => {
  const handleCheckboxChange = (func) => {
    func((prevState) => !prevState)
  }
  return (
    <form className="filterCheckbox">
      <div className="checkbox-container">
        <label htmlFor="mark">Favoris</label>
        <input
          className="checkbox"
          type="checkbox"
          name="mark"
          id="mark"
          checked={markCheckbox}
          onChange={() => handleCheckboxChange(setMarkCheckbox)}
        />
        <label htmlFor="mark" className="checkbox-label">
          {" "}
        </label>
      </div>
      <div className="checkbox-container">
        <label htmlFor="vu">Déjà vu</label>

        <input
          className="checkbox"
          type="checkbox"
          name="vu"
          id="vu"
          checked={vuCheckbox}
          onChange={() => handleCheckboxChange(setVuCheckbox)}
        />
        <label htmlFor="vu" className="checkbox-label">
          {" "}
        </label>
      </div>
    </form>
  )
}
MapFilterCheckbox.propTypes = {
  markCheckbox: PropTypes.bool,
  vuCheckbox: PropTypes.bool,
  setMarkCheckbox: PropTypes.func,
  setVuCheckbox: PropTypes.func,
}
export default MapFilterCheckbox
