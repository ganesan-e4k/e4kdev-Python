import React from 'react';

function Spinner() {
  const spinnerStyle = {
    width: '40px',
    height: '40px',
    position: 'relative',
  };

  const bounceStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    opacity: 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
    animation: 'bounce 2s infinite ease-in-out',
  };

  const bounce2Style = {
    ...bounceStyle,
    animationDelay: '-1s',
  };

  return (
    <div style={spinnerStyle}>
      <div style={bounceStyle}></div>
      <div style={bounce2Style}></div>
      {/* Inline keyframes animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: scale(0);
            }
            50% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Spinner;
