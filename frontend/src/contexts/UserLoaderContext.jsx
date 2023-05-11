import { useEffect, createContext, useState } from "react"
import axios from "axios"
// import { UserContext } from "../contexts/UserContext"
export const UserLoaderContext = createContext()

const UserLoaderContextProvider = (props) => {
  // const { setUser } = useContext(UserContext)
  // const [user, setUser] = useState(null)
  const [user, setUser] = useState(null)
  const [listeOeuvres, setListeOeuvres] = useState([])
  const [decouverte, setDecouverte] = useState(null)
  const [favoris, setFavoris] = useState(null)
  useEffect(() => {
    // checks if connected
    const fetchToken = async () => {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/jwtId`, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => console.error("No access granted..Userloader", err))
    }
    fetchToken()
  }, [])

  return (
    <UserLoaderContext.Provider
      value={{
        // user,
        // setUser,
        user,
        setUser,
        listeOeuvres,
        setListeOeuvres,
        decouverte,
        setDecouverte,
        favoris,
        setFavoris,
      }}
    >
      {props.children}
    </UserLoaderContext.Provider>
  )
}
export default UserLoaderContextProvider
