const visitorRouter = require('express').Router();
const Visitor = require('../models/Visitor');

visitorRouter.post('/', async (request, response) => {
  const visitor = new Visitor({
    dateOfVisit: Date.now(),
    ip: request.body.ip.toString(),
  });

  await visitor.save();
});

module.exports = visitorRouter;
