const { as } = require('pg-promise');
const db = require('../db/dbConfig.js');

const doesUserExist = async (email) => {
    try {
        const exists = await db.query(
            `SELECT EXISTS (SELECT 1 FROM users WHERE email='${email}');`
        );
        return exists[0].exists;
    } catch (err) {
        return error;
    }
}

const addUser = async (name, email, password) => {
    try {
        const newUser = await db.one("INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING username, email", 
        [name, email, password])
        return newUser;
    } catch (err) {
        return err;
    }
}

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one("DELETE FROM users WHERE user_id = $1 RETURNING username", id)
        return deletedUser;
    } catch (err) {
        return err;
    }
}

module.exports = 
    {
        doesUserExist,
        addUser,
        deleteUser
    }