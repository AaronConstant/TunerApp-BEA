const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const tunerController = require('./controllers/tunerControllers')
const reviewsController = require ('./controllers/reviewsController')
//Middleware
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))


//Route
app.get('/', (req,res)=> {
    res.send('Welcome to Tuner App!')
})

app.use('/tuner', tunerController)
app.use('/reviews', reviewsController )


app.get("*", (req,res)=> {
    res.status(404).send("Page not Found!")
})





module.exports = app;
