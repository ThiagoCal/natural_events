const express = require('express')

const { _getAllEvents,
    _insertEvents,
    _getAllEarthquakes,
    _deleteDuplicateEvents,
    _getEventsByCategory } = require('../controllers/events.js');

const router = express.Router()

router.get('/', _getAllEvents)
router.get('/earthquakes', _getAllEarthquakes)
router.get('/:category', _getEventsByCategory)
router.post('/events', _insertEvents)
router.delete('/delete', _deleteDuplicateEvents)

module.exports = router 