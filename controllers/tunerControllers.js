const express = require('express')
const tuner = express.Router()
const { retrieveAllSongs } = require('../queries/songs')

tuner.get('/' , async(req,res) => {
    const allSongs = await retrieveAllSongs()

    if(allSongs[0]) {
        res.status(200).json(allSongs)
    } else {
        res.status(500).json({error:" Internal Server Error!" })
    }
})



module.exports = tuner