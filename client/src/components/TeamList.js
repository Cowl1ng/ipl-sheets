import React, { useContext, useEffect, Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'

import PlayerContext from '../context/player/playerContext'
import AuthContext from '../context/auth/authContext'

const TeamList = () => {
  const playerContext = useContext(PlayerContext)
  const authContext = useContext(AuthContext)

  const {
    teams,
    loadTeams,
    team1,
    team2,
    team3,
    team4,
    nextPlayer,
  } = playerContext
  const { users, loadUsers } = authContext

  useEffect(() => {
    loadUsers()
    loadTeams(users)
  }, [])

  useEffect(() => {
    loadTeams(users)
  }, [nextPlayer])
  return (
    <div>
      <Row>
        <Col>
          <div>{users ? <h1>{users[0]}</h1> : <h1>Waiting for users</h1>}</div>
        </Col>
        <Col>
          <div>{users ? <h1>{users[1]}</h1> : <h1>Waiting for users</h1>}</div>
        </Col>
        <Col>
          <div>{users ? <h1>{users[2]}</h1> : <h1>Waiting for users</h1>}</div>
        </Col>
        <Col>
          <div>{users ? <h1>{users[3]}</h1> : <h1>Waiting for users</h1>}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          {team1 && (
            <div>
              {team1.map((player) => (
                <li key={player.Name}>
                  {player.Name} : £{player.price}
                </li>
              ))}
            </div>
          )}
        </Col>
        <Col>
          {team2 && (
            <div>
              {team2.map((player) => (
                <li key={player.Name}>
                  {player.Name} : £{player.price}
                </li>
              ))}
            </div>
          )}
        </Col>
        <Col>
          {team3 && (
            <div>
              {team3.map((player) => (
                <li key={player.Name}>
                  {player.Name} : £{player.price}
                </li>
              ))}
            </div>
          )}
        </Col>
        <Col>
          {team4 && (
            <div>
              {team4.map((player) => (
                <li key={player.Name}>
                  {player.Name} : £{player.price}
                </li>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default TeamList
