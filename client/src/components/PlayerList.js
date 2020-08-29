import React, { useContext, useEffect } from 'react'
import Axios from 'axios'
import AuthContext from '../context/auth/authContext'

import { useQuery } from 'react-query'

const getPlayers = async () => {
  const res = await Axios.get('/api/players/undrafted')
  return res.data
}

const PlayerList = () => {
  const authContext = useContext(AuthContext)
  useEffect(() => {
    authContext.loadUser()
    console.log(`Authenticated: ${authContext.isAuthenticated}`)
  }, []) // eslint-disable-line
  const { data, status } = useQuery('players', getPlayers)
  return (
    <div>
      {status === 'loading' && <div>Loading data... </div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.map((player) => (
            <li key={player.Name}>{player.Name}</li>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlayerList
