import React, { useState, useContext, useEffect } from 'react'
import Axios from 'axios'

import PlayerList from './PlayerList'
import Stopwatch from './Stopwatch'
import TeamList from './TeamList'

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

  const { user, users, loadUsers, loadBalance, balance } = authContext
  const {
    loadNextPlayer,
    nextPlayer,
    maxBid,
    bids,
    bidStatus,
    bidStatusChange,
    loadTeams,
    teams,
  } = playerContext

  const [statusSending, setStatusSending] = useState(true)
  const [bid, setBid] = useState({
    player: '',
    owner: '',
    value: 0,
    out: false,
  })

  const [out, setOut] = useState(false)

  const [mutate] = useMutation(sendBid, {})

  useEffect(() => {
    loadUsers()
    console.log(`USERSS: ${users}`)
    loadNextPlayer()
    loadTeams()
  }, [])

  useEffect(() => {
    setOut(false)
    console.log(user)
    if (user) {
      loadBalance(user.name)
    }
  }, [nextPlayer])

  const onChange = (e) => setBid(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
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
      player: nextPlayer.Name,
      owner: user.name,
      bid: 0,
      out: true,
    })
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={1}></Col>
        <Col lg={2}>
          {nextPlayer && (
            <h1>
              Player UP:
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
          <Row style={{ justifyContent: 'center', paddingBottom: 20 }}></Row>
          <Row style={{ justifyContent: 'center', paddingBottom: 50 }}>
            <form onSubmit={onSubmit}>
              <input
                type='number'
                name='bidValue'
                step='1'
                min='1'
                max={balance}
                value={bid}
                onChange={onChange}
                required
                style={{ fontSize: 50, textAlign: 'center', width: 300 }}
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
            <h1>Your remaining balance: £ {balance}</h1>
          </Row>
        </Col>
        <Col>
          <h4>Up next</h4>
          <PlayerList />
        </Col>
      </Row>

      <TeamList />
    </Container>
  )
}

export default Drafting
