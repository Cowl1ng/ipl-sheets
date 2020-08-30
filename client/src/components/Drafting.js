import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'

import PlayerList from './PlayerList'
import Stopwatch from './Stopwatch'

// Bootstrap-react imports
import { Container, Row, Col, Button } from 'react-bootstrap/'
import { useMutation, useQuery } from 'react-query'

import AuthContext from '../context/auth/authContext'
import PlayerContext from '../context/player/playerContext'

const sendBid = async (player, owner, bid, out) => {
  const res = await Axios.post('/api/players/bid', { player, owner, bid, out })
}

const getBids = async (key, player) => {
  const nextPlayer = player[0]
  const res = await Axios.get(`/api/players/bid`, {
    params: {
      player: nextPlayer.Name,
    },
  })
  return res.data
}

const Drafting = () => {
  const authContext = useContext(AuthContext)
  const playerContext = useContext(PlayerContext)

  const { user } = authContext
  const {
    loadNextPlayer,
    nextPlayer,
    maxBid,
    bids,
    bidStatus,
    bidStatusChange,
  } = playerContext

  const [statusSending, setStatusSending] = useState(true)
  const [bid, setBid] = useState({
    player: '',
    owner: '',
    value: 0,
    out: false,
  })

  const [out, setOut] = useState(false)
  const [minBid, setMinBid] = useState(0)

  const [mutate] = useMutation(sendBid, {})
  useEffect(() => {
    if (nextPlayer) {
      if (maxBid) {
        setMinBid(maxBid.value)
        setMinBid(0)
      }
    }
  }, [nextPlayer, statusSending, maxBid])

  useEffect(() => {
    loadNextPlayer()
    console.log(`NP: ${JSON.stringify(nextPlayer)}`)
  }, [])

  const onChange = (e) => setBid(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Posting bid')
    setStatusSending(!statusSending)
    bidStatusChange(bidStatus)
    console.log(`SS: ${statusSending}`)
    mutate({
      player: nextPlayer.Name,
      owner: user.name,
      bid: bid,
      out: false,
    })
  }

  const handleClick = () => {
    setOut(true)
    mutate({
      player: nextPlayer[0].Name,
      owner: user.name,
      bid: bid,
      out: true,
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={1}></Col>
        <Col lg={3}>
          {nextPlayer && (
            <h1>
              THE NEXT PLAYER:
              <br /> {nextPlayer.Name}
            </h1>
          )}
        </Col>
        <Col lg={6}>
          <Row
            style={{
              justifyContent: 'center',
              paddingTop: 50,
              paddingBottom: 50,
            }}
          >
            <Stopwatch winningBid={maxBid} />
          </Row>
          <Row style={{ justifyContent: 'center', paddingBottom: 20 }}>
            <h1>Current Winning Bidder: £ Current Winning Bid</h1>
          </Row>
          <Row style={{ justifyContent: 'center', paddingBottom: 50 }}>
            <form onSubmit={onSubmit}>
              <input
                type='number'
                name='bidValue'
                step='1'
                min={minBid + 1}
                value={bid}
                onChange={onChange}
                required
              />
              <input
                type='submit'
                value='BID'
                className='btn btn-primary btn-block'
              />
            </form>
          </Row>
          <Row style={{ justifyContent: 'center', paddingBottom: 50 }}>
            <Button size='lg' disabled={out} onClick={handleClick}>
              OUT
            </Button>
          </Row>
          <Row style={{ justifyContent: 'center', paddingBottom: 20 }}>
            <h1>Your remaining balance: £ X</h1>
          </Row>
        </Col>
        <Col>
          <h4>Up next</h4>
          <PlayerList />
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            {maxBid === '' && <div>Waitingfor bids</div>}
            {maxBid && (
              <div>
                <h1>
                  Largest Bid by {maxBid.owner} : {maxBid.value}
                </h1>
                {bids &&
                  bids.bids.map((bid) => (
                    <li key={bid._id}>
                      {bid.owner} : {bid.value}
                    </li>
                  ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Drafting
