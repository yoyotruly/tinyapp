const express = require("express");
const { findUserByLogin } = require("../utils/utils");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const { email, password } = req.body;
    const user = findUserByLogin(email, password);

    if (!user) return res.status(403).send("Invalid email or password");
    
    res
      .cookie("user_id", user.id)
      .redirect("/urls");
  });

module.exports = router;