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



module.exports = { retrieveAllSongs }