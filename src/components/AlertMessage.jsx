import React, { useState, useEffect } from 'react';

function AlertMessage({ message, type, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000); // 3초 후 자동으로 사라짐
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!show) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
    </div>
  );
}

export default AlertMessage;
