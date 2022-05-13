// DEPENDENCIES
const express = require("express");
const effects = express.Router();
const {
    getAllUserEffects,
    getAllAudioEffects,
    getUserAudioEffect,
} = require("../queries/effects");

// GET ONE EFFECT BY USER AND SPECIFIC AUDIO
effects.get("/", async (req, res) => {
    try {
        const effect = await getUserAudioEffect(req.body);
        res.status(200).json(effect);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

// GET ALL EFFECTS FOR USER
effects.get("/allaudio/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const allEffects = await getAllUserEffects(id);
        res.status(200).json(allEffects);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

// GET ALL EFFECTS FOR ALL USERS SPECIFIC AUDIO
effects.get("/allusers/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const allEffects = await getAllAudioEffects(id);
        res.status(200).json(allEffects);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

// UPDATE AN EFFECT

// CREATE AN EFFECT

// DELETE AN EFFECT

// EXPORT
module.exports = effects;
