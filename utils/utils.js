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
 * @returns {*} Returns user object if input email and password match user's
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
 * @returns {*} Returns user object if id matches record, otherwise returns
 * undefine
 */
const findUserById = (id) => {
  if (!id) return undefined;

  return users[id];
};

module.exports = {
  generateRandomString,
  isExistingEmail,
  findUserByLogin,
  findUserById
};