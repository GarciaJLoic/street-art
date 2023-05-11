import axios from "axios"
const AdminOeuvres = ({ oeuvre, setListeOeuvres }) => {
  const handleClickDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/admin/oeuvres/${oeuvre.id}`)
      .then(setListeOeuvres((prev) => prev.filter((e) => oeuvre.id !== e.id)))
      .then(alert("l'oeuvre a bien été suprimée"))

      .catch((error) => console.error(error))
  }
  return (
    <div className="adminOeuvre">
      <img
        className="oeuvreImage"
        src={`
          ${import.meta.env.VITE_BACKEND_URL}/assets/images/oeuvres/${
          oeuvre.url_photo
        }
          `}
        alt={oeuvre.url_photo}
      />
      <button className="update" type="button">
        Modifier
      </button>
      <button
        className="delete"
        type="button"
        onClick={() => {
          handleClickDelete()
        }}
      >
        Supprimer
      </button>
    </div>
  )
}
export default AdminOeuvres
