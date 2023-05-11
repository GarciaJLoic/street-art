import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Exploration from "./pages/Exploration"
import About from "./pages/About"

// import "./App.scss"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Exploration />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
