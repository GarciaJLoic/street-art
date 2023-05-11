import { useState, useEffect } from "react"

import Menu from "../components/Menu"
import Header from "../components/Header"

import classement from "../assets/image/classement.svg"
import bandeauClassement from "../assets/image/bandeauClassement.svg"
import arrayRankBG2 from "../assets/image/arrayRankBG2.svg"

function Rank() {
  const [utilisateur, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/utilisateur")
      .then((response) => response.json())
      .then((data) => setUsers(data))
  }, [])

  return (
    <>
      <Header />
      <img className="bgRank" src={classement}></img>
      <div className="allRank">
        <h1 className="titleRank">Classement</h1>
        <img
          className="bandeauClassement"
          src={bandeauClassement}
          alt="bandeau"
        ></img>
      </div>
      <div className="rankUlContainer">
        <ul className="rankingUl">
          {utilisateur.map((user) => (
            <li key={user.id}>
              {/* <img src={user.avatar} /> */}
              <span>{user.pseudo}</span>
              <span className="userScore">{user.score} pts</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rankArrayContainer">
        <img className="rankArrayBG" src={arrayRankBG2}></img>
      </div>
      {/* <UserRankingList /> */}
      <Menu />
    </>
  )
}

export default Rank
