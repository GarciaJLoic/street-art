// import menuBackground from "../assets/image/menuBackground.png"
// import menuBurger from "../assets/image/menuBurger.svg"
// import { useState, useContext } from "react"
// import { Link } from "react-router-dom"
// // import { UserContext } from "../contexts/UserContext"
// import { UserLoaderContext } from "../contexts/UserLoaderContext"
// import ModalGetConnected from "./Modals/ModalGetConnected"

// function Menu() {
//   const [modalIsOpen, setModalIsOpen] = useState(false)
//   const [isOpen, setIsOpen] = useState(false)
//   const { user } = useContext(UserLoaderContext)
//   function toggleMenuBurger() {
//     setIsOpen((prev) => !prev)
//   }

//   return (
//     <>
//       {isOpen ? <div id="menu--content"></div> : null}
//       <div id="menu--global">
//         <div className="menu--container">
//           <img
//             src={menuBurger}
//             alt="Menu burger icon"
//             className={isOpen ? "menu--burgerImgOpen" : "menu--burgerImgClose"}
//             onClick={toggleMenuBurger}
//           />
//           {isOpen && (
//             <>
//               <div id="menu--burgerOpen">
//                 <ModalGetConnected
//                   open={modalIsOpen}
//                   onClose={() => setModalIsOpen(false)}
//                 ></ModalGetConnected>
//                 <nav className="menu--burgerNav">
//                   {isOpen ? (
//                     <img
//                       src={menuBackground}
//                       alt="background street art menu"
//                       className="menu--backgroundOpen"
//                     />
//                   ) : null}
//                   <ul>
//                     <li>
//                       <Link className="menu--link menu--actualites" to="/news">
//                         Actualités
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="menu--link" to="/about">
//                         À propos
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="menu--link" to="/art">
//                         Oeuvres
//                       </Link>
//                     </li>
//                     <li>
//                       {!user ? (
//                         <p
//                           className="menu--link"
//                           onClick={() => {
//                             setModalIsOpen(true)
//                           }}
//                         >
//                           Explorez la ville
//                         </p>
//                       ) : (
//                         <Link className="menu--link" to="/explore">
//                           Explorez la ville
//                         </Link>
//                       )}
//                     </li>
//                     <li>
//                       <Link className="menu--link" to="/rank">
//                         Classement
//                       </Link>
//                     </li>
//                     <li>
//                       {!user ? (
//                         <p
//                           className="menu--link menu--compte"
//                           onClick={() => {
//                             setModalIsOpen(true)
//                           }}
//                         >
//                           Mon compte
//                         </p>
//                       ) : (
//                         <Link className="menu--link menu--compte" to="/account">
//                           Mon compte
//                         </Link>
//                       )}
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Menu

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserLoaderContext } from "../contexts/UserLoaderContext"
import ModalGetConnected from "./Modals/ModalGetConnected"

function Menu() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(UserLoaderContext)

  function toggleMenuBurger() {
    setIsOpen((prev) => !prev)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <>
      {isOpen ? <div id="menu--content" onClick={closeMenu}></div> : null}
      <div id="menu--global">
        <div className="menu--container">
          <div
            className={
              isOpen ? "menu--burgerLinesOpen" : "menu--burgerLinesClose"
            }
            onClick={toggleMenuBurger}
          >
            <div className="menu--burgerLine"></div>
            <div className="menu--burgerLine"></div>
            <div className="menu--burgerLine orangeLine"></div>
          </div>
          {isOpen && (
            <>
              <div id="menu--burgerOpen">
                <ModalGetConnected
                  open={modalIsOpen}
                  onClose={() => setModalIsOpen(false)}
                ></ModalGetConnected>
                <nav className="menu--burgerNav">
                  <ul>
                    <li>
                      <Link className="menu--link menu--home" to="/">
                        Accueil
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
                      {!user ? (
                        <p
                          className="menu--link"
                          onClick={() => {
                            setModalIsOpen(true)
                          }}
                        >
                          Explorez la ville
                        </p>
                      ) : (
                        <Link className="menu--link" to="/explore">
                          Explorez la ville
                        </Link>
                      )}
                    </li>
                    <li>
                      <Link className="menu--link" to="/rank">
                        Classement
                      </Link>
                    </li>
                    <li>
                      {!user ? (
                        <p
                          className="menu--link menu--compte"
                          onClick={() => {
                            setModalIsOpen(true)
                          }}
                        >
                          Mon compte
                        </p>
                      ) : (
                        <Link className="menu--link menu--compte" to="/account">
                          Mon compte
                        </Link>
                      )}
                    </li>
                  </ul>
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
