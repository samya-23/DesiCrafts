import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAddress, getAllAddress } from '../actions/userActions';
import { CREATE_USER_ADDRESS_RESET } from '../constants';
import Message from './Message';

const CreateAddressComponent = ({ toggleCreateAddress }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const { success: addressCreationSuccess, error: errorCreatingAddress } = useSelector(
        (state) => state.createUserAddressReducer
    );

    const addressSubmitHandler = (e) => {
        e.preventDefault();
        const addressData = {
            name,
            phone_number: phoneNumber,
            pin_code: pinCode,
            house_no: houseNumber,
            landmark,
            city,
            state,
        };
        dispatch(createUserAddress(addressData));
    };

    if (addressCreationSuccess) {
        alert("🎉 Address saved successfully!");
        toggleCreateAddress();
        dispatch({ type: CREATE_USER_ADDRESS_RESET });
        dispatch(getAllAddress());
    }

    return (
        <div style={{ backgroundColor: '#F7F1E5', padding: '20px', borderRadius: '10px' }}>
            <h5 className="text-center text-success mb-3" style={{ fontWeight: 'bold' }}>
                Add New Delivery Address
            </h5>

            {errorCreatingAddress && <Message variant="danger">{errorCreatingAddress}</Message>}

            <Card
                className="mx-auto shadow-sm"
                style={{ width: "100%", maxWidth: "600px", borderRadius: "15px", border: "none" }}
            >
                <Card.Body>
                    <Form onSubmit={addressSubmitHandler}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label><strong>Name</strong></Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="phoneNumber" className="mb-3">
                            <Form.Label><strong>Phone Number</strong></Form.Label>
                            <InputGroup>
                                <InputGroup.Text>+91</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter 10-digit mobile number"
                                    pattern="[0-9]+"
                                    maxLength="10"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="pinCode" className="mb-3">
                            <Form.Label><strong>PIN Code</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter area pincode"
                                pattern="[0-9]+"
                                maxLength="6"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="houseNumber" className="mb-3">
                            <Form.Label><strong>House No. / Address</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. 12A, Main Street"
                                value={houseNumber}
                                onChange={(e) => setHouseNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="landmark" className="mb-3">
                            <Form.Label><strong>Landmark</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Near school, temple etc."
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="city" className="mb-3">
                            <Form.Label><strong>City</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="state" className="mb-4">
                            <Form.Label><strong>State</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="success"
                            type="submit"
                            className="w-100 mb-2"
                            style={{ backgroundColor: '#9DC08B', border: 'none', fontWeight: 'bold' }}
                        >
                            Save Address
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-100"
                            onClick={toggleCreateAddress}
                            style={{ backgroundColor: '#607274', border: 'none' }}
                        >
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CreateAddressComponent;
