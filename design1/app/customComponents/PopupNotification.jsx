import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PopupNotification = ({
  message = 'Default message',
  type = 'notification',
  duration = 3000,
  onClose = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  if (!visible) return null;

  const getStyles = () => {
    const baseStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '1em',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '200px',
      maxWidth: '400px',
    };

    const typeStyles = {
      success: { backgroundColor: '#d4edda', color: '#155724' },
      failed: { backgroundColor: '#f8d7da', color: '#721c24' },
      error: { backgroundColor: '#f8d7da', color: '#721c24' },
      warning: { backgroundColor: '#fff3cd', color: '#856404' },
      notification: { backgroundColor: '#d1ecf1', color: '#0c5460' },
      alert: { backgroundColor: '#f8d7da', color: '#721c24' },
    };

    return { ...baseStyle, ...typeStyles[type] };
  };

  return (
    <div style={getStyles()}>
      <span style={{ flexGrow: 1 }}>{message}</span>
      <button
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.2em',
          cursor: 'pointer',
        }}
        onClick={handleClose}
      >
        &times;
      </button>
    </div>
  );
};

PopupNotification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'failed', 'error', 'warning', 'notification', 'alert']).isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default PopupNotification;