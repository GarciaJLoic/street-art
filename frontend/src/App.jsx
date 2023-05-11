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
