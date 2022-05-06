const express = require("express");

const { validateRegistration } = require("../middlewares/register");
const { addNewUserToDb } = require("../utils/utils");

const router = express.Router();

/* ------ Sign Up Page ------ */
router
  .route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post(validateRegistration, (req, res) => {
    const { email, password } = req.body;
    const userId = addNewUserToDb(email, password);
    
    req.session.user_id = userId;
    res.redirect("/urls");
  });

module.exports = router;