"use client";
import { Grid } from 'smart-webcomponents-react/grid';
import { toast } from 'react-toastify';
import { useState,useRef,useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import {useGetContactListQuery,
    useGetCustomerAddressDataQuery,
    useGetCustomerContactQuery,
    useGetContactRefListQuery,
    useUpdateCustomerContactMutation,
    useDeleteCustomerContactRowMutation,
     }from '../../store/services/Customer/e4kTblcustomerAddresstypeApi';
import { useDispatch, useSelector } from 'react-redux';
//import {setSelectContactAddressData,resetSelectContactAddressData} from '../../store/slices/customer/selectContactAddressDataSlice';
import { setCustomerSelectedAddress } from '../../store/slices/customer/e4kTblCustomerSelectedAddressSlice';
//import {setFetchedAddressData} from '../store/slices/fetchAddressDataSlice';
import {resetSelectedAddressData} from '../../store/slices/customer/e4kTblCustomeraddressDataSlice';
import Draggable from 'react-draggable';
import E4kTblCustomerAddressPage from './E4kTblCustomerAddressPage';
import * as XLSX from 'xlsx';



const E4kTblCustomerContactPage = ({ showModalContactOpen, handleCloseContact,SelectedDescripton }) => {


  const CustomerSelectContactPage = useSelector((state) => state.selectCustomer.selectCustomer);
  const CompanySelectCustomerConatactpage = useSelector((state) => state.selectCompanyid.Companyid);

  const [companyid, setCompanyid] = useState(CompanySelectCustomerConatactpage);
  const [showModalAddressPage1, setShowModalAddressPage] = useState(false);
  const [isMaximizedCustomerContact, setisMaximizedCustomerContact] = useState(false);
  const [ContactListData, setContactList] = useState([]);
  const contactlistref = useRef(null);
  const [selectedContact, setSelectedContact] = useState({});
  const selectContacts = useSelector((state) => state.selectCustomerContact.selectContact);
  const addressSelect = useSelector((state) => state.selectCustomerAddress.addressSelect);
  
	

  const [updateCustomerContact] = useUpdateCustomerContactMutation();
  
 
  const [deleteCustomerContact] = useDeleteCustomerContactRowMutation();
  const [showConfirmAddressDelete, setShowConfirmAddressDelete] = useState(false);
 
  const dispatch = useDispatch();
  
  

  const { data: contactDropdownData, error: contactRefListError, isLoading: contactRefListIsLoading } = useGetContactRefListQuery({companyid:companyid});

  const dropdownContactDataSource = contactDropdownData?.E4kTblbuscontactref.map(item => ({
    value: item.contacttypeId,
    text: item.name
  })) || [];



  const selectedAddressData = useSelector(state => state.selectCustomerAddressData.selectedAddressData);
  const addressid1 = parseInt(selectedContact.addressId, 10);
 
  const skipQuery = !CustomerSelectContactPage.businessid;

  const { data: contactListdata, error, isLoading, refetch:contactrefetch } = useGetContactListQuery({ 
    businessid: CustomerSelectContactPage.businessid, 
    addresstypeid: selectContacts.addressTypeId,
  },{
    skip: skipQuery, // Use the skip condition here
  });

  

  //const { data: contactData, error: contactError, isLoading: contactIsLoading ,refetch:contactDatarefetch} = useGetCustomerContactQuery(addressid1);
  
  const customerSelectedAddress = useSelector(state => state.tblselectCustomerSelectedAddress.customerSelectedAddress);
  const customerSelectedAddress1 = Array.isArray(customerSelectedAddress) 
    ? customerSelectedAddress[0] || {} 
    : {};

  

    const handleContactRowClick = async (event) => {
      const rowData = event.detail.data;
    
      const clickedContactData = {
        businessid: rowData.BusinessID,
        addressId: rowData.addressId,
        addressTypeid: rowData.addressTypeId,
        name: rowData.name,
        value: rowData.value,
        ID: rowData.ID,
      };
      setSelectedContact(clickedContactData);
   
    };
    


    const handleNewButtonClick = () => {
      // Check if selectedContact.ID exists (is not empty or undefined)
      if (selectedContact.ID) {
        // If selectedContact has a valid ID, open the modal
        setShowModalAddressPage(true);
        // You can also trigger any data fetching or other actions here
        contactrefetch();
      } else {
        // If no contact is selected, show the error toast
        toast.error("Please select a contact first", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
        });
      }
    };
    

    
  
    const handleCloseAddressPage = () => {
      setShowModalAddressPage(false);
      contactrefetch();
      dispatch(resetSelectedAddressData());
      // dispatch(resetSelectContactAddressData());
     
    
    };

    const skipQuery1 = !CustomerSelectContactPage?.businessid?.trim() && selectedContact.addressTypeId && selectedContact.addressId !== 'undefined' ;

  const { data: addressData, isLoading: isaddressLoading, error: addresserror } = useGetCustomerAddressDataQuery({
    addressid: String(addressid1) || '',
    businessid: CustomerSelectContactPage.businessid,
    companyid : companyid,
    addresstypeid : selectedContact.addressTypeId || '' ,
  },{
    skip: skipQuery1, // Use the skip condition here
  });


  



  const [address, setAddress] = useState(null);

  const transformAddressData = (addressData) => {
    if (addressData && addressData.E4kTblcustomeraddress && addressData.E4kTblcustomeraddress.length > 0) {
      return addressData.E4kTblcustomeraddress.map(address => ({
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
        companyid: companyid,
        addresstypeid: address.addresstypeid.addresstypeid,
      }));
    }
    return [];
  };

  useEffect(() => {
    const transformedAddresses = transformAddressData(addressData);
    
   
    setAddress(transformedAddresses);
    dispatch(setCustomerSelectedAddress(transformedAddresses))
  }, [addressData]);

  


  ////////////////////////////////////// contact update //////////////////////////////////////////////////////////////////////////////////
  
  useEffect (() =>{
    if(contactListdata){
      transformContact(contactListdata)
    }
  },[contactListdata]);


  const transformContact = (contactListdata) => {
    if (!contactListdata || !contactListdata.E4kGetcontactlist) return;
  
    const ContactListData = contactListdata.E4kGetcontactlist.map((contactList) => {
      const contactListGriddata = JSON.parse(contactList);
  
      const { addressId, companyId, addressTypeId,ID,contactTypeId, name, value,address1,address2,postcode,country,county,city,description,BusinessID} = contactListGriddata;
      return {
        addressId,
        addressTypeId: addressTypeId,
        BusinessID,
        companyId,
        ID,
        contactTypeId,
        name,
        value,
        address1,
        address2,
        postcode,
        country,
        city,
        county,
        description,

      };
    });
    setContactList(ContactListData);
    // setContactList((prevList) => {
      
    //   if (JSON.stringify(prevList) !== JSON.stringify(ContactListData)) {
    //     return ContactListData;
        
    //   }
    //   return prevList; 
    // });
  }

  const Contactcolumns = [
    { label: 'Business ID', dataField: 'BusinessID', visible: false },  
    { label: 'Company ID', dataField: 'companyid', visible:false},
    { label: 'addressId', dataField: 'addressId', visible: false }, 
    {label: 'ID', dataField: 'ID', visible: false},
    {
      label: 'Contact Type',
      dataField: 'name',
      editor: {
        template: 'dropDownList',
        dataSource: dropdownContactDataSource.map(ff => ff.text),
      }, allowEdit: false,
    },
    { label: 'Value', dataField: 'value' },
    {label: "Contact Typeid" , dataField: 'contactTypeId',visible: false }, 
   
    { label: 'Address Type ID', dataField: 'addressTypeId', visible: false },
    { label: 'Description', dataField: 'description' , allowEdit : false },
    { label: 'Address 1', dataField: 'address1', allowEdit : false },
    { label: 'Town/City', dataField: 'city',  allowEdit : false},
    { label: 'County', dataField: 'county',  allowEdit : false },
    {label : 'PostCode' , dataField: 'postcode', allowEdit : false},
    {label: 'Country', dataField: 'country', allowEdit : false}
  

  ];


  const ContactcolumnsExport = [
    { label: 'Business ID', dataField: 'BusinessID', visible: false },  
    {
      label: 'Contact Type',
      dataField: 'name',
      editor: {
        template: 'dropDownList',
        dataSource: dropdownContactDataSource.map(ff => ff.text),
      }, allowEdit: false,
    },
    { label: 'Value', dataField: 'value' },
    { label: 'Description', dataField: 'description' , allowEdit : false },
    { label: 'Address 1', dataField: 'address1', allowEdit : false },
    { label: 'Town/City', dataField: 'city',  allowEdit : false},
    { label: 'County', dataField: 'county',  allowEdit : false },
    {label : 'PostCode' , dataField: 'postcode', allowEdit : false},
    {label: 'Country', dataField: 'country', allowEdit : false}

  ];
  

  
 

  const filtering = {
    enabled: true,
    filterRow: {
      visible: true
    }
  };
  
  const behavior = {
    rowResizeMode: 'growAndShrink',
    columnResizeMode: 'growAndShrink'
  };
  
  
  const appearance = {
    showRowHeaderNumber: false,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true
  };
  
  const paging = {
    enabled: true,
    pageSize: 100
  };
  
  const pager = {
    visible: true
  };
  
  const sorting = {
    enabled: true,
    mode: 'many'
  };
  
  const editing = {
    enabled: true,
    mode:'cell',
   
    commandColumn: {
        visible: true,
        //displayMode: 'icon',
        dataSource: {
            commandColumnDelete: { visible: false },
            commandColumnEdit: { visible: true },
            commandColumnCustom: { icon: 'fa fa-trash', command: 'commandColumnCustomCommandContactdelete', visible: true },
        }
    }};
  
  
  
  
  const header = {
    visible: true,
    buttons: ['filter','sort','search']
  };
  


  const selection = {
    enabled: true,
    mode: 'extended',
    allowRowSelection: true

  };
 

  
  
  const handleEndEditcontact = (e) => {
  
    const updatedContact = e.detail.data;
    

    if (!updatedContact) {
      return;
    }

    if (updatedContact.ID) {
      handleCellUpdate(updatedContact);  
    } else {
      handleRowAdd(updatedContact);  
    }
};

const handleCellUpdate = async (rowData) => {
    const { ID, value, name } = rowData;
  
    


    try {
      if (ID && Number.isInteger(Number(ID))) {
        await updateCustomerContact({
          companyid: companyid,
          id: parseInt(ID, 10),
          value,
          addressid: parseInt(customerSelectedAddress1.addressid,10),
        });
      
        toast.success("Contact updated successfully!", {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
        contactrefetch();
        // contactDatarefetch();
      }
    } catch (error) {
      toast.error("Failed to update contact. Please try again.", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }






};



/////////////////////////////Delete Founction//////////////////////////////////////////////


const handleGridCommand = (event) => {

  const command = event.name;

  if (command === 'commandColumnCustomCommandContactdelete' ) {
    handleDeleteClick();
  } else {
  }
};

const handleDeleteClick = () => {

  setShowConfirmAddressDelete(true);
 
};


const handleConfirmDeleteAddress = async () => {
  const deleteData = {
    companyid: companyid,
    id: parseInt(selectedContact.ID ,10),
  };
  

  try {
    const contactResult = await deleteCustomerContact(deleteData).unwrap();

    if (contactResult?.E4kCustomercontactdelete?.success === true) {
        toast.success('Customer contact deleted successfully.', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
        setContactList(prevData =>
        prevData.filter(contact => contact.ID !== selectedContact.ID)
       
      );
      contactrefetch();
      // contactDatarefetch();

      
      if (contactlistref.current) {
        contactlistref.current.refresh();
      }
    } else {
      toast.error(`Failed to delete customer contact: ${contactResult?.E4kCustomercontactdelete?.error || 'Unknown error'}`, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    }
  } catch (error) {
    toast.error('Unexpected error during delete operation.', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
  } finally {
    setShowConfirmAddressDelete(false);
  }
};


// /////////////////////////////////////////////// Delete function ////////////////////////////////////////////////////////






  const toggleMaximizeCustomerContact = () => {
    setisMaximizedCustomerContact(!isMaximizedCustomerContact);
  };

  const modalDialogclassName = isMaximizedCustomerContact ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggle = () => {
    setIsColumn2Visible(!isColumn2Visible);
  };  

 

  const handleexportcontactdata = (e) => {

    const headerRow = ContactcolumnsExport.map(col => col.label);
  
    const dataRows = ContactListData.map(row => 
      ContactcolumnsExport.map(col => row[col.dataField])
    );
  
    const fullData = [headerRow, ...dataRows];
  
    const ws = XLSX.utils.aoa_to_sheet(fullData);
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Contacts');
  
    const filename = `${CustomerSelectContactPage.businessid} _${selectContacts.adresstype}.xlsx`;
    XLSX.writeFile(wb, filename);
  };















  return (
    <>
    <Draggable handle=".e4kmodal-header">
    <div className={`modal fade ${showModalContactOpen ? 'in' : ''}`} style={{ display: showModalContactOpen ? 'block' : 'none' }}>
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
                                     {SelectedDescripton || selectContacts.adresstype}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">
                                      <span><a href="#newcontact"  onClick={handleNewButtonClick}> <i className="fa fa-plus"></i> NewContact</a> | </span>
                                      <span><a href="#newcontact"  onClick={handleexportcontactdata}> <i className='fa fa-external-link'></i> Export</a> | </span>
                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                     
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className='popup-top-rightdiv'>
                                    <button type="button" className="btn-link" onClick={toggleMaximizeCustomerContact}>
                                        {isMaximizedCustomerContact ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                    </button>
                                    <button type="button" className="close" onClick={handleCloseContact}>
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
                           {CustomerSelectContactPage.businessid} - {CustomerSelectContactPage.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
       
                


                  <div className="container-fluid">
                    <div className="row">
                    <div id="conatct" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#contactlist" aria-expanded="true" aria-controls="contactlist"><i className="plus-icon" aria-hidden="true"></i>  Contact List   </a> 
                          </h4>
                            <div id="contactlist" className="collapse in" aria-expanded="true" >
                            
                             <div>
                                <Grid
                                ref={contactlistref}
                                id="contactdatalist"
                                dataSource={ContactListData}
                                columns={Contactcolumns}
                                selection={selection}
                                behavior={behavior}
                                appearance={appearance}
                                sorting={sorting}
                                filtering={filtering}
                                editing={editing}
                                pager={pager}
                                paging = {paging}
                                onRowClick={(event) => handleContactRowClick(event)}
                                onEndEdit={handleEndEditcontact}
                                onCommand={handleGridCommand}
                                />
                             </div>
                            </div>
                        </div>

                       </div>
                      </div>
                      <div id="Addresslist" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                        <div className="mainpopup-right">
                          <div className="contact-list">
                            {/* <div className="contact-img">
                              <img src="assets/images/user.png" alt=""/>
                            </div> */}

                            <div className="contact-des">
                                <h4>{CustomerSelectContactPage.name}</h4>
                                {/* <p className="contact-des-line">Description</p> */}
                            </div>

                            <div className="leftsidebar-clickdiv">
                              <div className="row">
                                 <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Description</span>
                                    </div>
                                </div>
                                
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                    <a>
                                      {customerSelectedAddress1?.description || 'N/A'}

                                    </a>
                                    </div>
                                </div>
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Addess 1</span>
                                    </div>
                                </div>
                                
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                    <a>
                                      {customerSelectedAddress1?.address1 || 'N/A'}

                                    </a>
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Address 2</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>
                                        {customerSelectedAddress1?.address2 || 'N/A'}

                                      </a>
                                    </div>
                                </div>


                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Address 3</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>
                                        {customerSelectedAddress1?.address3 || 'N/A'}

                                      </a>
                                    </div>
                                </div>
                          
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Town/City</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>
                                        {customerSelectedAddress1?.city  || 'N/A'}

                                      </a>
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>County</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>
                                        {customerSelectedAddress1?.county  || 'N/A'}

                                      </a>
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Post Code</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>
                                        {customerSelectedAddress1?.postcode || 'N/A'}

                                      </a>
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Country</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>
                                        {customerSelectedAddress1?.countrycode  || 'N/A'}
                                        </a>
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
            {showConfirmAddressDelete&& (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmAddressDelete(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmAddressDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteAddress}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}

        <div className='popup-tab-footerbar'> 
        {showModalAddressPage1 && (
          <E4kTblCustomerAddressPage
            showModalAddressPage={showModalAddressPage1}
            handleCloseAddressPage={handleCloseAddressPage}
            businessid={String(selectedContact?.businessid)} 
            selectedAddressTypeId={String(selectedContact?.addressTypeId)}
            selectedAdddressId = {String(selectedContact?.addressId)}
            SelectedDescripton = {SelectedDescripton}
          />
        )}


        </div>



          </div>
          
      </Draggable> 

      
     
    </>
  );
};

export default E4kTblCustomerContactPage;