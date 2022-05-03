const express = require("express");

const { users } = require("../constants");

const router = express.Router();

router.get("/", (req, res) => {
  const templateVars = {
    user: users[req.cookies.id]
  };

  res.render("login", templateVars);
});

// TODO: need to change login to take email and password instead
router.post("/", (req, res) => {
  res
    .cookie("username", req.body.username)
    .redirect("back");
});

module.exports = router;