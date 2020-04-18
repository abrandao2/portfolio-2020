const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    expires: 300,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  }
});

mongoose.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Article', articleSchema);