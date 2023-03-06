const { getAllEvents,
    insertEvents,
    getAllEarthquakes,
    deleteDuplicateEvents,
    getEventsByCategory } = require('../modules/events.js');


const _getAllEvents = (req, res) => {
    getAllEvents()
        .then(data => res.json(data))
        .catch(err => console.log(err));
}

const _getEventsByCategory = (req, res) => {
    console.log(req.params.category)
    getEventsByCategory(req.params.category)
        .then(data => res.json(data))
        .catch(err => console.log(err));
}

const _getAllEarthquakes = (req, res) => {
    getAllEarthquakes()
        .then(data => res.json(data))
        .catch(err => console.log(err));
}

const _insertEvents = (req, res) => {
    console.log('event.js controllers:', req.body)
    insertEvents(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err));
}

const _deleteDuplicateEvents = (req, res) => {
    deleteDuplicateEvents()
        .then(data => res.json(data))
        .catch(err => console.log(err));
}


module.exports = {
    _getAllEvents,
    _insertEvents,
    _getAllEarthquakes,
    _deleteDuplicateEvents,
    _getEventsByCategory
}

