const express = require("express");

const { generateRandomString } = require("../utils");
const { users } = require("../constants");

const router = express.Router();

router.get("/", (req, res) => {
  const templateVars = {
    user: users[req.cookies.id]
  };

  res.render("user_registration", templateVars);
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const id = generateRandomString();

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