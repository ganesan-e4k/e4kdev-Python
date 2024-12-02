"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faChainBroken, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import BootstrapModal from "../template-popup/LargePopup";
import BootstrapModalMedium from "../template-popup/MediumPopup";
import AlertMessage from "../template-popup/AlertMessages";
import BootstrapModalMedium2column from "../template-popup/MediumPopup_2Column";
import BootstrapModalMediumcolumn3_1 from "../template-popup/MediumPopup_Column3_1";
import BootstrapModalMediumcolumn1_3 from "../template-popup/MediumPopup_Column1_3";


export default function customer() {

    const [isCardView, setIsCardView] = useState(true);

    const handleLayoutToggle = () => {
      setIsCardView(!isCardView);
    };

    const [isColumn2Visible, setIsColumn2Visible] = useState(true);

    const handleToggle = () => {
      setIsColumn2Visible(!isColumn2Visible);
    };   
    
    /********** Large popup *********/
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };


    /********** Medium popup *********/
    const [showModalMedium, setShowModalMedium] = useState(false);

    const handleOpenModalMedium = () => {
      setShowModalMedium(true);
    };
  
    const handleCloseModalMedium = () => {
      setShowModalMedium(false);
    };


	    /********** Medium popup 2 column *********/
		const [showModalMedium2column, setShowModalMedium2column] = useState(false);

		const handleOpenModalMedium2column = () => {
		  setShowModalMedium2column(true);
		};
	  
		const handleCloseModalMedium2column = () => {
		  setShowModalMedium2column(false);
		};


	    /********** Medium popup  column 3:1 *********/
		const [showModalMediumcolumn3_1, setShowModalMediumcolumn3_1] = useState(false);

		const handleOpenModalMediumcolumn3_1 = () => {
		  setShowModalMediumcolumn3_1(true);
		};
	  
		const handleCloseModalMediumcolumn3_1 = () => {
		  setShowModalMediumcolumn3_1(false);
		};	

	    /********** Medium popup  column 1:3 *********/
		const [showModalMediumcolumn1_3, setShowModalMediumcolumn1_3] = useState(false);

		const handleOpenModalMediumcolumn1_3 = () => {
		  setShowModalMediumcolumn1_3(true);
		};
	  
		const handleCloseModalMediumcolumn1_3 = () => {
		  setShowModalMediumcolumn1_3(false);
		};	

	/********** Alert popup *********/
	const [showModalAlert, setShowModalAlert] = useState(false);

	const handleOpenModalAlert = () => {
		setShowModalAlert(true);
	};
	  
	const handleCloseModalAlert = () => {
		setShowModalAlert(false);
	};

  return (
   <>
    	{/* <!-- Breadcomb area Start--> */}
      <div className="breadcomb-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="breadcomb-list">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="breadcomb-wp">
                      
                      <div className="breadcomb-ctn">
                        <span><a href="#" onClick={() => setShowModal(true)}> <i className="fa fa-plus"></i> Create</a> | </span>
                        <span><a href=""> <i className="fa fa-trash"></i> Delete</a> | </span>
                        <span><a href=""> <i className="fa fa-pencil"></i> Edit</a></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="breadcomb-wp right-barmenu">
                      
                      <div className="breadcomb-ctn">
                        <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a> | </span>
                        <span><a href="#" id="layoutview" onClick={handleLayoutToggle}><FontAwesomeIcon icon={isCardView ? faTh : faThList} /></a></span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       {/* <!-- Breadcomb area End--> */}



    {/* 
    <!-- Data Table area Start--> */}
    <div className="data-table-area">
        <div className="container-fluid">
            <div className="row">
                <div id="column1" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                    <div id="gridview" className="data-table-list" style={{ display: isCardView ? 'block' : 'none' }}> 
							<div className="cmp-tb-hd">
								<h2>Customer list</h2>
							</div>
                        <div className="table-responsive">
                            <table id="data-table-basic" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><a href="#" onClick={handleOpenModal}>customer</a></td>
                                        <td>System Architect</td>
                                        <td>Edinburgh</td>
                                        <td>61</td>
                                        <td>2011/04/25</td>
                                        <td>$320,800</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" onClick={handleOpenModalMedium}>MediumPopup</a></td>
                                        <td>Accountant</td>
                                        <td>Tokyo</td>
                                        <td>63</td>
                                        <td>2011/07/25</td>
                                        <td>$170,750</td>
                                    </tr>
									<tr>
                                        <td><a href="#" onClick={handleOpenModalMedium2column}>MediumPopup2column</a></td>
                                        <td>Accountant</td>
                                        <td>Tokyo</td>
                                        <td>63</td>
                                        <td>2011/07/25</td>
                                        <td>$170,750</td>
                                    </tr>
									<tr>
                                        <td><a href="#" onClick={handleOpenModalMediumcolumn3_1}>MediumPopupcolumn 3:1</a></td>
                                        <td>Accountant</td>
                                        <td>Tokyo</td>
                                        <td>63</td>
                                        <td>2011/07/25</td>
                                        <td>$170,750</td>
                                    </tr>
									<tr>
                                        <td><a href="#" onClick={handleOpenModalMediumcolumn1_3}>MediumPopupcolumn 1:3</a></td>
                                        <td>Accountant</td>
                                        <td>Tokyo</td>
                                        <td>63</td>
                                        <td>2011/07/25</td>
                                        <td>$170,750</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" onClick={handleOpenModalAlert}>AlertMessage</a></td>
                                        <td>Junior Technical Author</td>
                                        <td>San Francisco</td>
                                        <td>66</td>
                                        <td>2009/01/12</td>
                                        <td>$86,000</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
					
					{/* <!------ grid view ------> */}
					
					{/* <!------- Card view ------> */}
					<div id="cardview" className="" style={{ display: isCardView ? 'none' : 'block' }}>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="cmp-tb-hd">
								<h2>Customer list</h2>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/1.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>John Deo</h2>
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
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list sm-res-mg-t-30">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/2.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>Smith</h2>
										<p className="ctn-ads">Aus, LA, aus</p>
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
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list sm-res-mg-t-30 tb-res-mg-t-30 dk-res-mg-t-30">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/4.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>Malika</h2>
										<p className="ctn-ads">Thi, LA, aus</p>
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
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list sm-res-mg-t-30 tb-res-mg-t-30 dk-res-mg-t-30">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/1.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>John Deo</h2>
										<p className="ctn-ads">BG, LA, aus</p>
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
							</div>
						</div>
					
					
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list mg-t-30">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/1.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>John Deo</h2>
										<p className="ctn-ads">In, LA, aus</p>
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
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list mg-t-30">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/2.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>Smith</h2>
										<p className="ctn-ads">Pk, LA, aus</p>
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
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list mg-t-30">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/4.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>Malika</h2>
										<p className="ctn-ads">London, LA, aus</p>
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
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
							<div className="contact-list mg-t-30">
								<div className="contact-win">
									<div className="contact-img">
										<img src="img/post/1.jpg" alt="" />
									</div>
									
								</div>
								<div className="contact-ctn">
									<div className="contact-ad-hd">
										<h2>John Deo</h2>
										<p className="ctn-ads">Aus, LA, aus</p>
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
							</div>
						</div>					
					</div>
					
					
                </div>
				
				<div id="column2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>
				
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
    {/* <!-- Data Table area End--> */}

      <BootstrapModal showModal={showModal} handleClose={handleCloseModal} />

	  <BootstrapModalMedium showModalMedium={showModalMedium} handleCloseMedium={handleCloseModalMedium} />


	  <BootstrapModalMedium2column showModalMedium2column={showModalMedium2column} handleCloseMedium2column={handleCloseModalMedium2column} />

	  <BootstrapModalMediumcolumn3_1 showModalMediumcolumn3_1={showModalMediumcolumn3_1} handleCloseMediumcolumn3_1={handleCloseModalMediumcolumn3_1} />

	  <BootstrapModalMediumcolumn1_3 showModalMediumcolumn1_3={showModalMediumcolumn1_3} handleCloseMediumcolumn1_3={handleCloseModalMediumcolumn1_3} />

	  <AlertMessage showModalAlert={showModalAlert} handleCloseAlert={handleCloseModalAlert} />

   </>
  );
}