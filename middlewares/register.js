const { isExistingEmail } = require("../utils/utils");

const validateRegistration = (req, res, next) => {
  const { email, password } = req.body;
    
  if (!email || !password) {
    return res
      .status(400)
      .render("register", {
        message: "Email or password cannot be empty."
      });
  }

  if (isExistingEmail) {
    return res
      .status(400)
      .render("register", {
        message: "An account with that email already exists. Log in instead?"
      });
  }

  next();
};

module.exports = { validateRegistration };
  