
const app = require('./app')
const dotenv = require('dotenv')

const sequelize = require('./config/db')
// const User = require('./models/User')
dotenv.config()

const PORT = process.env.PORT




sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Connected to DB')
        app.listen(PORT, () => {
            console.log(`🚀 server listening on port ${PORT}`)
        })
    })
    .catch((err) => console.log('❌ DB Error:', err))

sequelize.sync({ alter: true })
    .then(() => {
        console.log('model is synced')
    })
    .catch((err) => {
        console.log(err)
    })