const db = require("../db/dbConfig.js");

// VALIDATE USER EMAIL
const doesUserExist = async (email) => {
    try {
        const exists = await db.query(
            `SELECT EXISTS (SELECT 1 FROM users WHERE email='${email}');`
        );
        return exists[0].exists;
    } catch (err) {
        return error;
    }
};

// SELECT SPECIFIC USER
const getUser = async (email) => {
    try {
        const newUser = await db.one(
            "SELECT * FROM users WHERE email = $1",
            email
        );
        return newUser;
    } catch (error) {
        return error;
    }
};

// CREATE A USER
const addUser = async (name, email, password) => {
    try {
        const newUser = await db.one(
            "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING username, email",
            [name, email, password]
        );
        return newUser;
    } catch (err) {
        return err;
    }
};

// DELETE A USER
const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one(
            "DELETE FROM users WHERE user_id = $1 RETURNING username",
            id
        );
        return deletedUser;
    } catch (err) {
        return err;
    }
};

module.exports = {
    doesUserExist,
    addUser,
    deleteUser,
    getUser,
};
