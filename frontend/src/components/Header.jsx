// const Header = () => {
//   return (
//     <div className="header">
//       <h1>
//         Street <span>App</span>
//       </h1>
//     </div>
//   )
// }

// export default Header

import { Link } from "react-router-dom"
import streetApp from "../assets/image/streetApp.svg"

const Header = () => {
  return (
    <div className="headerPages">
      <Link className="logo" to="/">
        <img
          className="brand-nameAbout"
          src={streetApp}
          alt="logo Street App"
        ></img>
      </Link>
    </div>
  )
}

export default Header
