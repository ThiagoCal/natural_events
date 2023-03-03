const { db } = require('../config/db.js')

const getAllEvents = () => {
    return db('natural_events')
        .select('id', 'title', 'country', 'category', 'date', 'lat', 'long', 'magnitude')

}

const insertEvents = (event) => {
    console.log('event.js modules:', event)
    return db('natural_events')
        .insert(event)
        .returning('*')
}

module.exports = {
    getAllEvents,
    insertEvents
}