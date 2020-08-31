import React, { useReducer } from 'react'
import Axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_USERS,
  LOAD_BALANCE,
} from '../types'

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    users: null,
    loadBalance: 100,
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    try {
      const res = await Axios.get('/api/auth')

      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (error) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Register user
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await Axios.post('/api/users', formData, config)

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })

      loadUser()
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await Axios.post('/api/auth', formData, config)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })

      loadUser()
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      })
    }
  }

  // Logout
  const logout = () => dispatch({ type: LOGOUT })
  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  // Load all users names
  const loadUsers = async () => {
    try {
      const res = await Axios.get('/api/users')
      dispatch({ type: LOAD_USERS, payload: res.data })
    } catch (error) {
      dispatch({ type: AUTH_ERROR })
    }
  }

  // Load balance
  const loadBalance = async (user) => {
    let teamPrices = []
    const res = await Axios.get(`/api/players/teams`)
    for (const player of res.data) {
      if (player.owner === user) {
        teamPrices.push(player.price)
      }
    }
    const balance =
      100 -
      teamPrices.reduce((a, b) => {
        return a + b
      }, 0)
    dispatch({ type: LOAD_BALANCE, payload: balance })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        users: state.users,
        balance: state.balance,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        loadUsers,
        loadBalance,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
