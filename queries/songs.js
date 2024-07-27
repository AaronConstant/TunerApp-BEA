//imports the connection to the database
// importing to access the Error Query object to gather the error handling for possible errors
//functions will be executed here which will be exported later to other directories/files
const { db, pgp } = require('../db/dbConfig')
const { QueryResultError } = pgp.errors;


const retrieveAllSongs = async ()=> {
    try {
        const getSongs = await db.any("SELECT * FROM tuners")
        return getSongs

    } catch(error) {
        return error
    }

}

const getOneSong = async (id) => {
    try {
        const oneSong = await db.one("SELECT * FROM tuners WHERE id=$1", id);
        return oneSong;
    } catch (error) {
        // you access the error by the parameter that we name it, even though the object is QueryResultEror. 
        // checking to see if there is an instance of an QueryResultError from the the pgp library.
        if (error instanceof QueryResultError) {
            // checking to see 
            const result = error.result;

            if (error.values === undefined) {
                console.error("Error: Song is missing valid inputs");
            } else if (result.received === 0) {
                console.error("Error Received: No Songs matching provided ID!");
            } else {
                console.error("QueryResultError Recieved!");
            }
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw error; 
    }
};

const createSongEntry = async (song) => {
    console.log(song)
    try {
        
    const newSong = await db.one("INSERT INTO tuners (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
        [
            song.name, 
            song.artist,
            song.album,
            song.time,
            song.is_favorite
        ])
    return newSong;
    
} catch (error) {
        return error
    }
}



module.exports = { retrieveAllSongs, getOneSong, createSongEntry }