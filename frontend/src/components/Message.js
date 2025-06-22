import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant = 'info', children }) => {
  return (
    <Alert
      variant={variant}
      className="rounded shadow-sm px-4 py-3"
      style={{
        fontSize: '0.95rem',
        borderLeft: variant === 'danger' ? '5px solid #dc3545' :
                    variant === 'success' ? '5px solid #28a745' :
                    variant === 'warning' ? '5px solid #ffc107' :
                    '5px solid #17a2b8',
        backgroundColor: '#fdfdfd',
      }}
    >
      {children}
    </Alert>
  );
};

export default Message;
