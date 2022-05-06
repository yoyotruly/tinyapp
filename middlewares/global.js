const { findUserById } = require("../utils/utils");

const getUser = (req, res, next) => {
  const user = findUserById(req.cookies.user_id);
  res.locals.user = user;
  next();
};

module.exports = {
  getUser
};