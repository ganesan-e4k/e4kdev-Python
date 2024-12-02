"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
//import '../../public/assets/style.css';

const BootstrapModalMediumcolumn1_3 = ({ showModalMediumcolumn1_3, handleCloseMediumcolumn1_3 }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

 const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

  

  return (
    <>
    <div className={`modal fade ${showModalMediumcolumn1_3 ? 'in' : ''}`} style={{ display: showModalMediumcolumn1_3 ? 'block' : 'none' }}>
      <div className={modalDialogclassName}>
      {/* <div className="modal-dialog medium-popup"> */}
        <div className="modal-content medium-popup-div">
          <div className="modal-body">

                    {/* <!-- Breadcomb area Start--> */}
                    <div className="breadcomb-area">
                      <div className="container-fluid remove-padding">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcomb-list">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

                                <div className='popup-top-rightdiv'>
                                    <button type="button" className="close" onClick={handleCloseMediumcolumn1_3}>
                                      &times;
                                    </button>
                                    <button type="button" className="btn-link" onClick={toggleMaximize}>
                                      <FontAwesomeIcon icon={isMaximized ? faWindowRestore : faWindowMaximize} />
                                    </button>
                                  </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Breadcomb area End-->		 */}
                {/* </div> */}

                {/* <!-- Main Area Start-->	 */}
                  <div className="container-fluid">

                    <div className="row">
                      <div className="col-md-3 col-xs-12">
                        <div className="medium-modal-section medium-model-2column">
                            Grid 1
                         </div> 
                      </div> 
                      <div className="col-md-9 col-xs-12">
                        <div className="medium-modal-section medium-model-2column">
                            Grid 2
                        </div>
                      </div> 
                    </div>

                  
                </div>
                {/* <!-- Main Area End-->	 */}
                
                </div>
              </div>
            </div>

          </div>

    </>
  );
};

export default BootstrapModalMediumcolumn1_3;