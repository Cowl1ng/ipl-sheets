import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'

import PlayerList from './PlayerList'
import Stopwatch from './Stopwatch'

// Bootstrap-react imports
import { Container, Row, Col, Button } from 'react-bootstrap/'
import { useMutation, useQuery } from 'react-query'

import AuthContext from '../context/auth/authContext'

const getNextPlayer = async () => {
  const res = await Axios.get('/api/players/undrafted/next')
  return res.data
}

const sendBid = async (player, owner, bid, out) => {
  const res = await Axios.post('/api/players/bid', { player, owner, bid, out })
}

const getBids = async (key, player) => {
  const res = await Axios.get(`/api/players/bid`, {
    params: {
      player,
    },
  })
  console.log(res.data)
  return res.data
}
const getMaxBid = async (key, player) => {
  const res = await Axios.get(`/api/players/max_bid`, {
    params: {
      player,
    },
  })
  console.log(res.data)
  return res.data
}

const Drafting = () => {
  const authContext = useContext(AuthContext)

  const { user } = authContext

  const [statusSending, setStatusSending] = useState(true)
  const [bid, setBid] = useState({
    player: '',
    owner: '',
    value: 0,
    out: false,
  })

  const [auctionPlayer, setAuctionPlayer] = useState('')

  const [out, setOut] = useState(false)
  const [minBid, setMinBid] = useState(0)

  const { data: nextPlayer, status: statusNextPlayer } = useQuery(
    'nextPlayer',
    getNextPlayer
  )

  const { data: Bids, status: statusBids, refetch: bidRefetch } = useQuery(
    ['bids', auctionPlayer],
    getBids,
    {
      enabled: false,
    }
  )
  // const {
  //   data: maxBid,
  //   status: statusMaxBid,
  //   refetch: maxBidRefetch,
  // } = useQuery(['maxBid', auctionPlayer], getMaxBid, {
  //   enabled: false,
  // })

  const [mutate] = useMutation(sendBid, {})
  useEffect(() => {
    if (statusNextPlayer === 'success') {
      setAuctionPlayer(nextPlayer[0].Name)
      bidRefetch()
      // maxBidRefetch()
      // if (maxBid) {
      //   setMinBid(maxBid.value)
      // }
    }
  }, [statusNextPlayer, nextPlayer, statusSending])

  const onChange = (e) => setBid(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Posting bid')
    setStatusSending(!statusSending)
    console.log(`SS: ${statusSending}`)
    mutate({
      player: nextPlayer[0].Name,
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
          {statusNextPlayer === 'loading' && <div>Loading data... </div>}
          {statusNextPlayer === 'error' && <div>Error fetching data</div>}
          {statusNextPlayer === 'success' && (
            <h1>
              THE NEXT PLAYER:
              <br /> {nextPlayer[0].Name}
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
            {/* <Stopwatch  winningBid={winningBid} /> */}
            <h1 style={{ fontSize: 65 }}>00:30</h1>
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
            {statusBids === 'loading' && <div>Loading data... </div>}
            {statusBids === 'error' && <div>Error fetching data</div>}
            {statusBids === 'idle' && <div>Waitingfor player</div>}
            {statusBids === 'success' && (
              <div>
                {/* <h1>
                  Largest Bid by {maxBid.owner} : {maxBid.value}
                </h1> */}
                {Bids.bids.map((bid) => (
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
