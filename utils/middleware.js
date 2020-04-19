const Visitor = require('../models/Visitor');
const axios = require('axios');

let requestCounter = 0;

const getVisitorData = async (request, response, next) => {
  const visitorInfo = await axios.get('http://www.geoplugin.net/json.gp?jsoncallback=?');
  index++;
  console.log(index);
  //console.log(request.ip);
  next()
};

module.exports = {
  getVisitorData,
};