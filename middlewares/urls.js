const { findUrlsByUserId, isUserAuthorized } = require("../utils/utils");

const requireLogin = ((req, res, next) => {
  if (!req.cookies.user_id) {
    return res
      .status(400)
      .render("login", { message: "Please log in first" });
  }

  next();
});

const filterUserUrls = ((req, res, next) => {
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

module.exports = {
  requireLogin,
  filterUserUrls,
  blockUnauthorizedUser
};