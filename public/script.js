let allEvents

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: { lat: 33.9391, lng: 67.7100 },
        mapId: "e645adfa3d68e06b"
    });
    allEvents.forEach(event => {
        const lat = +event.lat
        const long = +event.long

        const marker = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map,
        });

    });

}

const getAllData = async () => {
    const res = await fetch('http://localhost:5002/api')
    const data = await res.json()
    allEvents = data
    initMap()
}
getAllData()


// 
const getCategory = async (ev) => {
    ev.preventDefault()
    const category = ev.target.innerText

    const res = await fetch(`/api/:${category}`)
    const data = await res.json()
    allEvents = data
    initMap()

}


// Dropdown Countries
const dropdownBtn = document.getElementById('dropdown-btn')
dropdownBtn.addEventListener('click', myFunction)

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


// adding eventListeners
categoryBtn.addEventListener('click', showCategories)
categoryInput.addEventListener('keyup', filterCategory)



