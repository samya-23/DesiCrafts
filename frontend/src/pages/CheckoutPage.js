import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Container, Image, Card, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

// Components
import CreateCardComponent from '../components/CreateCardComponent'
import ChargeCardComponent from '../components/ChargeCardComponent'
import UserAddressComponent from '../components/UserAddressComponent'
import Message from '../components/Message'

// Actions
import { getProductDetails } from '../actions/productActions'
import { savedCardsList } from '../actions/cardActions'
import { checkTokenValidation, logout } from '../actions/userActions'

// Constants
import { CHARGE_CARD_RESET } from '../constants/index'

const CheckoutPage = ({ match }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [addressSelected, setAddressSelected] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(0)

  // 🔄 Set selected address ID when user selects address
  const handleAddressId = (id) => {
    setAddressSelected(!!id)
    setSelectedAddressId(id)
  }

  // 🧠 Auth & Product Data
  const { userInfo } = useSelector((state) => state.userLoginReducer)
  const { error: tokenError } = useSelector((state) => state.checkTokenValidationReducer)
  const { loading, error, product } = useSelector((state) => state.productDetailsReducer)

  // 💳 Card Creation State
  const { error: cardCreationError, success, loading: cardCreationLoading } = useSelector(
    (state) => state.createCardReducer
  )

  // 💳 Saved Cards
  const { stripeCards = [] } = useSelector((state) => state.savedCardsListReducer)

  // ⏳ On Mount
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(checkTokenValidation())
      dispatch(getProductDetails(match.params.id))
      dispatch(savedCardsList())
      dispatch({ type: CHARGE_CARD_RESET })
    }
  }, [dispatch, match, history, success, userInfo])

  // ❌ Token Expired
  useEffect(() => {
    if (userInfo && tokenError === 'Request failed with status code 401') {
      alert('Session expired. Please login again.')
      dispatch(logout())
      history.push('/login')
      window.location.reload()
    }
  }, [userInfo, tokenError, dispatch, history])

  return (
    <div className="my-4">
      {/* 🔴 Card creation error */}
      {cardCreationError && <Message variant="danger">{cardCreationError}</Message>}

      {/* 🔄 Main loading state */}
      {loading ? (
        <div className="d-flex align-items-center">
          <h5>Getting Checkout Info</h5>
          <Spinner animation="border" className="ml-2" />
        </div>
      ) : cardCreationLoading ? (
        <div className="d-flex align-items-center">
          <h5>Checking your card</h5>
          <Spinner animation="border" className="ml-2" />
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row>
            {/* 🛒 Left Column: Product + Address */}
            <Col md={6}>
              <h3>Checkout Summary</h3>
              <Card className="mb-4">
                <Card.Body>
                  <Container>
                    <Row>
                      <Col>
                        <Image src={product.image} alt="image" height="180" fluid />
                      </Col>
                      <Col>
                        <h5 className="text-capitalize">{product.name}</h5>
                        <span className="text-success">₹ {product.price}</span>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>

              <div className="d-flex align-items-center justify-content-between">
                <h3>Billing Address</h3>
                <Link className="mt-1" to="/all-addresses/">
                  Edit/Add Address
                </Link>
              </div>

              <UserAddressComponent handleAddressId={handleAddressId} />
            </Col>

            {/* 💳 Right Column: Payment */}
            <Col md={6}>
              <h3>Payments Section</h3>

              {success ? (
                <ChargeCardComponent
                  selectedAddressId={selectedAddressId}
                  addressSelected={addressSelected}
                  product={product}
                />
              ) : (
                <CreateCardComponent
                  addressSelected={addressSelected}
                  stripeCards={stripeCards}
                />
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default CheckoutPage
