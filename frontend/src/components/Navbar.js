import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import SearchBarForProducts from './SearchBarForProducts';

function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
    window.location.reload();
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" className="shadow-sm border-bottom py-2">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold text-primary fs-4">
              <i className="fas fa-store me-2"></i>DesiCrafts
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex flex-grow-1 flex-column flex-md-row justify-content-between align-items-center w-100 gap-3">

              {/* Left Nav Links */}
              <Nav className="flex-wrap">
                <LinkContainer to="/">
                  <Nav.Link className="text-dark fw-medium">All Products</Nav.Link>
                </LinkContainer>

                {userInfo?.admin && (
                  <LinkContainer to="/new-product/">
                    <Nav.Link className="text-dark fw-medium">Add Product</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>

              {/* Center Search Bar */}
              <div className="search-wrapper w-100 w-md-50 d-flex justify-content-center">
                <SearchBarForProducts />
              </div>

              {/* Right Profile Dropdown */}
              <Nav className="ms-md-auto">
                {userInfo ? (
                  <NavDropdown
                    align="end"
                    title={
                      <span className="text-capitalize">
                        <i className="fas fa-user-circle me-2"></i>
                        {userInfo.username}
                      </span>
                    }
                    id="username"
                    className="fw-semibold"
                  >
                    <LinkContainer to="/account">
                      <NavDropdown.Item>Account Settings</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/all-addresses/">
                      <NavDropdown.Item>Address Settings</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/stripe-card-details/">
                      <NavDropdown.Item>Card Settings</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/all-orders/">
                      <NavDropdown.Item>All Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler} className="text-danger fw-bold">
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link className="fw-medium text-dark">
                      <i className="fas fa-sign-in-alt me-1"></i>Login
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
