import React, { useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, logout, checkTokenValidation } from '../actions/userActions'
import Message from '../components/Message'

function AccountPage() {
    const history = useHistory()
    const dispatch = useDispatch()

    // Token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    // User login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // User details reducer
    const userDetailsReducer = useSelector(state => state.userDetailsReducer)
    const { user: userAccDetails = {}, loading } = userDetailsReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            try {
                dispatch(checkTokenValidation())
                dispatch(userDetails(userInfo.id))
            } catch (error) {
                history.push("/")
            }
        }
    }, [history, userInfo, dispatch])

    // Logout handler
    const logoutHandler = () => {
        dispatch(logout())
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const renderData = () => {
        try {
            return (
                <div>
                    {loading && (
                        <span style={{ display: "flex" }}>
                            <h5>Getting User Information</h5>
                            <span className="ml-2">
                                <Spinner animation="border" />
                            </span>
                        </span>
                    )}

                    <Container className="my-3">
                        <Row className="mb-2 border border-dark">
                            <Col xs={3} className="p-3 bg-info text-white">Name:</Col>
                            <Col className="p-3">{userAccDetails?.username || "-"}</Col>
                        </Row>
                        <Row className="mb-2 border border-dark">
                            <Col xs={3} className="p-3 bg-info text-white">Email:</Col>
                            <Col className="p-3">{userAccDetails?.email || "-"}</Col>
                        </Row>
                        <Row className="mb-2 border border-dark">
                            <Col xs={3} className="p-3 bg-info text-white">Admin Privileges:</Col>
                            <Col className="p-3">{userAccDetails?.admin ? "Yes" : "No"}</Col>
                        </Row>
                    </Container>

                    <div className="text-center">
                        <Link to="/account/update">Update Account details</Link>
                        <span className="mx-2 text-primary">|</span>
                        <Link to="/account/delete">Delete Account</Link>
                    </div>
                </div>
            )
        } catch (error) {
            return (
                <Message variant="danger">
                    Something went wrong, go back to{" "}
                    <Link onClick={logoutHandler} to="/login">Login</Link> page.
                </Message>
            )
        }
    }

    return renderData()
}

export default AccountPage
