const { users } = require("./constants");

const generateRandomString = () => {
  return "x2Az3";
};

const checkEmailExist = (email) => {
  const emailRecords = Object.values(users).map(x => x.email);

  return emailRecords.includes(email);
};


module.exports = {
  generateRandomString,
  checkEmailExist
};