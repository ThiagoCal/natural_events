const { getAllEvents,
    insertEvents,
    getEventsByCategory,
    getEventsByCountry,
    deleteDuplicateEvents } = require('../modules/events.js');


const _getAllEvents = (req, res) => {
    getAllEvents()
        .then(data => res.json(data))
        .catch(err => console.log(err));
}

const _getEventsByCategory = (req, res) => {
    getEventsByCategory(req.params.category)
        .then(data => res.json(data))
        .catch(err => console.log(err));
}

const _getEventsByCountry = (req, res) => {
    console.log('controllers:', req.params);
    getEventsByCountry(req.params.country)
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
    _deleteDuplicateEvents,
    _getEventsByCategory,
    _getEventsByCountry
}

