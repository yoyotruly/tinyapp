const express = require("express");

const router = express.Router();

// TODO: need to change login to take email and password instead
router.post("/", (req, res) => {
  res
    .cookie("username", req.body.username)
    .redirect("back");
});

module.exports = router;