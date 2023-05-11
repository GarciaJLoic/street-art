import axios from "axios"
// import React, { useEffect, useState, createContext } from "react"
import { useEffect, useContext } from "react"
// export const UserContext = createContext()
import { UserLoaderContext } from "../../contexts/UserLoaderContext"

const UserMap = () => {
  const { setListeOeuvres, decouverte, favoris, setFavoris, user } =
    useContext(UserLoaderContext)

  useEffect(() => {
    axios
      // .get(`http://localhost:5000/oeuvresformap/${user2}`)
      .get(`http://localhost:5000/oeuvresformap/${user.id}`)
      .then((res) => res.data)
      .then((data) => {
        // console.log("usercontext.....", user);
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
      .put(`http://localhost:5000/oeuvresformap/decouverte`, decouverte)
      .then((res) => res.data)
      .catch((error) => {
        console.error("There was an error!", error)
      })
  }, [decouverte])
  useEffect(() => {
    if (favoris) {
      axios
        .put(`http://localhost:5000/oeuvresformap/favoris`, favoris)
        .then((res) => res.data)
        .catch((error) => {
          console.error("There was an error!", error)
        })
      setFavoris(null)
    }
  }, [favoris])
}

export default UserMap
