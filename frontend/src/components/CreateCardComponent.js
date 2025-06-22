import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { createCard } from '../actions/cardActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from './Message';
import DeleteCardComponent from './DeleteCardComponent';

const todays_date = new Date();
const current_year = todays_date.getFullYear();

const CreateCardComponent = ({ stripeCards, addressSelected }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [userId] = useState(0);
    const [runCardDeleteHandler, setRunCardDeleteHandler] = useState(false);
    const [differentCard, setDifferentCard] = useState(false);
    const [cardDetails, setCardDetails] = useState(false);
    const [cardDetailsId, setCardDetailsId] = useState(0);
    const [showStripeCard, setShowStripeCard] = useState(false);
    const [deleteCardNumber] = useState("");
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [cvc, setCvc] = useState("");
    const [saveCard, setSaveCard] = useState(false);

    const { userInfo } = useSelector(state => state.userLoginReducer);
    const { loading, success, error } = useSelector(state => state.deleteSavedCardReducer);

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
    }, [history, userInfo, success]);

    const handleCardSubmittion = (e) => {
        e.preventDefault();
        if (addressSelected) {
            const data = {
                email: email === "" ? userInfo.email : email,
                cardNumber,
                expMonth: Number(expMonth),
                expYear: Number(expYear),
                cvc: Number(cvc),
                saveCard,
            };
            dispatch(createCard(data));
        } else {
            alert("Please select or add your Address to continue");
        }
    };

    const payWithSavedCard = (cardData) => {
        if (addressSelected) {
            const data = {
                email: cardData.email,
                cardNumber: cardData.card_number,
                expMonth: Number(cardData.exp_month),
                expYear: Number(cardData.exp_year),
                cvc: Number(cardData.cvc),
                saveCard: false,
            };
            dispatch(createCard(data));
        } else {
            alert("Please select or add your Address to continue");
        }
    };

    const showCardDetails = (cardData) => {
        if (cardDetails && cardData.id === cardDetailsId) {
            return (
                <div>
                    <button
                        onClick={() => setCardDetails(false)}
                        className="btn btn-outline-danger btn-sm"
                        style={{ float: "right", marginTop: "-25px" }}
                    >
                        Close
                    </button>
                    <p className="mt-2"><b>Exp Month:</b> {cardData.exp_month}</p>
                    <p><b>Exp Year:</b> {cardData.exp_year}</p>
                </div>
            );
        }
    };

    const toggleRunCardDeleteHandler = () => {
        setRunCardDeleteHandler(!runCardDeleteHandler);
    };

    if (success) {
        alert("Card successfully deleted.");
        window.location.reload();
    }

    return (
        <div style={{ backgroundColor: '#EEEDEB', padding: '20px', borderRadius: '12px' }}>
            <DeleteCardComponent
                userId={userId}
                deleteCardNumber={deleteCardNumber}
                runCardDeleteHandler={runCardDeleteHandler}
                toggleRunCardDeleteHandler={toggleRunCardDeleteHandler}
            />

            {loading && (
                <div className="d-flex align-items-center mb-2">
                    <h6 className="mb-0">Deleting card</h6>
                    <Spinner animation="border" className="ms-2" />
                </div>
            )}
            {error && <Message variant="danger">{error}</Message>}

            <Card className="mb-4 shadow-sm p-4" style={{ borderRadius: '16px' }}>
                <Button
                    className="btn-sm mb-3"
                    variant={showStripeCard ? "danger" : "primary"}
                    onClick={() => setShowStripeCard(!showStripeCard)}
                >
                    {showStripeCard ? "Close" : "Enter Stripe Card"}
                </Button>

                {showStripeCard && (
                    <Form onSubmit={handleCardSubmittion}>
                        {differentCard ? (
                            <Form.Group className="mb-3">
                                <Form.Label>Email Linked with Card</Form.Label>
                                <Form.Control
                                    type="email"
                                    pattern=".+@gmail\.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    required
                                />
                            </Form.Group>
                        ) : (
                            <p><b>Using Email:</b> {userInfo.email}</p>
                        )}

                        <p>
                            <Link to="#" onClick={() => {
                                setDifferentCard(!differentCard);
                                setEmail("");
                            }}>
                                {differentCard ? "Use Your Default Email" : "Use a Different Card"}
                            </Link>
                        </p>

                        <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                pattern="[0-9]+"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="Enter Card Number"
                                maxLength="16"
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Exp Month</Form.Label>
                                    <Form.Select
                                        value={expMonth}
                                        onChange={(e) => setExpMonth(e.target.value)}
                                        required
                                    >
                                        <option value="">-- --</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Exp Year</Form.Label>
                                    <Form.Select
                                        value={expYear}
                                        onChange={(e) => setExpYear(e.target.value)}
                                        required
                                    >
                                        <option value="">-- --</option>
                                        {Array.from({ length: 21 }, (_, i) => (
                                            <option key={i} value={current_year + i}>{current_year + i}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>CVC</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => setCvc(e.target.value)}
                                        placeholder="e.g. 123"
                                        maxLength="3"
                                        pattern="[0-9]+"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {!differentCard && (
                            <Form.Check
                                type="checkbox"
                                label="Save my card for future payments"
                                checked={saveCard}
                                onChange={() => setSaveCard(!saveCard)}
                                className="mb-3"
                            />
                        )}

                        <Button variant="success" type="submit" className="w-100">
                            Save & Continue
                        </Button>
                    </Form>
                )}
            </Card>

            <Card className="p-4 shadow-sm" style={{ borderRadius: '16px' }}>
                <h5 className="mb-3">Saved Cards</h5>
                {stripeCards.length > 0 ? (
                    stripeCards.map((cardData) => (
                        <Card key={cardData.id} className="mb-3 p-3" style={{ backgroundColor: '#F7F1E5' }}>
                            <p><b>Card:</b> XXXX XXXX XXXX {cardData.card_number.slice(12)}</p>
                            <div className="mb-2">{showCardDetails(cardData)}</div>
                            <div className="d-flex flex-wrap gap-2">
                                <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => {
                                        setCardDetails(true);
                                        setCardDetailsId(cardData.id);
                                    }}
                                >
                                    Show Details
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline-success"
                                    onClick={() => payWithSavedCard(cardData)}
                                >
                                    Pay with this Card
                                </Button>
                                <i
                                    title="Edit card"
                                    className="fas fa-edit fa-lg text-muted ms-2"
                                    onClick={() => history.push("/stripe-card-details/")}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="text-muted">No saved cards.</p>
                )}
            </Card>
        </div>
    );
};

export default CreateCardComponent;
