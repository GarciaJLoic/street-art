import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import News from "./pages/News"
import Oeuvre from "./pages/Oeuvre"
import Exploration from "./pages/Exploration"
import About from "./pages/About"
import Rank from "./pages/Rank"
import Profil from "./pages/Profil.jsx"

import "./App.scss"
import UserLoaderContextProvider from "./contexts/UserLoaderContext"

function App() {
  return (
    <div className="App">
      <UserLoaderContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/explore" element={<Exploration />} />
          <Route path="/art" element={<Oeuvre />} />
          <Route path="/about" element={<About />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/account" element={<Profil />} />
        </Routes>
      </UserLoaderContextProvider>
    </div>
  )
}
//
export default App
