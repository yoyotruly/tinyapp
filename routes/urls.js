const express = require("express");

const { generateRandomString, findUrlsByUserId } = require("../utils/utils");
const { urlDatabase } = require("../utils/constants");

const router = express.Router();

const isUserLoggedIn = ((req, res, next) => {
  const userId = req.cookies.user_id;
  if (!userId) {
    return res
      .status(400)
      .render("login");
  }

  next();
});

const filterUrls = ((req, res, next) => {
  const urls = findUrlsByUserId(req.cookies.user_id);
  res.locals.urls = urls;
  next();
});

router.use(isUserLoggedIn);
router.use(filterUrls);

router
  .route("/")
  .get((req, res) => {
    res.render("urls_index");
  })
  .post((req, res) => {
    const shortURL = generateRandomString();
    urlDatabase[shortURL] = {
      longURL: req.body.longURL,
      userId: req.cookies.user_id
    };

    console.log(urlDatabase);

    res.redirect(`/urls/${shortURL}`);
  });

// Create New URL page
router.get("/new", (req, res) => {
  res.render("urls_new");
});

// Edit URL page
router
  .route("/:shortURL")
  .get((req, res) => {
    const { shortURL } = req.params;
    const { longURL } = urlDatabase[shortURL];

    const templateVars = {
      shortURL,
      longURL
    };

    res.render("urls_show", templateVars);
  })
  .post((req, res) => {
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
router.post("/:shortURL/delete", (req, res) => {
  const { shortURL } = req.params;
  
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

module.exports = router;