import React from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import Message from "./Message";

const PaymentStatus = () => {
  const location = useLocation();

  const renderData = () => {
    try {
      const boughtData = location.state.detail;

      return (
        <div className="text-center my-4">
          <h3 className="text-success fw-bold mb-3">
            <i className="fas fa-check-circle me-2"></i>
            Payment Successful
          </h3>

          <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
            <div className="fs-5 mb-2">
              🎉 You have successfully purchased:
            </div>

            <div className="fw-semibold text-primary mb-2">
              {boughtData.name} — ₹{boughtData.price}
            </div>

            <Link
              to="/all-orders/"
              className="btn btn-outline-success mt-3"
            >
              View My Orders
            </Link>
          </Card>
        </div>
      );
    } catch (error) {
      return (
        <div className="mt-4">
          <Message variant='info'>Payment status not available.</Message>
        </div>
      );
    }
  };

  return renderData();
};

export default PaymentStatus;
