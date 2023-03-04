const fetchEarthquakeData = async () => {
    const res = await fetch('http://localhost:5002/api/earthquakes')
    const data = await res.json()
    console.log(data)
}

fetchEarthquakeData()