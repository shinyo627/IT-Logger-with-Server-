const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  message: {
    type: String,
    required: true,
  },
  attention: {
    type: Boolean,
  },
  tech: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('log', LogSchema);
