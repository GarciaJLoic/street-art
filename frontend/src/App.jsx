import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Geoloc from "@pages/Geoloc"

// import "./App.scss"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/geoloc" element={<Geoloc />} />

      </Routes>
    </div>
  )
}

export default App
