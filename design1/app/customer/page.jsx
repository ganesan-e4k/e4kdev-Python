
"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faChainBroken, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect } from 'react';
import { CheckBox } from 'smart-webcomponents-react/checkbox';
import E4kTblCustomerUpdate from './customerRelatables/E4kTblCustomerUpdate';
import { toast } from 'react-toastify';
import E4kTblCustomerGrid from './allcustomer/E4kTblCustomerGrid';
import E4kTblCustomerCard from './allcustomer/E4kTblCustomerCard';
import { useSelector,useDispatch } from 'react-redux';
import { setselectCustomer} from '../store/slices/customer/e4kTblCustomerSliceSelect';
import {resetselectCustomer} from '../store/slices/customer/e4kTblCustomerSliceSelect';
import {resetSelectedAddressData }  from '../store/slices/customer/e4kTblCustomeraddressDataSlice';
import {resetSelectAddress} from '../store/slices/customer/e4kTblCustomerSelectAddress';
import { resetselectContact} from '../store/slices/customer/e4kTblCustomerSelectContact';
import {resetCustomerSelectedAddress} from '../store/slices/customer/e4kTblCustomerSelectedAddressSlice'
import {setSelectNonLiveCustomer,resetSelectNonLiveCustomer } from '../store/slices/customer/e4kTblnNonLiveCustomer';
import E4kTblCustomerAddressPage from './customerRelatables/E4kTblCustomerAddressPage';
import E4kTblCustomerContactPage from './customerRelatables/E4kTblCustomerContactPage';
import E4kTblCustomerCreate from './customerRelatables/E4kTblCustomerCreate';
import {useGetturnoverQuery} from '../store/services/Customer/e4kTblCustomer';
import {useDeleteCustomerMutation} from '../store/services/Customer/e4kTblCustomer';












