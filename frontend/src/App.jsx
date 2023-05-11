import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Exploration from "./pages/Exploration"
import About from "./pages/About"
import UserContextProvider from "./contexts/UserContext"
import Rank from "./pages/Rank"
import Profil from "./pages/Profil.jsx"

// import "./App.scss"

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Exploration />} />
          <Route path="/about" element={<About />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/account" element={<Profil />} />
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
