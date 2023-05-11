import Header from "../components/Header"
import Map from "../components/Map components/Map"
import { useEffect } from "react"
import instance from "../axios/InstanceAxiosApi"

const Exploration = () => {
  const accessToken = sessionStorage.getItem("accessToken")
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await instance.get("explore", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="exploration">
      <Header />
      <div className="exploration-title">
        <h2>Exploration</h2>
      </div>
      <Map />
    </div>
  )
}

export default Exploration
