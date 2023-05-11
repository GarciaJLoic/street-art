import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
// import instance from '../axios/InstanceAxiosApi';

const ProfilTest = () => {
  const [users, setUsers] = useState([])
  // const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))
  const accessToken = sessionStorage.getItem("accessToken")

  useEffect(() => {
    // const fetchUsers = () => {
    axios
      .get(`http://localhost:5000/profiltest`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        // console.log(("front..profil...", res.data))
        setUsers(res.data)
      })
      .catch((error) => {
        console.error(error.message)
        window.location = "/"
      })
  }, [])

  return (
    <div>
      <p>DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD</p>
      <div>
        {users
          ? users.map((user) => (
              <div key={user.pseudo}>
                <p>{user.pseudo}</p>
                <p>{user.email}</p>
                <p>{user.avatar}</p>
              </div>
            ))
          : null}
      </div>
      <Link to="/">Classement</Link>
    </div>
  )
}

export default ProfilTest

// Access token check
// useEffect(() => {

//     const fetchUsers = async () => {
//         try {
//             const response = await instance.get('profiltest', {
//                 headers: { Authorization: `Bearer ${accessToken}` },
//             });
//             console.log(('front..profil...', response.data));
//             setUsers(response.data);
//         } catch (error) {
//             console.error(error.message);
//         }
//     };
//     fetchUsers();
//     // window.location.reload();
// }, []);
