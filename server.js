const axios = require("axios");
const express = require('express')
const app = express()
const cors = require('cors')
const deg2rad = require('deg2rad')
const events_router = require('./routes/events.js')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/main', express.static(__dirname + '/public'))

app.listen(5002, () => {
    console.log(`run on port 5002`);
})


const latitude = 3.577239;
const longitude = 98.669679;
const radius = 6371; // in kilometers
const EONET_API_ENDPOINT = 'https://eonet.gsfc.nasa.gov/api/v3/events?start=2022-03-02&end=2023-03-02'

// axios
//     .get(EONET_API_ENDPOINT)
//     .then((response) => {
//         // console.log(response.data.geometry[0].coordinates)
//         console.log(response.data)
//         const events = response.data.events;
//         const filteredEvents = events.filter(event => {
//             const coordinates = event.geometry[0].coordinates;
//             const eventLatitude = coordinates[1];
//             const eventLongitude = coordinates[0];
//             const distance = getDistance(latitude, longitude, eventLatitude, eventLongitude);
//             return distance <= radius;
//         });

//         // const filterByCountry = events.filter(ev => {
//         //     const
//         // })
//         // const italyEventArray = filteredEvents.map(ev => {
//         //     console.log(ev.geometry[0].date);
//         // })


//         console.log(filteredEvents);
//     })
//     .catch((error) => {
//         console.error(error);
//     });


// function getDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const d = R * c; // Distance in km
//     return d;
// }




// IF WE WANT TO USE THE EARTHQUAKE API
const options = {
    method: 'GET',
    url: 'https://everyearthquake.p.rapidapi.com/earthquakes',
    params: {
        start: '1',
        count: '100',
        type: 'earthquake',
        latitude: '33.962523',
        longitude: '-118.3706975',
        radius: '6371',
        units: 'kilometers',
        magnitude: '5',
        intensity: '1'
    },
    headers: {
        'X-RapidAPI-Key': 'a93c190f12msh3bb1c372e41f273p1cd963jsn109978945e4a',
        'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    const allData = response.data
    const newArr = allData['data']
    console.log(newArr)
    newArr.forEach(({ magnitude, title, date, latitude, longitude }) => {
        console.log({ magnitude, title, date, latitude, longitude })
    })
    // console.log(response.data)

}).catch(function (error) {
    console.error(error);
});







app.use('/api', events_router)