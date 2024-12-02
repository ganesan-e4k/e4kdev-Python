"use client";
import { useState,useRef, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { DropDownList} from 'smart-webcomponents-react/dropdownlist';
import{ useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import { useAddressTypesQuery } from '../../store/services/Customer/e4ktTblAddresstype';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {useGetCustomerAddressDataQuery,
    useGetCustomerContactQuery,
    useUpdateCustomerAddressMutation} from '../../store/services/Customer/e4kTblcustomerAddresstypeApi';
import { Grid } from 'smart-webcomponents-react/grid';
import { Input } from 'smart-webcomponents-react/input';

import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';



const E4kTblCustomerAddressEditPage = ({ AddressEditshowModal, handleCloseAddressEdit,selectedAddressTypeid ,SelectedDescripton}) => {
  
  const CustomerSelectAddressEditPage = useSelector((state) => state.selectCustomer.selectCustomer);
  const CompanySelectCustomerAddressEditPage = useSelector((state) => state.selectCompanyid.Companyid);

  const [companyid, setCompanyid] = useState(CompanySelectCustomerAddressEditPage);



  const [isMaximized, setIsMaximized] = useState(false);
  const [showModalAddressCreate , setshowModalAddressCreate]= useState(false);
  const [AddressEditdata, setAddressEditdata] = useState([]);
  const selectContactsaddressEdit = useSelector((state) => state.selectCustomerContact.selectContact);
  const [AddressContactData ,setAddressContactData] = useState([]);
  const AddressEdit = useSelector(state => state.selectCustomerAddressData.selectedAddressData);
  const addressid = String(AddressEdit.addressid || '');
  const businessid = CustomerSelectAddressEditPage.businessid;
 
  const { data: addressData, error, isLoading } = useGetCustomerAddressDataQuery({
    addressid: addressid || '',
    businessid:businessid,
    companyid: companyid,
    addresstypeid: String(selectedAddressTypeid),
  });
  const [selectedAddressRowData, setSelectedAddressRowData] = useState({})
 

  const skipconatac = !addressid
  const [dataGritCountry , setGritCountry] = useState([]);
  const [dataGritAddresstype, setAddresstype] = useState([]);

  const TblCountry = useRef(null);
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const address3Ref = useRef(null);
  const cityRef = useRef(null);
  const descriptionRef = useRef(null);
  const postcodeRef = useRef(null);
  const countyRef = useRef(null);
  const addresstypeRef = useRef(null);


  const { data: contactData, error: contactError, isLoading: contactIsLoading, refetch: customerEditRefetch } = useGetCustomerContactQuery({
    addressid:parseInt(addressid, 10),
    companyid : companyid 
  },
    
    {
        skip: skipconatac
    });

  const [updateCustomerAddress] = useUpdateCustomerAddressMutation();
  const { data: Countrydata, error: Countryerror, isLoading: CountryisLoading, isError: CountryisError } = useGetCountriesQuery(companyid);
  const { data : AddresstypeData, error : AddresstypeError, isLoading: AddresstypeDataIsLoading, isError: AddresstypeErrorIsErrorMessage} = useAddressTypesQuery(companyid);

  


  useEffect(() => {
    if (addressData) {
      transformDataAddress(addressData);
      
    }
  }, [addressData]);
  
  
  // Use useEffect to handle the transformed contact data when contactData changes
  useEffect(() => {
    if (contactData) {
      const transformedData = transformDataContact(contactData);
      
      setAddressContactData(transformedData);
    }
  }, [contactData]);
  

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

  const transformDataContact = (contactData) => {
    if (!contactData) return [];

    return contactData.E4kTblcustomercontact.map(contact => ({
      id: contact.id,
      value: contact.value,
      contacttype: contact.contacttype.name,
      contacttypeid: contact.contacttype.contacttypeid,
    }));
  };


  const transformDataAddress = (addressData) => {
    if (addressData && addressData.E4kTblcustomeraddress) {
      const dataGrid = addressData.E4kTblcustomeraddress.map(address => ({
        businessid: address.businessid.businessid,
        address1: address.address1,
        address2: address.address2,
        address3: address.address3,
        addressid: address.addressid,
        county: address.county,
        description: address.description,
        postcode: address.postcode,
        city: address.city,
        countrycode: address.countrycode.country,
        companyid: address.companyid.companyid,
        addresstypeid: address.addresstypeid.description,
      }));

    
      if (dataGrid.length > 0) {
        setSelectedAddressRowData(dataGrid[0]);
      }
    } else {
    }
  };


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


  }
  const handleUpdateAddress = async () => {
  
    const selectedCountry = TblCountry.current?.selectedValues[0];
   
    const countrycode = dataGritCountry.find(
      (country) => country.country === selectedCountry
    )?.countryid;
  
    
    // Get the selected address type from the address type reference
    const selectedAddressType = addresstypeRef.current?.selectedValues[0];
  
    const addresstypeid = dataGritAddresstype.find(
      (item) => item.description === selectedAddressType
    )?.addresstypeid;
  
   
    // Prepare the addressData object for the update
    const addressData = {
      address1: address1Ref.current?.value,
      address2: address2Ref.current?.value,
      address3: address3Ref.current?.value,
      addressid: parseInt(AddressEdit.addressid, 10),
      businessid: AddressEdit.businessid,
      companyid: companyid,
      description: descriptionRef.current?.value,
      postcode: postcodeRef.current?.value,
      city: cityRef.current?.value,
      county: countyRef.current?.value,
      countrycode:countrycode,
      addresstypeid: parseInt(addresstypeid, 10),  // Convert to integer
    };
  
    try {
      const response = await updateCustomerAddress(addressData).unwrap();
      toast.success('Customer Address updated successfully', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
      customerEditRefetch();
      if (response?.customerAddress) {
        setSelectedAddressRowData({
          address1: response.customerAddress.address1,
          address2: response.customerAddress.address2,
          address3: response.customerAddress.address3,
          addressid: response.customerAddress.addressid,
          businessid: response.customerAddress.businessid,
          companyid: response.customerAddress.companyid.companyid,
          description: response.customerAddress.description,
          postcode: response.customerAddress.postcode,
          city: response.customerAddress.city,
          county: response.customerAddress.county,
          countrycode: response.customerAddress.countrycode.country,
          addresstypeid: response.customerAddress.addresstypeid.description,
        });
      }
      console.log("response update data sourec ",response)
    } catch (error) {
      toast.error('Customer Address update failed', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }
  };
  

  const header = {
    visible: true,
    buttons: ['filter', 'sort', 'search']
  };

  const columns1 = [
    {
      label: 'Contact Type',
      dataField: 'contacttype',
    
    },
    { label: 'Value', dataField: 'value' },
    { label: 'ID', dataField: 'id', visible: false },
    { label: 'Contact Type Id', dataField: 'contacttypeid', visible: false },
    { label: 'Address ID', dataField: 'addressid', visible: false }, 
  ];
  
  
  
  const behavior1 = {
    rowResizeMode: 'growAndShrink',
    columnResizeMode: 'growAndShrink'
  };
  
  const sorting1 = {
    enabled: true,
  };
  
  const filtering1 = {
    enabled: true,
  };
 
  const selection1 = {
    enabled: true,
    mode: 'extended',
    allowCellSelection: true,
  };
  const paging = {
    enabled: true,
    pageSize: 30
  };

  const pager = {
    visible: true
  };
  
  // You may need to include this if not done already
  
  const appearance1= {
    showRowHeaderNumber: false,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true
  };


  const editing1 = {
    enabled: true,
    mode:'row',
    addNewRow: {
      visible: true,
      position: "near",
    },
    commandColumn: {
      visible: true,
      // displayMode: 'icon',
      dataSource: {
        'commandColumnDelete': { visible: false },
        'commandColumnEdit': { visible: true },
        // 'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand2', visible: true, label: 'Delete' }, // Adjusted to Category2
      },
    },
  };
  

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const modalDialogclassName = isMaximized ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggle = () => {
    setIsColumn2Visible(!isColumn2Visible);
  };  

  const handleCloseAddressCreate = () => {
    setshowModalAddressCreate(false);
  
  };

  const handleaddNewAddress = () => {
    setshowModalAddressCreate(true);
  };
  


  
  const [isMinimizedCustomerCategory1, setisMinimizedCustomerCategory1]= useState(false);
  const CustomerAddressEditPage = ({ isMinimizedCustomerAddressCreatepage, children }) => (
    isMinimizedCustomerAddressCreatepage ? children : <Draggable handle=".e4kmodal-headercustomereditpage">{children}</Draggable>

  );   

  const handleMinimizecustomerAddresssEditPage = ()=>{
    setisMinimizedCustomerCategory1(!isMinimizedCustomerCategory1);
  };


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
  const widthPercentage = 80; // 50% of screen width
  const heightPercentage = 80; // 30% of screen height

  const resizableWidth = (screenSize.width * widthPercentage) / 100;
  const resizableHeight = (screenSize.height * heightPercentage) / 100;




  return (
    <>
    {/* <Draggable handle=".e4kmodal-header"> */}
      <CustomerAddressEditPage isMinimizedCustomerAddressCreatepage ={isMinimizedCustomerCategory1} >
    {/* <div className={`modal fade ${AddressEditshowModal ? 'in' : ''}`} style={{ display: AddressEditshowModal ? 'block' : 'none' }}> */}
    <div className={`modal fade mymodal ${(isMinimizedCustomerCategory1 === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: AddressEditshowModal ? 'block' : 'none' }}>

    <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogclassName}>

      {/* <div className={modalDialogclassName}> */}
        <div className="modal-content-min medium-popup-div">
                  <div className="large-popup-topdiv e4kmodal-headers e4kmodal-headercustomereditpage">
                  {/* <!------ popup for customer -------> */}
                    <div className="breadcomb-area">
                      <div className="container-fluid remove-padding">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcomb-list">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className='popup-topbar-title'>
                                {SelectedDescripton || selectContactsaddressEdit.adresstype}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      {/* <span><a href="#" > <i className="fa fa-plus"></i> New</a> | </span> */}
  
                                      <span><a href="#" id="sa-success" onClick={handleUpdateAddress} > <i className="fa fa-check"></i> Save</a> | </span>
                                     
                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className='popup-top-rightdiv'>
                                  <button className="close modalMinimize" onClick={handleMinimizecustomerAddresssEditPage}>
                                                                        <i className={`fa ${isMinimizedCustomerCategory1 ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                                    <button type="button" className="btn-link" onClick={toggleMaximize}>
                                        {isMaximized ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                    </button>
                                    <button type="button" className="close" onClick={handleCloseAddressEdit}>
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
                          {CustomerSelectAddressEditPage.businessid}-{CustomerSelectAddressEditPage.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                                  
                  <div className="container-fluid">
                    <div className="row">
                    <div id="addeditpage" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#addressedit" aria-expanded="true" aria-controls="addressedit"><i className="plus-icon" aria-hidden="true"></i> Address Edit  </a> 
                          </h4>
                            <div id="addressedit" className="collapse in" aria-expanded="true" >
                                <div className="panel-box-div">
                                  <div className="row">

                                  

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Description</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input
                                          id='Description Address' 
                                          placeholder="Description"
                                          ref={descriptionRef}
                                          value={selectedAddressRowData?.description || ''}
                                          onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, description: e.target.value})}></Input>
                                          </div>
                                      </div> 

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address1</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address1"
                                           ref={address1Ref}
                                           value={selectedAddressRowData?.address1 || ''}
                                           onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, address1: e.target.value})}></Input>
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
                                          value={selectedAddressRowData?.address2 || ''}
                                          onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, address2: e.target.value})}></Input>
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
                                          value={selectedAddressRowData?.address3 || ''}
                                          onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, address3: e.target.value})}></Input>
                                          </div>
                                      </div>

                                     
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>City</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="City"
                                          ref={cityRef}
                                          value={selectedAddressRowData?.city || ''}
                                          onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, city: e.target.value})}></Input>
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
                                          value={selectedAddressRowData?.county || ''}
                                          onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, county: e.target.value})}></Input>
                                          </div>
                                      </div>

                                      

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>PostCode</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="PostCode"
                                          ref={postcodeRef}
                                          value={selectedAddressRowData?.postcode || ''}
                                          onChange={(e) => setSelectedAddressRowData({...selectedAddressRowData, postcode: e.target.value})}></Input>
                                          </div>
                                      </div> 
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Country</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                        
                                           <DropDownList 
                                    id="Addresss Country"
                                    selectedIndexes={[0]} 
                                    ref = {TblCountry}
                                    filterable 
                                    placeholder="Select Country"
                                    
                                    dataSource={dataGritCountry.map(Country => Country.country)}
                                    value={selectedAddressRowData?.countrycode || ''}
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
                                          
                                           <DropDownList 
                                            id="Addresss Type"
                                            selectedIndexes={[0]} 
                                            ref={addresstypeRef}
                                            filterable 
                                            placeholder="Select Addresstype"
                                            dataSource={dataGritAddresstype.map(Address => Address.description)}
                                            value={selectedAddressRowData?.addresstypeid || ''}
                                            disabled={true}  
                                        ></DropDownList>

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
                                <h4>{CustomerSelectAddressEditPage.name}</h4>
                                <p className="contact-des-line"></p>
                            </div>
                                    <Grid
                                      id="Contact Address Data"
                                      header={header}
                                      dataSource={AddressContactData}
                                      selection={selection1}
                                      behavior={behavior1}
                                      appearance={appearance1}
                                      sorting={sorting1}
                                      filtering={filtering1}
                                      // editing={editing1}
                                      columns={columns1}
                                      paging={paging}
                                      pager={pager}
                               
                                    />

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
         {/* <CustomerAddressCreatePage
         showModalAddressCreate= {showModalAddressCreate}
         handleCloseAddressCreate= {handleCloseAddressCreate}
         /> */}
     </CustomerAddressEditPage>
    </>
    
  );
};

export default E4kTblCustomerAddressEditPage;