const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res
    .clearCookie("user_id")
    .redirect("back");
});

module.exports = router;