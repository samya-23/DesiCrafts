import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import {
  checkTokenValidation,
  getAllAddress,
  getSingleAddress,
  logout,
  updateUserAddress
} from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { UPDATE_USER_ADDRESS_RESET } from '../constants'

const AddressUpdatePage = ({ match }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [houseNumber, setHouseNumber] = useState("")
  const [landmark, setLandmark] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  // Reducers
  const { userInfo } = useSelector(state => state.userLoginReducer)
  const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)
  const { address, error: errorFetchingAddress } = useSelector(state => state.getSingleAddressReducer)
  const { success: addressUpdateSuccess } = useSelector(state => state.updateUserAddressReducer)

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      dispatch(checkTokenValidation())
      dispatch(getSingleAddress(match.params.id))
    }
  }, [dispatch, history, userInfo, match.params.id])

  // Token expiry check
  useEffect(() => {
    if (userInfo && tokenError === "Request failed with status code 401") {
      alert("Session expired, please login again.")
      dispatch(logout())
      history.push("/login")
      window.location.reload()
    }
  }, [tokenError, dispatch, history, userInfo])

  // Pre-fill form fields when address is fetched
  useEffect(() => {
    if (address) {
      setName(address.name || "")
      setPhoneNumber(address.phone_number || "")
      setPinCode(address.pin_code || "")
      setHouseNumber(address.house_no || "")
      setLandmark(address.landmark || "")
      setCity(address.city || "")
      setState(address.state || "")
    }
  }, [address])

  // On update success
  useEffect(() => {
    if (addressUpdateSuccess) {
      alert("Address updated successfully.")
      dispatch({ type: UPDATE_USER_ADDRESS_RESET })
      history.push("/all-addresses/")
      dispatch(getAllAddress())
    }
  }, [addressUpdateSuccess, dispatch, history])

  const addressSubmitHandler = (e) => {
    e.preventDefault()
    const updatedAddress = {
      name,
      phone_number: phoneNumber,
      pin_code: pinCode,
      house_no: houseNumber,
      landmark,
      city,
      state
    }
    dispatch(updateUserAddress(match.params.id, updatedAddress))
  }

  return (
    <div>
      <p className="text-center text-info"><em>Update Address</em></p>
      {errorFetchingAddress && <h3>Invalid Address Request</h3>}
      <Card
        className="mx-auto mb-4"
        style={{ width: "50%", border: "1px solid", borderColor: "#C6ACE7" }}
      >
        <Card.Body>
          <Form onSubmit={addressSubmitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone number"
                pattern="[0-9]{10}"
                maxLength="10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='pinCode'>
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pin code"
                pattern="[0-9]{6}"
                maxLength="6"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='houseNumber'>
              <Form.Label>House No./Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="House number"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='landmark'>
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='state'>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              style={{ width: "100%" }}
              className="btn-sm"
              type="submit"
              variant="success"
            >
              Save Changes
            </Button>

            <Button
              style={{ width: "100%" }}
              className="btn-sm mt-2"
              variant="primary"
              onClick={() => history.push("/all-addresses/")}
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddressUpdatePage
