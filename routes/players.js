const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// Bring in player schema
const Player = require('../models/Player')
const User = require('../models/User')
const Bid = require('../models/Bid')

// Bring in authorisation middleware to verify jwt
const auth = require('../middleware/auth')

// @route GET api/players
// @desc Get all players
// @access Public

router.get('/', async (req, res) => {
  try {
    const players = await Player.find({})
    res.send(players)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route GET api/players/my_team
// @desc Get players you have drafted
// @access Private

router.get(
  '/my_team',
  [check('name', 'Please include a name').not().isEmpty(), auth],
  async (req, res) => {
    try {
      const myTeam = await Player.find({
        Owner: req.user.name,
      })
      res.send(myTeam)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route GET api/players/undrafted
// @desc Get limited number of undrafted players
// @access Public

router.get('/undrafted', async (req, res) => {
  try {
    const players = await Player.find({ owner: 'Undrafted' }).limit(20)
    res.send(players)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route GET api/players/undrafted
// @desc Get next undrafted player
// @access Public

router.get('/undrafted/next', async (req, res) => {
  try {
    const players = await Player.findOne({ owner: 'Undrafted' })
    res.send(players)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route POST api/players/bid
// @desc Send bid for player
// @access Public

router.post('/bid', async (req, res) => {
  const { player, owner, bid } = req.body.player
  playerUp = await Player.findOne({ Name: `${player}` })

  const newBid = new Bid({
    player: playerUp._id,
    owner: owner,
    value: bid,
  })
  await newBid.save()
  res.json(bid)
})

// @route GET api/players/bid
// @desc Get bids for one player
// @access Public

router.get('/bid', async (req, res) => {
  try {
    const player = await Player.findOne({ Name: req.query.player })
    const bids = await Bid.find({ player: player._id, out: false }).sort({
      value: -1,
    })
    const out = await Bid.find({ player: player._id, out: true })
    res.send({ bids, out })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route GET api/players/max_bid
// @desc Get max bid for one player
// @access Public

router.get('/max_bid', async (req, res) => {
  try {
    const player = await Player.findOne({ Name: req.query.player })

    const maxBid = await Bid.findOne({ player: player, out: false }).sort({
      value: -1,
    })
    res.send(maxBid)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

router.put('/', async (req, res) => {
  const { player, owner } = req.body
  console.log(`Player: ${player}`)
  console.log(`Owner: ${owner}`)
  try {
    updatedPlayer = await Player.findByIdAndUpdate(
      player,
      { owner: owner },
      { new: true }
    )
    console.log(updatedPlayer)
    res.end()
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// Export router for use in server.js
module.exports = router
