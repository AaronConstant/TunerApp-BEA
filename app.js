const express = require('express')
const app = express()
const cors = require('cors')
const tunerController = require('./controllers/tunerControllers')

//Middleware
app.use(express.json())
app.use(cors())


//Route
app.get('/', (req,res)=> {
    res.send('Welcome to Tuner App!')
})

app.use('/tuner', tunerController)



app.get("*", (req,res)=> {
    res.status(404).send("Page not Found!")
})





module.exports = app;
