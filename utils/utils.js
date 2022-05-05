const { users, urlDatabase } = require("./constants");

const generateRandomString = () => {
  return "x2Az3";
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
 * @returns {?Object} Returns user object if id matches records, returns undefined if
 * id doesn't exist or doesn't match records
 * undefine
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
const findLongURL = (shortURL) => {
  return urlDatabase[shortURL] && urlDatabase[shortURL].longURL;
};

module.exports = {
  generateRandomString,
  isExistingEmail,
  findUserByLogin,
  findUserById,
  findLongURL
};