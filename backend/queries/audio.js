// DEPENDENCIES
const db = require("../db/dbConfig.js");

// GET ALL SONGS
const getAllAudio = async () => {
    try {
        const allAudio = await db.any("SELECT * FROM audio;");
        return allAudio;
    } catch (err) {
        return err;
    }
};

// GET ONE SONG
const getAAudio = async (id) => {
    try {
        const allAudio = await db.one(
            "SELECT * FROM audio WHERE audio_id=$1",
            id
        );
        return allAudio;
    } catch (err) {
        return err;
    }
};

// UPDATE A SONG
const updateAudio = async (track, id) => {
    console.log(track.totalVotes, track.used, id);
    try {
        const updatedAudio = await db.one(
            "UPDATE audio SET totalVotes=$1, used=$2 WHERE audio_id=$3 RETURNING *",
            [track.totalVotes, track.used, id]
        );
        return updatedAudio;
    } catch (err) {
        return err;
    }
};

module.exports = {
    getAllAudio,
    updateAudio,
    getAAudio,
};
