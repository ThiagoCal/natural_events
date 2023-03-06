const express = require('express')

const { _getAllEvents,
    _insertEvents,
    _deleteDuplicateEvents,
    _getEventsByCategory,
    _getEventsByCountry } = require('../controllers/events.js');

const router = express.Router()

router.get('/', _getAllEvents)
router.get('/:category', _getEventsByCategory)
router.get('/country/:country', _getEventsByCountry)
router.post('/events', _insertEvents)
router.delete('/delete', _deleteDuplicateEvents)

module.exports = router 