const { getUrlsByUserId, isUserAuthorized } = require("../utils/utils");

/**
 * Block vistor and prompt user to log in.
 */
const requireLogin = ((req, res, next) => {
  if (!req.session.user_id) {
    return res
      .status(400)
      .render("login", { message: "Please log in first" });
  }

  next();
});

/**
 * Filter content based on logged in user. Set res.locals.urls with user-specific
 * content object.
 */
const filterUserUrls = ((req, res, next) => {
  const urls = getUrlsByUserId(req.session.user_id);
  res.locals.urls = urls;

  next();
});

/**
 * Block unauthorized user to perform certain actions.
 */
const blockUnauthorizedUser = (req, res, next) => {
  const userId = req.session.user_id;
  const shortURL = req.params.shortURL;

  if (!isUserAuthorized(userId, shortURL)) {
    return res.status(404).render("404");
  }
  
  next();
};

module.exports = {
  requireLogin,
  filterUserUrls,
  blockUnauthorizedUser
};