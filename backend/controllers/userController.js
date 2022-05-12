const express = require('express');

const user = express.Router();

const { doesUserExist } = require('../queries/users.js');

user.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!(await doesUserExist(email))) {
            res.status(400).send('User with that email already exists');
            return;
        }
                
    } catch (err) {
        res.status(404).send('Post failed.', err);
    }
});


/* REQUIRED ROUTES
create user
delete user
authenticate user
update user
*/



module.exports = user;