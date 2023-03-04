const { db } = require('../config/db.js')

const getAllEvents = () => {
    return db('natural_events')
        .select('id', 'title', 'country', 'category', 'date', 'lat', 'long', 'magnitude')

}

const getAllEarthquakes = () => {
    return db('natural_events')
        .select('id', 'title', 'country', 'category', 'date', 'lat', 'long', 'magnitude')
        .where('category', 'earthquake')
}

const insertEvents = (event) => {
    console.log('event.js modules:', event)
    return db('natural_events')
        .insert(event)
        .returning('*')
}

const deleteDuplicateEvents = () => {
    return db.raw(
        `DELETE FROM
            natural_events a
        USING natural_events b
        WHERE
            a.id < b.id AND a.title = b.title AND a.date = b.date AND a.lat = b.lat AND a.long = b.long`
    )

}

module.exports = {
    getAllEvents,
    insertEvents,
    getAllEarthquakes,
    deleteDuplicateEvents
}