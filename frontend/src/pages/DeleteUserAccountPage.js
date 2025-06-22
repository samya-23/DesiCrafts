import React, { useState } from 'react'
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userAccountDelete, checkTokenValidation } from '../actions/userActions'
import Message from '../components/Message'
import { useHistory } from 'react-router-dom'
import { DELETE_USER_ACCOUNT_RESET } from '../constants'

const DeleteUserAccount = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')

  // 🔐 Auth
  const { userInfo } = useSelector((state) => state.userLoginReducer)

  // 🚫 Account Deletion
  const {
    success,
    loading,
    error: deleteError,
  } = useSelector((state) => state.deleteUserAccountReducer)

  // 🔄 Submit Handler
  const onSubmit = (e) => {
    e.preventDefault()

    const payload = {
      id: userInfo?.id,
      password: password,
    }

    dispatch(checkTokenValidation())
    dispatch(userAccountDelete(payload))
  }

  // ✅ Success Handler
  if (success) {
    alert('Account successfully deleted.')
    dispatch({ type: DELETE_USER_ACCOUNT_RESET })
    dispatch(logout())
    history.push('/login')
    window.location.reload()
  }

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <h4 className="mb-3 text-danger">Delete Account</h4>
        <p>Confirm your password to permanently delete your account.</p>

        {loading && (
          <div className="d-flex align-items-center mb-3">
            <h5 className="mr-2">Please wait</h5>
            <Spinner animation="border" />
          </div>
        )}

        {deleteError && <Message variant="danger">Incorrect Password!</Message>}

        <Form onSubmit={onSubmit}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="danger" className="mt-2">
            Confirm Delete
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default DeleteUserAccount
