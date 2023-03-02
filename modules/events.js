const { db } = require('../config/db.js')

const getAllEvents = () => {
    return db('natural_events')
        .select('id', 'title', 'country', 'category', 'date', 'lat', 'long', 'magnitude')

}

const insertEvents = (event) => {
    return db('natural_events')
        .insert(event)
}

module.exports = {
    getAllEvents,
    insertEvents
}