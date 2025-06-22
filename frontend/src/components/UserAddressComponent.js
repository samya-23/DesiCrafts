import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form } from 'react-bootstrap';
import { getAllAddress } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

function UserAddressComponent({ handleAddressId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const updatehandleAddressId = (id) => {
    handleAddressId(id);
  };

  // login reducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // address list reducer
  const getAllAddressesOfUserReducer = useSelector(
    (state) => state.getAllAddressesOfUserReducer
  );
  const { addresses } = getAllAddressesOfUserReducer;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getAllAddress());
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      {addresses && addresses.length > 0 ? (
        addresses.map((address, idx) => (
          <Card
            key={address.id}
            className="p-3 mb-3 shadow-sm"
            style={{ borderLeft: '5px solid #007bff', background: '#f9f9f9' }}
          >
            <Form.Check
              type="radio"
              name="addressId"
              id={`address-${address.id}`}
              className="mb-2"
              onClick={() => updatehandleAddressId(address.id)}
              label={
                <div>
                  <strong>{address.name}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#555' }}>
                    {address.house_no}, {address.landmark}, {address.city},{' '}
                    {address.state} - {address.pin_code}
                  </div>
                </div>
              }
            />
          </Card>
        ))
      ) : (
        <p className="text-muted">No saved address found.</p>
      )}
    </div>
  );
}

export default UserAddressComponent;
