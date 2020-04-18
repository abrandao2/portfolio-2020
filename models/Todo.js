const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    expires: 300,
  },
  title: {
    type: String,
    required: true,
  },
  important: Boolean,
});

mongoose.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Todo', todoSchema);