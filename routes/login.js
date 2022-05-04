const express = require("express");

const { findUser } = require("../utils/utils");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const { email, password } = req.body;
    const user = findUser(email, password);
    
    if (!user) return res.status(403).send("Oops, user doesn't exist");
    
    res
      .cookie("user_id", user.id)
      .redirect("/urls");
  });

module.exports = router;