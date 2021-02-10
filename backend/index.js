require('dotenv').config()

const express = require('express')
const app = express()

const apiRoute = require('./routes')
const PORT = process.env.PORT || 3001;

const passport = require("passport");
const morgan = require('morgan');
const mongoose = require('mongoose')



const cors = require('cors')

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(passport.initialize());

const dbURL = process.env.MONGO_DB_URI
mongoose.connect(dbURL, { useNewUrlParser: true })

// test database connection
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})


app.use('/api', apiRoute)

app.listen(PORT, () => console.log(`Listening on port: 3001`))