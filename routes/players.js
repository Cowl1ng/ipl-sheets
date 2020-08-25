const express = require('express')
const router = express.Router()

// @route GET api/players
// @desc Get all players
// @access Public

router.get('/', (req, res) => {
  res.send('All players')
})

// Export router for use in server.js
module.exports = router
