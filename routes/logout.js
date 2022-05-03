const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res
    .clearCookie("id")
    .redirect("back");
});

module.exports = router;