import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import streetApp from "../../assets/image/streetApp.svg"
import instance from "../../axios/InstanceAxiosApi"
import User from "./User"

const AdministrationUser = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  //   const { user } = useContext(UserLoaderContext)
  const [searchUser, setSearchUser] = useState("")
  const [responseUser, setResponseUser] = useState("")
  const [userDatas, setUserDatas] = useState("")

  useEffect(() => {
    if (searchUser !== "") {
      const searching = { email: searchUser }
      const fetchUsers = async () => {
        try {
          const response = await instance.post("utilisateur/find", searching, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          setResponseUser(response.data)
        } catch (error) {
          console.error(error.message)
        }
      }
      fetchUsers()
    }
  }, [searchUser])

  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  useEffect(() => {
    if (userDatas !== "") {
      setResponseUser(null)

      setSearchUser("")
    }
  }, [userDatas])
  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const resetSearchBar = () => {
    setResponseUser(null)
    setSearchUser("")
    setUserDatas("")
  }

  return (
    <div className="bodyAdmin">
      {/* <Header/> */}
      <div className="headerAdmin">
        <Link className="logo" to="/">
          <img
            className="brand-nameAbout"
            src={streetApp}
            alt="logo Street App"
          ></img>
        </Link>
      </div>
      <div className="admin">
        <h1>Administration utilisateurs</h1>
        <form className="form">
          <input
            type="username"
            placeholder="Recherche utilisateur"
            autoComplete="username"
            onClick={(e) => resetSearchBar(e)}
            onChange={(e) => setSearchUser(e.target.value)}
            value={searchUser || ""}
          />
          <div className="users">
            {responseUser
              ? responseUser.map((response) => (
                  <p
                    key={response.id}
                    onClick={(e) => setUserDatas([response])}
                  >
                    {response.email}
                    &nbsp;{response.pseudo}
                  </p>
                ))
              : null}
          </div>
        </form>
        <div className="userHandling">
          <div className="userDatas">
            {userDatas
              ? userDatas.map((userData) => (
                  <User
                    key={userData.id}
                    avatar={userData.avatar}
                    pseudo={userData.pseudo}
                    nom={userData.nom}
                    prenom={userData.prenom}
                    email={userData.email}
                    privilege={userData.privilege_id}
                  />
                ))
              : null}
          </div>
          <div className="handling">
            <h2>Gestion des privilèges et accès</h2>
            <form className="handlingOptions">
              <ul>
                <li>
                  <input type="radio" name="access" id="1" value={1} />
                  <label htmlFor="1">Utilisateur</label>
                </li>
                <li>
                  <input type="radio" name="access" id="2" value={2} />
                  <label htmlFor="1">Administrateur</label>
                </li>
                <li>
                  <input type="radio" name="access" id="3" value={3} />
                  <label htmlFor="1">Resreint</label>
                </li>
                <li>
                  <input type="radio" name="access" id="9" value={9} />
                  <label htmlFor="1">PreZ</label>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdministrationUser
