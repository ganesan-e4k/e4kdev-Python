"use client";

import { useState } from 'react';

const BootstrapModalmyprofile = ({ showModalmyprofile, handleClosemyprofile }) => {
  const [isMaximizedmyprofile, setIsMaximizedmyprofile] = useState(false);

  const toggleMaximizemyprofile = () => {
    setIsMaximizedmyprofile(!isMaximizedmyprofile);
  };

  const modalDialogmyprofile = isMaximizedmyprofile ? 'modal-dialog modal-fullscreen' : 'modal-dialog small-popup';

  const [isOpenmyprofile, setisOpenmyprofile] = useState(true);
  const [isMinimizedmyprofile, setIsMinimizedmyprofile] = useState(false);

  const handleMinimizemyprofile = () => {
      setIsMinimizedmyprofile(!isMinimizedmyprofile);
  };

  return (
    <>
      <div className={`modal fade ${showModalmyprofile ? 'in' : ''}`} style={{ display: showModalmyprofile ? 'block' : 'none' }}>
        <div className={modalDialogmyprofile}>
          {/* <div className="modal-dialog medium-popup"> */}
          <div className="modal-content small-popup-div">
            <div className="modal-body">
              <div className="breadcomb-area">
                <div className="container-fluid remove-padding">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="breadcomb-list">
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className='popup-topbar-title'>
                              My Profile
                            </div>


                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="breadcomb-wp popup-topbar-hidden">
                              <div className="breadcomb-ctn">
                                <span><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                              </div>
                            </div>



                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className='popup-top-rightdiv'>
                              <button className="close modalMinimize" onClick={handleMinimizemyprofile}>
                                <i className={`fa ${isMinimizedmyprofile ? 'fa-plus' : 'fa-minus'}`}></i>
                              </button>
                              <button type="button" className="btn-link popup-topbar-hidden" onClick={toggleMaximizemyprofile}>
                                {isMaximizedmyprofile ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                              </button>
                              <button type="button" className="close" onClick={handleClosemyprofile}>
                                &times;
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="breadcomb-area">
                <div className="container-fluid remove-padding">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                      <div className="customer-newbold">My Profile </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="medium-modal-section">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BootstrapModalmyprofile;