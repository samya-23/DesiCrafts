import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteSavedCard } from '../actions/cardActions';

function DeleteCardComponent({ userId, deleteCardNumber, runCardDeleteHandler, toggleRunCardDeleteHandler }) {
    const dispatch = useDispatch();

    const confirmDelete = (c_number) => {
        dispatch(deleteSavedCard(c_number));
        toggleRunCardDeleteHandler();
    };

    return (
        <Modal
            show={runCardDeleteHandler}
            onHide={toggleRunCardDeleteHandler}
            centered
            backdrop="static"
            dialogClassName="rounded-modal"
        >
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="d-flex align-items-center">
                    <i
                        style={{ color: "#e6b800", fontSize: "1.5rem", marginRight: "10px" }}
                        className="fas fa-exclamation-triangle"
                    ></i>
                    <span style={{ fontWeight: "bold" }}>Delete Confirmation</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-white">
                <p className="mb-2">
                    <b className="text-danger">Warning!</b> Deleting this card will also remove your Stripe account and associated data.
                </p>
                <p className="text-muted">
                    Are you sure you want to delete the card ending in <b>{deleteCardNumber}</b>?
                </p>
            </Modal.Body>

            <Modal.Footer className="bg-light">
                <Button
                    variant="danger"
                    className="px-4"
                    onClick={() => confirmDelete(deleteCardNumber)}
                >
                    Yes, Delete
                </Button>
                <Button
                    variant="secondary"
                    className="px-4"
                    onClick={toggleRunCardDeleteHandler}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteCardComponent;
