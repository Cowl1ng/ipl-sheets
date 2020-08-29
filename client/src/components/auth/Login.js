import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Button, Modal } from 'react-bootstrap'

const Login = (props) => {
  const authContext = useContext(AuthContext)

  const [showError, setShowError] = useState(false)

  const handleClose = () => setShowError(false)
  const handleShow = () => setShowError(true)

  const { login, error, isAuthenticated, clearErrors } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    console.log(`Error: ${error}`)
    // checking for exact msg not good for larger applications. send id with error
    if (error === 'Invalid Credentials') {
      handleShow()
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const { username, password } = user

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    login({
      username,
      password,
    })
  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='login'
          className='btn btn-primary btn-block'
        />
      </form>
      {/* Modal for wrong username / password */}
      <Modal show={showError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Incorrect username or password</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Login
