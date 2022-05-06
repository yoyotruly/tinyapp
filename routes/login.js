const express = require("express");
const { authenticateLogin } = require("../middlewares/login");

const router = express.Router();

/* ------ Log In Page ------ */
router
  .route("/")
  .get((req, res) => {
    res.render("login");
  })
  .post(authenticateLogin, (req, res) => {
    res.redirect("/urls");
  });

module.exports = router;