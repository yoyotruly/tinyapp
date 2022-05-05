const express = require("express");

const { generateRandomString, isExistingEmail } = require("../utils/utils");
const { users } = require("../utils/constants");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const { email, password } = req.body;
    const id = generateRandomString();
    
    if (!email || !password) return res.status(400).send("Registration information invalid");
    if (isExistingEmail) return res.status(400).send("Email already exists.");
  
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