//imports the connection to the database
// importing to access the Error Query object to gather the error handling for possible errors with Queries.
//functions will be executed here which will be exported later to other directories/files
const { db, pgp } = require('../db/dbConfig')

// you access the error through destructuring the object even though the object is QueryResultError within pgp. we access it through the variable error in our code 
const { QueryResultError } = pgp.errors;

const retrieveAllSongs = async ()=> {
    try {
        const getAllSongs = await db.any("SELECT * FROM tuners")
        return getAllSongs

    } catch(error) {
        return error
    }

}

const getOneSong = async (id) => {
    try {
        const oneSong = await db.one("SELECT * FROM tuners WHERE id=$1", id);
        return oneSong;
    } catch (error) {
        
        // checking to see if there is an instance of an QueryResultError from the the pgp library. This is an object!
        if (error instanceof QueryResultError) {
            if (error.result.received === 0 || error.result.received > 5) {
                console.error("Error Received: No Songs matching provided ID!");
                return { message: "No songs found with the provided ID" };
            } else {
                // For Developer Error Messaging. Will display a error in the terminal to address.
                console.error("QueryResultError:", error.message);
                return { message: error.message };
            }
        }
        // will check if any other errors were to arise other than QueryResultErrors.
        console.error("Unexpected Error:", error.message);
        return { message: "An unexpected error occurred" }; 
    }
}

const createSongEntry = async (song) => {
    try {
        
    const newSong = await db.one("INSERT INTO tuners (name, artist, album, time, is_favorite, genre, release_date, rating, play_count, added_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", 
        [
            song.name, 
            song.artist,
            song.album,
            song.time,
            song.is_favorite,
            song.genre,
            song.release_date,
            song.rating,
            song.play_count,
            song.added_date
        ])
    return newSong;
    
} catch (error) {
        return error
    }
}

const updateSongEntry = async (id, song) => {
    try{
        const updateToSongEntry = await db.one("UPDATE tuners SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5, genre=$6, release_date=$7,rating=$8, play_count=$9, added_date=$10 WHERE id=$11 RETURNING *", [
            song.name, 
            song.artist,
            song.album,
            song.time,
            song.is_favorite,
            song.genre,
            song.release_date,
            song.rating,
            song.play_count,
            song.added_date,
            id
        ])

        return updateToSongEntry;


    }catch(error){return error}

}


const removeSongEntry = async (id) => {
    try {
        const removeSong = await db.one("DELETE FROM tuners WHERE id=$1 RETURNING *", id);
        return removeSong;
    } catch (error) {
        return error;
    }
};



module.exports = { retrieveAllSongs, getOneSong, createSongEntry, removeSongEntry, updateSongEntry }