import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savedCardsList, updateStripeCard } from '../actions/cardActions'
import { Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap'
import { checkTokenValidation, logout } from '../actions/userActions'
import { UPDATE_STRIPE_CARD_RESET } from '../constants'
import { useHistory } from 'react-router-dom'

const CardUpdatePage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [formState, setFormState] = useState({})
  const [activeCard, setActiveCard] = useState(null)

  const { userInfo } = useSelector(state => state.userLoginReducer)
  const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)
  const { stripeCards = [], loading } = useSelector(state => state.savedCardsListReducer)
  const { success } = useSelector(state => state.updateStripeCardtReducer)

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(checkTokenValidation())
      dispatch(savedCardsList())
    }
  }, [dispatch, history, userInfo, success])

  useEffect(() => {
    if (userInfo && tokenError === "Request failed with status code 401") {
      alert("Session expired. Please login again.")
      dispatch(logout())
      history.push("/login")
      window.location.reload()
    }
  }, [tokenError, dispatch, history, userInfo])

  useEffect(() => {
    if (success) {
      alert("Card Successfully Updated")
      dispatch({ type: UPDATE_STRIPE_CARD_RESET })
      history.push("/stripe-card-details")
    }
  }, [success, dispatch, history])

  const handleInputChange = (e, cardId) => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [name]: value
      }
    }))
  }

  const handleFormSubmit = (e, card) => {
    e.preventDefault()
    const values = formState[card.card_id] || {}

    const dataToSend = {
      card_number: card.card_number,
      customer_id: card.customer_id,
      card_id: card.card_id,
      name_on_card: values.name_on_card || card.name_on_card,
      exp_month: values.exp_month || card.exp_month,
      exp_year: values.exp_year || card.exp_year,
      address_city: values.address_city || card.address_city,
      address_country: values.address_country || card.address_country,
      address_state: values.address_state || card.address_state,
      address_zip: values.address_zip || card.address_zip
    }

    dispatch(updateStripeCard(dataToSend))
  }

  return (
    <div className="my-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h4 className="text-center text-info mb-4">Update Card Details</h4>

          {loading && <Spinner animation="border" />}

          {stripeCards.map((card, idx) => {
            const currentValues = formState[card.card_id] || {}

            return (
              <Card key={idx} className="p-4 mb-4 border border-info">
                <Form onSubmit={(e) => handleFormSubmit(e, card)}>
                  <Form.Group controlId={`name_${card.card_id}`}>
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control
                      type="text"
                      name="name_on_card"
                      placeholder="Full name"
                      value={currentValues.name_on_card ?? card.name_on_card ?? ""}
                      onChange={(e) => handleInputChange(e, card.card_id)}
                    />
                  </Form.Group>

                  <Form.Group controlId={`month_${card.card_id}`}>
                    <Form.Label>Exp Month</Form.Label>
                    <Form.Control
                      type="text"
                      name="exp_month"
                      maxLength={2}
                      pattern="\d*"
                      placeholder="MM"
                      value={currentValues.exp_month ?? card.exp_month ?? ""}
                      onChange={(e) => handleInputChange(e, card.card_id)}
                    />
                  </Form.Group>

                  <Form.Group controlId={`year_${card.card_id}`}>
                    <Form.Label>Exp Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="exp_year"
                      maxLength={4}
                      pattern="\d*"
                      placeholder="YYYY"
                      value={currentValues.exp_year ?? card.exp_year ?? ""}
                      onChange={(e) => handleInputChange(e, card.card_id)}
                    />
                  </Form.Group>

                  <Form.Group controlId={`city_${card.card_id}`}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_city"
                      placeholder="City"
                      value={currentValues.address_city ?? card.address_city ?? ""}
                      onChange={(e) => handleInputChange(e, card.card_id)}
                    />
                  </Form.Group>

                  <Form.Group controlId={`country_${card.card_id}`}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_country"
                      placeholder="Country"
                      value={currentValues.address_country ?? card.address_country ?? ""}
                      onChange={(e) => handleInputChange(e, card.card_id)}
                    />
                  </Form.Group>

                  <Form.Group controlId={`state_${card.card_id}`}>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_state"
                      placeholder="State"
                      value={currentValues.address_state ?? card.address_state ?? ""}
                      onChange={(e) => handleInputChange(e, card.card_id)}
                    />
                  </Form.Group>

                  <Form.Group controlId={`zip_${card.card_id}`}>
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_zip"
                      maxLength={6}
                      pattern="\d*"
                      placeholder="ZIP"
                      value={currentValues.address_zip ?? card.address_zip ?? ""}
                      onChange={(e) => handleInputChange(e, card.card_id)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success" className="btn-sm w-100 mt-2">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="btn-sm w-100 mt-2"
                    onClick={() => history.push("/stripe-card-details")}
                  >
                    Cancel
                  </Button>
                </Form>
              </Card>
            )
          })}
        </Col>
      </Row>
    </div>
  )
}

export default CardUpdatePage
