/*  const [latUser, setLatUser] = useState()
  const [longitUser, setLongitUser] = useState() */
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
  // setDistanceOeuvre(distance)
  return distance <= 25
}
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        resolve({ latitude, longitude })
        /*    setLatUser(latitude)
          setLongitUser(longitude) */
      },
      (error) => {
        reject(error)
      }
    )
  })
}
const handleButtonClick = (
  oeuvreLat,
  oeuvreLng,
  userLat,
  userLng,
  setValidationPopup
) => {
  getPosition()
    .then((position) => {
      //   const { latitude, longitude } = position
      const isWithin25mResult = isWithin25m(
        userLat,
        userLng,
        oeuvreLat,
        oeuvreLng
        //   43.8697984,
        //   -1.3172736
      )
      isWithin25mResult
        ? setValidationPopup("Vous êtes arrivé !")
        : setValidationPopup(`Vous êtes trop loin !`)
    })
    .catch((error) => console.error(error))
}
export default { handleButtonClick }
