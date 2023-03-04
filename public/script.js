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

const postEarthquakeData = async (data) => {
    for (let i = 0; i < data.length; i++) {
        const { magnitude, title, date, latitude: lat, longitude: long } = data[i]
        let newObj = { magnitude, category: 'earthquake', title, date, lat, long }
        // console.log('newobj:', newObj)
        let country = await getCountry(newObj.lat, newObj.long)
        newObj.country = country
            try{
                const response = await fetch(`http://localhost:5002/api/events?category=${newObj.category}&lat=${newObj.lat}&long=${newObj.long}`)
                // console.log('response', response)
                if(!Object.keys(response).length){
                    console.log("no data found");
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
                } else{
                    const existingData = await response.json()
                    console.log('Data already exists:', existingData[0])
                }
                // const existingData = await response.json()
                // console.log('existingData', existingData)
                // if(existingData.length > 0){
                // }
                // else{
                //     console.log('hey NO DUPLICATE DATAAA!!!')
                // }
                // else{
                //     fetch('http://localhost:5002/api/events', {
                //         method: 'POST',
                //         headers: {
                //             'Content-type': 'application/json'
                //         },
                //         body: JSON.stringify(newObj)
                //     })
                //     .then(res => res.json())
                //     .then(data => console.log(data))
                //     .catch(err => console.log(err))
                // } 
            }
        catch (err){
            console.log(err)
        }
        // await new Promise(resolve => setTimeout(resolve, 5000))
    }
}

// const EONET_API_ENDPOINT = 'https://eonet.gsfc.nasa.gov/api/v3/events?start=2022-03-02&end=2023-03-02'

// const axiosEONET = async () => {
//     const response = await axios.get(EONET_API_ENDPOINT)
//     const events = response.data.events;
   
//     const filteredEvents = Promise.all (events.map(async event => {

//         const category = event['categories'][0]['title']
//         const title = event['title']
//         const geometryLength = event['geometry'].length
//         const unit = event['geometry'][geometryLength - 1]['magnitudeUnit']
//         let magnitude = event['geometry'][geometryLength - 1]['magnitudeValue'] + ' ' + unit

//         if (magnitude === 'null null') magnitude = ' '

//         const long = event['geometry'][geometryLength - 1]['coordinates'][0]
//         const lat = event['geometry'][geometryLength - 1]['coordinates'][1]
//         const date = event['geometry'][geometryLength - 1]['date']
//         let country =  await getCountry(lat,long)
//         let newObj = { category, title, magnitude, lat, long, date, country }
//         return newObj
//     }))
//     postEONETData(filteredEvents)

// }

// axiosEONET()


// const postEONETData = (data1) => {
//     fetch('http://localhost:5002/api/events', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(data1)
//     })
//         .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(`error:${err} and data: ${data1}`))
// }

const getCountry = async (lat, long) =>{
    try{
        let latitude = lat
        let longitude = long
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAKG3n2BRP3bALN3nRj1Bq2uhF95M2bPJA&latlng=${latitude},${longitude}&sensor=false`)
        let data = await response.json()
        let result
        data.results.forEach(element => {
            if(element.types.includes('country')){ 
                // console.log('element:',element )
                result = element.formatted_address
            }
        })
        return result
    }
    catch(err){
        console.log(err)
    }
}