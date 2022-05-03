const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const generateRandomString = () => {
  return "x2Az3";
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  u1: {
    id: "u1",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  u2: {
    id: "u2",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

// Home page
app.get("/", (req, res) => {
  res.send("Hello");
});

// My URLs page
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies.id]
  };

  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

// app.post("/login", (req, res) => {
//   res
//     .cookie("username", req.body.username)
//     .redirect("back");
// });

app.post("/logout", (req, res) => {
  res
    .clearCookie("id")
    .redirect("back");
});

// Create New URL page
app.get("/urls/new", (req, res) => {
  const templateVars = {
    user: users[req.cookies.id]
  };
  
  res.render("urls_new", templateVars);
});

// Edit URL page
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user: users[req.cookies.id]
  };

  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const updatedLongURL = req.body.longURL;
  urlDatabase[shortURL] = updatedLongURL;

  res.redirect("/urls");
});

// Delete URL
app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];

  res.redirect("/urls");
});

// Redirect to original link
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

// User Registration page
app.get("/register", (req, res) => {
  const templateVars = {
    user: users[req.cookies.id]
  };

  res.render("user_registration", templateVars);
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const id = generateRandomString();

  users[id] = {
    id,
    email,
    password
  };

  res
    .cookie("id", id)
    .redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});