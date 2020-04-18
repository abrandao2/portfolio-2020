require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_PORTFOLIO = process.env.MONGODB_PORTFOLIO;

module.exports = {
  PORT,
  MONGODB_PORTFOLIO,
};