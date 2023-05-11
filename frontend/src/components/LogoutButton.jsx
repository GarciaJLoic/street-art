import axios from "axios"
import cookie from "js-cookie"
import arrow from "../assets/image/arrow.svg"

const LogOut = () => {
  // jwt deletion
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_URL}/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt")
        sessionStorage.clear()
        window.location = "/"
      })
      .catch((err) => console.error(err))
    window.location = "/"
  }

  return (
    <div>
      <button className="connection-button" onClick={(e) => logout(e)}>
        Déconnexion&nbsp;
        <img src={arrow} style={{ width: "20px" }} />
      </button>
    </div>
  )
}
export default LogOut
