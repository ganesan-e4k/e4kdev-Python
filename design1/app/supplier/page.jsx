"use client";
import { toast } from 'react-toastify';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faChainBroken, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import { CheckBox } from 'smart-webcomponents-react/checkbox';
import { useState,useEffect,useMemo} from 'react';
import BootstrapModalMedium from "../template-popup/MediumPopup";
import AlertMessage from "../template-popup/AlertMessages";
import BootstrapModalMedium2column from "../template-popup/MediumPopup_2Column";
import BootstrapModalMediumcolumn3_1 from "../template-popup/MediumPopup_Column3_1";
import BootstrapModalMediumcolumn1_3 from "../template-popup/MediumPopup_Column1_3";
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import E4kSupplierAddressUpdatePage from '../supplier/supplierrelatables/E4kSupplierAddressUpdatePage';
import E4kTblSupplierContactUpdatePage from '../supplier/supplierrelatables/E4kTblSupplierContactUpdatePage';
import {resetSelectSupplierContacttypes} from '../store/slices/supplier/e4kselectedsupplierContact';
import {setSelectNonLiveCustomer,resetSelectNonLiveCustomer } from '../store/slices/customer/e4kTblnNonLiveCustomer';
import {resetSelectSupplierAddresstypes} from '../store/slices/supplier/e4kselectedSupplieraddresstypes';
import 	E4kSupplieroverallListCardViewGrid from '../supplier/allsupplier/E4kSupplieroverallListCardViewGrid';
import E4kSupplieroverallListGrid from '../supplier/allsupplier/E4kSupplieroverallListGrid';
import {useGetturnoverSupplierQuery,useDeleteSupplierMutation} from '../store/services/Supplier/e4kTblSupplierlist';
import E4kTblSupplierUpdatePage from '../supplier/supplierrelatables/E4kTblSupplierUpdatePage';
import E4kcreateNewSupplier from '../supplier/supplierrelatables/E4kcreateNewSupplier'
import {setSelectedSupplier, resetSelectedSupplier}from '../store/slices/supplier/e4ksupplierSelectSlice';




