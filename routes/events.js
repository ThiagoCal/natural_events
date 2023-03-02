const express = require('express')

const { _getAllEvents,
    _insertEvents } = require('../controllers/events.js');

const router = express.Router()

router.get('/', _getAllEvents)
router.post('/events', _insertEvents)

module.exports = router