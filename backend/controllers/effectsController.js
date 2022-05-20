// DEPENDENCIES
const express = require("express");
const effects = express.Router();
const {
    getAllUserEffects,
    getAllAudioEffects,
    getUserAudioEffect,
    createEffect,
    deleteEffect,
    updateEffect,
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
effects.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEffect = await updateEffect(effects, id);
        res.status(200).json(updatedEffect);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

// CREATE AN EFFECT
effects.post("/", async (req, res) => {
    try {
        const { effects, audio_id, user_id } = req.body
        const newEffect = await createEffect(effects, audio_id, user_id);
        res.status(200).json(newEffect);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

// DELETE AN EFFECT
effects.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEffect = await deleteEffect(effects, audio_id, user_id);
        res.status(200).json(deletedEffect);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

// EXPORT
module.exports = effects;
