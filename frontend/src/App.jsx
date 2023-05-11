import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Exploration from "./pages/Exploration"
import About from "./pages/About"
import Profil from "./pages/Profil.jsx"

// import "./App.scss"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Exploration />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Profil />} />
      </Routes>
    </div>
  )
}

export default App
