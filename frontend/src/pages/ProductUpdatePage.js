import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProductDetails, updateProduct } from '../actions/productActions'
import { checkTokenValidation, logout } from '../actions/userActions'
import { UPDATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message'

const ProductUpdatePage = ({ match }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    // Reducers
    const { product, loading: loadingDetails } = useSelector(state => state.productDetailsReducer)
    const { userInfo } = useSelector(state => state.userLoginReducer)
    const { success, loading: updating, error } = useSelector(state => state.updateProductReducer)
    const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)

    // Local states
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(false)
    const [image, setImage] = useState("")
    const [newImage, setNewImage] = useState(false)

    useEffect(() => {
        if (!userInfo || !userInfo.admin) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getProductDetails(match.params.id))
        }
    }, [dispatch, userInfo, match, history])

    useEffect(() => {
        if (product && product.id === Number(match.params.id)) {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setStock(product.stock)
        }
    }, [product, match.params.id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('image', image)

        dispatch(updateProduct(product.id, formData))
    }

    if (success) {
        alert("Product successfully updated.")
        dispatch({ type: UPDATE_PRODUCT_RESET })
        history.push(`/product/${product.id}`)
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <div>
            <h4 className="text-info text-center mb-4"><em>Edit Product</em></h4>

            {error && (
                <div>
                    {window.scrollTo({ top: 0, behavior: "smooth" })}
                    <Message variant='danger'>{error.image ? error.image[0] : error}</Message>
                </div>
            )}

            {(loadingDetails || updating) && (
                <div className="d-flex align-items-center mb-3">
                    <h5>{loadingDetails ? "Getting Product Details" : "Updating Product"}</h5>
                    <Spinner animation="border" className="ml-2" />
                </div>
            )}

            {!loadingDetails && product && (
                <Form onSubmit={handleSubmit}>
                    {/* Product Image */}
                    <Form.Group controlId='image'>
                        <Form.Label><b>Product Image</b></Form.Label>
                        <p><img src={product.image} alt={product.name} height="200" /></p>
                        {newImage ? (
                            <div>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => {
                                        setNewImage(false)
                                        setImage("")
                                        dispatch({ type: UPDATE_PRODUCT_RESET })
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="success"
                                size="sm"
                                onClick={() => setNewImage(true)}
                            >
                                Choose Different Image
                            </Button>
                        )}
                    </Form.Group>

                    {/* Product Name */}
                    <Form.Group controlId='name'>
                        <Form.Label><b>Product Name</b></Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Product Description */}
                    <Form.Group controlId='description'>
                        <Form.Label><b>Product Description</b></Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Product Price */}
                    <Form.Group controlId='price'>
                        <Form.Label><b>Price</b></Form.Label>
                        <Form.Control
                            type="text"
                            pattern="[0-9]+(\.[0-9]{1,2})?%?"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="199.99"
                            required
                        />
                    </Form.Group>

                    {/* Stock Checkbox */}
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="In Stock"
                            checked={stock}
                            onChange={() => setStock(!stock)}
                        />
                    </Form.Group>

                    {/* Action Buttons */}
                    <Button type="submit" variant="success" className="btn-sm mr-2">Save Changes</Button>
                    <Button variant="primary" className="btn-sm" onClick={() => history.push(`/product/${product.id}`)}>Cancel</Button>
                </Form>
            )}
        </div>
    )
}

export default ProductUpdatePage
