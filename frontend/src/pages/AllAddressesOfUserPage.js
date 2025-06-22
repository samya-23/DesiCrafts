import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Modal, Button, Spinner } from 'react-bootstrap'
import {
  deleteUserAddress,
  getAllAddress,
  checkTokenValidation,
  logout
} from '../actions/userActions'
import {
  DELETE_USER_ADDRESS_RESET,
  GET_SINGLE_ADDRESS_RESET
} from '../constants'
import { useHistory } from 'react-router-dom'
import CreateAddressComponent from '../components/CreateAddressComponent'

function AllAddressesOfUserPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [addressToDelete, setAddressToDelete] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Reducers
  const { userInfo } = useSelector(state => state.userLoginReducer)
  const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)
  const { addresses = [], loading: loadingAddresses } = useSelector(state => state.getAllAddressesOfUserReducer)
  const { success: deleteSuccess } = useSelector(state => state.deleteUserAddressReducer)

  // Handle initial fetch + token check
  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(checkTokenValidation())
      dispatch(getAllAddress())
      dispatch({ type: GET_SINGLE_ADDRESS_RESET })
    }
  }, [dispatch, history, userInfo])

  // Handle token expiration
  useEffect(() => {
    if (userInfo && tokenError === "Request failed with status code 401") {
      alert("Session expired. Please log in again.")
      dispatch(logout())
      history.push("/login")
      window.location.reload()
    }
  }, [tokenError, dispatch, history, userInfo])

  // On successful address deletion
  useEffect(() => {
    if (deleteSuccess) {
      alert("Address deleted successfully.")
      dispatch({ type: DELETE_USER_ADDRESS_RESET })
      dispatch(getAllAddress())
    }
  }, [deleteSuccess, dispatch])

  const toggleCreateAddress = () => setShowCreateForm(!showCreateForm)

  const handleDeleteClick = (address) => {
    setAddressToDelete(address)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (addressToDelete?.id) {
      dispatch(deleteUserAddress(addressToDelete.id))
      setShowDeleteModal(false)
    }
  }

  const cancelDelete = () => setShowDeleteModal(false)

  return (
    <div>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i style={{ color: "#e6e600" }} className="fas fa-exclamation-triangle"></i>{" "}
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the address:
          <br />
          <em>
            "{addressToDelete?.house_no}, {addressToDelete?.city}, {addressToDelete?.state}"
          </em>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>Confirm Delete</Button>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      {/* Create Address Form Toggle */}
      {showCreateForm ? (
        <CreateAddressComponent toggleCreateAddress={toggleCreateAddress} />
      ) : (
        <Button
          className="btn-sm btn-primary mb-3"
          onClick={toggleCreateAddress}
        >
          Add New Address +
        </Button>
      )}

      {/* Loading Spinner */}
      {loadingAddresses && (
        <div className="d-flex align-items-center mb-2">
          <h5 className="mb-0">Fetching addresses...</h5>
          <Spinner animation="border" className="ml-2" />
        </div>
      )}

      {/* Address Cards */}
      {!showCreateForm && addresses?.length > 0 ? (
        addresses.map((address) => (
          <Card key={address.id} className="p-2 mb-3 border border-info">
            <p><b>Name:</b> {address.name}</p>
            <p><b>Phone:</b> +91 {address.phone_number}</p>
            <p>
              <b>Address:</b> {address.house_no}, near {address.landmark}, {address.city}, {address.state} - {address.pin_code}
            </p>
            <div className="d-flex justify-content-end">
              <i
                title="Edit address"
                className="fas fa-edit fa-lg text-primary mr-3 cursor-pointer"
                onClick={() => history.push(`/all-addresses/${address.id}/`)}
              ></i>
              <i
                title="Delete address"
                className="fas fa-trash-alt fa-lg text-danger cursor-pointer"
                onClick={() => handleDeleteClick(address)}
              ></i>
            </div>
          </Card>
        ))
      ) : !loadingAddresses && !showCreateForm ? (
        <p>No saved addresses yet.</p>
      ) : null}
    </div>
  )
}

export default AllAddressesOfUserPage
