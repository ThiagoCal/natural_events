const knex = require('knex')
const dotenv = require('dotenv')

dotenv.config()

const db = knex({
    client: 'pg',
    version: '7.2',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }

})

db('natural_events')
    .select('id', 'title', 'country', 'category', 'date', 'lat', 'long', 'magnitude')
    .then(rows => {
        console.log(rows)
    })
    .catch(err => {
        console.log(err)
    })


module.exports = {
    db
}