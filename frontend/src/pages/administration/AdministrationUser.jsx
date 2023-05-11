import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import instance from "../../axios/InstanceAxiosApi"
import ModalAdminUser from "@components/Modals/ModalAdminUser"
import Header from "@components/Header"

const AdministrationUser = () => {
  const accessToken = sessionStorage.getItem("accessToken")

  const [searchUser, setSearchUser] = useState("")
  const [responseUser, setResponseUser] = useState("")
  const [userDatas, setUserDatas] = useState("")
  const [modalAdminUser, setModalAdminUser] = useState(false)

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

  const resetSearchBar = () => {
    setResponseUser(null)
    setSearchUser("")
    setUserDatas("")
  }
  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // useEffect(() => {
  //   if (messageFromBack !== null) {
  //     setModalIsOpen(true)
  //   }
  // }, [messageFromBack])
  //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // const verif = () => {
  //   setModalIsOpen(false)
  //   setMessageFromBack(null)
  // }
  const openModalAdminUser = (e) => {
    setModalAdminUser(true)
  }

  return (
    <div className="bodyAdmin">
      <Header />
      <div className="admin">
        <div className="adminUserTitle">
          <h2>Administration</h2>
        </div>
        <div className="blocUtilisateur">
          <h1>Utilisateurs</h1>
          <form>
            {/* <form className="form"> */}
            <input
              type="username"
              placeholder="Pseudo ou adresse mail"
              autoComplete="username"
              onClick={(e) => resetSearchBar(e)}
              onChange={(e) => setSearchUser(e.target.value)}
              value={searchUser || ""}
            />
          </form>
          <div className="usersAdmin">
            {responseUser
              ? responseUser.map((response) => (
                  <div
                    className="categoryk"
                    key={response.id}
                    // openmodal XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    // onClick={(e) => setUserDatas([response])}
                    // onClick={(e) => setModalIsOpen(true)}
                    onClick={(e) => openModalAdminUser(e)}
                  >
                    <p>{response.pseudo}</p>
                    <p>{response.email}</p>
                  </div>
                ))
              : null}
          </div>
          <ModalAdminUser
            open={modalAdminUser}
            onClose={(e) => setModalAdminUser(false)}
            // onClose={() => verif()}
          ></ModalAdminUser>
        </div>
        <Link className="logo" to="/administrationville">
          <p>adminMap</p>
        </Link>
        <Link className="logo" to="/administrationoeuvres">
          <p>adminOeuvre</p>
        </Link>
      </div>
    </div>
  )
}

export default AdministrationUser
