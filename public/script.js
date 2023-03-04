const axios = require('axios')
const options = {
    method: 'GET',
    url: 'https://everyearthquake.p.rapidapi.com/earthquakes',
    params: {
        start: '1',
        count: '50',
        type: 'earthquake',
        magnitude: '5',
        intensity: '1'
    },
    headers: {
        'X-RapidAPI-Key': 'a93c190f12msh3bb1c372e41f273p1cd963jsn109978945e4a',
        'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
    }
};

let newArr
const axiosTest = async () => {
    const response = await axios.request(options)
    const allData = response.data
    newArr = allData['data']

    postEarthquakeData(newArr)

}

axiosTest()

const postEarthquakeData = (data) => {
    const intervalID = setInterval(() => {
        data.forEach(element => {
            const { magnitude, title, date, latitude: lat, longitude: long } = element
            const newObj = { magnitude, category: 'earthquake', title, date, lat, long }
            fetch('http://localhost:5002/api/events', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newObj)
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
        })
    }, 2000)
    clearInterval(intervalID)
}

const EONET_API_ENDPOINT = 'https://eonet.gsfc.nasa.gov/api/v3/events?start=2022-03-02&end=2023-03-02'

const axiosEONET = async () => {
    const response = await axios.get(EONET_API_ENDPOINT)
    const events = response.data.events;
    const filteredEvents = events.map(event => {

        const category = event['categories'][0]['title']
        const title = event['title']
        const geometryLength = event['geometry'].length
        const unit = event['geometry'][geometryLength - 1]['magnitudeUnit']
        let magnitude = event['geometry'][geometryLength - 1]['magnitudeValue'] + ' ' + unit

        if (magnitude === 'null null') magnitude = ' '

        const lat = event['geometry'][geometryLength - 1]['coordinates'][0]
        const long = event['geometry'][geometryLength - 1]['coordinates'][1]
        const date = event['geometry'][geometryLength - 1]['date']

        const newObj = { category, title, magnitude, lat, long, date }
        return newObj
    });
    // console.log(filteredEvents)
    // callFunctions(filteredEvents)
    postEONETData(filteredEvents)

}

axiosEONET()


const postEONETData = (data) => {


    data.forEach((obj, index) => {
        const intervalID2 = setInterval(() => {
            fetch('http://localhost:5002/api/events', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(`error:${err} and data: ${data}`))
        }, (index + 1) * 10000)
        return intervalID2
    })

    setTimeout((intervalID2) => {
        clearInterval(intervalID2);
    }, 60000); // Stop the interval after 60 seconds
}

// function callFunctions(data) {
//     postEONETData(postEvents(data))
// }


// use timeout function -> every week(7days) truncate table and readd