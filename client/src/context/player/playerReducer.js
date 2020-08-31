import {
  PLAYER_LOADED,
  PLAYER_ERROR,
  BID_LOADED,
  BIDS_LOADED,
  SET_PAUSE,
  OUTS_LOADED,
  LOAD_TEAMS,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case PLAYER_LOADED:
      return {
        ...state,
        nextPlayer: action.payload,
      }
    case BID_LOADED:
      return {
        ...state,
        maxBid: action.payload,
      }
    case BIDS_LOADED:
      return {
        ...state,
        bids: action.payload,
      }
    case OUTS_LOADED:
      return {
        ...state,
        outs: action.payload,
      }
    case SET_PAUSE:
      return {
        ...state,
        pause: action.payload,
      }
    case PLAYER_ERROR:
      return {
        ...state,
        nextPlayer: null,
        error: action.payload,
      }
    case LOAD_TEAMS:
      return {
        ...state,
        teams: action.payload.teams,
        team1: action.payload.t1Players,
        team2: action.payload.t2Players,
        team3: action.payload.t3Players,
        team4: action.payload.t4Players,
      }
    default:
      return state
  }
}
