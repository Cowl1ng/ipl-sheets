const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
  Player_Name: {
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
  Owner: {
    type: String,
    required: true,
    default: 'Undrafted',
  },
})

module.exports = mongoose.model('player', PlayerSchema)
