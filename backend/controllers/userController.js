// DEPENDENCIES
const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    doesUserExist,
    addUser,
    deleteUser,
    getUser,
} = require("../queries/users.js");
const e = require("express");

// CONFIGURATION
const user = express.Router();

// REGISTER POST REQUEST
user.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (await doesUserExist(email)) {
            res.status(400).send("User with that email already exists");
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        try {
            await addUser(username, email, hashPassword);
            res.status(200).send("User has been created!");

            const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
        } catch (err) {
            res.status(500).send(err, "Failed User creation");
        }
    } catch (err) {
        res.status(404).send("Post failed.", err);
    }
});

// LOGIN POST REQUEST
user.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUser(email);
        console.log(user);
        if (user.email) {
            res.status(400).send("Email not found.");
        } else {
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );
        }
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

// DELETE
user.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(404).json({ error: "User was not found" });
    }
});

/* REQUIRED ROUTES
create user *DONE
delete user *DONE
authenticate user
update user
*/

module.exports = user;
