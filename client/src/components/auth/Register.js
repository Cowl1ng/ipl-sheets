import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Button, Modal } from 'react-bootstrap'

const Register = (props) => {
  const authContext = useContext(AuthContext)

  const { register, error, clearErrors, isAuthenticated } = authContext

  const [showError, setShowError] = useState(false)
  const [modalText, setModalText] = useState('')

  const handleClose = () => setShowError(false)
  const handleShow = () => setShowError(true)

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    // checking for exact msg not good for larger applications. send id with error
    if (error === 'User already exists') {
      setModalText(error)
      handleShow()
      clearErrors()
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
    password2: '',
  })

  const { name, username, password, password2 } = user

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setModalText('Passwords do not match')
      handleShow()
    } else {
      register({
        name,
        username,
        password,
      })
    }
  }

  return (
    <div className='form-container'>
      <h1>
        <span className='text-primary'>Register Account</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
      {/* Modal for wrong username / password */}
      <Modal show={showError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalText}</Modal.Title>
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

export default Register
