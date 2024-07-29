const express = require("express")
const reviews = express.Router({ mergeParams: true })

const { 
    displayAllReviews, 
    displayOneReview, 
    createNewReview,
    deleteReview,
    updateReview 
} = require('../queries/reviews')

const { getOneSong } = require('../queries/songs')

reviews.get('/', async (req, res) => {
    const { tuner_id } = req.params;
    const review = await displayAllReviews(tuner_id);
    const song = await getOneSong(tuner_id)
    try {
        if (song.id) {
            res.status(200).json({...song, review});
        } else {
            res.status(404).json({ error: "No reviews found!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
    }
});


reviews.get('/:id', async (req, res) => {
    const { tuner_id, id } = req.params
    const oneReview = await displayOneReview(id);
    const song = await getOneSong(tuner_id)
    try {
        res.status(200).json({ ...song, oneReview});
    } catch (error) {
        res.status(500).json({ error: "An Issue occurred displaying Review!" });
    }
});

reviews.post('/', async (req, res) => {
    try {
        const newReview = await createNewReview(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: "Please Check all information when submitting!" });
    }
});

reviews.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await deleteReview(req.params.id);
        res.status(200).json(deletedReview);
    } catch (error) {
        res.status(500).json({ error: "Could not find review for deletion, Try again please!" });
    }
});

reviews.put('/:id', async (req, res) => {
    try {
        const updatedReview = await updateReview(req.params.id, req.body);
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: "Unable to update successfully!" });
    }
});



module.exports = reviews;