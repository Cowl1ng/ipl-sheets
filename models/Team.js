const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema({
  Team_Id: {
    type: Number,
    required: true,
  },
  Team_Name: {
    type: String,
    required: true,
  },
  Team_Logo: {
    type: String,
    required: true,
  },
  Stadium_Name: {
    type: String,
    required: true,
  },
  Team_Kit: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('team', TeamSchema)
