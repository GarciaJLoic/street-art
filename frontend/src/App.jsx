// import axios from "axios"
// import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Exploration from "./pages/Exploration"
import About from "./pages/About"
import ProfilTest from "./pages/profilTest"

// import "./App.scss"

function App() {
  // A voir pour générer state "connecté sur toutes les pages"
  // const [idUser, setIdUser] = useState(null);
  // useEffect(() => {
  //   // checks if connected
  //   const fetchToken = async () => {
  //     await axios.get(`http://localhost:5000/jwtId`, { withCredentials: true, credentials: 'include' })
  //       .then((res) => {
  //         setIdUser(res.data);
  //       })
  //       .catch((err) => console.error('No access granted'));
  //   };
  //   fetchToken();
  // }, [idUser]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Exploration />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiltest" element={<ProfilTest />} />
      </Routes>
    </div>
  )
}

export default App
