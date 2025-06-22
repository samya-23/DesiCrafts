import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import Product from '../components/Product'
import { Spinner, Row, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { CREATE_PRODUCT_RESET } from '../constants'

function ProductsListPage() {
    const history = useHistory()
    const searchTerm = history.location.search ? history.location.search.split("=")[1].toLowerCase() : ""

    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.productsListReducer)

    useEffect(() => {
        dispatch(getProductsList())
        dispatch({ type: CREATE_PRODUCT_RESET })
    }, [dispatch])

    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
    )

    return (
        <div>
            {/* Error Message */}
            {error && <Message variant='danger'>{error}</Message>}

            {/* Loading Spinner */}
            {loading &&
                <div className="d-flex align-items-center mb-3">
                    <h5>Getting Products</h5>
                    <Spinner animation="border" className="ml-2" />
                </div>
            }

            {/* Products Grid */}
            {!loading && (
                <Row>
                    {filteredProducts.length === 0 ? (
                        <Col>
                            <Message variant='info'>Nothing to show</Message>
                        </Col>
                    ) : (
                        filteredProducts.map(product => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                <div className="mx-2">
                                    <Product product={product} />
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            )}
        </div>
    )
}

export default ProductsListPage
