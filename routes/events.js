const express = require('express')

const { _getAllEvents,
    _insertEvents,
    _getAllEarthquakes,
    _deleteDuplicateEvents } = require('../controllers/events.js');

const router = express.Router()

router.get('/', _getAllEvents)
router.get('/earthquakes', _getAllEarthquakes)
router.post('/events', _insertEvents)
router.get('/delete', _deleteDuplicateEvents)

module.exports = router 