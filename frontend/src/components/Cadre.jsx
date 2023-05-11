import { useState } from "react"
import { BsFillBookmarkFill } from "react-icons/bs"

const Cadre = (props) => {
  const [active2, setActive2] = useState(false)

  const handleClick2 = () => {
    setActive2(!active2)
  }
  return (
    <div className="containerCadre">
      <img src={props.photo} className="picture" alt={props.alt} />
      <p className="containIcon">
        <BsFillBookmarkFill
          onClick={handleClick2}
          className={active2 ? "icon2Click" : "icon2"}
        />
      </p>
    </div>
  )
}

export default Cadre
