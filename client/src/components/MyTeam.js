import React from 'react'
import Axios from 'axios'
import { useQuery } from 'react-query'

const getMyTeam = async () => {
  const res = await Axios.get('/api/players/my_team')
  return res.data
}

const MyTeam = () => {
  const { data, status } = useQuery('myTeam', getMyTeam)
  console.log(data)
  return (
    <div>
      {status === 'loading' && <div>Loading data... </div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.map((player) => (
            <li>{player.Player_Name}</li>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTeam
