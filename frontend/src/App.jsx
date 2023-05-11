import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Oeuvre from "./pages/Oeuvre"
import Exploration from "./pages/Exploration"
import About from "./pages/About"
import Rank from "./pages/Rank"
// import AdministrationUser from "./pages/administration/AdministrationUser"
import Profil from "./pages/Profil.jsx"

import "./App.scss"
import UserLoaderContextProvider from "./contexts/UserLoaderContext"
import AdministrationUser from "./pages/administration/AdministrationUser"
import AdministrationOeuvres from "@pages/administration/AdministrationOeuvres"
import AdministrationVille from "@pages/administration/AdministrationVille"
import AdministrationQuartier from "@pages/administration/AdministrationQuartier"

function App() {
  return (
    <div className="App">
      <UserLoaderContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Exploration />} />
          <Route path="/art" element={<Oeuvre />} />
          <Route path="/about" element={<About />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/account" element={<Profil />} />
          <Route path="/administrationuser" element={<AdministrationUser />} />
          <Route
            path="/administrationquartier/:id"
            element={<AdministrationQuartier />}
          />
          <Route
            path="/administrationville"
            element={<AdministrationVille />}
          />
          <Route
            path="/administrationoeuvres"
            element={<AdministrationOeuvres />}
          />
        </Routes>
      </UserLoaderContextProvider>
    </div>
  )
}
//
export default App
