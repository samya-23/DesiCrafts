import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import {
    Spinner,
    Row,
    Col,
    Container,
    Card,
    Button,
    Modal
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
    CREATE_PRODUCT_RESET,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_RESET,
    CARD_CREATE_RESET
} from '../constants'

function ProductDetailsPage({ history, match }) {
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    const { loading, error, product } = useSelector(state => state.productDetailsReducer)
    const { userInfo } = useSelector(state => state.userLoginReducer)
    const { success: productDeletionSuccess } = useSelector(state => state.deleteProductReducer)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        dispatch({ type: UPDATE_PRODUCT_RESET })
        dispatch({ type: CREATE_PRODUCT_RESET })
        dispatch({ type: CARD_CREATE_RESET })
    }, [dispatch, match])

    useEffect(() => {
        if (productDeletionSuccess) {
            alert("Product successfully deleted.")
            history.push("/")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
    }, [productDeletionSuccess, history, dispatch])

    const confirmDelete = () => {
        dispatch(deleteProduct(match.params.id))
        handleClose()
    }

    return (
        <div>
            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fas fa-exclamation-triangle text-warning"></i>{' '}
                        Delete Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the product <em>"{product?.name}"</em>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDelete}>Confirm Delete</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {/* Product Details Section */}
            {loading ? (
                <div className="d-flex align-items-center">
                    <h5>Getting Product Details</h5>
                    <Spinner animation="border" className="ml-2" />
                </div>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Container>
                    <Row>
                        {/* Left Column: Image + Admin Buttons */}
                        <Col md={6}>
                            <Card.Img variant="top" src={product.image} height="420" />

                            {userInfo?.admin && (
                                <div className="d-flex mt-2">
                                    <Button
                                        variant="danger"
                                        className="btn-sm w-100"
                                        onClick={handleShow}
                                    >
                                        Delete Product
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="btn-sm ml-2 w-100"
                                        onClick={() => history.push(`/product-update/${product.id}/`)}
                                    >
                                        Edit Product
                                    </Button>
                                </div>
                            )}
                        </Col>

                        {/* Center Column: Product Info */}
                        <Col sm>
                            <h4>{product.name}</h4>
                            <hr />
                            <p className="justify-description-css">{product.description}</p>
                            <div
                                className="mt-3 p-2 text-center"
                                style={{
                                    border: "1px solid #C6ACE7",
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                Price:
                                <span className="text-success ml-2">₹ {product.price}</span>
                            </div>
                        </Col>

                        {/* Right Column: Checkout */}
                        <Col sm>
                            <h5>Buy</h5>
                            <hr />
                            {product.stock ? (
                                <Link to={`${product.id}/checkout/`}>
                                    <Button variant="primary">Pay with Stripe</Button>
                                </Link>
                            ) : (
                                <Message variant='danger'>Out Of Stock!</Message>
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}

export default ProductDetailsPage
