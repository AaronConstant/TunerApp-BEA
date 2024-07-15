//imports the connection to the database

//functions will be executed here which will be exported later to other directories/files
const db = require('../db/dbConfig')


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
        const oneSong = db.one("SELECT * FROM tuners WHERE id=$1", id)
        return oneSong;

    }catch(error){
        return error
    }
}

const createSongEntry = async (song) => {
    try{
    const newSong = await db.one(
        "INSERT INTO tuners (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
        [song.name,song,artist, song.album, song.time, song.is_favorite]);

    return newSong;

} catch (error) {
        return error
    }
}



module.exports = { retrieveAllSongs, getOneSong, createSongEntry }