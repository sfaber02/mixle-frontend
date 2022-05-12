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

const addUser = async (username, email, password) => {
    try {
        
    } catch (err) {
        return err;
    }
}

module.exports = 
    {
        doesUserExist,
    }