import React, { useReducer } from 'react'
import Axios from 'axios'

import PlayerContext from './playerContext'
import PlayerReducer from './playerReducer'
import {
  PLAYER_LOADED,
  PLAYER_ERROR,
  BID_LOADED,
  BIDS_LOADED,
  BID_STATUS,
} from '../types'

const PlayerState = (props) => {
  const initialState = {
    nextPlayer: null,
    error: null,
    maxBid: null,
    bids: null,
    bidStatus: false,
  }

  const [state, dispatch] = useReducer(PlayerReducer, initialState)

  // Load next undrafted player
  const loadNextPlayer = async () => {
    try {
      const res = await Axios.get('/api/players/undrafted/next')
      dispatch({ type: PLAYER_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Load max bid
  const loadMaxBid = async (player) => {
    try {
      const res = await Axios.get(`/api/players/max_bid`, {
        params: {
          player: player.Name,
        },
      })
      dispatch({ type: BID_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Load all bids for the player
  const loadBids = async (player) => {
    try {
      const res = await Axios.get(`/api/players/bid`, {
        params: {
          player: player.Name,
        },
      })
      console.log(`RES: ${JSON.stringify(res.data)}`)
      dispatch({ type: BIDS_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Set bidding value
  const bidStatusChange = async (bidStatus) => {
    console.log(`BIDS:${bidStatus}`)
    dispatch({ type: BID_STATUS, payload: bidStatus })
    console.log(`BIDS1:${bidStatus}`)
  }

  return (
    <PlayerContext.Provider
      value={{
        nextPlayer: state.nextPlayer,
        error: state.error,
        maxBid: state.maxBid,
        bids: state.bids,
        bidStatus: state.bidStatus,
        loadNextPlayer,
        loadMaxBid,
        loadBids,
        bidStatusChange,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerState
