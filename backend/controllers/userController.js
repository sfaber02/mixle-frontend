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
  updateUser,
  getUserById,
} = require("../queries/users.js");

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
    if (!user.email) {
      res.status(400).send("Email not found.");
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = jwt.sign({ email }, process.env.SECRET_KEY);
        
        res.status(200).json({
          message: "USER signed in!",
          user: user.username,
          email: user.email,
          token,
        });
      } else {
        res.status(400).json({
          error: "Enter correct password!",
        });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// UPDATE USER
user.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await getUserById(id);
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await updateUser(user, hashPassword);

    res.status(202).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Update was unsuccessful." });
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

module.exports = user;
