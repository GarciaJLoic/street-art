// const AdministrationVille = () => {
//   const accessToken = sessionStorage.getItem("accessToken")
//   // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Position initiale carte XXXXXXXXXXXXXXXXXXXXXXXXXX
//   //   const [villeCordonnees, setVilleCordonnees] = useState(null)
//   // const villeCordonnees = {
//   //     lat:46.53712,
//   //     lng:2.42949
//   // }
//   // const zoom = 5;
//   const villeCordonnees = {
//     lat: 44.3398721822,
//     lng: 1.206521987915,
//   }
//   const zoom = 14
//   // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//   const [nomVille, setNomVille] = useState("")
//   const [villes, setVilles] = useState(null)
//   const [markerPosition, setMarkerPosition] = useState(null)
//   const [messageFromBack, setMessageFromBack] = useState(null)
//   // const [changeNomVille, setChangeNomVille] = useState(null)

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/villes`).then((res) => {
//       setVilles(res.data)
//     })
//   }, [])

//   useEffect(() => {
//     setMarkerPosition(markerPosition)
//   }, [markerPosition])

//   const AddMarkerOnClick = () => {
//     useMapEvents({
//       click(e) {
//         setMarkerPosition(e.latlng)
//       },
//     })
//   }
//   // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//   const validate = () => {
//     const villeDatas = [{ nom: nomVille, ...markerPosition }]

//     const fetchUsers = async () => {
//       try {
//         const response = await instance.post("ville/add", villeDatas, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         })
//         setMessageFromBack(response.data)
//       } catch (error) {
//         console.error(error.message)
//       }
//     }
//     fetchUsers()

//     setMarkerPosition(null)
//     setNomVille(null)
//   }
//   // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//   return (
//     <div className="bodyAdmin">
//       <div className="map-container">
//         <MapContainer center={villeCordonnees} zoom={zoom}>
//           <AddMarkerOnClick />
//           {markerPosition && <Marker position={markerPosition}></Marker>}
//           {/* {markerPosition && <Marker position={markerPosition}><Popup>You clicked here</Popup></Marker>} */}
//           <TileLayer url={osm.maptiler.url}></TileLayer>
//         </MapContainer>
//       </div>
//       <div className="adminVilleQuartier">
//         {markerPosition !== null ? (
//           <div className="form">
//             <input
//               type="text"
//               placeholder="Nom de la ville"
//               onChange={(e) => setNomVille(e.target.value)}
//               value={nomVille || ""}
//             />
//             <button onClick={(e) => validate(e)}>Valider</button>
//             <p>{messageFromBack}</p>
//           </div>
//         ) : null}

//         <form className="form">
//           {villes !== null
//             ? villes.map((ville) => (
//                 // <div key={ville.id}>
//                 //   <p>{ville.nom}</p>
//                 // </div>
//                 <input
//                   key={ville.id}
//                   type="text"
//                   // placeholder="Nom de la ville"
//                   placeholder={ville.nom}
//                   // onClick={(e) => resetSearchBar(e)}
//                   // onChange={(e) => setVille(e.target.value)}
//                   // value={ville.nom || ville}
//                 />
//               ))
//             : null}
//           <button onClick={(e) => validate(e)}>Modifier</button>
//           {/* </div> */}
//         </form>
//       </div>
//     </div>
//   )
// }
