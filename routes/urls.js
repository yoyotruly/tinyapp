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
    urlDatabase[shortURL] = {
      longURL: req.body.longURL,
      userId: req.cookies.user_id
    };

    console.log(urlDatabase);

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
    const { shortURL } = req.params;
    const { longURL } = urlDatabase[shortURL];

    const templateVars = {
      shortURL,
      longURL
    };

    res.render("urls_show", templateVars);
  })
  .post(isUserLoggedIn, (req, res) => {
    const { shortURL } = req.params;
    const { longURL } = req.body;
    const userId = req.cookies.user_id;

    urlDatabase[shortURL] = {
      longURL,
      userId
    };

    res.redirect("/urls");
  });

// Delete URL
router.post("/:shortURL/delete", isUserLoggedIn, (req, res) => {
  const { shortURL } = req.params;
  
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

module.exports = router;