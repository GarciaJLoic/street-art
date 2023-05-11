import Header from "../components/Header"
import Menu from "../components/Menu"

import bgNews from "../assets/image/bgNews.svg"
// import bandeauNews from "../assets/image/bandeauNews.svg"

export default function News() {
  return (
    <>
      <Header />
      <img className="bgNews" src={bgNews}></img>
      {/* <div className="allNews">
        <h1 className="titleNews">Actualités</h1>
        <img
          className="bandeauNews"
          src={bandeauNews}
          alt="bandeau"
        ></img>
      </div> */}
      <Menu />
    </>
  )
}
