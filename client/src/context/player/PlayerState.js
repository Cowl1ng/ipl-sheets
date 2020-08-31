import React, { useReducer } from 'react'
import Axios from 'axios'

import PlayerContext from './playerContext'
import PlayerReducer from './playerReducer'
import {
  PLAYER_LOADED,
  PLAYER_ERROR,
  BID_LOADED,
  BIDS_LOADED,
  OUTS_LOADED,
  SET_PAUSE,
  LOAD_TEAMS,
} from '../types'

const PlayerState = (props) => {
  const initialState = {
    nextPlayer: null,
    error: null,
    maxBid: null,
    bids: null,
    out: null,
    bidStatus: false,
    teams: [],
    team1: [],
    team2: [],
    team3: [],
    team4: [],
    pause: false,
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
      dispatch({ type: BIDS_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Load out bids
  const loadOuts = async (player) => {
    if (player) {
      console.log(`PLAYER: ${player.Name}`)
    }
    try {
      const res = await Axios.get('/api/players/bid/out', {
        params: {
          player: player.Name,
        },
      })
      console.log(`RD: ${JSON.stringify(res.data)}`)
      dispatch({ type: OUTS_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: PLAYER_ERROR })
    }
  }

  // Get all players sorted by team
  const loadTeams = async (users) => {
    let t1Players = []
    let t2Players = []
    let t3Players = []
    let t4Players = []
    const res = await Axios.get(`/api/players/teams`)
    if (users) {
      for (const player of res.data) {
        if (player.owner === users[0]) {
          t1Players.push({ Name: player.Name, price: player.price })
        } else if (player.owner === users[1]) {
          t2Players.push({ Name: player.Name, price: player.price })
        } else if (player.owner === users[2]) {
          t3Players.push({ Name: player.Name, price: player.price })
        } else if (player.owner === users[3]) {
          t4Players.push({ Name: player.Name, price: player.price })
        }
      }
    }
    dispatch({
      type: LOAD_TEAMS,
      payload: { t1Players, t2Players, t3Players, t4Players, teams: res.data },
    })
  }

  // Pause the timer
  const setPause = async (bool) => {
    // console.log(`B:${bool}`)
    dispatch({ type: SET_PAUSE, payload: bool })
  }

  return (
    <PlayerContext.Provider
      value={{
        nextPlayer: state.nextPlayer,
        error: state.error,
        maxBid: state.maxBid,
        bids: state.bids,
        outs: state.outs,
        teams: state.teams,
        team1: state.team1,
        team2: state.team2,
        team3: state.team3,
        team4: state.team4,
        pause: state.pause,
        loadNextPlayer,
        loadMaxBid,
        loadBids,
        loadTeams,
        loadOuts,
        setPause,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerState
