"use client";

import { useState,useRef, useEffect  } from 'react';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';

import { DropDownList} from 'smart-webcomponents-react/dropdownlist';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'smart-webcomponents-react/input';
import{ useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import { useAddressTypesQuery } from '../../store/services/Customer/e4ktTblAddresstype';
import Draggable from 'react-draggable';
import {useCreateCustomerAddressMutation} from '../../store/services/Customer/e4kTblcustomerAddresstypeApi'
import E4kCountryGrid from '../../master/customerCountry/E4kCountryGrid';
import { ResizableBox } from 'react-resizable';




const E4kTblCustomerAddressCreatePage = ({ showModalAddressCreate, handleCloseMediumAddress,SelectedDescripton ,selectaddresstypeid}) => {

  const CustomerSelectAddressCreatePage = useSelector((state) => state.selectCustomer.selectCustomer);
  const CompanySelectCustomerAddressCreatePage = useSelector((state) => state.selectCompanyid.Companyid);

  const [companyid, setCompanyid] = useState(CompanySelectCustomerAddressCreatePage);

  const [showModalMediumCountry, setShowModalMediumCountry] = useState(false);

  const [isMaximizedAddressCreate, setisMaximizedAddressCreate] = useState(false);
  const [dataGritCountry , setGritCountry] = useState([]);
  const [dataGritAddresstype, setAddresstype] = useState([]);

  const [addresstypeiddescription , setaddresstypeiddescription] = useState('');
  const [NewAddresstypeid , setNewAddresstypeid] = useState(null);

  
 
  const { data: Countrydata, error: Countryerror, isLoading: CountryisLoading, isError: CountryisError } = useGetCountriesQuery(companyid);
  const { data : AddresstypeData, error : AddresstypeError, isLoading: AddresstypeDataIsLoading, isError: AddresstypeErrorIsErrorMessage} = useAddressTypesQuery(companyid);



  useEffect(() => {
    if (Countrydata) {
      transformData();
    }
  }, [CountryisLoading, CountryisError,Countryerror, Countrydata]);

  useEffect(() => {
    
    if (AddresstypeData) {
      transformData();
    }
  }, [AddresstypeDataIsLoading, AddresstypeErrorIsErrorMessage,AddresstypeError, AddresstypeData,selectaddresstypeid]);




  const transformData = () => {
    if(!Countrydata) return [];
    const Country = Countrydata.E4kCountry.map(Country => ({
      countryid: parseInt(Country.countryid, 10),
      companyid: Country.companyid.companyid,
      country: Country.country,
      groupid : Country.groupid,
      groupName: Country.member ? Country.member.groupName : null,
    }));
    setGritCountry(Country);


    if(!AddresstypeData) return [];
    const Addresstype = AddresstypeData.E4kTblbusaddresstypes.map(Addresstype => ({
      addresstypeid: parseInt(Addresstype.addresstypeid, 10),
      // companyid: Addresstype.companyid.companyid,
      description: Addresstype.description,
    }));

    // if (selectedAddressDataCreate){
    
    //   const descriptuion = Addresstype.find(add => add.addresstypeid === Number(selectedAddressDataCreate.addresstypeid))?.description;
    //   setaddresstypeiddescription(descriptuion)
    //   console.log('id check ----------------descriptuion--------777777777777777777777',descriptuion)
    //   setNewAddresstypeid(selectedAddressDataCreate.addresstypeid)
    // }

    if (SelectedDescripton === undefined && selectaddresstypeid?.addresstypeid){
      const descriptuion = Addresstype.find(add => add.addresstypeid === Number(selectaddresstypeid.addresstypeid))?.description;
      setaddresstypeiddescription(descriptuion)
      setNewAddresstypeid(selectaddresstypeid.addresstypeid)
    }
    

    setAddresstype(Addresstype);


  }

const [createCustomerAddress, { isLoading, isSuccess, isError, error }] = useCreateCustomerAddressMutation();

const address1Ref = useRef(null);
const address2Ref = useRef(null);
const address3Ref = useRef(null);
const descriptionRef = useRef(null);
const cityRef = useRef(null);
const postcodeRef = useRef(null);
const RefCountrycode = useRef(null);
const countyRef = useRef(null);
const addresstypeidRef = useRef(null);

const handleSubmit = async (e) => {


  const address1 = address1Ref.current?.value || '';
  const address2 = address2Ref.current?.value || '';
  const address3 = address3Ref.current?.value || '';
  const county = countyRef.current?.value || ''; 
  const description = descriptionRef.current?.value || '';
  const city = cityRef.current?.value || '';
  const postcode = postcodeRef.current?.value || '';
  //const addresstypeid = addresstypeidRef.current?.value || '';
  

  const selectedCountry = RefCountrycode.current?.selectedValues[0];
  const countrycode = dataGritCountry.find(
    (country) => country.country === selectedCountry
  )?.countryid;
  
  // Validation for mandatory fields
  if (!address1 || !description || !postcode  ) {
    toast.error('Address1, Description, and Postcode,country are mandatory fields.', { position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
     });
    return;
  }
  const addresstypeid_id = dataGritAddresstype.find(
    (address1) => address1.description === SelectedDescripton
  )?.addresstypeid;

  const addressData = {
    address1,
    address2,
    address3,
    addresstypeid: parseInt((NewAddresstypeid !== null) ? NewAddresstypeid : addresstypeid_id),
    businessid: CustomerSelectAddressCreatePage.businessid ,
    countrycode: countrycode,
    companyid,
    county,
    description,
    postcode,
    city,
  };

  // try {
  //   await createCustomerAddress(addressData).unwrap();
  //   toast.success('Address created successfully!', { position: 'top-center' });
  //   // ShowModalAddressCreate(false);
  //   handleCloseMediumAddress()
  // } catch (error) {
  //   toast.error('Failed to create address: ' + error.message, { position: 'top-center' });
  // }
  try {
    const result = await createCustomerAddress(addressData).unwrap();
    if (result.E4kTblustomeraddresscreate.success === true) {
      toast.success('Address created successfully!', {   position: "top-center",
        autoClose: 5000,
        hideProgressBar: true, });
      handleCloseMediumAddress()
    }
    else {
      toast.error('Failed to create address: ' + result.E4kTblustomeraddresscreate.error, { position: 'top-center' ,
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
   
  } catch (error) {
    toast.error('Failed to create address: ' + error.message, { position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
     });
  }
};


  const toggleMaximizeAddressCreate = () => {
    setisMaximizedAddressCreate(!isMaximizedAddressCreate);
  };

  const modalDialogclassName = isMaximizedAddressCreate ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(false);

  
  const handleOpenModalMediumCountry = () => {
    setShowModalMediumCountry(true);
  };

  const handleCloseModalMedium7 = () => {
    setShowModalMediumCountry(false);
  };
 

  const [isMinimizedCustomerCategory1, setisMinimizedCustomerCategory1]= useState(false);
 
  
  const handleMinimizecustomerAddresssCreatepage = ()=>{
    setisMinimizedCustomerCategory1(!isMinimizedCustomerCategory1);
  };
  
  const CustomerAddressCreateDragable = ({ isMinimizedCustomerAddresscreatePage, children }) => (
    isMinimizedCustomerAddresscreatePage ? children : <Draggable handle=".e4kmodal-headercustomerAddressCreate">{children}</Draggable>

  );   


  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Update screen size on window resize
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // Set width and height as percentages of the screen size
  const widthPercentage = 60; // 50% of screen width
  const heightPercentage = 50; // 30% of screen height

  const resizableWidth = (screenSize.width * widthPercentage) / 100;
  const resizableHeight = (screenSize.height * heightPercentage) / 100;

      


  return (
    <>
  
      <CustomerAddressCreateDragable isMinimizedCustomerAddresscreatePage={isMinimizedCustomerCategory1}>
    {/* <div className={`modal fade ${showModalAddressCreate ? 'in' : ''}`} style={{ display: showModalAddressCreate ? 'block' : 'none' }}> */}
    <div className={`modal fade mymodal ${(isMinimizedCustomerCategory1 === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalAddressCreate ? 'block' : 'none' }}>
    <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogclassName}>
      {/* <div className={modalDialogclassName}> */}
        <div className="modal-content">
                  <div className="large-popup-topdiv e4kmodal-headers e4kmodal-headercustomerAddressCreate">
                  {/* <!------ popup for customer -------> */}
                    <div className="breadcomb-area">
                      <div className="container-fluid remove-padding">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcomb-list">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className='popup-topbar-title'>
                                <div className='popup-topbar-title'>
                                     {SelectedDescripton ? SelectedDescripton : addresstypeiddescription}
                                  </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      <span><a href="#" id="sa-success" onClick={handleSubmit}> <i className="fa fa-check"></i> Save</a> | </span>
                                      <span><a href="#" id="sa-warning"> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      {/* <span><a href=""><i className="fa fa-pencil"></i> Edit</a> | </span> */}
                                      <span><a href="#"><FontAwesomeIcon icon={!isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className='popup-top-rightdiv'>
                                  <button className="close modalMinimize" onClick={handleMinimizecustomerAddresssCreatepage}>
                                                                        <i className={`fa ${isMinimizedCustomerCategory1 ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                                    <button type="button" className="btn-link" onClick={toggleMaximizeAddressCreate}>
                                         {isMaximizedAddressCreate ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                    </button>
                                    <button type="button" className="close" onClick={handleCloseMediumAddress}>
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
                  {/* <!-- Breadcomb area End-->		 */}


                </div>
                <div className="modal-body">

                  {/* <!-- customer name area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                          <div className="customer-newbold">
                          {CustomerSelectAddressCreatePage.businessid}-{CustomerSelectAddressCreatePage.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  <div className="container-fluid">
                    <div className="row">
                    <div id="addcreate" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#addresscreate" aria-expanded="true" aria-controls="addresscreate"><i className="plus-icon" aria-hidden="true"></i> Address Create  </a> 
                          </h4>
                          <div id="addresscreate" className="collapse in" aria-expanded="true" >
                                <div className="panel-box-div">
                                  <div className="row">

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                          <span>Description<span>*</span></span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input
                                          id='Description Address' 
                                          ref ={descriptionRef}
                                          placeholder="Description"
                                          value=''
                                          
                                          ></Input>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address1<span>*</span></span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address1"
                                           ref={address1Ref}
                                           value=''
                                         
                                           ></Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address2</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address2"
                                          ref={address2Ref}
                                          value=''
                                         
                                          ></Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address3</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Addres3"
                                          ref={address3Ref}
                                          value=''
                                         
                                          ></Input>
                                          </div>
                                      </div>

                                  

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>City/Town</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="City"
                                          ref={cityRef}
                                          value=''
                                          
                                          ></Input>
                                          </div>
                                      </div> 
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>County</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="County"
                                          ref={countyRef}
                                          value=''
                                         
                                          ></Input>
                                          </div>
                                      </div>


                                      

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>PostCode<span>*</span></span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="PostCode"
                                            id = "postCode"
                                            ref={postcodeRef}
                                            value=''
                                            // value={selectedAddressRowData?.postcode || ''}
                                            // onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, postcode: e.target.value})}
                                            ></Input>
                                          </div>
                                      </div> 
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Country<span>*</span></span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                      <div className="form-group master-option">
                                          
                                           <DropDownList 
                                                id="Addresss Country"
                                                selectedIndexes={[0]} 
                                                ref={RefCountrycode}

                                                filterable 
                                                placeholder="Select Country"
                                                dataSource={dataGritCountry.map(Country => Country.country)}
                                                value={CustomerSelectAddressCreatePage.businessid ? CustomerSelectAddressCreatePage.country: ''} 
                                                >
                                  </DropDownList>
                                  <span   onClick={handleOpenModalMediumCountry}  class="master-option-span">...</span>

                                    </div>
                                   </div>

      

                                     
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address Type</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <DropDownList
                                                id="Addresss Type"
                                                ref={addresstypeidRef}
                                                filterable 
                                                //placeholder="Select Addresstype"
                                                dataSource={dataGritAddresstype.map(address => address.description)}
                                                value={SelectedDescripton ? SelectedDescripton : addresstypeiddescription}
                                                disabled={true}
                                            />
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
                            <div className="contact-des">
                                <h4>{CustomerSelectAddressCreatePage.name}</h4>
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
              </ResizableBox>
            </div>



         
          {/* </div> */}
          </CustomerAddressCreateDragable>
          

        
      <E4kCountryGrid showModalMediumCountry={showModalMediumCountry} handleCloseMediumCountry={handleCloseModalMedium7} />

    </>
  );
};

export default E4kTblCustomerAddressCreatePage;