import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { login } from '../actions/userActions'
import Message from '../components/Message'

const LoginPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { error, userInfo, loading } = useSelector(
    (state) => state.userLoginReducer
  )

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <h2 className="mb-4 text-center text-primary">Sign In</h2>

        {error && <Message variant="danger">{error}</Message>}
        {loading && (
          <div className="d-flex align-items-center mb-3">
            <h5 className="mr-2">Logging in...</h5>
            <Spinner animation="border" />
          </div>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-4 w-100">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none">
              Register
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default LoginPage
