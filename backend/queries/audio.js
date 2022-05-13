const db = require("../db/dbConfig.js");

const getAllAudio = async () => {
    try {
        const allAudio = await db.any("SELECT * FROM audio;")
        return allAudio
    } catch (err) {
        return err;
    }
};

const updateAudio = async (track, id) => {
    try {
        const updatedAudio = await db.one("UPDATE audio SET totalVotes=$1, used=$2 WHERE audio_id=$3", 
        [track.totalVotes, track.used, id])
        return updatedAudio; 
    } catch (err) {
        return err;
    }
}

module.exports = {
    getAllAudio,
    updateAudio
}