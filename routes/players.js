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

router.get('/teams', async (req, res) => {
  try {
    const teams = await Player.find({
      owner: { $ne: 'Undrafted' },
    }).sort({ owner: -1 })
    res.send(teams)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// @route GET api/players/undrafted
// @desc Get limited number of undrafted players
// @access Public

router.get('/undrafted', async (req, res) => {
  try {
    const players = await Player.find({ owner: 'Undrafted' }).limit(20)
    const playerList = players.slice(1)
    res.send(playerList)
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
  const { player, owner, bid, out } = req.body.player
  playerUp = await Player.findOne({ Name: `${player}` })

  const newBid = new Bid({
    player: playerUp._id,
    owner: owner,
    value: bid,
    out: out,
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

    const bids = await Bid.find({ player: player, out: false }).sort({
      value: -1,
    })

    res.send({ bids })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})
// @route GET api/players/bid/out
// @desc Get outs for one player
// @access Public

router.get('/bid/out', async (req, res) => {
  try {
    const player = await Player.findOne({ Name: req.query.player })

    const out = await Bid.find({ player: player, out: true })

    res.json({ out })
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
  const { player, owner, price } = req.body
  try {
    updatedPlayer = await Player.findByIdAndUpdate(
      player,
      { owner: owner, price: price },
      { new: true }
    )
    res.end()
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

// Export router for use in server.js
module.exports = router
