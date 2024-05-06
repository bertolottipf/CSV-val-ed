import React, { useState } from 'react';

const Alert = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    isVisible && (
      <div className="alert alert-info show">
        <button
          type="button"
          className="close close-alert"
          data-dismiss="alert"
          aria-hidden="true"
          onClick={handleClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        {message}
      </div>
    )
  );
};

const showAlert = (el, msg, onClose) => {
  el.current.appendChild(
    <Alert message={msg} onClose={onClose} key={Math.random()} />
  );
};

export { Alert, showAlert };