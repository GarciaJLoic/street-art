// import menuBackground from "../assets/image/menuBackground.png"
import menuBurger from "../assets/image/menuBurger.svg"
import { useState } from "react"
import { Link } from "react-router-dom"

function Menu() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenuBurger() {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div id={isOpen ? "menu--content" : ""}></div>
      <div id="menu--global">
        <div className="menu--container">
          <img
            src={menuBurger}
            alt="Menu burger icon"
            className={isOpen ? "menu--burgerImgOpen" : "menu--burgerImgClose"}
            onClick={toggleMenuBurger}
          />
          {isOpen && (
            <>
              <div id="menu--burgerOpen">
                <nav className="menu--burgerNav">
                  <ul>
                    <li>
                      <Link className="menu--link menu--actualites" to="/news">
                        Actualités
                      </Link>
                    </li>
                    <li>
                      <Link className="menu--link" to="/about">
                        À propos
                      </Link>
                    </li>
                    <li>
                      <Link className="menu--link" to="/art">
                        Oeuvres
                      </Link>
                    </li>
                    <li>
                      <Link className="menu--link" to="/explore">
                        Explorez la ville
                      </Link>
                    </li>
                    <li>
                      <Link className="menu--link" to="/rank">
                        Classement
                      </Link>
                    </li>
                    <li>
                      <Link className="menu--link menu--compte" to="/account">
                        Mon compte
                      </Link>
                    </li>
                  </ul>
                  {/* <img
                    src={menuBackground}
                    alt="background street art menu"
                    className={isOpen ? "menu--backgroundOpen" : ""}
                  /> */}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Menu