export default function page() {
	const [showConfirmSelectCustomerDelete, setShowConfirmSelectCustomerDelete] = useState(false);
	const [recordToDeleteSelectCustomerDelete, setRecordToDeleteSelectCustomerDelete] = useState(null);
	const [isWidgetView, setIsWidgetView] = useState(false);
    const dispatch = useDispatch();
	const dispatch1 = useDispatch();
	const CompanySelectCustomerparamerterset = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanySelectCustomerparamerterset);
    const [showcreatenewCustomer, setshowcreatenewCustomer] =useState(false);
    const [isCardView, setIsCardView] = useState(true);
    const [loading , isloading] = useState();
	const [showModalAddressPage, setShowModalAddressPage] = useState(false);
	const [showModalContactOpen, setshowModalContactOpen] = useState(false);
	// const addressSelect = useSelector((state) => state.selectCustomerAddress.addressSelect);
   	// const selectCustomerContacts = useSelector((state) => state.selectCustomerContact.selectContact);
  	// const CustomerSelectCustomerGrid = useSelector((state) => state.selectCustomer.selectCustomer);
	const CustomerSelect = useSelector((state) => state.selectCustomer.selectCustomer);
    console.log("cdujbcdjubvjf", CustomerSelect)
	

	const [totalTurnover, setturnover] = useState([]);
	console.log("totalTurnover",totalTurnover) 
   
	const { data: customerturnoverdata} = useGetturnoverQuery({
		companyid : companyid,
		businessid : CustomerSelect.businessid ,
	});
   
	const [deleteCustomerRecord, {  isLoading: deleteproductloading }] = useDeleteCustomerMutation();



	
	useEffect(() => {
		if (customerturnoverdata && customerturnoverdata.E4kTotalturnover !== undefined) {
		  const data = customerturnoverdata.E4kTotalturnover;
	  
		  // If data is null, set it to 0.00
		  if (data === null) {
			setturnover('0.00');
		  } else {
			console.log("Received turnover data:", data);
			setturnover(data);
		  }
		}
	  }, [customerturnoverdata]);
	  




	

	
	// useEffect(() => {
	// 	if (addressSelect.addressTypeId) {
	// 	  handleOpenAddressPage();
	// 	}
	//   }, [addressSelect.addressTypeId]);

	// const handleOpenAddressPage = () => {
	//   if (addressSelect.addressTypeId) {
	// 	setShowModalAddressPage(true);
	//   }
	// };




	// const handleopenContact =() =>{
	// 	if(selectCustomerContacts.addressTypeId){
	// 		setshowModalContactOpen(true);
    //         //contactrefetch();
			
	// 	}
		
	// }
  
	// const handleCloseAddressPage = () => {
	//   setShowModalAddressPage(false);	
	//   dispatch(resetSelectAddress())
	//   //addressrefetch()

	// };


	// const handleCloseContact = () => {
    //     setshowModalContactOpen(false);
	// 	//addressrefetch();
	// 	dispatch(resetselectContact());
	// 	// dispatch(resetSelectContactAddressData());
	// 	// dispatch(resetFetchedAddressData())
    //   };
  

	

	// useEffect(() => {
	// 	if (selectCustomerContacts.addressTypeId) {
    //       handleopenContact();
    //     }
    //   }, [selectCustomerContacts.addressTypeId]);
	
	
	// const totalTurnover = useSelector((state) => state.dataCustomer.totalTurnover);
	

	const [ selectedImagePath , selectedImage] = useState(false);

	const handleLayoutToggle = () => {
		setIsCardView(!isCardView);
	};

	const [isColumn2Visible, setIsColumn2Visible] = useState(true);

	const handleToggle = () => {
		setIsColumn2Visible(!isColumn2Visible);
	};

	/********** Large popup *********/
	const [showModalCustomerUpdate, setshowModalCustomerUpdate] = useState(false);

	const handleOpenModal = () => {
		setshowModalCustomerUpdate(true);
	};

	const handleCloseModal = () => {
		setshowModalCustomerUpdate(false);
		dispatch(resetselectCustomer());
		dispatch(resetSelectedAddressData());
		dispatch(resetSelectAddress());
		dispatch(resetselectContact());
		dispatch(resetCustomerSelectedAddress());
	


	};


	/********** Medium popup *********/
	const [showModalMedium, setShowModalMedium] = useState(false);

	const handleOpenModalMedium = () => {
		setShowModalMedium(true);
	};

	const handleCloseModalMedium = () => {
		setShowModalMedium(false);
	};


	
	
	// const handleClosecreatenewCustomer = (businessid1) => {
	// 	console.log("cjscjkcnsc", businessid1)
    //     dispatch(setselectCustomer(businessid1));
	// 	setshowcreatenewCustomer(false);
	// 	setshowModalCustomerUpdate(true);
	
	// };


	const handleClosecreatenewCustomer = (businessid1) => {
		if (businessid1) {
			
			dispatch(setselectCustomer(businessid1));
			setshowcreatenewCustomer(false);
			setshowModalCustomerUpdate(true);
		} else {
			setshowcreatenewCustomer(false);
			console.log("Invalid businessid1, skipping dispatch.");
		}
	};
	

	
    const handleCustomerNonLiveCheckBox = (event) => {
		if (event.detail.value === true){

	
		  dispatch(setSelectNonLiveCustomer(event.detail.value));
		}else if (event.detail.value === false){
		 
		  dispatch(resetSelectNonLiveCustomer());
		}
  
	  }


	  useEffect(() => {
		if (CustomerSelect.businessid !== undefined) {
		 setIsWidgetView(true);
	   }
   
   
	 },[CustomerSelect]);





	 const handleSelectCustomerDelete = async () => {
		setShowConfirmSelectCustomerDelete(false);
		if (recordToDeleteSelectCustomerDelete) {
		  try {
			
			  const result = await deleteCustomerRecord( recordToDeleteSelectCustomerDelete )
			  if (result.error) {
			  } else {
				  if(result.data.E4kTblcustomerdelete.success===true){
					  toast.success('Customer has been inactivated',{
						position: "top-center",
						autoClose: 500,
						hideProgressBar: true,
					});
					dispatch1(setselectCustomer({}));
				  }else{
					  toast.error(result.data.E4kTblcustomerdelete.error,{
						position: "top-center",
						autoClose: 500,
						hideProgressBar: true,
					});
				  }
			  }
		  } catch (error) {
		  }
	  }
	  };
	  
	  
	
	  const DeleteCustomer = () => {
	  
		if (CustomerSelect.businessid!== undefined && CustomerSelect.businessid !=='') {
	  
		  setRecordToDeleteSelectCustomerDelete({
			companyid: CustomerSelect.CompanyID,
			businessid: CustomerSelect.businessid,
		  });
		  setShowConfirmSelectCustomerDelete(true);
		  
	  
		}else{
		  toast.error('Please select a Customer to delete',{
			position: "top-center",
			autoClose: 500,
			hideProgressBar: true,
		  });
		}
	  
	  
	  };

	  const handleopenupdate = ()=>{
		if(CustomerSelect.businessid !== undefined && CustomerSelect.businessid !== ''){
			setshowModalCustomerUpdate(true);
		}
		else{

			toast.error('Please select a Customer to update',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
            return;
		}
		
		
			
	  };

	  const handleopencreatenewcustomer = ()=>{
		setshowcreatenewCustomer(true);
        
	  };


	  //////////////////////// Navigation /////////////////////////////////
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
											    {/* <span><a href="#createcustomer" onClick={()=> setshowcreatenewCustomer(true)}> <i className="fa fa-plus"></i> New</a> | </span> */}
												<span><a href="#createcustomer" onClick={handleopencreatenewcustomer}> <i className="fa fa-plus"></i> New</a> | </span>
												<span><a href="#customerdelete" onClick={DeleteCustomer}> <i className="fa fa-trash" ></i> Delete</a> | </span>
												{/* <span  ><a href="#customrupdate" onClick={() => setshowModalCustomerUpdate(true)} > <i className="fa fa-pencil"></i> Edit</a></span> */}
												<span  ><a href="#customrupdate" onClick={handleopenupdate} > <i className="fa fa-pencil"></i> Edit</a></span>

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
									<div className='productlist-checkbox-nolive'>
                                <span>Show only Inactive :</span> 
                                  <CheckBox onChange={(e) => handleCustomerNonLiveCheckBox(e)} />
                                  
                              </div>
									<E4kTblCustomerGrid
									rowidchange = { productRowidChange}
									handleSuccessRowClick = { handleSuccessGridRowClickEvent}
									/>
								</div>

							</div>

							{/* <!------ grid view ------> */}

							{/* <!------- Card view ------> */}
							<div id="cardview" className="" style={{ display: isCardView ? 'none' : 'block' }}>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="cmp-tb-hd">
										<h2>Customer list</h2>
									</div>
									{isCardView ? (
                                <div id="cardview" className="" style={{ display: 'block' }}>
                                    {/* Card view content */}
                                    {loading && <p>Loading...</p>}
                                    <E4kTblCustomerCard/>

    
                                </div>
                            ) : (
                                <div id="gridview" className="data-table-list" style={{ display: 'block' }}>
                                     <E4kTblCustomerCard/>

									
                                </div>
                            )} 
								</div>

							</div>


						</div>

						<div id="column2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>
                            {isWidgetView? (
								<div className="mainpopup-right">
								<div className="contact-list">
									{CustomerSelect.businessid ? (
										<div className="contact-img">
									
										<img src ={`${CustomerSelect.value ? CustomerSelect.value: "../../assets/Images/Customer/download.png"}`}/> 
								   </div>
									):(null)}
									<br>
									</br>
									<br>
									</br>
								

									<div className="contact-des">
										
										<h4>{CustomerSelect.name}</h4>
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
												<a>${totalTurnover}</a>

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


							): null}
							
						</div>

					</div>
				</div>
				                   {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
				{showConfirmSelectCustomerDelete && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSelectCustomerDelete(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to inactive this Customer?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSelectCustomerDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleSelectCustomerDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
			</div>


			
			{/* <!-- Data Table area End--> */}
           {showModalCustomerUpdate && (
			<E4kTblCustomerUpdate  
			showModalCustomerUpdate={showModalCustomerUpdate}  
			handleCloseCustomerUpdate={handleCloseModal}
			productRowChange = {handleProductNavigation} 
			productRowidSuccess = {productRowidChangeSuccess}
			totalTurnover ={totalTurnover}
			/>

		   )}
		

			

{/* 
           {showModalContactOpen &&(
			<E4kTblCustomerContactPage
			showModalContactOpen = {showModalContactOpen}
			handleCloseContact ={handleCloseContact}
			SelectedDescripton = {addressSelect.adresstype}
			/>


		   )}  */}
			
		{/* {showModalAddressPage && (
        <E4kTblCustomerAddressPage
          showModalAddressPage={showModalAddressPage}
          handleCloseAddressPage={handleCloseAddressPage}
          businessid={CustomerSelectCustomerGrid.businessid } 
          selectedAddressTypeId={addressSelect.addressTypeId} 
		  SelectedDescripton = {addressSelect.adresstype}
        />
      )} */}

	     <E4kTblCustomerCreate 
		 showcreatenewCustomer={showcreatenewCustomer}
		 handleClosecreatenewCustomer={handleClosecreatenewCustomer}
		 />
	  

		</>
	);
}