const app = require('./app');
const http = require('http');
const config = require('./utils/config');

const server = http.createServer(app);

server.listen(config.PORT), () => {
  console.log(`Server running on PORT ${config.PORT}`);
}

// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose
//   .connect(process.env.MONGODB_TODOAPP, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB!'))
//   .catch(() => console.log('Error connecting to MongoDB!'));

// const todoSchema = new mongoose.Schema({
//   createdAt: {
//     type: Date,
//     expires: 300,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   important: Boolean,
// });

// mongoose.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id;
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   }
// });

// const Todo = mongoose.model('Todo', todoSchema);

// app.get('/', (request, response) => {
//   response.send('<h1>It seems to be working</h1>');
// });

// app.get('/api/todos', async (request, response) => {
//   const todos = await Todo.find({});

//   response.json(todos.map((todo) => todo.toJSON()));
// });

// app.get('/api/todos/:id', async (request, response) => {
//   const todo = await Todo.findById(request.params.id);

//   response.json(todo.toJSON());
// });

// app.post('/api/todos', async (request, response) => {
//   const body = request.body;

//   const newTodo = new Todo({
//     createdAt: Date.now(),
//     title: body.title,
//     important: request.important || false,
//   });

//   console.log(newTodo);

//   try {
//     const createdTodo = await newTodo.save();
//     return response.json(createdTodo.toJSON());
//   }
//   catch (error) {
//     response.status(500).send({ error: 'Unable to create new Todo.'});
//   }
// });

// app.put('/api/todos/:id', async (request, response) => {
//   const body = request.body;

//   const todoToUpdate = {
//     title: body.title,
//     important: body.important,
//   };

//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(request.params.id, todoToUpdate, { new: true });
//     return response.json(updatedTodo.toJSON());
//   }
//   catch (error) {
//     response.status(500).send(`Houve um erro: ${error}`);
//   }
// });

// app.delete('/api/todos/:id', async (request, response) => {
//   try {
//     const todoToDelete = await Todo.findById(request.params.id);

//     if (todoToDelete) {
//       await Todo.findByIdAndRemove(request.params.id);

//       response.status(204).end();
//     } else {
//       response.status(404).send({ error: 'The to-do had already been deleted from the server.'});
//     }
    
//   }
//   catch (error) {
//     console.log('Not able to remove todo (express)', error);
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server listening...`);
// });