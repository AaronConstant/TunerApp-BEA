const express = require('express')
const tuner = express.Router()
const { retrieveAllSongs, getOneSong, createSongEntry } = require('../queries/songs')

tuner.get('/' , async ( req,res ) => {
    const allSongs = await retrieveAllSongs()
    // console.log(allSongs)
    if(allSongs[0]) {
        res.status(200).json(allSongs)
    } else {
        res.status(500).json({error:" Internal Server Error!" })
    }
})

tuner.get( '/:id', async ( req, res ) => {
    const { id } = req.params
    const oneSong =  await getOneSong(id)
    if(oneSong.id) {
        res.status(200).json(oneSong)
    } else {
        res.status(404).json({error: "Song Not Found!"})
    }
} )

tuner.post('/', async ( req,res ) => {
    const newSong = await createSongEntry(req.body)
    res.json(newSong)

})

module.exports = tuner