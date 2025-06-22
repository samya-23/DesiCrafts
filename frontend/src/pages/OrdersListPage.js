import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidation, getAllOrders, logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { Table, Spinner } from 'react-bootstrap'
import { dateCheck } from '../components/GetDate'
import { changeDeliveryStatus } from '../actions/productActions'
import { CHANGE_DELIVERY_STATUS_RESET } from '../constants'
import SearchBarForOrdersPage from '../components/SearchBarForOrdersPage'
import Message from '../components/Message'

function OrdersListPage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const placeholderValue = "Search orders by Customer Name, Address or by Ordered Item"
    const todays_date = dateCheck(new Date().toISOString().slice(0, 10))

    const [currentDateInfo] = useState(todays_date)
    const [idOfchangeDeliveryStatus, setIdOfchangeDeliveryStatus] = useState(0)
    const [cloneSearchTerm, setCloneSearchTerm] = useState("")

    const { userInfo } = useSelector(state => state.userLoginReducer)
    const { orders, loading: loadingOrders } = useSelector(state => state.getAllOrdersReducer)
    const {
        success: deliveryStatusChangeSuccess,
        loading: deliveryStatusChangeSpinner
    } = useSelector(state => state.changeDeliveryStatusReducer)
    const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getAllOrders())
        }
    }, [userInfo, dispatch, history])

    useEffect(() => {
        if (tokenError === "Request failed with status code 401") {
            alert("Session expired, please login again.")
            dispatch(logout())
            history.push("/login")
            window.location.reload()
        }
    }, [tokenError, dispatch, history])

    const changeDeliveryStatusHandler = (id, status) => {
        setIdOfchangeDeliveryStatus(id)
        const productData = {
            is_delivered: status,
            delivered_at: status ? currentDateInfo : "Not Delivered"
        }
        dispatch(changeDeliveryStatus(id, productData))
    }

    useEffect(() => {
        if (deliveryStatusChangeSuccess) {
            alert("Delivery status changed successfully")
            dispatch({ type: CHANGE_DELIVERY_STATUS_RESET })
            dispatch(getAllOrders())
        }
    }, [deliveryStatusChangeSuccess, dispatch])

    const handleSearchTerm = (term) => {
        setCloneSearchTerm(term.toLowerCase())
    }

    const filteredOrders = orders?.filter(order =>
        order.name.toLowerCase().includes(cloneSearchTerm) ||
        order.ordered_item.toLowerCase().includes(cloneSearchTerm) ||
        order.address.toLowerCase().includes(cloneSearchTerm)
    )

    return (
        <div>
            {loadingOrders &&
                <div style={{ display: "flex" }}>
                    <h5>Getting Orders</h5>
                    <span className="ml-2">
                        <Spinner animation="border" />
                    </span>
                </div>
            }

            {userInfo?.admin &&
                <SearchBarForOrdersPage
                    handleSearchTerm={handleSearchTerm}
                    placeholderValue={placeholderValue}
                />
            }

            {filteredOrders?.length > 0 ? (
                <Table className="mt-2" striped bordered>
                    <thead>
                        <tr className="p-3 bg-info text-white text-center">
                            <th>Order Id</th>
                            <th>Customer Name</th>
                            <th>Card Used</th>
                            <th>Delivery Address</th>
                            <th>Ordered Item</th>
                            <th>Paid Status</th>
                            <th>Paid On</th>
                            <th>Total Amount</th>
                            <th>Delivered Status</th>
                            <th>Delivered On</th>
                            {userInfo?.admin && <th>Delivery Status</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, idx) => (
                            <tr className="text-center" key={idx}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.card_number}</td>
                                <td>{order.address}</td>
                                <td>{order.ordered_item}</td>
                                <td>
                                    {order.paid_status ? (
                                        <i className="fas fa-check-circle text-success"></i>
                                    ) : (
                                        <i className="fas fa-times-circle text-danger"></i>
                                    )}
                                </td>
                                <td>{dateCheck(order.paid_at)}</td>
                                <td>{order.total_price} INR</td>
                                <td>
                                    {order.is_delivered ? (
                                        <i className="fas fa-check-circle text-success"></i>
                                    ) : (
                                        <i className="fas fa-times-circle text-danger"></i>
                                    )}
                                </td>
                                <td>{order.delivered_at}</td>
                                {userInfo?.admin && (
                                    <td>
                                        <button
                                            className={`btn btn-outline-${order.is_delivered ? 'danger' : 'primary'} btn-sm`}
                                            onClick={() => changeDeliveryStatusHandler(order.id, !order.is_delivered)}
                                        >
                                            {deliveryStatusChangeSpinner && idOfchangeDeliveryStatus === order.id
                                                ? <Spinner animation="border" size="sm" />
                                                : order.is_delivered ? "Mark as Undelivered" : "Mark as Delivered"}
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Message variant="info">No orders yet.</Message>
            )}
        </div>
    )
}

export default OrdersListPage
