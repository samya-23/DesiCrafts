import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createProduct } from '../actions/productActions'
import { useHistory } from 'react-router'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CREATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message'

const ProductCreatePage = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(false)
    const [image, setImage] = useState(null)

    const { userInfo } = useSelector(state => state.userLoginReducer)
    const {
        product,
        success: productCreationSuccess,
        error: productCreationError
    } = useSelector(state => state.createProductReducer)

    const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
        }
    }, [dispatch, userInfo, history])

    useEffect(() => {
        if (tokenError === "Request failed with status code 401") {
            alert("Session expired, please login again.")
            dispatch(logout())
            history.push("/login")
            window.location.reload()
        }
    }, [tokenError, dispatch, history])

    useEffect(() => {
        if (productCreationSuccess) {
            alert("Product successfully created.")
            history.push(`/product/${product.id}/`)
            dispatch({ type: CREATE_PRODUCT_RESET })
        }
    }, [productCreationSuccess, product, history, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const form_data = new FormData()
        form_data.append('name', name)
        form_data.append('description', description)
        form_data.append('price', price)
        form_data.append('stock', stock)
        form_data.append('image', image)

        dispatch(createProduct(form_data))
    }

    return (
        <div>
            {productCreationError && (
                <Message variant='danger'>
                    {productCreationError.image
                        ? productCreationError.image[0]
                        : "Something went wrong. Please try again."}
                </Message>
            )}

            <h4 className="d-flex justify-content-center text-info mb-4">
                <em>New Product</em>
            </h4>

            <Form onSubmit={onSubmit}>

                <Form.Group controlId='name'>
                    <Form.Label><b>Product Name</b></Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        type="text"
                        value={name}
                        placeholder="Product name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label><b>Product Description</b></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={description}
                        placeholder="Product description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label><b>Price</b></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        pattern="[0-9]+(\.[0-9]{1,2})?"
                        value={price}
                        placeholder="199.99"
                        step="0.01"
                        maxLength="8"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='stock'>
                    <Form.Check
                        type="checkbox"
                        label="In Stock"
                        checked={stock}
                        onChange={() => setStock(!stock)}
                    />
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label><b>Product Image</b></Form.Label>
                    <Form.Control
                        required
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Form.Group>

                <div className="d-flex">
                    <Button
                        type="submit"
                        variant="success"
                        className="btn-sm button-focus-css"
                    >
                        Save Product
                    </Button>
                    <Button
                        variant="primary"
                        className="btn-sm ml-2 button-focus-css"
                        onClick={() => history.push("/")}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ProductCreatePage
