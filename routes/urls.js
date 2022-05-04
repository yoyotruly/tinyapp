const express = require("express");

const { generateRandomString } = require("../utils/utils");
const { urlDatabase, users } = require("../utils/constants");

const router = express.Router();

router.get("/", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies.id]
  };

  res.render("urls_index", templateVars);
});

router.post("/", (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;

  res.redirect(`/urls/${shortURL}`);
});

// Create New URL page
router.get("/new", (req, res) => {
  const templateVars = {
    user: users[req.cookies.id]
  };
  
  res.render("urls_new", templateVars);
});

// Edit URL page
router.get("/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user: users[req.cookies.id]
  };

  res.render("urls_show", templateVars);
});

router.post("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const updatedLongURL = req.body.longURL;
  urlDatabase[shortURL] = updatedLongURL;

  res.redirect("/urls");
});

// Delete URL
router.post("/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

module.exports = router;