import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  userDetails,
  userUpdateDetails,
  checkTokenValidation,
  logout
} from '../actions/userActions'
import { UPDATE_USER_DETAILS_RESET } from '../constants'
import Message from '../components/Message'

function AccountUpdatePage() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Reducers
  const { userInfo } = useSelector(state => state.userLoginReducer)
  const { user: userAccDetails = {}, loading } = useSelector(state => state.userDetailsReducer)
  const { success } = useSelector(state => state.userDetailsUpdateReducer)
  const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)

  // Token check + fetch user details
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(checkTokenValidation())
      dispatch(userDetails(userInfo.id))
    }
  }, [dispatch, history, userInfo])

  // Handle expired token
  useEffect(() => {
    if (userInfo && tokenError === 'Request failed with status code 401') {
      alert('Session expired, please login again.')
      dispatch(logout())
      history.push('/login')
      window.location.reload()
    }
  }, [tokenError, dispatch, history, userInfo])

  // Handle successful update
  useEffect(() => {
    if (success) {
      alert('Account successfully updated.')
      dispatch({ type: UPDATE_USER_DETAILS_RESET })
      history.push('/account/')
      dispatch(userDetails(userInfo.id))
    }
  }, [success, dispatch, history, userInfo])

  // Submit updated details
  const onSubmit = (e) => {
    e.preventDefault()

    const updatedUsername = username.trim() || userAccDetails.username
    const updatedEmail = email.trim() || userAccDetails.email

    if (password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      const userData = {
        username: updatedUsername,
        email: updatedEmail,
        password
      }
      dispatch(userUpdateDetails(userData))
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  const renderForm = () => {
    try {
      return (
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <div className="text-center mb-3 text-info">
              <em>Update User Details</em>
            </div>

            {loading && <Spinner animation="border" />}

            <Form onSubmit={onSubmit}>
              <Form.Group controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  type='text'
                  defaultValue={userAccDetails.username}
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  defaultValue={userAccDetails.email}
                  placeholder='Enter email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Reset Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter new password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm new password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex">
                <Button type='submit' variant='success' className='btn-sm'>
                  Save Changes
                </Button>
                <Link to='/account'>
                  <Button type='button' variant='primary' className='btn-sm ml-2'>
                    Cancel
                  </Button>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      )
    } catch (error) {
      return (
        <Message variant='danger'>
          Something went wrong. Please go back to{' '}
          <Link onClick={logoutHandler} to='/login'>Login</Link> page.
        </Message>
      )
    }
  }

  return renderForm()
}

export default AccountUpdatePage
