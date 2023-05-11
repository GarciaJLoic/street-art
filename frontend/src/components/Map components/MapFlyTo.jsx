import { useEffect } from "react"
import { useMap } from "react-leaflet"
const MapFlyTo = ({ position, zoom, duration }) => {
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, zoom, { duration })
  }, [position, zoom, duration, map])
}

export default MapFlyTo
