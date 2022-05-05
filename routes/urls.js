const express = require("express");

const { generateRandomString } = require("../utils/utils");
const { urlDatabase } = require("../utils/constants");

const router = express.Router();

const isUserLoggedIn = ((req, res, next) => {
  if (!req.cookies.user_id) {
    return res
      .status(400)
      .render("login");
    // TODO: need to display relevant error message
  }
  next();
});

router
  .route("/")
  .get((req, res) => {
    const templateVars = {
      urls: urlDatabase
    };

    res.render("urls_index", templateVars);
  })
  .post(isUserLoggedIn, (req, res) => {
    const shortURL = generateRandomString();
    urlDatabase[shortURL] = req.body.longURL;

    res.redirect(`/urls/${shortURL}`);
  });

// Create New URL page
router.get("/new", isUserLoggedIn, (req, res) => {
  res.render("urls_new");
});

// Edit URL page
router
  .route("/:shortURL")
  .get(isUserLoggedIn, (req, res) => {
    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[req.params.shortURL],
    };

    res.render("urls_show", templateVars);
  })
  .post(isUserLoggedIn, (req, res) => {
    const shortURL = req.params.shortURL;
    const updatedLongURL = req.body.longURL;
    urlDatabase[shortURL] = updatedLongURL;

    res.redirect("/urls");
  });

// Delete URL
router.post("/:shortURL/delete", isUserLoggedIn, (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

module.exports = router;