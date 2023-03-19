const { getAllEvents,
    insertEvents,
    getEventsByCategory,
    getEventsByCountry,
    deleteDuplicateEvents,
    truncateTable } = require('../modules/events.js');

const timeout = 1000 * 60 * 60 * 24 // every day in milliseconds

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

const _truncateTable = (req, res) => {
    truncateTable()
        .then(data => console.log('truncated table successfully'))
        .catch(err => console.log(err));
}

setInterval(() => {
    _truncateTable()
        .then(data => {
            _insertEvents()
                .then(data => console.log(data))
        })
}, timeout)

module.exports = {
    _getAllEvents,
    _insertEvents,
    _deleteDuplicateEvents,
    _getEventsByCategory,
    _getEventsByCountry
}

