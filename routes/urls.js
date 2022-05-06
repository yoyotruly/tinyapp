const express = require("express");
const {
  findUrlsByUserId,
  findLongUrlByShortUrl,
  addNewUrlToDb,
  modifyLongUrl,
  isUserAuthorized,
  deleteUrl
} = require("../utils/utils");

const router = express.Router();

const blockVisitor = ((req, res, next) => {
  if (!req.cookies.user_id) {
    return res
      .status(400)
      .render("login", { message: "Please log in first" });
  }

  next();
});

const filterUrls = ((req, res, next) => {
  const urls = findUrlsByUserId(req.cookies.user_id);
  res.locals.urls = urls;

  next();
});

const blockUnauthorizedUser = (req, res, next) => {
  const userId = req.cookies.user_id;
  const shortURL = req.params.shortURL;

  if (!isUserAuthorized(userId, shortURL)) {
    return res.status(404).send("404. Page Not Found");
  }
  
  next();
};

router.use(blockVisitor);
router.use(filterUrls);

router
  .route("/")
  .get((req, res) => {
    res.render("urls_index");
  })
  .post((req, res) => {
    const userId = req.cookies.user_id;
    const longURL = req.body.longURL;
    const shortURL = addNewUrlToDb(userId, longURL);

    res.redirect(`/urls/${shortURL}`);
  });

// Create New URL page
router.get("/new", (req, res) => {
  res.render("urls_new");
});

// Edit URL page
router
  .route("/:shortURL")
  .get(blockUnauthorizedUser, (req, res) => {
    const { shortURL } = req.params;
    const longURL = findLongUrlByShortUrl(shortURL);

    const templateVars = {
      shortURL,
      longURL
    };

    res.render("urls_show", templateVars);
  })
  .post(blockUnauthorizedUser, (req, res) => {
    const { shortURL } = req.params;
    const { longURL } = req.body;
    modifyLongUrl(shortURL, longURL);

    res.redirect("/urls");
  });

// Delete URL
router.post("/:shortURL/delete", blockUnauthorizedUser, (req, res) => {
  deleteUrl(req.params.shortURL);

  res.redirect("/urls");
});

module.exports = router;