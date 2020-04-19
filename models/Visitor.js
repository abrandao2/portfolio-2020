const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  dateOfVisit: {
    type: Date,
  },
  ip: {
    type: String,
  },
});

mongoose.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);