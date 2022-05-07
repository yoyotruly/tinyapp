const express = require("express");
const { getUrlByShortUrl } = require("../utils/utils");

const router = express.Router();

const urlDatabase = {
  "b2xVn2": {
    longURL: "https://www.lighthouselabs.ca",
    userId: "u1",
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  },
  "a1Ea5x": {
    longURL: "https://www.youtube.com/",
    userId: "u1",
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  },
  "ty5W3Q": {
    longURL: "https://www.facebook.com",
    userId: "u1",
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  },
  "9aiU7q": {
    longURL: "https://www.airbnb.ca/",
    userId: "u2",
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  },
  "9sm5xK": {
    longURL: "https://www.google.com",
    userId: "u2",
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  },
};

const countUserClicks = (shortURL, urlDb = urlDatabase) => {
  urlDb[shortURL].analytics.totalClicks += 1;
};

// Redirect to original link
router.get("/:shortURL", (req, res) => {
  const longURL = getUrlByShortUrl(req.params.shortURL).longURL;
  
  if (!longURL) return res.status(404).render("404");

  res.redirect(longURL);
});

module.exports = router;