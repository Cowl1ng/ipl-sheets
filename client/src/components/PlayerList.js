import React, { useContext, useEffect } from 'react'
import Axios from 'axios'
import AuthContext from '../context/auth/authContext'
import PlayerContext from '../context/player/playerContext'

const PlayerList = () => {
  const authContext = useContext(AuthContext)
  const playerContext = useContext(PlayerContext)
  const { getUndrafted, undraftedPlayers, nextPlayer } = playerContext
  useEffect(() => {
    authContext.loadUser()
    console.log(`Authenticated: ${authContext.isAuthenticated}`)
    getUndrafted()
  }, []) // eslint-disable-line

  useEffect(() => {
    getUndrafted()
  }, [nextPlayer]) // eslint-disable-line
  return (
    <div>
      {undraftedPlayers && (
        <div>
          {undraftedPlayers.map((player) => (
            <li key={player.Name}>{player.Name}</li>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlayerList
