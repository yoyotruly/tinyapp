const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");

const { getUser } = require("./middlewares/global");

const indexRoutes = require("./routes/index");
const urlsRoutes = require("./routes/urls");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const redirectRoutes = require("./routes/redirect");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieSession({ name: "session", keys: ["key1", "key2"] }));

app.use(getUser);

app.use("/", indexRoutes);
app.use("/urls", urlsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/u", redirectRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});