const express = require("express");
const audio = express.Router();
const { getAllAudio, updateAudio } = require("../queries/audio");

audio.get("/", async (req, res) => {
    try {
        const allAudio = await getAllAudio();
        res.status(200).json(allAudio);
    } catch (err) {
        res.status(404).json({error: err});
    }
});

audio.put("/id:", async (req, res) => {
    try {
        const { body } = req.body;
        const { id } = req.params;
        const updatedAudio = await updateAudio(body, id);
        res.status(200).json(updatedAudio);
    } catch (err) {
        res.status(404).json({error: err});
    }
});

module.exports = audio;