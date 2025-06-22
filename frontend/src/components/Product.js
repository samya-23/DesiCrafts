import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

function Product({ product }) {
  return (
    <div className="mx-auto" style={{ maxWidth: '300px' }}>
      <Card className="mb-4 shadow-sm rounded-4 border-0 hover-zoom transition-all">
        <Link to={`/product/${product.id}`}>
          <Card.Img
            variant="top"
            src={product.image}
            height="200"
            style={{ objectFit: 'cover', borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }}
          />
        </Link>

        <Card.Body className="text-center">
          <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
            <Card.Title as="div" className="fw-semibold fs-6">
              {product.name}
            </Card.Title>
          </Link>

          <Card.Text as="h5" className="text-success fw-bold mt-2">
            ₹ {product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
