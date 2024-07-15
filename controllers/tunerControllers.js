const express = require('express')
const tuner = express.Router()


tuner.get('/' ,(req,res) => {
    res.json({message: 'Welcome to Tuner'})
})



module.exports = tuner