const axios = require("axios");
const express = require('express')
const cors = require('cors')

const events_router = require('./routes/events.js')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/', express.static(__dirname + '/public'))
app.use('/api', events_router)

app.listen(5002, () => {
    console.log(`run on port 5002`);
})


