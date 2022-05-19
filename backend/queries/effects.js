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

// CREATE
const createEffect = async (effects, audio_id, user_id) => {
    try {
        const newEffects = await db.one(
            "INSERT INTO effects (effects_data, audio, user_id) VALUES ($1,$2,$3) RETURNING *",
            [effects, audio_id, user_id]
        );
        return newEffects;
    } catch (error) {
        return error;
    }
};

// DELETE
const deleteEffect = async (id) => {
    try {
        const deletedEffect = await db.one(
            "DELETE FROM effects WHERE effects_id = $1 RETURNING *",
            id
        );
        return deletedEffect;
    } catch (error) {
        return error;
    }
};

// UPDATE
const updateEffect = async (effects, id) => {
    try {
        const updatedEffects = await db.one(
            "UPDATE effects SET effects_data=$1 WHERE effects_id=$2 RETURNING *",
            [effects.data, id]
        );
        return updatedEffects;
    } catch (error) {
        return error;
    }
};

// EXPORT
module.exports = {
    getAllUserEffects,
    getAllAudioEffects,
    getUserAudioEffect,
    createEffect,
    deleteEffect,
    updateEffect,
};
