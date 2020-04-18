const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todosRouter = require('./controllers/todos');
const articlesRouter = require('./controllers/articles');
const visitsRouter = require('./controllers/visits');
const mongoose = require('mongoose');

// Configuration against deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Create Express app
const app = express();

// Connect to MongoDB database
mongoose
  .connect(config.MONGODB_PORTFOLIO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Portfolio'))
  .catch((error) => console.log(`Error connecting to MongoDB: ${error}`));

// Allow requests from different domains
app.use(cors());

// Serve the React Frontend from the "build" folder
app.use(express.static('build'));

// Use Body Parser
app.use(bodyParser.json());

// Routes to Controllers
app.use('/api/todos', todosRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/visits', visitsRouter);

module.exports = app;