const express = require("express");

const { blockInvalidRegistration } = require("../middlewares/register");
const { addNewUserToDb } = require("../utils/utils");

const router = express.Router();

/* ------ Sign Up Page ------ */
router
  .route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post(blockInvalidRegistration, (req, res) => {
    const { email, password } = req.body;
    const userId = addNewUserToDb(email, password);
  
    res
      .cookie("user_id", userId)
      .redirect("/urls");
  });

module.exports = router;