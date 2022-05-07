const express = require("express");
const { requireLogin, filterUserUrls, blockUnauthorizedUser } = require("../middlewares/urls");
const { getLongUrlByShortUrl, addNewUrlToDb, updateLongUrl, deleteUrl } = require("../utils/utils");

const router = express.Router();

router.use(requireLogin);
router.use(filterUserUrls);

router.param("shortURL", blockUnauthorizedUser);

/* ------ Browse URLs/Add URL ------ */
router
  .route("/")
  .get((req, res) => {
    res.render("urls/index");
  })
  .post((req, res) => {
    const userId = req.session.user_id;
    const longURL = req.body.longURL;
    const shortURL = addNewUrlToDb(userId, longURL);

    res.redirect(`/urls/${shortURL}`);
  });

/* ------ Create New URL Page ------ */
router.get("/new", (req, res) => {
  res.render("urls/new");
});

/* ------ Read/Edit/Delete URL ------ */
router
  .route("/:shortURL")
  .get((req, res) => {
    const { shortURL } = req.params;
    const longURL = getLongUrlByShortUrl(shortURL);

    res.render("urls/show", { shortURL, longURL });
  })
  .put((req, res) => {
    const { shortURL } = req.params;
    const { longURL } = req.body;
    
    updateLongUrl(shortURL, longURL);

    res.redirect("/urls");
  })
  .delete((req, res) => {
    deleteUrl(req.params.shortURL);

    res.redirect("/urls");
  });

module.exports = router;