// DEPENDENCIES
const db = require("../db/dbConfig");

// GET ALL EFFECTS FROM DB FOR A USER
const getAllUserEffects = async (id) => {
    try {
        const effects = await db.any(
            "SELECT e.*, u.username FROM effects e JOIN users u ON e.user_id = u.user_id  WHERE user_id=$1",
            audio_id
        );
        return effects;
    } catch (error) {
        return error;
    }
};

// GET ALL EFFECTS FROM DB FOR A DAYS SONG
const getAllAudioEffects = async (audio_id) => {
    try {
        const effects = await db.any(
            "SELECT e.*, u.username FROM effects e JOIN users u ON e.user_id = u.user_id  WHERE audio=$1",
            audio_id
        );
        return effects;
    } catch (error) {
        return error;
    }
};

//GET ONE EFFECT BY USER AND SPECIFIC AUDIO
const getUserAudioEffect = async (info) => {
    try {
        const effects = await db.one(
            "SELECT * FROM effects WHERE audio=$1 AND user_id=$2",
            [info.audio_id, info.user_id]
        );
        return effects;
    } catch (error) {
        return error;
    }
};

// EXPORT
module.exports = { getAllUserEffects, getAllAudioEffects, getUserAudioEffect };
