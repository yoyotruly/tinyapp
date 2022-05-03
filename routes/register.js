const express = require("express");

const { generateRandomString, checkEmailExist } = require("../utils");
const { users } = require("../constants");

const router = express.Router();

router.get("/", (req, res) => {
  const templateVars = {
    user: users[req.cookies.id]
  };

  res.render("register", templateVars);
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const id = generateRandomString();

  if (!email || !password) return res.status(400).send("Registration information invalid");
  if (checkEmailExist) return res.status(400).send("User already exists.");

  users[id] = {
    id,
    email,
    password
  };
  
  res
    .cookie("id", id)
    .redirect("/urls");
});

module.exports = router;