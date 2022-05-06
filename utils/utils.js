const bcrypt = require('bcryptjs');
const { users, urlDatabase } = require("./constants");

/**
 * Generate a string of random letter and number combination.
 * @returns {string} 6 charactor random string
 */
const generateRandomString = () => {
  return Math.random().toString(36).slice(2, 8);
};

/**
 * Check if the input email has already been registered.
 * @param {string} email Email
 * @returns {boolean} Returns true if email already exists, otherwise returns false
 */
const isExistingEmail = (email) => {
  return Object.values(users).map(user => user.email).includes(email);
};

/**
 * Check if a user is authorized to check or perform actions on certain urls.
 * @param {string} userId The ID user logged in as
 * @param {string} value The value to look up
 * @param {string} [lookupBy=shortURL] Which property to look up by
 * @returns {Boolean} Returns true if current user matches record, returns false
 * otherwise
 */
const isUserAuthorized = (userId, value, lookupBy = "shortURL") => {
  let recordUserId;
  
  switch (lookupBy) {
  case "shortURL":
    recordUserId = urlDatabase[value] && urlDatabase[value].userId;
  }

  return userId === recordUserId;
};

/**
 * Check if a user is valid with provided email and password, return the user
 * object if it is valid.
 * @param {string} email Email
 * @param {string} password Password
 * @returns {?Object} Returns user object if input email and password match user's
 * record, otherwise returns undefined
 */
const findUserByLogin = (email, password) => {
  if (!email || !password) return undefined;
  
  return Object.values(users)
    .find((user) => (user.email === email && user.password === password));
};

/**
 * Check if a user is valid with provided user id, return the user object if it
 * is valid.
 * @param {string} id User ID
 * @returns {?Object} Returns user object if id matches records, returns undefined
 * if id doesn't exist or doesn't match records
 */
const findUserById = (id) => {
  return id && users[id];
};

/**
 * Find original long URL by shortened URL.
 * @param {string} shortURL Shortened URL
 * @returns {?string} Returns original long URL if shortURL matches records,
 * returns undefined otherwise
 */
const findLongUrlByShortUrl = (shortURL) => {
  return urlDatabase[shortURL] && urlDatabase[shortURL].longURL;
};

/**
 * Filter url database and return only urls created by userId.
 * @param {string} userId User Id
 * @returns {Array} Returns an array or urls object, e.g.
 * [
 *   { shortURL: 'a1b2', longURL: 'https://www.google.com' },
 *   { shortURL: 'c3d4', longURL: 'https://www.youtube.com/' },
 * ]
 */
const findUrlsByUserId = (userId) => {
  return Object.entries(urlDatabase)
    .filter(url => url[1].userId === userId)
    .map(url => ({
      "shortURL": url[0],
      "longURL": url[1].longURL
    }));
};

/** Add new url record to database.
 * @param {string} userId Current user's ID
 * @param {string} longURL Original URL
 * @returns {string} Returns the short URL system assigned to the original URL
 */
const addNewUrlToDb = (userId, longURL) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = {
    longURL,
    userId
  };

  return shortURL;
};

/**
 * Modify original URL in database.
 * @param {string} shortURL Short URL for this record
 * @param {string} updatedLongURL New long URL user provided
 * @returns None
 */
const updateLongUrl = (shortURL, updatedLongURL) => {
  urlDatabase[shortURL].longURL = updatedLongURL;
};

/** Delete URL record.
 * @param {string} shortURL Short URL
 * @returns None
 */
const deleteUrl = (shortURL) => {
  delete urlDatabase[shortURL];
};

/**
 * (Internal helper function) Hash password with bcrypt algorithm.
 * @param {string} password Password
 * @returns {string} Returns hashed password
 */
const _hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Add new user to database and returns user ID.
 * @param {string} email Email user provided during registration
 * @param {string} password Password user provided during registration
 * @returns {string} Returns user ID
 */
const addNewUserToDb = (email, password) => {
  const id = `u${Object.keys(users).length + 1}`;
  const hashedPassword = _hashPassword(password);
  
  users[id] = {
    id,
    email,
    hashedPassword
  };

  return id;
};

module.exports = {
  generateRandomString,
  isExistingEmail,
  isUserAuthorized,
  findUserByLogin,
  findUserById,
  findLongUrlByShortUrl,
  findUrlsByUserId,
  addNewUrlToDb,
  updateLongUrl,
  deleteUrl,
  addNewUserToDb
};