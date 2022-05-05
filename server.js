const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const indexRoutes = require("./routes/index");
const urlsRoutes = require("./routes/urls");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

const { findUserById, findLongURL } = require("./utils/utils");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  const user = findUserById(req.cookies.user_id);
  res.locals = { user };
  next();
});

app.use("/", indexRoutes);
app.use("/urls", urlsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

// Redirect to original link
app.get("/u/:shortURL", (req, res) => {
  const longURL = findLongURL(req.params.shortURL);
  
  if (!longURL) return res.status(404).send("Invalid link");

  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});