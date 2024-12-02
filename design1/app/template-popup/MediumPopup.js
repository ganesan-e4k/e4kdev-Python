"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
//import '../../public/assets/style.css';

const BootstrapModalMedium = ({ showModalMedium, handleCloseMedium }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

 const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

  

  return (
    <>
    <div className={`modal fade ${showModalMedium ? 'in' : ''}`} style={{ display: showModalMedium ? 'block' : 'none' }}>
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
                                    <button type="button" className="close" onClick={handleCloseMedium}>
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
                <div className="medium-modal-section">
                  <div className="container-fluid">

                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Full Name" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Email Address" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Contact Number" />
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Location" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Postal Code" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Message" />
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Notification" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Flight" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Dollar" />
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Internet" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Home Address" />
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className="form-group ic-cmp-int form-elet-mg">
                            <div className="nk-int-st">
                                <input type="text" className="form-control" placeholder="Layer" />
                            </div>
                          </div>
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

export default BootstrapModalMedium;