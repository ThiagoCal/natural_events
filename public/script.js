let allEvents
const getAllData = async () => {
    const res = await fetch('http://localhost:5002/api')
    const data = await res.json()
    allEvents = data
    initMap()
}

getAllData()

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2.3,
        center: { lat: 33.9391, lng: 67.7100 }
    });
    allEvents.forEach(event => {
        const lat = +event.lat
        const long = +event.long

        const marker = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map,
        });

    });

    const uluru = { lat: -25.344, lng: 131.031 };
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const dropdownBtn = document.getElementById('dropdown-btn')
dropdownBtn.addEventListener('click', myFunction)

const searchInput = document.getElementById('myInput')
searchInput.addEventListener('keyup', filterFunction)

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    let filter = searchInput.value.toUpperCase();
    let div = document.getElementById("myDropdown");
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

        const countryName = document.createTextNode(el.name.common)
        a.appendChild(countryName)
        dropdown.appendChild(a)

    })
}
getCountries()