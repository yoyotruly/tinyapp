const { findUserByLogin } = require("../utils/utils");

/**
 * Authenticate if a user's login information is valid.
 */
const authenticateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const user = findUserByLogin(email, password);

  if (!user) {
    return res
      .status(403)
      .render("login", { message: "Invalid email or password" });
  }
  
  req.session.user_id = user.id;
  next();
};

module.exports = { authenticateLogin };
