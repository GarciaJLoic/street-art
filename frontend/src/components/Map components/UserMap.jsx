import axios from "axios"
// import React, { useEffect, useState, createContext } from "react"
import { useEffect, useContext } from "react"
// export const UserContext = createContext()
import { UserLoaderContext } from "../../contexts/UserLoaderContext"

const UserMap = () => {
  const {
    setListeOeuvres,
    decouverte,
    setDecouverte,
    favoris,
    setFavoris,
    user,
    setScoreOeuvre,
    scoreUser,
    setOpenModal,
    setScoreUser,
  } = useContext(UserLoaderContext)
  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/utilisateur/${user.id}/score`)
        .then((res) => res.data)
        .then((data) => {
          setScoreUser(data.score)
        })
        .catch((error) => {
          console.error("There was an error!", error)
        })
    }
  }, [user])
  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/oeuvresformap/${user.id}`)
        .then((res) => res.data)
        .then((data) => {
          setListeOeuvres(data)
        })
        .catch((error) => {
          console.error("There was an error!", error)
        })
    }
  }, [user])
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
    if (decouverte) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/oeuvresformap/decouverte`,
          decouverte
        )
        .catch((error) => {
          console.error("There was an error!", error)
        })

      setDecouverte(null)
    }
  }, [decouverte])
  useEffect(() => {
    if (scoreUser) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/utilisateur/${user.id}/score`,
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
}

export default UserMap
