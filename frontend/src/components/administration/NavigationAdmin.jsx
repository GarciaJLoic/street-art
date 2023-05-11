import { Link } from "react-router-dom"

const NavigationAdmin = () => {
  const isSelected = (path) => {
    return location.pathname === path
  }

  return (
    <div className="links-container">
      <div className="gradient-bg"></div>
      <Link
        className={`logo${
          isSelected("/administrationuser") ? " selected" : ""
        }`}
        to="/administrationuser"
      >
        <p>•</p>
      </Link>
      <Link
        className={`logo${
          isSelected("/administrationville") ? " selected" : ""
        }`}
        to="/administrationville"
      >
        <p>•</p>
      </Link>
      <Link
        className={`logo${
          isSelected("/administrationoeuvres") ? " selected" : ""
        }`}
        to="/administrationoeuvres"
      >
        <p>•</p>
      </Link>
    </div>
  )
}

export default NavigationAdmin
