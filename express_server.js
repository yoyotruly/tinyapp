const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const indexRoutes = require("./routes/index");
const urlsRoutes = require("./routes/urls");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

const { urlDatabase } = require("./utils/constants");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRoutes);
app.use("/urls", urlsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

// Redirect to original link
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});