export default function  page ()  {
	const [showConfirmSelectSupplierDelete, setShowConfirmSelectSupplierDelete] = useState(false);
	const [recordToDeleteSelectSupplierDelete, setRecordToDeleteSelectSupplierDelete] = useState(null);
	const [isWidgetView, setIsWidgetView] = useState(false);
	const [isCardView, setIsCardView] = useState(true);
	const [ showcreatenewSupplier, setshowcreatenewSupplier] = useState(false);
	const dispatch = useDispatch();
	const [showModalSupplieraddressupdate , setshowModalSupplieraddressupdate] = useState(false);
	const [showModalSupplierContactupdate, setshowModalSupplierContactupdate] = useState(false);
	const supplierAddressSelect = useSelector((state) => state.Supplieraddresstypes.supplieraddressSelect);
	const supplierContactSelect = useSelector((state) => state.selectedsupplierContact.suppliercontactSelect);  //   console.log("KJHLKLGGGGGGGGGGGGG" ,supplierContactSelect )
	const NonLiveCustomer = useSelector(state => state.selectNonLiveCustomer.selectNonLivecustomer);
    const [deleteSupplierRecord, {  isLoading: deleteproductloading }] = useDeleteSupplierMutation();
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





    //////////////////////////////////////////////////////////  SUPPLIER LIST FIUNCTION  /////////////////////////////////////////////////
	const [showModalSupplier , setShowModalSupplier] = useState(false);

	
	useEffect(()=>{
		if(supplierAddressSelect.businessid || supplierAddressSelect.companyid  || supplierAddressSelect.addresstype || supplierAddressSelect.addresstypeid){
			handleopensuppliieraddresspage();

		}
	},[supplierAddressSelect.businessid ,supplierAddressSelect.companyid ,supplierAddressSelect.addresstype ,supplierAddressSelect.addresstypeid]);


	const handleopensuppliieraddresspage = () =>{
		if(supplierAddressSelect.businessid || supplierAddressSelect.companyid  || supplierAddressSelect.addresstype || supplierAddressSelect.addresstypeid  ){
			setshowModalSupplieraddressupdate(true);
		}
	};



	useEffect(()=>{
		if(supplierContactSelect.companyid || supplierContactSelect.businessid || supplierContactSelect.addresstype || supplierContactSelect.addresstypeid) {
			handleopensupplierContactUpdate(true);
		}
	},[supplierContactSelect.companyid,supplierContactSelect.businessid,supplierContactSelect.addresstype,supplierContactSelect.addresstypeid]);

	const handleopensupplierContactUpdate = () =>{
		if(supplierContactSelect.companyid || supplierContactSelect.businessid || supplierContactSelect.addresstype || supplierContactSelect.addresstypeid){
            setshowModalSupplierContactupdate(true);
        }
	
	};	

	// useEffect(()=>{
	// 	if(supplierturnoverdata) {
	// 		const turnoverdata = supplierturnoverdata.E4kTotalturnoversupplier;
	// 		setsupplierturnover(turnoverdata)
	// 	}
	// })

	


  const handleCloseSupplier = () => {
    setShowModalSupplier(false);
	dispatch(resetSelectSupplierAddresstypes());
	dispatch(resetSelectedSupplier());
  };


  const handleCloseSupplieraddressupdate =() => {
	setshowModalSupplieraddressupdate(false);
	dispatch(resetSelectSupplierAddresstypes())

  };


  const handleCloseSupplierContactupdate =() => {
	setshowModalSupplierContactupdate(false);
	dispatch(resetSelectSupplierContacttypes())
  }
  

  const CreateNewSupplier = () => {
	setshowcreatenewSupplier(true);
  };


	

  const handleClosecreatenewSupplier =(businessid1) => {
	if(businessid1){
		dispatch(setSelectedSupplier(businessid1));
		setshowcreatenewSupplier(false);
		setShowModalSupplier(true);
		
	}
	else{
        setshowcreatenewSupplier(false);
    }


  };


  //////////////// turn over supplier ///////////////////
  const [supplierturnover, setsupplierturnover] = useState([]);
  const selectedSupplier = useSelector(state => state.supplierSelect.selectedSupplier);
  console.log("HKKKKKKKKKKK" , selectedSupplier)


  const handleSupplierNonLiveCheckBox = (event) => {
		
	if (event.detail.value === true){
	dispatch(setSelectNonLiveCustomer(event.detail.value));
	}else if (event.detail.value === false){
	dispatch(resetSelectNonLiveCustomer());
	}

};

const skipQuery = !selectedSupplier.BusinessID  && !selectedSupplier.CompanyID


const { data: supplierturnoverdata } = useGetturnoverSupplierQuery({
  companyid: selectedSupplier.CompanyID,
  businessid: selectedSupplier.BusinessID,
})









useEffect(()=>{
  if(supplierturnoverdata) {
    const turnoverdata = supplierturnoverdata.E4kTotalturnoversupplier;
	if(turnoverdata === null){
		setsupplierturnover('0.00')
	}
	else{
      setsupplierturnover(turnoverdata)
    }
   
  }
})



useEffect(() => {
	 if (selectedSupplier.BusinessID !== undefined) {
	  setIsWidgetView(true);
	}


  },[selectedSupplier]);


  const handleSelectSupplierDelete = async () => {
	setShowConfirmSelectSupplierDelete(false);
	if (recordToDeleteSelectSupplierDelete) {
	  try {
		
		  const result = await deleteSupplierRecord( recordToDeleteSelectSupplierDelete )
		  if (result.error) {
			  console.error('Mutation Error:', result.error);
		  } else {
			  //console.log('Mutation Success:', result.data);
			  if(result.data.E4kTblsupplierDelete.success===true){
				  toast.success('Supplier has been inactivated',{
					position: "top-center",
					autoClose: 500,
					hideProgressBar: true,
				});
				// dispatch1(setselectCustomer({}));
			  }else{
				  toast.error(result.data.E4kTblsupplierDelete.error,{
					position: "top-center",
					autoClose: 500,
					hideProgressBar: true,
				});
			  }
		  }
	  } catch (error) {
		  console.error('Mutation Error:', error);
	  }
  }
  };
  
  
  //////// handle product delete
  const DeleteSupplier = () => {
  
	if (selectedSupplier.BusinessID!== undefined && selectedSupplier.BusinessID !=='') {
  
	  setRecordToDeleteSelectSupplierDelete({
		companyid:selectedSupplier.CompanyID,
		businessid:selectedSupplier.BusinessID,
	  });
	  setShowConfirmSelectSupplierDelete(true);
	  
  
	}else{
	  toast.error('Please select a Supplier to delete',{
		position: "top-center",
		autoClose: 500,
		hideProgressBar: true,
	  });
	}
  
  
  };


  const handleopensupplierupdate = ()=>{
	if(selectedSupplier.BusinessID!= undefined && selectedSupplier.BusinessID !== ''){
		setShowModalSupplier(true);

	}
	else{
		toast.error('Please select a Supplier to update',{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
	}
  };


  const [productRowidChange, setProductRowidChange] = useState(null);
  const [productRowidChangeSuccess, setProductRowidChangeSuccess] = useState(null);

 
  const handleProductNavigation = (data) => {
	console.log('Product Navigation :',data)
	setProductRowidChangeSuccess(null)
	setProductRowidChange(data)
  };



  
  const handleSuccessGridRowClickEvent = (data) => {

	console.log('Success Grid Row Click Event :',data)
	 setProductRowidChangeSuccess(data)

   }





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
											     <span><a href="#" onClick={CreateNewSupplier}> <i className="fa fa-plus"></i> New</a> | </span>

												{/* <span><a href="#" onClick={() => setShowModalSupplier(true)}> <i className="fa fa-plus"></i> New</a> | </span> */}
												<span><a href="#" onClick={DeleteSupplier}> <i className="fa fa-trash"></i> Delete</a> | </span>
												{/* <span  ><a href="#" onClick={() => setShowModalSupplier(true)} > <i className="fa fa-pencil"></i> Edit</a></span> */}
												<span  ><a href="#" onClick={handleopensupplierupdate} > <i className="fa fa-pencil"></i> Edit</a></span>

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
						<div id="suppliercolumn" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
							<div id="Supplierlist" className="data-table-list" style={{ display: isCardView ? 'block' : 'none' }}>
								<div className="cmp-tb-hd">
									<h2>Supplier list</h2>
									<div className='productlist-checkbox-nolive'>
                                <span>Show only Inactive :</span> 
                                  <CheckBox onChange={(e) => handleSupplierNonLiveCheckBox(e)} />
                                  
                              </div>
									{/* <CustomerListGrit/> */}
									<>
								<E4kSupplieroverallListGrid
									rowidchange = { productRowidChange}
									handleSuccessRowClick = { handleSuccessGridRowClickEvent}
								/>
							 </>	
							 </div>
							</div>

							{/* <!------ grid view ------> */}

							{/* <!------- Card view ------> */}
							<div id="suppliercardview" className="" style={{ display: isCardView ? 'none' : 'block' }}>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="cmp-tb-hd">
										<h2>Supplier list</h2>
									</div>
									{isCardView ? (
                                <div id="suppliercardview" className="" style={{ display: 'block' }}>
                                    
									<>
									<E4kSupplieroverallListCardViewGrid/>
									</>
    
                                </div>
                            ) : (
                                <div id="suppliergridview" className="data-table-list" style={{ display: 'block' }}>
                                    <>
									<E4kSupplieroverallListCardViewGrid/>
									</>
									
                                </div>
                            )} 
								</div>
				
							</div>


						</div>

						<div id="suppliercolumn2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>
                            
						  {isWidgetView ? (
							<div className="mainpopup-right">
								<div className="contact-list">
								{selectedSupplier.BusinessID?(
									
									<div className="contact-img">
									
									   <div className="contact-img">
									   <img src ={`${selectedSupplier.value ? selectedSupplier.value: "../../assets/Images/Supplier/download.png"}`}/> 

									   </div>
									</div>
								):(null)}
                                    <br>
									</br>
									<br>
									</br>
									<div className="contact-des">
										<h4>{selectedSupplier.name}</h4>
										{/* <p className="contact-des-line">Description</p> */}
									</div>
									<br>
									</br>
									<br>
									</br>

									<div className="leftsidebar-clickdiv">
										<div className="row">
											<div className="col-xs-8">
												<div className='input-lable'>
													<span>Balance</span>
												</div>
											</div>
											<div className="col-xs-4">
												<div className='input-lablevalue'>
													<a>0.00</a>
												</div>
											</div>

											<div className="col-xs-8">
												<div className='input-lable'>
													<span>Turnover Total</span>
												</div>
											</div>
											<div className="col-xs-4">
												<div className='input-lablevalue'>
												<a>
													${supplierturnover}
												</a>

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
							 ) : null}

						</div>
							

					</div>
				</div>
				{showConfirmSelectSupplierDelete && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSelectSupplierDelete(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to inactive this Supplier?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSelectSupplierDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleSelectSupplierDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
				
			</div>
			{/* <!-- Data Table area End--> */}

			{/* <BootstrapModal showModal={showModal} handleClose={handleCloseModal} /> */}

			<BootstrapModalMedium showModalMedium={showModalMedium} handleCloseMedium={handleCloseModalMedium} />

			<BootstrapModalMedium2column showModalMedium2column={showModalMedium2column} handleCloseMedium2column={handleCloseModalMedium2column} />

			<BootstrapModalMediumcolumn3_1 showModalMediumcolumn3_1={showModalMediumcolumn3_1} handleCloseMediumcolumn3_1={handleCloseModalMediumcolumn3_1} />

			<BootstrapModalMediumcolumn1_3 showModalMediumcolumn1_3={showModalMediumcolumn1_3} handleCloseMediumcolumn1_3={handleCloseModalMediumcolumn1_3} />

			<AlertMessage showModalAlert={showModalAlert} handleCloseAlert={handleCloseModalAlert} />


			{showModalSupplier && (
        <E4kTblSupplierUpdatePage
          businessID={selectedSupplier.BusinessID}
          companyID={selectedSupplier.CompanyID}
          showModalSupplier={showModalSupplier}
          handleCloseSupplier={handleCloseSupplier}
		  productRowChange = {handleProductNavigation} 
		  productRowidSuccess = {productRowidChangeSuccess}
		  supplierTotalturnover={supplierturnover}
        />
      )}


       {showModalSupplieraddressupdate &&(
             <E4kSupplierAddressUpdatePage
			   showModalSupplieraddressupdate = {showModalSupplieraddressupdate}
			   handleCloseSupplieraddressupdate = {handleCloseSupplieraddressupdate}
               businessid = {supplierAddressSelect.businessid}
			   companyid ={supplierAddressSelect.companyid}
			   addresstype = {supplierAddressSelect.addresstype}
			   addresstypeid = {supplierAddressSelect.addresstypeid}

			 /> 
	   
	   )}

	    {showModalSupplierContactupdate && (
          <E4kTblSupplierContactUpdatePage
		  showModalSupplierContactupdate = {showModalSupplierContactupdate}
		  handleCloseSupplierContactupdate = {handleCloseSupplierContactupdate}
		   businessid = {supplierContactSelect.businessid}
		   companyid = {supplierContactSelect.companyid}
		   addresstypeid = {supplierContactSelect.addresstypeid}
		   addresstype = {supplierContactSelect.addresstype}
 

		
		/>
	   )}

	   <E4kcreateNewSupplier
	   showcreatenewSupplier= {showcreatenewSupplier}
	   handleClosecreatenewSupplier= {handleClosecreatenewSupplier}
	   /> 

	   

	  

   

   
		

		</>
	);
};
