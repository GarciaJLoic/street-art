import React from "react"

const isWithin25m = (latitude1, longitude1, latitude2, longitude2) => {
  const R = 6371e3
  const φ1 = latitude1 * (Math.PI / 180)
  const φ2 = latitude2 * (Math.PI / 180)
  const Δφ = (latitude2 - latitude1) * (Math.PI / 180)
  const Δλ = (longitude2 - longitude1) * (Math.PI / 180)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance <= 25
}

const resultValidation = (
  validation,
  message,
  favoris,
  donnee = null,
  decouverte = null
) => {
  const handleClick = (func, donnee) => {
    const close = document.querySelector(".leaflet-popup-close-button")
    if (close) {
      close.click()
      func(donnee)
    }
  }
  const renderButton = (func, donnee) => {
    return React.createElement(
      "button",
      { onClick: () => handleClick(func, donnee) },
      "Validez"
    )
  }

  const buttonDecouverte = renderButton(decouverte, donnee)
  const buttonFavoris = renderButton(favoris, donnee)
  const messageFavoris = " Ajouter / Supprimer favori : "

  const content = (
    <div className="blockPopUp">
      <img
        className="oeuvreMap"
        src={`
          ${import.meta.env.VITE_BACKEND_URL}/uploads/oeuvres/${
          donnee.url_photo
        }
          `}
        alt={donnee.url_photo}
      />
      <h1>{message}</h1>
      {decouverte ? (
        <>
          {buttonDecouverte}
          <br />
        </>
      ) : (
        <br />
      )}
      {messageFavoris}
      {buttonFavoris}
    </div>
  )
  validation(content)
}
const handleButtonClick = (
  oeuvreLat,
  oeuvreLng,
  userLat,
  userLng,
  donnee,
  setValidationPopup,
  setDecouverte,
  setFavoris
) => {
  const isWithin25mResult = isWithin25m(userLat, userLng, oeuvreLat, oeuvreLng)

  if (donnee.decouverte) {
    resultValidation(
      setValidationPopup,
      `Vous avez déjà découvert ce spot !`,
      setFavoris,
      donnee
    )
  } else {
    isWithin25mResult
      ? resultValidation(
          setValidationPopup,
          `C'est gagné !`,
          setFavoris,
          donnee,
          setDecouverte
        )
      : resultValidation(
          setValidationPopup,
          `Encore un peu loin :(`,
          setFavoris,
          donnee
        )
  }
}
export default { handleButtonClick }
