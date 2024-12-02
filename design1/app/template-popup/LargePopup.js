"use client";

import { useState,useRef  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
//import '../../public/assets/style.css';
//import 'smart-webcomponents-react/source/modules/smart.input';
import { Input } from 'smart-webcomponents-react/input';
import { DateInput } from 'smart-webcomponents-react/dateinput';
import { TextArea } from 'smart-webcomponents-react/textarea';



const BootstrapModal = ({ showModal, handleClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);



  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggle = () => {
    setIsColumn2Visible(!isColumn2Visible);
  };  

  return (
    <>
    <div className={`modal fade ${showModal ? 'in' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
      <div className={modalDialogclassName}>
        <div className="modal-content">
                  <div className="large-popup-topdiv">
                  {/* <!------ popup for customer -------> */}
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
                                      <span><a href="#" id="sa-success"> <i className="fa fa-check"></i> Save</a> | </span>
                                      <span><a href="#" id="sa-warning"> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      <span><a href=""><i className="fa fa-pencil"></i> Edit</a> | </span>
                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className='popup-top-rightdiv'>
                                    <button type="button" className="close" onClick={handleClose}>
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


                </div>
                <div className="modal-body">

                  {/* <!-- customer name area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                          <div className="customer-newbold">
                            Customer Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- customer name area End-->	 */}
                  
                  {/* <!-- Breadcomb area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">

                          <div className="breadcomb-list subbreadcomb-list">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="breadcomb-wp-two">
                                  <div className="">
                                    <span><a href="#"> <i className="fa fa-edit"></i> price setup</a> | </span>
                                    <span><a href="#"> <i className="fa fa-list"></i> Invoice list</a> | </span>
                                    <span><a href=""><i className="fa fa-list"></i> Order list</a> | </span>
                                    <span><a href=""><i className="fa fa-list-alt"></i> Statement</a> | </span>
                                    <span><a href=""><i className="fa fa-money"></i> Cash Receipts</a> | </span>
                                    <span><a href=""><i className="fa fa-file-text-o"></i> Memo</a> | </span>
                                    <span><a href=""><i className="fa fa-users"></i> Uniform</a> | </span>
                                    <span><a href=""><i className="fa fa-newspaper-o"></i> Template</a> | </span>
                                    <span><a href=""><i className="fa fa-exchange"></i> Export transaction</a> | </span>
                                    <span><a href=""><i className="fa fa-external-link"></i> Export Turnover</a></span>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                    </div>
                  </div>
                  {/* <!-- Breadcomb area End-->	 */}


                  <div className="container-fluid">
                    <div className="row">
                    <div id="columnpopup1" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#general" aria-expanded="true" aria-controls="general"><i className="plus-icon" aria-hidden="true"></i> General  </a> 
                          </h4>
                            <div id="general" className="collapse in" aria-expanded="true" >
                                <div className="panel-box-div">
                                  <div className="row">

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Customer Id</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="Customer Id"></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Description</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Description"></Input>
                                          </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Date Opened</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <DateInput format="dd/mm/yyyy" placeholder="Date Opened"></DateInput>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Date Used</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                            <DateInput format="dd/mm/yyyy" placeholder="Date Used"></DateInput>
                                          </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Analysis Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Analysis Code"></Input>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Factorial No</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Factorial No"></Input>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Insurance No</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Insurance No"></Input>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Nominal Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <Input placeholder="Nominal Code"></Input><span className="master-option-span">...</span>
                                          </div>
                                      </div> 

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#classification" aria-expanded="false" aria-controls="classification"><i className="plus-icon" aria-hidden="true"></i> Classification </a> 
                          </h4>
                            <div id="classification" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">

                                  <div className="row">

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className='input-lable'>
                                          <span>Categories</span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className="form-group">
                                        <Input placeholder="Categories"></Input>
                                      </div>
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Classification</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className="form-group master-option">
                                            <Input placeholder="Classification"></Input><span className="master-option-span">...</span>
                                      </div>
                                    </div>

                                  </div>

                                </div>
                              
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#address" aria-expanded="false" aria-controls="address"><i className="plus-icon" aria-hidden="true"></i> Address </a> 
                          </h4>
                            <div id="address" className="collapse" aria-expanded="false">
                              
                                <div className="panel-box-div">
                                  content
                                </div>
                             
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#taxable" aria-expanded="false" aria-controls="taxable"><i className="plus-icon" aria-hidden="true"></i> Taxable </a> 
                          </h4>
                            <div id="taxable" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                 
                                 <div className='row'>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>VAT Payable</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="VAT Payable"></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>VAT Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <Input placeholder="VAT Code"></Input><span className="master-option-span">...</span>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>VAT No</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="VAT No"></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>VAT Country</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <Input placeholder="VAT Country"></Input><span className="master-option-span">...</span>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>VAT Currrency</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <Input placeholder="VAT Currrency"></Input><span className="master-option-span">...</span>
                                          </div>
                                      </div> 
                                  
                                      </div>
                                </div>
                            
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#bank" aria-expanded="false" aria-controls="bank"><i className="plus-icon" aria-hidden="true"></i> Bank </a> 
                          </h4>
                            <div id="bank" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">

                                <div className="row">

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>Bank Name</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="Bank Name"></Input>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>A/C Name</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="A/C Name"></Input>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>Sort Code</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="Sort Code"></Input>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className='input-lable'>
                                        <span>A/C Number</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                    <div className="form-group">
                                      <Input placeholder="A/C Number"></Input>
                                    </div>
                                  </div>

                                  </div>

                                </div>
                             
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#payment" aria-expanded="false" aria-controls="payment"><i className="plus-icon" aria-hidden="true"></i> Payment Terms </a> 
                          </h4>
                            <div id="payment" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className='input-lable'>
                                          <span>Payment Term</span>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className="form-group">
                                        <Input placeholder="Payment Term"></Input>
                                      </div>
                                    </div>

                                  </div>  
                                </div>
                              
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#discounts" aria-expanded="false" aria-controls="discounts"><i className="plus-icon" aria-hidden="true"></i> Discounts </a> 
                          </h4>
                            <div id="discounts" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Discount</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="Discount"></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Settlement Discount</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="Settlement Discount"></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Credit Limit</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="Credit Limit"></Input>
                                        </div>
                                      </div>

                                  </div> 
                                </div>
                              
                            </div>
                        </div>

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#rep" aria-expanded="false" aria-controls="rep"><i className="plus-icon" aria-hidden="true"></i> Rep </a> 
                          </h4>
                            <div id="rep" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Rep</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group master-option">
                                            <Input placeholder="Rep"></Input><span className="master-option-span">...</span>
                                          </div>
                                      </div> 
                                    </div>

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Rep Comission</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="Rep Comission"></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Key Account Comission</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="Key Account Comission"></Input>
                                        </div>
                                      </div>
                                </div>
                              
                            </div>
                        </div>  

                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a className="collapsed" data-toggle="collapse"  href="#notes" aria-expanded="false" aria-controls="notes"><i className="plus-icon" aria-hidden="true"></i> Notes </a> 
                          </h4>
                            <div id="notes" className="collapse" aria-expanded="false">
                             
                                <div className="panel-box-div">
                                  <div className='row'>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Notes</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <TextArea placeholder="Notes"></TextArea>
                                        </div>
                                      </div>

                                  </div> 
                                </div>
                             
                            </div>
                        </div>                      
                       </div>
                      </div>
                      <div id="columnpopup2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                        <div className="mainpopup-right">
                          <div className="contact-list">
                            <div className="contact-img">
                              <img src="assets/images/user.png" alt=""/>
                            </div>

                            <div className="contact-des">
                                <h4>Customer Name</h4>
                                <p className="contact-des-line">Description</p>
                            </div>

                            <div className="leftsidebar-clickdiv">
                              <div className="row">
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Balance</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                       0.00
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Turnover Total</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>0.00</a>
                                    </div>
                                </div>


                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Transaction Total</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>0.00</a>
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
              </div>
            </div>




          </div>
    </>
  );
};

export default BootstrapModal;