const express = require('express');
const cors = require('cors');

const userController = require('./controllers/userController.js');
const audioController = require('./controllers/audioController.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userController);
app.use('/audio', audioController);

app.get('/', (req, res) => res.status(200).send('Welcome to Mixle backend!'));
app.get('*', (req, res) => res.status(404).send('Page not found'));


module.exports = app;

