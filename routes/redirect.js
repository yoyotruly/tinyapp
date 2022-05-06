const express = require("express");
const { findLongUrlByShortUrl } = require("../utils/utils");

const router = express.Router();

// Redirect to original link
router.get("/:shortURL", (req, res) => {
  const longURL = findLongUrlByShortUrl(req.params.shortURL);
  
  if (!longURL) return res.status(404).render("404");

  res.redirect(longURL);
});

module.exports = router;