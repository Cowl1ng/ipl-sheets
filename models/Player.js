const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Nationality: {
    type: String,
    required: true,
  },
  Order: {
    type: Number,
    required: true,
  },
  Team: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    default: 'Undrafted',
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
})

module.exports = mongoose.model('player', PlayerSchema)
