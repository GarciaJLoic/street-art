import React, { useState } from "react";



const Geolocalisation = () => {
    // position géographique GPS de l'utilisateur
    const [latUser, setLatUser] = useState();
    const [longitUser, setLongitUser] = useState();
    // position de l'oeuvre
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // XXXXX A voir si useEffect/ axios ici ou dans parent XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    // position relative de l'utilisateur/ oeuvre
    const [less25m, setLess25m] = useState();
    const [distanceOeuvre, setDistanceOeuvre] = useState();

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                    setLatUser(latitude);
                    setLongitUser(longitude);
                },
                error => {
                    reject(error);
                }
            );
        });
    };
    //calcul si position gps à moins de 25 du point GPS de l'oeuvre
    const isWithin25m = (latitude1, longitude1, latitude2, longitude2) => {
        const R = 6371e3; 
        const φ1 = latitude1 * (Math.PI / 180); 
        const φ2 = latitude2 * (Math.PI / 180);
        const Δφ = (latitude2 - latitude1) * (Math.PI / 180); 
        const Δλ = (longitude2 - longitude1) * (Math.PI / 180); 

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) *
            Math.cos(φ2) *
            Math.sin(Δλ / 2) *
            Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; 
        setDistanceOeuvre(distance);
        return distance <= 25; 
    };


    const handleButtonClick = () => {
        getPosition()
            .then(position => {
                const { latitude, longitude } = position;
                const isWithin25mResult = isWithin25m(latitude, longitude, 43.8697984, -1.3172736);
                isWithin25mResult ? setLess25m(true) : setLess25m(false);
            })
            .catch(error => console.error(error));
    };
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    return (
        <div>
            <button onClick={handleButtonClick}>Check if within 25m</button>
            {/* rest of the component code */}
            <p>Latitude: {latUser}</p>
            <p>Longitude: {longitUser}</p>
            <p>Distance: {distanceOeuvre}</p>
            {less25m ? <p>ok</p> : <p>trop loin</p>}
        </div>
    );
};

export default Geolocalisation;

