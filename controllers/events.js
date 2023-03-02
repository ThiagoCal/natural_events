const { getAllEvents,
    insertEvents } = require('../modules/events.js');


const _getAllEvents = (req, res) => {
    getAllEvents()
        .then(data => res.json(data))
        .catch(err => console.log(err));
}



const _insertEvents = (req, res) => {
    insertEvents(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err));
}


module.exports = {
    _getAllEvents,
    _insertEvents
}