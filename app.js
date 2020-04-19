const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todosRouter = require('./controllers/todos');
const articlesRouter = require('./controllers/articles');
const visitsRouter = require('./controllers/visits');
const visitorRouter = require('./controllers/visitor');
const getVisitorData = require('./utils/middleware').getVisitorData;

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

// Middleware for getting visitor data
//app.use('/', getVisitorData);

// Routes to Controllers
app.use('/api/todos', todosRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/visits', visitsRouter);
app.use('/api/visitor', visitorRouter);
app.use('/*', express.static(__dirname + '/build/index.html'));

module.exports = app;