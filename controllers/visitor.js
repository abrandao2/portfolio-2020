const visitorRouter = require('express').Router();
const Visitor = require('../models/Visitor');

visitorRouter.post('/', async (request, response) => {
  const visitor = new Visitor({
    dateOfVisit: Date.now(),
    ip: request.body.ip.toString(),
  });

  if (visitor.ip === '127.0.0.1') {
    return response.status(204).end();
  }

  try {
    await visitor.save();

    response.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = visitorRouter;
