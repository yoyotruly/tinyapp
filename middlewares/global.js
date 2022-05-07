const { getUserById } = require("../utils/utils");

const getUser = (req, res, next) => {
  const user = getUserById(req.session.user_id);
  res.locals.user = user;
  next();
};

module.exports = {
  getUser
};