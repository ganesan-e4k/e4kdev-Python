"use client";

import { useState,useRef, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
//import '../../public/assets/style.css';
//import 'smart-webcomponents-react/source/modules/smart.input';
import { Input } from 'smart-webcomponents-react/input';
import { DateInput } from 'smart-webcomponents-react/dateinput';
import { TextArea } from 'smart-webcomponents-react/textarea';
import { useSelector, useDispatch } from 'react-redux';
import {useCreateSupplierAddressMutation} from '../../store/services/Supplier/e4kTblsupplieraddresstypelist';
import Draggable from 'react-draggable';
import{ useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import { useAddressTypesQuery } from '../../store/services/Customer/e4ktTblAddresstype';
import { DropDownList} from 'smart-webcomponents-react/dropdownlist';
import { toast } from 'react-toastify';


const E4kTblSupplierAddressCreate = ({ showModalSupplieraddressCreate, handleCloseSupplieraddressCreate,addresstype,addresstypeid,selectaddresstypeid,SelectedDescripton }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [dataGritCountry , setGritCountry] = useState([]);
  const [dataGritAddresstype, setAddresstype] = useState([]);
  const selectedSupplierCreateAddress = useSelector(state => state.supplierSelect.selectedSupplier);
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };
  const selectedSupplier = useSelector(state => state.supplierSelect.selectedSupplier);


  const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(false);
  const supplierContactSelect = useSelector((state) => state.selectedsupplierContact.suppliercontactSelect); 
  const handleToggle = () => {
    setIsColumn2Visible(isColumn2Visible);
  };  

  const handleclosestockTypecreate = () =>{  
    handleCloseSupplieraddressCreate()
  };


  const [createSupplierAddress] = useCreateSupplierAddressMutation();
 
  const [addresstypeiddescription , setaddresstypeiddescription] = useState('');
  const [NewAddresstypeid , setNewAddresstypeid] = useState(null);


  const desRef = useRef(null);
  const add1Ref = useRef(null);
  const add2Ref = useRef(null);
  const add3Ref = useRef(null);
  const countyRef = useRef(null);
  const cityRef = useRef(null);
  const postcodeRef = useRef(null);
  const addresstypesRef = useRef(null);
  const TblcountryRef = useRef(null);



  ///////////////////////////////////////// drop Down //////////////////////////////////////////////////
  const companyid = selectedSupplierCreateAddress.CompanyID;

  const { data: Countrydata, error: Countryerror, isLoading: CountryisLoading, isError: CountryisError } = useGetCountriesQuery(companyid|| '');
  const { data : AddresstypeData, error : AddresstypeError, isLoading: AddresstypeDataIsLoading, isError: AddresstypeErrorIsErrorMessage} = useAddressTypesQuery(companyid || '');



  useEffect(() => {
    if (Countrydata) {
      transformData();
    }
  }, [CountryisLoading, CountryisError,Countryerror, Countrydata]);

  useEffect(() => {
    if (AddresstypeData) {
      transformData();
    }
  }, [AddresstypeDataIsLoading, AddresstypeErrorIsErrorMessage,AddresstypeError, AddresstypeData]);


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
    setAddresstype(Addresstype);
    if (SelectedDescripton === undefined && selectaddresstypeid?.addresstypeid){
      const descriptuion = Addresstype.find(add => add.addresstypeid === Number(selectaddresstypeid.addresstypeid))?.description;
      setaddresstypeiddescription(descriptuion)
      setNewAddresstypeid(selectaddresstypeid.addresstypeid)
    }
    

    setAddresstype(Addresstype);



  }










  //////////////////// create page fubnction/////////////////////////
  const handleSubmitsuppliercreate = async (e) => {
    e.preventDefault();
  
    const address1 = add1Ref.current?.value || '';
    const address2 = add2Ref.current?.value || '';
    const address3 = add3Ref.current?.value || '';
    const county = countyRef.current?.value || ''; 
    const description = desRef.current?.value || '';
    const city = cityRef.current?.value || '';
    const postcode = postcodeRef.current?.value || '';
    const addresstypeid = addresstypesRef.current?.value || '';
  
  
    const selectedCountry = TblcountryRef.current?.selectedValues[0];
    const countrycode = dataGritCountry.find(
      (country) => country.country === selectedCountry
    )?.countryid;
    console.log("selectd country datA" , countrycode);
    // Validation for mandatory fields
    if (!address1 || !description || !postcode ) {
      toast.error('Address1, Description, and Postcode are mandatory fields.', { position: 'top-center' });
      return;
    }
    const addresstypeid_id = dataGritAddresstype.find(
      (address1) => address1.description === SelectedDescripton
    )?.addresstypeid;
  
    const addressData = {
      address1,
      address2,
      address3,
      addresstypeid: parseInt((NewAddresstypeid !== null) ? NewAddresstypeid : addresstypeid_id )|| parseInt(supplierContactSelect.addresstypeid) ,
      businessid: String(selectedSupplierCreateAddress.BusinessID),
      countrycode: countrycode,
      companyid:String(selectedSupplierCreateAddress.CompanyID),
      county,
      description,
      postcode,
      city,
    };
  
    try {
     const Result = await createSupplierAddress(addressData).unwrap();
     console.log("hgfejhfge" , Result);
     if(Result.E4kTblsupplieraddresscreate.success === true){
        toast.success('Address created successfully!', {   position: "top-center",
        autoClose: 500,
        hideProgressBar: true, });
        handleCloseSupplieraddressCreate();
     }
     else{
        toast.error('Failed to create address: ' + Result.E4kTblsupplieraddresscreate.error, {   position: "top-center",
        autoClose: 500,
        hideProgressBar: true, });
     }                              
      
    } catch (error) {
      toast.error('Failed to create address: ' + error.message, { position: 'top-center' });
    }
  };

  return (
    <>
    <Draggable handle=".e4kmodal-header">
    <div className={`modal fade ${showModalSupplieraddressCreate ? 'in' : ''}`} style={{ display: showModalSupplieraddressCreate ? 'block' : 'none' }}>
      <div className={modalDialogclassName}>
        <div className="modal-content">
                  <div className="large-popup-topdiv e4kmodal-header">
                  {/* <!------ popup for customer -------> */}
                    <div className="breadcomb-area">
                      <div className="container-fluid remove-padding">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className='popup-topbar-title'>
                                     {SelectedDescripton ? SelectedDescripton : addresstypeiddescription}
                            </div>
                            <div className="breadcomb-list">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                </div>
                             
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      <span><a href="#" onClick={handleSubmitsuppliercreate} id="sa-success"> <i className="fa fa-check"></i> Save</a> | </span>
                                      <span><a href="#" id="sa-warning"> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      <span><a href=""><i className="fa fa-pencil"></i> Edit</a> | </span>
                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                                <div className='popup-top-rightdiv'>
                                      <button type="button" className="btn-link" onClick={handleToggle}>
                                      {isMaximized ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                      </button>
                                      <button type="button" className="close" 
                                      onClick={() => handleclosestockTypecreate()}
                                      >
                                      &times;
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

                  {/* <!-- customer name area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                          <div className="customer-newbold">
                            {/* Customer Name
                             */}
                             {selectedSupplier.BusinessID}-{selectedSupplier.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="row">
                    <div id="columnpopup1" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#general" aria-expanded="true" aria-controls="general"><i className="plus-icon" aria-hidden="true"></i> Supplier Address Create  </a> 
                          </h4>
                            <div id="general" className="collapse in" aria-expanded="true" >
                                <div className="panel-box-div">
                                  <div className="row">

                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className='input-lable'>
                                            <span>Description</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input placeholder="Description "
                                          id='descriptionsupplier'
                                          ref={desRef}
                                          value=''
                                          ></Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address 1</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address1"
                                          id='supplieraddress1'
                                          ref={add1Ref}
                                          value=''
                                          >
                                          </Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address 2</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address2"
                                          id='supplieraddress2'
                                          ref={add2Ref}
                                          value=''
                                          >
                                          </Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address 3</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address3"
                                          id='supplieraddress3'
                                          ref={add3Ref}
                                          value=''
                                          >
                                          </Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Town/City</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Town/city"
                                          id='suppliercity'
                                          ref={cityRef}
                                          value=''
                                          >
                                          </Input>
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
                                          id='supplieraddresscounty'
                                          ref={countyRef}
                                          value=''
                                          >
                                          </Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Post Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Postcode"
                                          id='supplier-postcode'
                                          ref={postcodeRef}
                                          value=''
                                          >
                                          </Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>country</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          {/* <Input placeholder="country"
                                          id='supplieraddressCountry'
                                          ref={TblcountryRef}
                                          value=''
                                          >
                                          </Input> */}
                                          <DropDownList 
                                    id="AddresssSupplierCountry"
                                    selectedIndexes={[0]} 
                                    ref={TblcountryRef}
                                    filterable 
                                    placeholder="Select Country"
                                    dataSource={dataGritCountry.map(Country => Country.country)}
                                    value={selectedSupplierCreateAddress.BusinessID ? selectedSupplierCreateAddress.Country: ''} 

                                    >
                                  </DropDownList>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address Type</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          {/* <Input placeholder="addresstype"
                                          id='supplieraddresstypes'
                                          ref={addresstypesRef}
                                          value=''
                                          >
                                          </Input> */}
                                          <DropDownList
                                            id="AddresssSupplierType"
                                            ref={addresstypesRef}
                                            filterable 
                                            placeholder="Select Addresstype"
                                            dataSource={dataGritAddresstype.map(Address => Address.description)}
                                            value={SelectedDescripton ? SelectedDescripton : addresstypeiddescription || supplierContactSelect.addresstype || ''}
                                           
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
      </Draggable>   
    </>
  );
};

export default E4kTblSupplierAddressCreate;