import { useState, useEffect } from "react"
import instance from "../../axios/InstanceAxiosApi"

const User = ({ onClose, nom, prenom, pseudo, email, privilege }) => {
  const accessToken = sessionStorage.getItem("accessToken")
  const [accessLevel, setAccessLevel] = useState(null)
  const [messageFromBack, setMessageFromBack] = useState(null)

  let niveauAcces = privilege
  if (privilege === 1) {
    niveauAcces = "Utilisateur"
  } else if (privilege === 2) {
    niveauAcces = "Administrateur"
  } else if (privilege === 3) {
    niveauAcces = "Restreint"
  } else {
    niveauAcces = "Prez"
  }

  useEffect(() => {
    setAccessLevel(accessLevel)
    const userDatas = [
      {
        email,
        privilege_id: parseInt(accessLevel, 10),
      },
    ]

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
    if (accessLevel !== null) {
      updateUserAccess()
      // onClose()
    }
  }, [accessLevel])

  const changeAcces = (e) => {
    setAccessLevel(e)
  }

  return (
    <div className="userDisplay">
      <p className="categoryModalUser">
        Nom:&nbsp;<span className="dataModalUser">{nom}</span>
      </p>
      <p className="categoryModalUser">
        Prénom:&nbsp;<span className="dataModalUser">{prenom}</span>
      </p>
      <p className="categoryModalUser">
        Pseudo:&nbsp;<span className="dataModalUser">{pseudo}</span>
      </p>
      <p className="categoryModalUser">
        Email:&nbsp;<span className="dataModalUser">{email}</span>
      </p>
      <div className="accessOptions">
        <p className="categoryModalUser">Accès:&nbsp;</p>
        <select
          name="acces"
          id="acces"
          onChange={(e) => changeAcces(e.target.value)}
          onClick={() => setMessageFromBack(null)}
        >
          <option value={privilege} className="dataModalUser">
            {niveauAcces}
          </option>
          <option value="1">Utilisateur</option>
          <option value="2">Administrateur</option>
          <option value="3">Restreint</option>
        </select>
      </div>
      <p className=" messageFromBack">{messageFromBack}</p>
    </div>
  )
}
export default User
