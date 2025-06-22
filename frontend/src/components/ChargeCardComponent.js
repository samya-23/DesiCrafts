import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Form, Button, Card } from 'react-bootstrap';
import { chargeCustomer } from '../actions/cardActions';
import { Link, useHistory } from "react-router-dom";
import { getSingleAddress } from '../actions/userActions';
import Message from './Message';

const ChargeCardComponent = ({ product, match, selectedAddressId, addressSelected }) => {
    let history = useHistory();
    const dispatch = useDispatch();

    const { cardData } = useSelector(state => state.createCardReducer);
    const { success: chargeSuccessfull, error: chargeError, loading: chargingStatus } = useSelector(state => state.chargeCardReducer);
    const { address } = useSelector(state => state.getSingleAddressReducer);

    useEffect(() => {
        dispatch(getSingleAddress(selectedAddressId));
    }, [dispatch, match, selectedAddressId]);

    const onSubmit = (e) => {
        e.preventDefault();
        const address_detail = `${address.house_no}, near ${address.landmark}, ${address.city}, ${address.state}, ${address.pin_code}`;
        const data = {
            email: cardData.email,
            source: cardData.id,
            amount: product.price,
            name: address.name,
            card_number: cardData.card_data.last4,
            address: address_detail,
            ordered_item: product.name,
            paid_status: true,
            total_price: product.price,
            is_delivered: false,
            delivered_at: "Not Delivered",
        };
        dispatch(chargeCustomer(data));
    };

    if (chargeSuccessfull) {
        history.push({
            pathname: '/payment-status/',
            state: { detail: product }
        });
        window.location.reload();
    }

    return (
        <div className="p-3" style={{ backgroundColor: '#F7F1E5', borderRadius: '12px' }}>
            {chargeError && <Message variant="danger">{chargeError}</Message>}

            <h4 className="mb-3 text-success" style={{ fontWeight: 'bold' }}>Confirm Your Order</h4>
            <div className="mb-3" style={{ fontSize: '16px', color: '#607274' }}>
                Using Card: <strong>XXXX XXXX XXXX {cardData.card_data.last4}</strong>
            </div>

            <Form onSubmit={onSubmit}>
                <Button
                    variant="success"
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: '#9DC08B',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}
                    disabled={chargingStatus}
                >
                    {chargingStatus ? (
                        <>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Processing Payment...
                        </>
                    ) : (
                        <>Pay ₹{product.price}</>
                    )}
                </Button>
            </Form>

            <Card className="p-3 mt-4" style={{ borderColor: "#9DC08B", backgroundColor: "#fff", borderRadius: "10px" }}>
                {address && (
                    <div style={{ fontSize: "15px", lineHeight: "1.6" }}>
                        <p className="text-success"><strong>Delivery Address</strong></p>
                        <p><strong>Name:</strong> {address.name}</p>
                        <p><strong>Phone:</strong> {address.phone_number}</p>
                        <p><strong>House No:</strong> {address.house_no}</p>
                        <p><strong>Landmark:</strong> {address.landmark}</p>
                        <p><strong>City:</strong> {address.city}</p>
                        <p><strong>State:</strong> {address.state}</p>
                        <p><strong>PIN Code:</strong> {address.pin_code}</p>
                    </div>
                )}
            </Card>

            <div className="text-center mt-3">
                <Link
                    to="#"
                    onClick={() => window.location.reload()}
                    style={{ color: "#9DC08B", fontWeight: '500', textDecoration: 'underline' }}
                >
                    Choose a different card
                </Link>
            </div>
        </div>
    );
};

export default ChargeCardComponent;
