import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Importing context
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import PlayerState from './context/player/PlayerState'

import Navbar from './components/Navbar'
// Importing page components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import MyTeam from './components/MyTeam'
import AllTeams from './components/AllTeams'
import Drafting from './components/Drafting'

import PrivateRoute from './components/routing/PrivateRoute'

function App() {
  return (
    <div className='App'>
      <AlertState>
        <AuthState>
          <PlayerState>
            <Router>
              <Navbar />
              <div>
                <Switch>
                  <PrivateRoute exact path='/' component={Drafting} />
                  <PrivateRoute exact path='/my_team' component={MyTeam} />
                  <PrivateRoute exact path='/all_teams' component={AllTeams} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Router>
          </PlayerState>
        </AuthState>
      </AlertState>
    </div>
  )
}

export default App
