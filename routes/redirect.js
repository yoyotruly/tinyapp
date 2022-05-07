const express = require("express");
const { getLongUrlByShortUrl } = require("../utils/utils");

const router = express.Router();

// Redirect to original link
router.get("/:shortURL", (req, res) => {
  const longURL = getLongUrlByShortUrl(req.params.shortURL);
  
  if (!longURL) return res.status(404).render("404");

  res.redirect(longURL);
});

module.exports = router;