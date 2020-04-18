const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visits: Number,
});

mongoose.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Visit', visitSchema);