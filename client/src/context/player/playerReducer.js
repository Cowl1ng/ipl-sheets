import {
  PLAYER_LOADED,
  PLAYER_ERROR,
  BID_LOADED,
  BIDS_LOADED,
  BID_STATUS,
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
    case BID_STATUS:
      return {
        ...state,
        bidStatus: !action.payload,
      }
    case PLAYER_ERROR:
      return {
        ...state,
        nextPlayer: null,
        error: action.payload,
      }
    default:
      return state
  }
}
