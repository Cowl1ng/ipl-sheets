import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'

import useInterval from './useInterval'

import { useMutation, useQuery } from 'react-query'

import PlayerContext from '../context/player/playerContext'

const assignPlayer = async (data) => {
  const player = data.player
  const owner = data.owner
  const res = await Axios.put('/api/players/', { player, owner })
}

const Stopwatch = ({ winningBid }) => {
  const playerContext = useContext(PlayerContext)

  const {
    loadNextPlayer,
    loadMaxBid,
    loadBids,
    nextPlayer,
    maxBid,
    bids,
    bidStatus,
    bidStatusChange,
  } = playerContext

  const [seconds, setSeconds] = useState(0)
  const [delay, setDelay] = useState(0)
  const [timer, setTimer] = useState(false)
  const [winningBidValue, setWinningBidValue] = useState(0)

  // Set up timer counting down with delay of 5 seconds at zero
  useInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1)
      setTimer(!timer)
    } else {
      if (delay === 0) {
        // Send winning bid
        if (winningBid) {
          mutate({ player: winningBid.player, owner: winningBid.owner })
        }
      }
      setDelay(delay + 1)
      if (delay > 1) {
        setSeconds(15)
        setDelay(0)
      }
    }
  }, 1000)

  useEffect(() => {
    setSeconds(15)
  }, [winningBidValue])

  useEffect(() => {
    loadNextPlayer()
  }, [delay])

  useEffect(() => {
    loadMaxBid(nextPlayer)
    if (winningBid) {
      setWinningBidValue(winningBid.value)
    }
    loadBids(nextPlayer)
  }, [timer])

  const [mutate] = useMutation(assignPlayer, {})

  return (
    <div>
      {delay > 0 ? (
        <h1 style={{ fontSize: 65 }}>WINNER WAS {winningBid.owner}</h1>
      ) : (
        <h1 style={{ fontSize: 65 }}>{seconds}</h1>
      )}
      <h1>
        BID :{' '}
        {winningBid ? (
          <h1>
            {winningBid.owner} : £ {winningBid.value}
          </h1>
        ) : (
          <h1>Place a bid</h1>
        )}
      </h1>
    </div>
  )
}

export default Stopwatch
