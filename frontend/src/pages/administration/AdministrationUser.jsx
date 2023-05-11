import { useState, useEffect } from "react"
import instance from "../../axios/InstanceAxiosApi"
import ModalAdminUser from "@components/Modals/ModalAdminUser"
import Header from "@components/Header"
import NavigationAdmin from "@components/administration/NavigationAdmin"

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

  const openModalAdminUser = (responseData) => {
    setUserDatas(responseData)
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
                    onClick={() => openModalAdminUser(response)}
                  >
                    <p>{response.pseudo}</p>
                    <p>{response.email}</p>
                  </div>
                ))
              : null}
          </div>
          {userDatas ? (
            // console.log(userDatas)
            <ModalAdminUser
              open={modalAdminUser}
              onClose={(e) => setModalAdminUser(false)}
              key={userDatas.id}
              avatar={userDatas.avatar}
              pseudo={userDatas.pseudo}
              nom={userDatas.nom}
              prenom={userDatas.prenom}
              email={userDatas.email}
              privilege={userDatas.privilege_id}
            ></ModalAdminUser>
          ) : null}
        </div>
      </div>
      <NavigationAdmin />
    </div>
  )
}

export default AdministrationUser
