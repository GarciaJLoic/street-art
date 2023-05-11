import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Explore from "./pages/explore"

// import "./App.scss"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  )
}

export default App
