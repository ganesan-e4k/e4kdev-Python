"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const CreateProduct = ({ showModal, handleClose }) => {
    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog';

  return (
    <div className={`modal fade ${showModal ? 'in' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
      <div className={modalDialogclassName}>
        <div className="modal-content">
          <div className="modal-body">
            {/* <!------ popup for customer -------> */}

            {/* <div className="modal modal-large" id="exampleModal2" tabindex="-1">
              <div className="modal-dialog">
                <div className="modal-content frist-popup">
                  <div className="modal-header"> */}
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
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      <span><a href="#" id="sa-success"> <i className="e4k-icon e4k-checked"></i> Save</a> | </span>
                                      <span><a href="#" id="sa-warning"> <i className="e4k-icon e4k-trash"></i> Delete</a> | </span>
                                      <span><a href=""><i className="e4k-icon e4k-draft"></i> Edit</a> | </span>
                                      <span><a href="#" id="toggleButtonpopup"> <i className="fa fa-chain"></i></a></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

                                <button type="button" className="close" onClick={handleClose}>
                                  &times;
                                </button>
                                <button type="button" className="btn btn-link" onClick={toggleMaximize}>
                                  <FontAwesomeIcon icon={isMaximized ? faWindowRestore : faWindowMaximize} />
                                </button>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Breadcomb area End-->		 */}


                </div>
                <div className="modal-body">

                  {/* <!-- Breadcomb area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                          <div className="customer-newbold">
                            Product 
                          </div>
                          <div className="breadcomb-list subbreadcomb-list">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="breadcomb-wp">
                                  <div className="breadcomb-ctn">
                                    <span><a href="#"> <i className="fa fa-edit"></i> price setup</a> | </span>
                                    <span><a href="#"> <i className="fa fa-list"></i> Invoice list</a> | </span>
                                    <span><a href=""><i className="fa fa-list"></i> Order list</a> | </span>
                                    <span><a href=""><i className="fa fa-list-alt"></i> Statement</a> | </span>
                                    <span><a href=""><i className="fa fa-money"></i> Cash Receipts</a></span>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Breadcomb area End-->	 */}

                  {/* <!-- Main Menu area start--> */}
                  <div className="mobile-menu-area2 mg-tb-40">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <ul className="nav nav-tabs e4k-menu-wrap menu-it-icon-pro">
                            <li className="active"><a data-toggle="tab" href="#Locations"><i className="e4k-icon e4k-house"></i> Locations</a>
                            </li>
                            <li><a data-toggle="tab" href="#Defaults"><i className="e4k-icon e4k-mail"></i> Defaults</a>
                            </li>
                            <li><a data-toggle="tab" href="#StockingType"><i className="e4k-icon e4k-edit"></i> Stocking Type</a>
                            </li>
                            <li><a data-toggle="tab" href="#ErrorLog"><i className="e4k-icon e4k-bar-chart"></i> Error Log</a>
                            </li>
                            <li><a data-toggle="tab" href="#Tables2"><i className="e4k-icon e4k-windows"></i> Make Obsolete</a>
                            </li>
                            <li><a data-toggle="tab" href="#StokPositions"><i className="e4k-icon e4k-form"></i> Stok Positions</a>
                            </li>
                            <li><a data-toggle="tab" href="#SalesFigures"><i className="e4k-icon e4k-app"></i> Sales Figures</a>
                            </li>
                            <li><a data-toggle="tab" href="#Static"><i className="e4k-icon e4k-support"></i> Static</a>
                            </li>
                            <li><a data-toggle="tab" href="#Size"><i className="e4k-icon e4k-support"></i> Size</a>
                            </li>
                            <li><a data-toggle="tab" href="#Supplierreps"><i className="e4k-icon e4k-support"></i> Supplier & Reps</a>
                            </li>
                            <li><a data-toggle="tab" href="#Page2"><i className="e4k-icon e4k-support"></i> Sales Analysis</a>
                            </li>
                            <li><a data-toggle="tab" href="#Page2"><i className="e4k-icon e4k-support"></i> Currency Price</a>
                            </li>
                            <li><a data-toggle="tab" href="#Page2"><i className="e4k-icon e4k-support"></i> Supplier & Customer Price</a>
                            </li>
                          </ul>
                          <div className="tab-content custom-menu-content">
                            <div id="Locations" className="tab-pane in active e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="">ANWAR</a>
                                </li>
                                <li><a href="">BIRM01</a>
                                </li>
                                <li><a href="">BRA01</a>
                                </li>
                                <li><a href="">DHL</a>
                                </li>
                                <li><a href="">EXT01</a>
                                </li>
                                <li><a href="">FRESH01</a>
                                </li>
                                <li><a href="">INT01</a>
                                </li>
                                <li><a href="">INZSOURCIN</a>
                                </li>
                                <li><a href="">SQP</a>
                                </li>
                                <li><a href="">TRSMASTER</a>
                                </li>
                                <li><a href="">TWE</a>
                                </li>
                                <li><a href="">VERTEX</a>
                                </li>
                                <li><a href="">WARISA</a>
                                </li>
                                <li><a href="">WELLDONE</a>
                                </li>
                                <li><a href="">WILSON</a>
                                </li>
                                <li><a href="">WORKROOM</a>
                                </li>
                                <li><a href="">KOCLOTHING</a>
                                </li>
                                <li><a href="">MAX01</a>
                                </li>
                                <li><a href="">MAX02</a>
                                </li>
                                <li><a href="">NEWUNI</a>
                                </li>
                                <li><a href="">PURCHASE</a>
                                </li>
                                <li><a href="">REPLEN</a>
                                </li>
                                <li><a href="">Rodo</a>
                                </li>
                                <li><a href="">SKOPES</a>
                                </li>
                              </ul>
                            </div>
                            {/* <div id="mailbox2" className="tab-pane e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="inbox.html">Inbox</a>
                                </li>
                                <li><a href="view-email.html">View Email</a>
                                </li>
                                <li><a href="compose-email.html">Compose Email</a>
                                </li>

                              </ul>
                            </div> */}
                            <div id="StockingType" className="tab-pane e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="#">Free to Sell</a>
                                </li>
                                <li><a href="#">Free Stock</a>
                                </li>
                                <li>
                                    <a href="#">Allocated</a>
                                    {/* <ul className="nav nav-tabs e4k-menu-wrap menu-it-icon-pro">
                                        <li><a href="#">Picking Slips</a>
                                        </li>
                                        <li><a href="#">Location</a>
                                        </li>
                                        <li><a href="#">Uncompleted Jobs</a>
                                        </li>
                                    </ul> */}
                                    
                                </li>
                                <li><a href="#">OS Sales</a>
                                </li>
                                <li><a href="#">Purchases</a>
                                </li>
                                <li><a href="#">Actual Stock</a>
                                </li>
                              </ul>
                            </div>
                            <div id="Size" className="tab-pane e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="#">Add Size</a>
                                </li>
                                <li><a href="#">Delete Size</a>
                                </li>
                                <li><a href="#">Setup Price For Each Size</a>
                                </li>
                                
                              </ul>
                            </div>
                            <div id="SalesFigures" className="tab-pane e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="#">Qty Period</a>
                                </li>
                                <li><a href="#">Qty YTD</a>
                                </li>
                                <li><a href="#">Value Period</a>
                                </li>
                                <li><a href="#">Value YTD</a>
                                </li>
                                <li><a href="#">Cost Period</a>
                                </li>
                                <li><a href="#">Cost YTD</a>
                                </li>
                              </ul>
                            </div>
                            <div id="Forms2" className="tab-pane e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="form-elements.html">Form Elements</a>
                                </li>
                                <li><a href="form-components.html">Form Components</a>
                                </li>
                                <li><a href="form-examples.html">Form Examples</a>
                                </li>
                              </ul>
                            </div>
                            <div id="Appviews2" className="tab-pane e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="notification.html">Notifications</a>
                                </li>
                                <li><a href="alert.html">Alerts</a>
                                </li>
                                <li><a href="modals.html">Modals</a>
                                </li>
                                <li><a href="buttons.html">Buttons</a>
                                </li>
                                <li><a href="tabs.html">Tabs</a>
                                </li>
                                <li><a href="accordion.html">Accordion</a>
                                </li>
                                <li><a href="dialog.html">Dialogs</a>
                                </li>
                                <li><a href="popovers.html">Popovers</a>
                                </li>
                                <li><a href="tooltips.html">Tooltips</a>
                                </li>
                                <li><a href="dropdown.html">Dropdowns</a>
                                </li>
                              </ul>
                            </div>
                            <div id="Page2" className="tab-pane e4k-tab-menu-bg animated flipInX">
                              <ul className="e4k-main-menu-dropdown">
                                <li><a href="contact.html">Contact</a>
                                </li>
                                <li><a href="invoice.html">Invoice</a>
                                </li>
                                <li><a href="typography.html">Typography</a>
                                </li>
                                <li><a href="color.html">Color</a>
                                </li>
                                <li><a href="login-register.html">Login Register</a>
                                </li>
                                <li><a href="404.html">404 Page</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Main Menu area End-->	 */}


                  <div className="container-fluid">
                    <div className="row">
                      <div id="columnpopup1" className="col-md-9 col-xs-12">

                        <div className="accordion-stn mainpopup-leftheight">
                          <div className="panel-group" data-collapse-color="nk-black" id="accordionGreen" role="tablist" aria-multiselectable="true">
                            <div className="panel panel-collapse e4k-accrodion-cus">
                              <div className="panel-heading" role="tab">
                                <h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordionGreen" href="#accordionGreen-one" aria-expanded="true">
                                  <FontAwesomeIcon icon={faPlus} className="icon" style={{ marginRight:'15px' }}/> 
                                    Static
                                  </a>
                                </h4>
                              </div>
                              <div id="accordionGreen-one" className="collapse in" role="tabpanel">
                                <div className="panel-body">

                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Description" />
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
                            </div>
                            <div className="panel panel-collapse e4k-accrodion-cus">
                              <div className="panel-heading" role="tab">
                                <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionGreen" href="#accordionGreen-two" aria-expanded="false">
                                    Address & Contact
                                  </a>
                                </h4>
                              </div>
                              <div id="accordionGreen-two" className="collapse" role="tabpanel">
                                <div className="panel-body">

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
                            </div>
                            <div className="panel panel-collapse e4k-accrodion-cus">
                              <div className="panel-heading" role="tab">
                                <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionGreen" href="#accordionGreen-three" aria-expanded="false">
                                    Invoicing
                                  </a>
                                </h4>
                              </div>
                              <div id="accordionGreen-three" className="collapse" role="tabpanel">
                                <div className="panel-body">

                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Full Name"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Email Address"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Contact Number"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Location"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Postal Code"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Message"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Notification"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Flight"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Dollar"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Internet"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Home Address"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Layer"/>
                                        </div>

                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>


                            <div className="panel panel-collapse e4k-accrodion-cus">
                              <div className="panel-heading" role="tab">
                                <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionGreen" href="#accordionGreen4" aria-expanded="false">
                                    Payments
                                  </a>
                                </h4>
                              </div>
                              <div id="accordionGreen4" className="collapse" role="tabpanel">
                                <div className="panel-body">

                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Full Name"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Email Address"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Contact Number"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Location"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Postal Code"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Message"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Notification"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Flight"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Dollar"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Internet"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Home Address"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Layer"/>
                                        </div>

                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>

                            <div className="panel panel-collapse e4k-accrodion-cus">
                              <div className="panel-heading" role="tab">
                                <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionGreen" href="#accordionGreen5" aria-expanded="false">
                                    Shipping
                                  </a>
                                </h4>
                              </div>
                              <div id="accordionGreen5" className="collapse" role="tabpanel">
                                <div className="panel-body">

                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Full Name"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Email Address"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Contact Number"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Location"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Postal Code"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Message"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Notification"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Flight"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Dollar"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Internet"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Home Address"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Layer"/>
                                        </div>

                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>


                            <div className="panel panel-collapse e4k-accrodion-cus">
                              <div className="panel-heading" role="tab">
                                <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordionGreen" href="#accordionGreen6" aria-expanded="false">
                                    Statistics
                                  </a>
                                </h4>
                              </div>
                              <div id="accordionGreen6" className="collapse" role="tabpanel">
                                <div className="panel-body">

                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Full Name"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Email Address"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Contact Number"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Location"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Postal Code"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Message"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Notification"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Flight"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Dollar"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Internet"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Home Address"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Layer"/>
                                        </div>

                                      </div>
                                    </div>
                                  </div>


                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Full Name"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Email Address"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Contact Number"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Location"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Postal Code"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Message"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Notification"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Flight"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Dollar"/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Internet"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Home Address"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Layer"/>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Internet"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg res-mg-fcs">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Home Address"/>
                                        </div>

                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                      <div className="form-group ic-cmp-int form-elet-mg">
                                        <div className="nk-int-st">
                                          <input type="text" className="form-control" placeholder="Layer"/>
                                        </div>

                                      </div>
                                    </div>
                                  </div>


                                </div>
                              </div>
                            </div>





                          </div>
                        </div>


                      </div>
                      <div id="columnpopup2" className="col-md-3 col-xs-12">

                        <div className="mainpopup-right">
                          <div className="contact-list">
                            <div className="contact-win">
                              <div className="contact-img">
                                <img src="img/post/1.jpg" alt=""/>
                              </div>

                            </div>
                            <div className="contact-ctn">
                              <div className="contact-ad-hd">
                                <h2>Customer Name</h2>
                                <p className="ctn-ads">USA, LA, aus</p>
                              </div>
                              <p>Lorem ipsum dolor sit amete of the, consectetur adipiscing elitable. Vestibulum tincidunt.</p>
                            </div>
                            <div className="social-st-list">
                              <div className="social-sn">
                                <h2>Likes:</h2>
                                <p>956</p>
                              </div>
                              <div className="social-sn">
                                <h2>Comments:</h2>
                                <p>434</p>
                              </div>
                              <div className="social-sn">
                                <h2>Views:</h2>
                                <p>676</p>
                              </div>
                            </div>


                            {/* <!-- Start Status area --> */}
                            <div className="col-xs-12">
                              <div className="">
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">3,20,000</span></h3>
                                    <p>Page Views</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-bar"></div>
                                  </div>
                                </div>
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">1,03,000</span></h3>
                                    <p>Total Clicks</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-line"></div>
                                  </div>
                                </div>
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">24,00,000</span></h3>
                                    <p>Site Visitors</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-bar-2"></div>
                                  </div>
                                </div>
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">3,20,000</span></h3>
                                    <p>Page Views</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-bar"></div>
                                  </div>
                                </div>
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">1,03,000</span></h3>
                                    <p>Total Clicks</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-line"></div>
                                  </div>
                                </div>
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">24,00,000</span></h3>
                                    <p>Site Visitors</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-bar-2"></div>
                                  </div>
                                </div>
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">1,03,000</span></h3>
                                    <p>Total Clicks</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-line"></div>
                                  </div>
                                </div>
                                <div className="past-statistic-an">
                                  <div className="past-statistic-ctn">
                                    <h3><span className="counter">24,00,000</span></h3>
                                    <p>Site Visitors</p>
                                  </div>
                                  <div className="past-statistic-graph">
                                    <div className="stats-bar-2"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <!-- End Status area--> */}

                          </div>


                        </div>

                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>




    </div>
  )
}

export default CreateProduct