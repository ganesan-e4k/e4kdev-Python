

"use client";

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
// import '../../public/assets/style.css';

const AlertMessage = ({ showModalAlert, handleCloseAlert, Status, Message }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [alert, setAlert] = useState('');

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    if (Status === 'Success') {
      setAlert("Success");
    } else {
      setAlert("Failed");
    }
  }, [Status, Message]);

  const modalDialogClassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog';

  return (
    <>
      <div className={`modal fade ${showModalAlert ? 'in' : ''}`} style={{ display: showModalAlert ? 'block' : 'none' }}>
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            {alert === "Success" ? (
              <>
                <div className="modal-header justify-content-center">
                  <div className="icon-box">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <button type="button" className="close" onClick={handleCloseAlert}>&times;</button>
                </div>
                <div className="modal-body text-center">
                  <h4>Great!</h4>  
                  <p>{Message}</p>
                  <button className="btn btn-success" data-dismiss="modal" onClick={handleCloseAlert}><span>Ok</span></button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-header justify-content-center modal-header-error">
                  <div className="icon-box">
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                  <button type="button" className="close" onClick={handleCloseAlert}>&times;</button>
                </div>
                <div className="modal-body text-center">
                  <h4>Error!</h4>  
                  <p>{Message}</p>
                  <button className="btn btn-success" data-dismiss="modal" onClick={handleCloseAlert}><span>Ok</span></button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertMessage;

