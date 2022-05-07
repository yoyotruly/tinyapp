const express = require("express");
const { getUrlByShortUrl, incrementUrlTotalClicks } = require("../utils/utils");

const router = express.Router();

/* ------ Redirect to original link ------ */
router.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = getUrlByShortUrl(shortURL).longURL;
  
  if (!longURL) return res.status(404).render("404");
  
  incrementUrlTotalClicks(shortURL);
  res.redirect(longURL);
});

module.exports = router;