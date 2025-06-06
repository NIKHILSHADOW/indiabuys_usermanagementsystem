

const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3001', // React app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // if you want to send cookies or auth headers
}));

app.use('/api/users', userRoutes)

app.use('/', (req, res) => {
    res.send('welcome user!!')
})


module.exports = app