import axios from "axios"
import React, { useEffect, useState, createContext } from "react"

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [listeOeuvres, setListeOeuvres] = useState([])
  const [decouverte, setDecouverte] = useState(null)
  const [favoris, setFavoris] = useState(null)
  const [scoreOeuvre, setScoreOeuvre] = useState(null)
  const [scoreUser, setScoreUser] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/utilisateur/${props.user}/score`
      )
      .then((res) => res.data)
      .then((data) => {
        setScoreUser(data.score)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }, [])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/oeuvresformap/${props.user}`)
      .then((res) => res.data)
      .then((data) => {
        setListeOeuvres(data)
      })
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }, [])
  useEffect(() => {
    if (decouverte) {
      decouverte.decouverte = 1
      setListeOeuvres((prev) =>
        prev.map((oeuvre) =>
          oeuvre.oeuvre_id === decouverte.oeuvre_id &&
          oeuvre.utilisateur_id === decouverte.utilisateur_id
            ? decouverte
            : oeuvre
        )
      )
      setOpenModal(true)

      setScoreOeuvre(decouverte.points)
      setScoreUser((prev) => prev + decouverte.points)
    }
  }, [decouverte])
  useEffect(() => {
    if (favoris) {
      favoris.mark === 0 ? (favoris.mark = 1) : (favoris.mark = 0)
      setListeOeuvres((prev) =>
        prev.map((oeuvre) =>
          oeuvre.oeuvre_id === favoris.oeuvre_id &&
          oeuvre.utilisateur_id === favoris.utilisateur_id
            ? favoris
            : oeuvre
        )
      )
    }
  }, [favoris])
  useEffect(() => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/oeuvresformap/decouverte`,
        decouverte
      )
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }, [decouverte])
  useEffect(() => {
    if (scoreUser) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/utilisateur/${props.user}/score`,
          {
            score: scoreUser,
          }
        )
        .catch((error) => {
          console.error("There was an error!", error)
        })
    }
  }, [scoreUser])
  useEffect(() => {
    if (favoris) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/oeuvresformap/favoris`,
          favoris
        )
        .then((res) => res.data)
        .catch((error) => {
          console.error("There was an error!", error)
        })
      setFavoris(null)
    }
  }, [favoris])
  return (
    <UserContext.Provider
      value={{
        listeOeuvres,
        setListeOeuvres,
        decouverte,
        setDecouverte,
        favoris,
        setFavoris,
        scoreOeuvre,
        setScoreOeuvre,
        scoreUser,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
