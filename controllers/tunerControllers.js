const express = require('express')
const tuner = express.Router()
const { retrieveAllSongs, getOneSong, createSongEntry, removeSongEntry, updateSongEntry  } = require('../queries/songs')
const { checkName } = require('../validations/checkSongs.js')

const reviewsController = require('./reviewsController.js')

tuner.use('/:tuner_id/reviews', reviewsController)

//localhost:2020/tuner/
tuner.get('/' , async ( req,res ) => {
    const allSongs = await retrieveAllSongs()
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

tuner.post('/', checkName, async ( req,res ) => {
    try{
        const newSong = await createSongEntry(req.body)
        res.status(201).json(newSong)


    } catch (error) {
        res.status(400).json(error.message)
    }
})

tuner.put('/:id', async (req, res)=> {
    const { id } = req.params;
    const updatedSongEntry = await updateSongEntry(id, req.body)

    if(updatedSongEntry.id) {
        res.status(200).json(updatedSongEntry)
    } else {
        res.status(404).json({error: "Was not able to update Song Entry, Try again."})
    }


})



tuner.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleteSongEntry = await removeSongEntry(id);
    
    if (deleteSongEntry.id) {
        res.status(200).json({ message: "Song Successfully Deleted!" });
    } else {
        res.status(400).json({ error: "Song Unsuccessfully Deleted, Please try again!" });
    }
});




module.exports = tuner