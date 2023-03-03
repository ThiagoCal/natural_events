const axios = require("axios");
const express = require('express')
const cors = require('cors')

const events_router = require('./routes/events.js')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/main', express.static(__dirname + '/public'))
app.use('/api', events_router)

app.listen(5002, () => {
    console.log(`run on port 5002`);
})






// IF WE WANT TO USE THE EARTHQUAKE API
// const options = {
//     method: 'GET',
//     url: 'https://everyearthquake.p.rapidapi.com/earthquakes',
//     params: {
//         start: '1',
//         count: '100',
//         type: 'earthquake',
//         latitude: '33.962523',
//         longitude: '-118.3706975',
//         radius: '6371',
//         units: 'kilometers',
//         magnitude: '5',
//         intensity: '1'
//     },
//     headers: {
//         'X-RapidAPI-Key': 'a93c190f12msh3bb1c372e41f273p1cd963jsn109978945e4a',
//         'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
//     }
// };

// axios.request(options)
//     .then(response => {
//         const allData = response.data
//         const newArr = allData['data'][0]
//         const { magnitude, title, date, latitude, longitude } = newArr
//         const newObj = { magnitude, title, date, latitude, longitude }

//         console.log(newObj)

//         // newArr.forEach(({ magnitude, title, date, latitude, longitude }) => {
//         //     newObj = { magnitude, title, date, latitude, longitude }
//         // })
//         // console.log(newArr)
//         // const infoArr = newArr.map(({ magnitude, title, date, latitude, longitude }) => {
//         //     { magnitude, title, date, latitude, longitude }
//         // })


//         // console.log(newObj)
//         axios.post('/api/events', newObj)
//             .then(response => {
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.error(error);
//             });

//         // console.log(response.data)
//     }).catch(function (error) {
//         console.error(error);
//     });






