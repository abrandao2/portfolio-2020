const todosRouter = require('express').Router();
const Todo = require('../models/Todo');

todosRouter.get('/', async (request, response) => {
  const todos = await Todo.find({});

  response.json(todos.map((todo) => todo.toJSON()));
});

todosRouter.get('/:id', async (request, response) => {
  const todo = await Todo.findById(request.params.id);

  response.json(todo.toJSON());
});

todosRouter.post('/', async (request, response) => {
  const body = request.body;

  const newTodo = new Todo({
    createdAt: Date.now(),
    title: body.title,
    important: request.important || false,
  });

  console.log(newTodo);

  try {
    const createdTodo = await newTodo.save();
    return response.json(createdTodo.toJSON());
  }
  catch (error) {
    response.status(500).send({ error: 'Unable to create new Todo.'});
  }
});

todosRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const todoToUpdate = {
    title: body.title,
    important: body.important,
  };

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(request.params.id, todoToUpdate, { new: true });
    return response.json(updatedTodo.toJSON());
  }
  catch (error) {
    response.status(500).send(`Houve um erro: ${error}`);
  }
});

todosRouter.delete('/:id', async (request, response) => {
  try {
    const todoToDelete = await Todo.findById(request.params.id);

    if (todoToDelete) {
      await Todo.findByIdAndRemove(request.params.id);

      response.status(204).end();
    } else {
      response.status(404).send({ error: 'The to-do had already been deleted from the server.'});
    }
    
  }
  catch (error) {
    console.log('Not able to remove todo (express)', error);
  }
});

module.exports = todosRouter;