const User = ({ avatar, nom, prenom, pseudo, email, privilege }) => {
  return (
    <>
      <p>{avatar}</p>
      <p className="category">
        <span className="data">Nom:</span>&nbsp;{nom}
      </p>
      <p className="category">
        <span className="data">Prénom:</span>&nbsp;{prenom}
      </p>
      <p className="category">
        <span className="data">Pseudo:</span>&nbsp;{pseudo}
      </p>
      <p className="category">
        <span className="data">Email:</span>&nbsp;{email}
      </p>
      <p className="category">
        <span className="data">Accès:</span>&nbsp;{privilege}
      </p>
    </>
  )
}
export default User
