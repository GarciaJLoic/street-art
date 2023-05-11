import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import instance from "../../axios/InstanceAxiosApi"
import User from "./User"
import ModalMessageFromBack from "@components/Modals/ModalMessageFromBack"
import streetApp from "../../assets/image/streetApp.svg"

const AdministrationUser = () => {
  const accessToken = sessionStorage.getItem("accessToken")

  const [privilege, setPrivilege] = useState("")
  const [searchUser, setSearchUser] = useState("")
  const [responseUser, setResponseUser] = useState("")
  const [userDatas, setUserDatas] = useState("")
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)
  const [isChecked9, setIsChecked9] = useState(false)
  const [messageFromBack, setMessageFromBack] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

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

  const accessLevelChange1 = (e) => {
    setPrivilege(e.target.value)
    !isChecked1 ? setIsChecked1(true) : setIsChecked1(false)
  }
  const accessLevelChange2 = (e) => {
    setPrivilege(e.target.value)
    !isChecked2 ? setIsChecked2(true) : setIsChecked2(false)
  }
  const accessLevelChange3 = (e) => {
    setPrivilege(e.target.value)
    !isChecked3 ? setIsChecked3(true) : setIsChecked3(false)
  }
  const accessLevelChange9 = (e) => {
    setPrivilege(e.target.value)
    !isChecked9 ? setIsChecked9(true) : setIsChecked9(false)
  }

  const confirmAccessLevelChange = () => {
    const accessChange = userDatas
    accessChange[0].privilege_id = parseInt(privilege, 10)
    setUserDatas(accessChange)

    const updateUserAccess = async () => {
      try {
        const response = await instance.put("utilisateur/update", userDatas, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        setMessageFromBack(response.data)
      } catch (error) {
        console.error(error.message)
      }
    }
    updateUserAccess()

    if (isChecked1) {
      setIsChecked1(false)
    }
    if (isChecked2) {
      setIsChecked2(false)
    }
    if (isChecked3) {
      setIsChecked3(false)
    }
    if (isChecked9) {
      setIsChecked9(false)
    }
  }
  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const resetSearchBar = () => {
    setResponseUser(null)
    setSearchUser("")
    setUserDatas("")
  }
  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXX
  useEffect(() => {
    if (messageFromBack !== null) {
      setModalIsOpen(true)
    }
  }, [messageFromBack])
  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXX
  const verif = () => {
    setModalIsOpen(false)
    setMessageFromBack(null)
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
      <ModalMessageFromBack
        open={modalIsOpen}
        onClose={() => verif()}
        message={messageFromBack}
      ></ModalMessageFromBack>
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
                    className="category"
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
                  <input
                    type="radio"
                    name="access"
                    id="1"
                    value="1"
                    checked={isChecked1}
                    onChange={accessLevelChange1}
                  />
                  <label className="radioLabel" htmlFor="1">
                    Utilisateur
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="access"
                    id="2"
                    value="2"
                    checked={isChecked2}
                    onChange={accessLevelChange2}
                  />
                  <label className="radioLabel" htmlFor="1">
                    Administrateur
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="access"
                    id="3"
                    value="3"
                    checked={isChecked3}
                    onChange={accessLevelChange3}
                  />
                  <label className="radioLabel" htmlFor="1">
                    Restreint
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="access"
                    id="9"
                    value="9"
                    checked={isChecked9}
                    onChange={accessLevelChange9}
                  />
                  <label className="radioLabel" htmlFor="1">
                    PreZ
                  </label>
                </li>
              </ul>
            </form>
            <p
              className="accessLevelChange"
              onClick={(e) => confirmAccessLevelChange(e)}
            >
              Valider
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdministrationUser
