const {db, pgp } = require('../db/dbConfig')

const { QueryResultError } = pgp.errors;

const displayAllReviews = async (id)=> {
    try{
        const getReviews = await db.any("SELECT*FROM reviews WHERE id=$1", id)
        return getReviews


    }catch(error){
        return error
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
        const newReview = await db.one("INSERT INTO reviews (reviewer_name, review_text, rating, tuner_id, review_date) VALUES($1, $2, $3, $4, $5)RETURNING *", [
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

  const updateReview = async (id, review) => {
    try {
      const updatedReview = await db.one(
        "UPDATE reviews SET reviewer_name=$1, review_text=$2, rating=$3, tuner_id=$4, review_date=$5 where id=$6 RETURNING *",
        [
          review.reviewer,
          review.title,
          review.content,
          review.rating,
          review.bookmark_id,
          id,
        ]
      );
      return updatedReview;
    } catch (error) {
      return error;
    }
  };


module.exports = { displayAllReviews, displayOneReview, createNewReview, deleteReview, updateReview }