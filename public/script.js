let allEvents

function initMap(country = 'Israel', zoom = 2) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: country }, (results, status) => {
        if (status === "OK") {
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: zoom,
                center: results[0].geometry.location,
                mapId: "e645adfa3d68e06b"
            });


            allEvents.forEach(event => {
                const lat = +event.lat
                const long = +event.long

                const content = '<div id="content">' +
                    '<div id="siteNotice">' +
                    "</div>" +
                    '<h1 id="firstHeading" class="firstHeading">' + event.title + '</h1>' +
                    '<div id="bodyContent">' +
                    "<p>Category: " + event.category + "</p>" +
                    "<p>Country: " + event.country + "</p>" +
                    "<p>Date: " + event.date + "</p>" +
                    "<p>Magnitude: " + event.magnitude + "</p>" +
                    '<p>Lat: ' + event.lat + ' Long: ' + event.long + "</p>" +
                    "</div>" +
                    "</div>";

                const infowindow = new google.maps.InfoWindow({
                    content: content,
                    ariaLabel: "Uluru",
                });

                const marker = new google.maps.Marker({
                    position: { lat: lat, lng: long },
                    map: map,
                });

                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                    });
                });
            });
        } else {
            console.log("Geocode was not successful for the following reason: " + status);
        }
    });

}

const getAllData = async () => {
    const res = await fetch('http://localhost:5002/api')
    const data = await res.json()
    allEvents = data
    initMap()
}
getAllData()



// Dropdown Countries
const dropdownBtn = document.getElementById('dropdown-btn')
dropdownBtn.addEventListener('mouseover', myFunction)
dropdownBtn.addEventListener('mouseout', myFunction)

const searchInput = document.getElementById('myInput')
searchInput.addEventListener('keyup', filterFunction)

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    let filter = searchInput.value.toUpperCase();
    let a = document.querySelectorAll('.country')

    for (let i = 0; i < a.length; i++) {
        let textValue = a[i].textContent
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

const getCountry = async (ev) => {
    ev.preventDefault()
    let country = ev.target.innerText
    if (country === ' ') {
        initMap()
    } else {
        try {
            const res = await fetch(`/api/country/:${country}`)
            const data = await res.json()

            allEvents = data
            let zoom = 4

            initMap(country, zoom)
        } catch (err) {
            console.log(err)
        }
    }

}

async function getCountries() {
    const dropdown = document.getElementById('myDropdown')
    const res = await fetch('https://restcountries.com/v3.1/all')
    let data = await res.json()
    data = data.sort(function (a, b) {
        var keyA = a.name.common,
            keyB = b.name.common;

        // Compare the 2 country names
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    data.forEach(el => {
        // creating a tags, setting id and appending all the country names into the dropdown
        const a = document.createElement('a')
        let id = el.altSpellings[0]
        id = id.replace(/ +/g, '')
        a.id = id
        a.classList.add('country')
        a.addEventListener('click', getCountry)


        const countryName = document.createTextNode(el.name.common)
        a.appendChild(countryName)
        dropdown.appendChild(a)

    })
}
getCountries()

// Dropdown Categories
const categoryBtn = document.getElementById('category-btn')
const categoryInput = document.getElementById('inputCategory')
const categories = ['Severe Storms', 'Sea and Lake Ice', 'Earthquakes', 'Wildfires', 'Volcanoes']
const categoryDiv = document.getElementById("categoryDropdown")

const showCategories = () => {
    categoryDiv.classList.toggle("show");

}

const filterCategory = () => {
    let filter = categoryInput.value.toUpperCase();
    let a = document.querySelectorAll('.category')

    for (let i = 0; i < a.length; i++) {
        let textValue = a[i].textContent
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

const getCategory = async (ev) => {
    ev.preventDefault()
    let category = ev.target.innerText
    if (category === 'Earthquakes') category = 'earthquake'
    const res = await fetch(`/api/:${category}`)
    const data = await res.json()
    allEvents = data
    initMap()

}

const getCategories = () => {
    categories.forEach(category => {
        const a = document.createElement('a')
        let id = category.toLowerCase()
        id = id.replace(/ +/g, '')
        a.id = id
        a.classList.add('category')
        a.addEventListener('click', getCategory)

        const categoryName = document.createTextNode(category)
        a.appendChild(categoryName)
        categoryDiv.appendChild(a)

    })
}

getCategories()



// adding eventListeners to the category button and filter
categoryBtn.addEventListener('mouseover', showCategories)
categoryBtn.addEventListener('mouseout', showCategories)
categoryInput.addEventListener('keyup', filterCategory)



// adding eventlistener to the reset button
const resetBtn = document.getElementById('reset-btn')
resetBtn.addEventListener('click', getAllData)