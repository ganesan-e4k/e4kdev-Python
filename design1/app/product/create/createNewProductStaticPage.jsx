'use client'
import React from 'react'
import { Input } from 'smart-webcomponents-react/input';
const createNewProductStaticPage = () => {
  return (
   
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
   
  )
}

export default createNewProductStaticPage