const tuner = require('../controllers/tunerControllers');
const {db, pgp } = require('../db/dbConfig')

const { QueryResultError } = pgp.errors;

const displayAllReviews = async (tuner_id) => {
    try {
        const getReviews = await db.any("SELECT * FROM reviews WHERE tuner_id=$1", tuner_id);
        return getReviews;
    } catch (error) {
        return error;
    }
}

const displayOneReview = async (id) => {
    try {
        const oneReview = await db.one("SELECT * FROM reviews WHERE id=$1", id);
        return oneReview;
    } catch (error) {
        return error;
    }
}

const createNewReview = async (review) => {
    try{
        const newReview = await db.one("INSERT INTO reviews (reviewer_name, review_text, rating, tuner_id, review_date) VALUES($1, $2, $3, $4, $5)RETURNING *", 
            [
            review.reviewer_name, 
            review.review_text,
            review.rating, 
            review.tuner_id, 
            review.review_date
            ]) 
        return newReview

    }catch(error){
        return error
    }
}

const updateReview = async (review) => {
    try {
        const updatedReview = await db.one(
            "UPDATE reviews SET reviewer_name=$1, review_text=$2, rating=$3, tuner_id=$4, review_date=$5 WHERE id=$6 RETURNING *",
            [
                review.reviewer_name,
                review.review_text,
                review.rating,
                review.tuner_id,
                review.review_date,
                review.id
            ]
        );
        return updatedReview;
    } catch (error) {
        throw error;
    }
};

const deleteReview = async (id) => {
    try {
      const deletedReview = await db.one(
        "DELETE FROM reviews WHERE id=$1 RETURNING *",
        id
      );
      return deletedReview;
    } catch (error) {
      return error;
    }
  };



module.exports = { 
    displayAllReviews, 
    displayOneReview, 
    createNewReview, 
    deleteReview, 
    updateReview 
};