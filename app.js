require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./contollers/blogs')
const usersRouter = require('./contollers/users')
const loginRouter = require('./contollers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const mongoUrl = config.MONGODB_URI
console.log('MONGODB_URI', mongoUrl)
const establishConnection = async () => {
    try{
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        logger.info('MongoDB connecte')
    }
    catch{
        logger.error('MongoDB connection failed')
    }
}
establishConnection()

app.use(express.static('frontend/build'))
app.use(cors())
app.use(express.json())
app.use(middleware.getTokenFrom)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/health', (req, res) => {
    res.send('ok')
})

app.get('/version', (req, res) => {
    res.send('5')
})

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./contollers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)


module.exports = app