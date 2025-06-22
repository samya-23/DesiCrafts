import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const NotFoundPage = () => {
  const history = useHistory()

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-3 text-danger">404</h1>
          <h3 className="mb-3">Page Not Found</h3>
          <p className="text-muted">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="primary" onClick={() => history.push('/')}>
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundPage
