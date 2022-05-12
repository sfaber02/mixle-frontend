// 
const express = require('express');

const user = express.Router();

const bcrypt = require("bcrypt");

//
const { doesUserExist, addUser, deleteUser } = require('../queries/users.js');

// This is our Create User ROUTE≠
user.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if ((await doesUserExist(email))) {
            res.status(400).send('User with that email already exists');
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        try {
            await addUser(username, email, hashPassword);
            res.status(200).send("User has been created!")
        } catch (err) {
            res.status(500).send(err, "Failed User creation")
        }   
    } catch (err) {
        res.status(404).send('Post failed.', err);
    }
});

user.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    }catch(err){
        res.status(404).json({error: "User was not found"})
    }
});


/* REQUIRED ROUTES
create user *DONE
delete user *DONE
authenticate user
update user
*/



module.exports = user;