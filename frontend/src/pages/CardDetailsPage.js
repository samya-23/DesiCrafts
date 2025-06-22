import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savedCardsList } from '../actions/cardActions'
import { checkTokenValidation, logout } from '../actions/userActions'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Message from "../components/Message"
import DeleteCardComponent from '../components/DeleteCardComponent'

const CardDetailsPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState(0)
  const [deleteCardNumber, setDeleteCardNumber] = useState("")
  const [runCardDeleteHandler, setRunCardDeleteHandler] = useState(false)

  const { userInfo } = useSelector(state => state.userLoginReducer)
  const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)
  const { stripeCards = [], loading } = useSelector(state => state.savedCardsListReducer)
  const { success: deleteSuccess } = useSelector(state => state.deleteSavedCardReducer)

  // Token check + fetch card list
  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(checkTokenValidation())
      dispatch(savedCardsList())
    }
  }, [dispatch, history, userInfo])

  // Handle expired token
  useEffect(() => {
    if (userInfo && tokenError === "Request failed with status code 401") {
      alert("Session expired. Please login again.")
      dispatch(logout())
      history.push("/login")
      window.location.reload()
    }
  }, [tokenError, dispatch, history, userInfo])

  // On card deletion
  useEffect(() => {
    if (deleteSuccess) {
      alert("Card deleted successfully.")
      dispatch(savedCardsList())
    }
  }, [deleteSuccess, dispatch])

  const toggleRunCardDeleteHandler = () => setRunCardDeleteHandler(!runCardDeleteHandler)

  const handleDelete = (card) => {
    setDeleteCardNumber(card.card_number)
    setUserId(card.user)
    toggleRunCardDeleteHandler()
  }

  return (
    <div className="my-4">
      {loading && (
        <div className="d-flex align-items-center mb-2">
          <h5 className="mb-0">Fetching Card Information...</h5>
          <Spinner animation="border" className="ml-2" />
        </div>
      )}

      <DeleteCardComponent
        userId={userId}
        deleteCardNumber={deleteCardNumber}
        runCardDeleteHandler={runCardDeleteHandler}
        toggleRunCardDeleteHandler={toggleRunCardDeleteHandler}
      />

      {stripeCards?.length > 0 ? (
        stripeCards.map((card, idx) => (
          <div key={idx} className="mb-4">
            <Container className="border rounded p-3">
              <Row className="mb-2">
                <Col xs={3} className="font-weight-bold text-primary">Name on Card:</Col>
                <Col>{card.name_on_card || "Not Set"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={3} className="font-weight-bold text-primary">Exp Month:</Col>
                <Col>{card.exp_month || "Not Set"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={3} className="font-weight-bold text-primary">Exp Year:</Col>
                <Col>{card.exp_year || "Not Set"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={3} className="font-weight-bold text-primary">City:</Col>
                <Col>{card.address_city || "Not Set"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={3} className="font-weight-bold text-primary">Country:</Col>
                <Col>{card.address_country || "Not Set"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={3} className="font-weight-bold text-primary">State:</Col>
                <Col>{card.address_state || "Not Set"}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={3} className="font-weight-bold text-primary">ZIP:</Col>
                <Col>{card.address_zip || "Not Set"}</Col>
              </Row>
            </Container>
            <div className="text-center mt-2">
              <Link to="/stripe-card-update/" className="mr-2 text-primary">Update Card Details</Link>
              <span className="text-muted">|</span>
              <button
                className="btn btn-link text-danger ml-2 p-0"
                onClick={() => handleDelete(card)}
              >
                Delete Card
              </button>
            </div>
          </div>
        ))
      ) : !loading ? (
        <Message variant="info">No saved card details found.</Message>
      ) : null}
    </div>
  )
}

export default CardDetailsPage
