import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Message from '../components/Message'

function RegisterPage({ history }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    // Reducer
    const { error, userInfo } = useSelector(state => state.userRegisterReducer)

    useEffect(() => {
        if (userInfo) {
            history.push('/') // Redirect to homepage
        }
    }, [userInfo, history])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            setMessage("")
            dispatch(register(username, email, password))
        }
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h2 className='mb-4 text-center'>Sign Up</h2>

                    {/* Display validation or server error messages */}
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}

                    <Form onSubmit={submitHandler}>

                        {/* Username */}
                        <Form.Group controlId='name'>
                            <Form.Label><b>Username</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group controlId='email'>
                            <Form.Label><b>Email Address</b></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Password */}
                        <Form.Group controlId='password'>
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label><b>Confirm Password</b></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant='primary' className="btn-block mt-3">
                            Sign Up
                        </Button>
                    </Form>

                    <Row className="py-3">
                        <Col className="text-center">
                            Already have an account?{' '}
                            <Link to="/login">Login</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default RegisterPage
