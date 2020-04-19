const visitsRouter = require('express').Router();
const Visit = require('../models/Visit');

visitsRouter.get('/', async (request, response) => {
  const visits = await Visit.find({});

  response.json(visits.map((visit) => visit.toJSON()));
});

visitsRouter.get('/data', async (request, response) => {
  response.json(request.ip);
});

visitsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const visitsToUpdate = {
    visits: body.visits,
  };

  try {
    const updatedVisits = await Visit.findByIdAndUpdate(request.params.id, visitsToUpdate, { new: true });
    return response.json(updatedVisits.toJSON());
  }
  catch (error) {
    response.status(500).send(`Houve um erro: ${error}`);
  }
});

module.exports = visitsRouter;
