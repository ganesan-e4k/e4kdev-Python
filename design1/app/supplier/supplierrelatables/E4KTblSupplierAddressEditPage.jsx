"use client";

import { useState,useRef, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { DropDownList} from 'smart-webcomponents-react/dropdownlist';
import { toast } from 'react-toastify';
import { Input } from 'smart-webcomponents-react/input';
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import {useGetSupplierAddressQuery,useGetSupplierContactQuery,useUpdateSupplierAddressMutation} from '../../store/services/Supplier/e4kTblsupplieraddresstypelist';
import{ useGetCountriesQuery} from '../../store/services/Customer/e4kTblCountry';
import { useAddressTypesQuery } from '../../store/services/Customer/e4ktTblAddresstype';



const E4KTblSupplierAddressEditPage = ({ showModalSupplieraddressEdit, handleCloseSupplieraddressEdit1, companyid,businessid,addressid,addresstypeid }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [suppliercontact,setsuppliercontact] = useState([]);
  const dispatch = useDispatch()
  const [selectedSupplierAddressRowData, setSelectedSupplierAddressRowData] = useState({})
  const selectedSupplier = useSelector(state => state.supplierSelect.selectedSupplier);
  const { data: supplierEditData} = useGetSupplierAddressQuery({
    companyid : String(companyid),
    businessid : String(businessid),
    addressid : String(addressid || '' ),
    addresstypeid : String(addresstypeid || ''),
  });
  const { data: Countrydata, error: Countryerror, isLoading: CountryisLoading, isError: CountryisError } = useGetCountriesQuery(companyid);
  const { data : AddresstypeData, error : AddresstypeError, isLoading: AddresstypeDataIsLoading, isError: AddresstypeErrorIsErrorMessage} = useAddressTypesQuery(companyid);
  const [dataGritCountry , setGritCountry] = useState([]);
  const [dataGritAddresstype, setAddresstype] = useState([]);


  const { data: suplierContactDatalist} = useGetSupplierContactQuery({
    companyid: String(companyid || ''),
    businessid: String(businessid || ''),
    addressid: String(addressid || ''),
    
  })



  const [updateSupplierAddress] = useUpdateSupplierAddressMutation();


  ////////////////////////// ref ////////////

  const desRef = useRef(null);
  const add1Ref = useRef(null);
  const add2Ref = useRef(null);
  const add3Ref = useRef(null);
  const postcodeRef =  useRef(null);
  const cityRef = useRef(null);
  const countyRef = useRef(null);
  const TblCountry = useRef(null);
  const addresstypeRef = useRef(null);




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

  










  useEffect(()=>{
    if(supplierEditData && supplierEditData.E4kTblsupplieraddress){
      const addressEdit = supplierEditData.E4kTblsupplieraddress.map(ad=>({
          address1: ad.address1,
          address2 : ad.address2,
          address3 : ad.address3,
          addressid : ad.addressid,
          city : ad.city,
          county : ad.county,
          description : ad.description,
          postcode : ad.postcode,
          addresstypeid: ad.addresstypeid.description,
          countrycode : ad.countrycode.country
      }))
   
      
      if (addressEdit.length > 0) {
        setSelectedSupplierAddressRowData(addressEdit[0]);
      }
    } else {
    }
  },[supplierEditData]);




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


  useEffect(()=>{
    if(suplierContactDatalist&& suplierContactDatalist.E4kSuppliercontact){
      const contactGrid =suplierContactDatalist.E4kSuppliercontact.map((contact)=>{
        return{
          id : contact.id,
          value : contact.value,
          contacttypeid : contact.contacttype.contacttypeId,
          contacttype : contact.contacttype.name
        }
      })
      setsuppliercontact(contactGrid);
    }
  }, [suplierContactDatalist])

  
 

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggleSupplierAddressEdit = () => {
    setIsColumn2Visible(!isColumn2Visible);
  };  

  const handlecloseSpplierAddressEdit = () => {
    handleCloseSupplieraddressEdit1();
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
  const selection1 = {
    enabled: true,
    mode: 'extended',
    allowCellSelection: true,
  };
  
  // You may need to include this if not done already
  
  const appearance1= {
    showRowHeaderNumber: false,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true
  };
  

  /////////////////////////// update function ////////////////
  const handleUpdateAddresssupplier = async () => {
  
    const selectedCountry = TblCountry.current?.selectedValues[0];

    const countrycode = dataGritCountry.find(
      (country) => country.country === selectedCountry
    )?.countryid;
  

    const selectedAddressType = addresstypeRef.current?.selectedValues[0];
  
    const addresstypeid = dataGritAddresstype.find(
      (item) => item.description === selectedAddressType
    )?.addresstypeid;
  

  
    const addressData = {
      address1: add1Ref.current?.value,
      address2: add2Ref.current?.value,
      address3: add3Ref.current?.value,
      addressid: addressid,
      businessid: businessid,
      companyid: companyid,
      description: desRef.current?.value,
      postcode: postcodeRef.current?.value,
      city: cityRef.current?.value,
      county: countyRef.current?.value,
      countrycode:countrycode,
      addresstypeid: parseInt(addresstypeid, 10),  
    };
  
    try {
      const response = await updateSupplierAddress(addressData).unwrap();
      if(response.E4kTblsupplieraddressupdate.success === true){
        toast.success('Customer Address updated successfully', { position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000,
    
         });
      }
     
      console.log("response update data sourec ",response)
    } catch (error) {
      toast.error('Customer Address update failed', { position: 'top-center' ,
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };
  

  return (
    <>
    <Draggable handle=".e4kmodal-header">
    <div className={`modal fade ${showModalSupplieraddressEdit ? 'in' : ''}`} style={{ display: showModalSupplieraddressEdit ? 'block' : 'none' }}>
      <div className={modalDialogclassName}>
        <div className="modal-content">
                  <div className="large-popup-topdiv e4kmodal-header">
                  {/* <!------ popup for customer -------> */}
                    <div className="breadcomb-area">
                      <div className="container-fluid remove-padding">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcomb-list">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className='popup-topbar-title'>
                                      {addresstypeid}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      <span><a href="#" onClick={handleUpdateAddresssupplier} id="sa-success"> <i className="fa fa-check"></i> Save</a> | </span>
                                      <span><a href="#" id="sa-warning"> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      <span><a href=""><i className="fa fa-pencil"></i> Edit</a> | </span>
                                      <span><a href="#" onClick={handleToggleSupplierAddressEdit}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                              <div className='popup-top-rightdiv'>
                                      <button type="button" className="btn-link" onClick={handleToggleSupplierAddressEdit}>
                                      {isMaximized ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                      </button>
                                      <button type="button" className="close" 
                                      onClick={() => handlecloseSpplierAddressEdit()}
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
                          {selectedSupplier.BusinessID}- {selectedSupplier.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- customer name area End-->	 */}
                  
                  {/* <!-- Breadcomb area Start--> */}
               
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
                                            <span>Description</span>
                                        </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <div className="form-group">
                                          <Input
                                          id='suppliereditdescription'
                                          ref={desRef}
                                          value={selectedSupplierAddressRowData?.description || ''}
                                          placeholder='Description'>

                                          </Input>
                                        </div>
                                      </div>

                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address 1</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address 1"
                                          id='supplierAddress1'
                                          ref={add1Ref}
                                          value={selectedSupplierAddressRowData?.address1|| ''}></Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address 2</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address 2"
                                          id='supplierAddress1'
                                          ref={add2Ref}
                                          value={selectedSupplierAddressRowData?.address2|| ''}></Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Address 3</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Address 3"
                                          id='supplierAddress1'
                                          ref={add3Ref}
                                          value={selectedSupplierAddressRowData?.address3|| ''}></Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Town/City</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="City"
                                          id='supplierAddresscity'
                                          ref={cityRef}
                                          value={selectedSupplierAddressRowData?.city|| ''}></Input>
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
                                          id='supplierAddressCounty'
                                          ref={countyRef}
                                          value={selectedSupplierAddressRowData?.county|| ''}></Input>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Post Code</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          <Input placeholder="Post Code"
                                          id='supplierAddressPincode'
                                          ref={postcodeRef}
                                          value={selectedSupplierAddressRowData?.postcode|| ''}></Input>
                                          </div>
                                      </div>
                                      
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Country</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          {/* <Input placeholder="Country"
                                          id='supplierAddressCountry'
                                          value={supplierEditAddress.countrycode|| ''}></Input> */}
                                          <DropDownList 
                                    id="AddresssdupplierCountry"
                                    selectedIndexes={[0]} 
                                    ref = {TblCountry}
                                    filterable 
                                    placeholder="Select Country"
                                    dataSource={dataGritCountry.map(Country => Country.country)}
                                    value={selectedSupplierAddressRowData?.countrycode|| ''}
                                    >
                                  </DropDownList>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className='input-lable'>
                                              <span>Addresstype</span>
                                          </div>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                          <div className="form-group">
                                          {/* <Input placeholder="Post Code"
                                          id='supplierAddressPincode'
                                          value={supplierEditAddress.addresstypeid|| ''}></Input> */}

                                          <DropDownList 
                                            id="Addresss Type"
                                            selectedIndexes={[0]} 
                                            ref={addresstypeRef}
                                            filterable 
                                            placeholder="Select Addresstype"
                                            dataSource={dataGritAddresstype.map(Address => Address.description)}
                                            value={selectedSupplierAddressRowData?.addresstypeid || ''}
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
                                <h4>{selectedSupplier.name}</h4>
                                {/* <p className="contact-des-line">Description</p> */}
                            </div>

                          <>
                            <Grid
                            id="Contact Supplier Address Data"
                            dataSource={suppliercontact}
                            selection={selection1}
                            behavior={behavior1}
                            appearance={appearance1}
                            sorting={sorting1}
                            filtering={filtering1}
                            // editing={editing1}
                            
                            columns={columns1}
                            className="lg w-full"
                      
                          />
                          </>

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

export default E4KTblSupplierAddressEditPage;