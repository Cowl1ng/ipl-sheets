const mongoose = require('mongoose')

const BidSchema = mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Player',
  },
  owner: {
    type: String,
    required: true,
    ref: 'User',
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  out: {
    type: Boolean,
    required: true,
    default: false,
  },
})

module.exports = mongoose.model('bid', BidSchema)
