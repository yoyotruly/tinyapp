const { findUserByLogin } = require("../utils/utils");

const authenticateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const user = findUserByLogin(email, password);

  if (!user) {
    return res
      .status(403)
      .render("login", { message: "Invalid email or password" });
  }
  
  req.userId = user.id;
  next();
};

module.exports = { authenticateLogin };
