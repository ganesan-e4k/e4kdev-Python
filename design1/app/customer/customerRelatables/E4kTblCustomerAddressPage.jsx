"use client";
import { useState,useRef,useEffect,useMemo  } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { Smart,Grid } from 'smart-webcomponents-react/grid';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAddressData } from '../../store/slices/customer/e4kTblCustomeraddressDataSlice';
import {useDeleteCustomerAddressandContactMutation,
    useDeleteCustomerContactRowMutation,
    useGetCustomerAddressDataQuery,
    useCreateCustomerContactMutation,
    useUpdateCustomerContactMutation,
    useGetCustomerContactQuery,
    useGetContactRefListQuery
} from '../../store/services/Customer/e4kTblcustomerAddresstypeApi';
import { useAddressTypesQuery } from '../../store/services/Customer/e4ktTblAddresstype';
import E4kTblCustomerAddressEditPage from './E4kTblCustomerAddressEditPage';
import E4kTblCustomerAddressCreatePage from './E4kTblCustomerAddressCreatePage';
import * as XLSX from 'xlsx';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';




const E4kTblCustomerAddressPage = ({ showModalAddressPage, handleCloseAddressPage, businessid,selectedAddressTypeId,selectedAdddressId,SelectedDescripton }) => {
  const CustomerSelectAddressPage = useSelector((state) => state.selectCustomer.selectCustomer);
  const CompanySelectCustomerAddressPage = useSelector((state) => state.selectCompanyid.Companyid);

  const [companyid, setCompanyid] = useState(CompanySelectCustomerAddressPage);
  const [isMaximizedCustomerAddressPage, setisMaximizedCustomerAddressPage] = useState(false);
  const [dataGridCustomerAddressPage, setdataGridCustomerAddressPage] = useState([]);
  const [showModalAddressCreate, setShowModalAddressCreate] = useState(false);
  const selectContactsaddresspage = useSelector((state) => state.selectCustomerContact.selectContact);


  const skipQuery = !CustomerSelectAddressPage?.businessid?.trim();

  const [deleteCustomerContact1] = useDeleteCustomerContactRowMutation();
  const [showConfirmContactDelete, setShowConfirmContactDelete] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const { data: addressData, refetch: refetchaddresscreate } = useGetCustomerAddressDataQuery({ 
                                    addresstypeid: selectedAddressTypeId , 
                                    businessid:CustomerSelectAddressPage.businessid, 
                                    companyid:companyid, 
                                    addressid:selectedAdddressId || '' },
                                    {
                                        skip: skipQuery, // Use the skip condition here
                                    }
                                );
  
  const selectedAddressData = useSelector(state => state.selectCustomerAddressData.selectedAddressData);

  
  ////////////////////////////////// uPDATE  ///////////////////////////////////////
  const dispatch = useDispatch()
  const [selectedAddressRowData, setSelectedAddressRowData] = useState(null);
  const [AddressEditshowModal , setAddressEditshowModal]= useState(false);
  
  const [updateCustomerContact, { isLoading, error }] = useUpdateCustomerContactMutation();
  const [createCustomerContact, { isLoadingContact , contacterror}] = useCreateCustomerContactMutation();
  const [deleteCustomerAddressandContact] = useDeleteCustomerAddressandContactMutation();
  const addressSelect = useSelector((state) => state.selectCustomerAddress.addressSelect);
  
  const addressDeleteRef = useRef([]);
  const UpdateContactRef =useRef([]);
  
  const [customerContactData, setCustomerContactData] = useState([]);
  console.log("chdvcdbcvdc",customerContactData )
  const addressid = parseInt(selectedAddressData.addressid, 10);
  const skipconatac = !addressid
  const { data: contactData, error: contactError, isLoading: contactIsLoading ,refetch:contactDatarefetch} = useGetCustomerContactQuery({
    addressid:addressid,
    companyid: companyid},{
        skip:skipconatac
    }
);
console.log("xhvxsxvsbxsvx", {refetch:contactDatarefetch} )
const skipcontat = !companyid
  const { data: contactRefListData, error: contactRefListError, isLoading: contactRefListIsLoading } = useGetContactRefListQuery({
    companyid :  companyid 
  },{
    skip: skipcontat
  });
  

//////////////////////


  
  const [dropdownDataSource, setdropdownDataSource] = useState([])


  //////////////////////////////////////// Allert popup function //////////////////////////////////

  const [showConfirmAddressDelete, setShowConfirmAddressDelete] = useState(false);
  const [selectedAddressDeleteData, setSelectedAddressDeleteData] = useState(null);

  useEffect(() => {
    
    if (addressData) {
      transformData(addressData);
    }
  }, [addressData, businessid, selectedAddressTypeId]); 

  useEffect(() => {
    
    if (!contactRefListIsLoading) {
      const dropdownDataSource1 = contactRefListData?.E4kTblbuscontactref.map(item => ({
        value: item.contacttypeId,
        text: item.name
      })) || [];
      setdropdownDataSource(dropdownDataSource1)
    }
  }, [contactRefListIsLoading, contactRefListData]); 


  useEffect(() => {
    if (contactData && contactRefListData) {
      transformDataContact(contactData);
    }
  
  }, [contactData, contactRefListData]);

  //////////////////// select row automaticlly //////////
  useEffect(() => {
    if (addressDeleteRef.current && dataGridCustomerAddressPage.length > 0) {
      // Select the first row automatically
      addressDeleteRef.current.nativeElement.select(0);

      // Get the data of the first row and trigger the row click handler
      const firstRowData = addressDeleteRef.current.nativeElement.rows[0].data;
      const clickAdressdataGrid = {
        businessid: firstRowData.businessid,
        address1: firstRowData.address1,
        address2: firstRowData.address2,
        address3: firstRowData.address3,
        addressid: firstRowData.addressid,
        county: firstRowData.county,
        description: firstRowData.description,
        postcode: firstRowData.postcode,
        city: firstRowData.city,
        countrycode: firstRowData.countrycode,
        companyid: companyid,
        addresstypeid: firstRowData.addresstypeid,
    };
      
      setSelectedAddressRowData(clickAdressdataGrid)
      dispatch(setSelectedAddressData(clickAdressdataGrid));
     handleAllAddressRowClick({ detail: { data: firstRowData } });
    }
  }, [dataGridCustomerAddressPage]);



  const transformDataContact = (contactData) => {
    if (!contactRefListData || !contactRefListData.E4kTblbuscontactref) {
        return;
    }

    if (!contactData || !contactData.E4kTblcustomercontact) {
        return;
    }

    const transformedData = contactData.E4kTblcustomercontact.map(contact => {
        const contactType = contactRefListData.E4kTblbuscontactref.find(
            item => item.contacttypeId === contact.contacttype?.contacttypeId
        );

        return {
            id: contact.id,
            value: contact.value,
            contacttype: contactType ? contactType.name : null,
            contacttypeid: contactType ? contactType.contacttypeId : null
        };
    });

    setCustomerContactData(transformedData);
};

  
const handleCommand = (event) => {
  const command = event.name; 
  const rowData = event.details.data; 

  if (command === 'commandColumnCustomContactdelete') {
    const  id  = rowData.id; 
    setSelectedRowData({ 
        companyid:companyid, 
        id:id 
    }); 
    setShowConfirmContactDelete(true); 
  }
};





const handleConfirmDeleteContact = async () => {
  if (selectedRowData) {
    const { companyid, id } = selectedRowData; // Destructure companyid and id from selectedRowData
 

    try {
      const result = await deleteCustomerContact1({ companyid: companyid , id : parseInt(id,10) });
      if (result.data?.E4kCustomercontactdelete?.success === true) {
        
        toast.success("Contact deleted successfully",{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
        contactDatarefetch();
      } else {
        
        toast.error("Failed to delete contact",{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        })
      }
    } catch (error) {
      
      toast.error("Failed to delete contact",{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    })
    }

    setShowConfirmContactDelete(false); // Close the confirmation modal
  }
};


 
  

  
  



  const transformData = (addressData) => {
   
    if (addressData && addressData.E4kTblcustomeraddress) {
      const dataGridCustomerAddressPage = addressData.E4kTblcustomeraddress.map(address => ({
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
        companyid : companyid,
        addresstypeid: address.addresstypeid.addresstypeid,
        addressType: SelectedDescripton,
      }));
      console.log("hcjhcjxcx",dataGridCustomerAddressPage )
      setdataGridCustomerAddressPage(dataGridCustomerAddressPage);
  
     
    } else {
    }
  };
  
const handleAllAddressRowClick = async (event) => {
 
  const rowData = event.detail.data; 

  const clickAdressdata = {
      businessid: rowData.businessid,
      address1: rowData.address1,
      address2: rowData.address2,
      address3: rowData.address3,
      addressid: rowData.addressid,
      county: rowData.county,
      description: rowData.description,
      postcode: rowData.postcode,
      city: rowData.city,
      countrycode: rowData.countrycode,
      companyid: companyid,
      addresstypeid: rowData.addresstypeid,
  };

  setSelectedAddressRowData(clickAdressdata)
  dispatch(setSelectedAddressData(clickAdressdata));
  
};

const handleAddressEditClick = () => {
  if (selectedAddressData.addressid === undefined){
    toast.error("Please select a valid address.", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    return;
  }
  setAddressEditshowModal(true);  
};


const handleCloseAddressEdit = () => {
  setAddressEditshowModal(false);
  
};



const handleEndEdit = (event) => {
  const updatedContact = event.detail.data;
  const RowIndex = event.detail.row.index;
  if(updatedContact.id != ''){
    handleCellUpdate1(updatedContact);
  }
  else{
    handleRowAdd1(updatedContact);
  }
};


const handleCellUpdate1 = async(rowData) => {

  const { id, value, contacttype } = rowData;
  
  const selectedContactType = dropdownDataSource.find(item => item.text === contacttype);
  const contacttypeid = selectedContactType ? selectedContactType.value : null;

  if(!contacttypeid){
    toast.error("Please select a valid contact type.", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    setCustomerContactData((prevData) => {
    
      return prevData.filter(row => row.id !== '');
    });

    return;
  }
  if(!selectedContactType){
    toast.error("Please select a contact type.",{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    setCustomerContactData((prevData) => {
    
      return prevData.filter(row => row.id !== '');
    });
    return;
  }
  if(value === ''){
    toast.error("Contact value cannot be empty.",{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
    setCustomerContactData((prevData) => {
    
      return prevData.filter(row => row.id!== '');
    });
    return;
  }
  try{
    const result = await updateCustomerContact({
      ...rowData,
      companyid:companyid,
      id: parseInt(id, 10),
      value,
      contacttypeId: contacttypeid, 
      addressid: Number(selectedAddressData.addressid),

    });
    console.log("bchdvcdcvdcdcc", result)
    if(result.data.E4kTblcustomercontactupdate.success===true){
      toast.success("Contact updated successfully",{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
      contactDatarefetch();
    }
    else{
      toast.error(` Contact update failed: ${result.data.E4kTblcustomercontactupdate.error}`,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      })
      setCustomerContactData((prevData) => {
    
        return prevData.filter(row => row.id !== '');
      });
  

      
    };


  }
  catch{
    toast.error("Failed to update contact.",{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
    });
  
    setCustomerContactData((prevData) => {
    
      return prevData.filter(row => row.id !== '');
    });

  }

};

const handleRowAdd1 = async (rowData) => {
  console.log("Row Data:", rowData); 

  const { value, contacttype } = rowData;
  const selectedContactType = dropdownDataSource.find(item => item.text === contacttype);
  const contacttypeid = selectedContactType ? selectedContactType.value : null;

  if (!contacttypeid) {
    toast.error("Please select a valid contact type .", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
    });
    setCustomerContactData((prevData) => {
    
      return prevData.filter(row => row.id !== '');
    });
   
    return;


  }

  if (value === '') {
      toast.error("Please enter a valid contact value.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      setCustomerContactData((prevData) => {
    
        return prevData.filter(row => row.id !== '');
      });
     
      return;
    
    };
   


  try {
    const result = await createCustomerContact({
      companyid: companyid,
      value,
      contacttypeId: contacttypeid,
      addressid: Number(selectedAddressData.addressid),
    });
    console.log("Result:", result);

    if (result.data.E4kTblcustomercontactcreate.success === true) {
      toast.success("Contact added successfully", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
      contactDatarefetch();  
    } else {
      toast.error(`Contact add failed: ${result.data.E4kTblcustomercontactcreate.error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });

 
      setCustomerContactData((prevData) => {
    
        return prevData.filter(row => row.id !== '');
      });

    }
  } catch (error) {
    toast.error("Failed to add contact.", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
    });

   
    setCustomerContactData((prevData) => {
      return prevData.filter(row => row.id !== '');
    });
  }
};





///////////////////////// handle delete contact row /////////////////////////////////






const handleDeleteClick = (addressData) => {
  setSelectedAddressDeleteData(addressData);
  setShowConfirmAddressDelete(true);
};


 ///////////////////////////  both address and contact delete in one function //////////////////////////////////////////////////

 const handleConfirmDeleteAddress = async () => {
  if (!selectedAddressDeleteData) return;

  const deleteData = {
    companyid:companyid, 
    addressid: parseInt(selectedAddressData.addressid  , 10),
  };

  try {

    const result = await deleteCustomerAddressandContact(deleteData).unwrap();

   
    const success = result?.E4kDeleteAddressAndContacts?.success;
    const error = result?.E4kDeleteAddressAndContacts?.error;

    if (success) {
      toast.success('Customer address and contact deleted successfully.',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
    });
    } else {
      toast.error(`Failed to delete: ${error || 'Unknown error'}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
    });
    }
  } catch (error) {
    toast.error('Unexpected error during delete operation.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
    });
  } finally {
    setShowConfirmAddressDelete(false); // Close the confirmation modal
  }
};

const columns1 = [
  {
    label: 'Contact Type',
    dataField: 'contacttype',
    editor: {
      template: 'dropDownList',
      dataSource: dropdownDataSource.map(ff => ff.text)
    },
    
    
  },
  
  { label: 'Value', dataField: 'value' },
  { label: 'ID', dataField: 'id', visible: false },
  { label: 'Contact Type Id', dataField: 'contacttypeid', visible: false },
  { label: 'Address ID', dataField: 'addressid', visible: false }
];



const behavior1 = {
  rowResizeMode: 'growAndShrink',
  columnResizeMode: 'growAndShrink'
};

const sorting1 = {
  enabled: true
};

const filtering1 = {
  enabled: true,
//   filterRow: {
//     visible: true
//   },
};


const editing1 = {
  enabled: true,
  mode:'row',
  addNewRow: {
    visible: true,
    position: "near"
  },
  commandColumn: {
    visible: true,
  
    dataSource: {
      'commandColumnDelete': { visible: false },
      'commandColumnEdit': { visible: true },
      'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomContactdelete', visible: true, label: '' }, 
    }
  },
};



const message = useMemo(() => ({
  en: {
      addNewRow: '+New',
  },
}), [contactData]);

const selection1 = {
  enabled: true,
  mode: 'extended',
  allowCellSelection: true
};

// You may need to include this if not done already

const appearance1= {
  showRowHeaderNumber: false,
  showRowHeader: true,
  showRowHeaderSelectIcon: true,
  showRowHeaderFocusIcon: true
};


  const columns = [
    { label: 'Business ID', dataField: 'businessid', visible:false},
    { label: 'Description', dataField: 'description' },
    { label: 'Address 1', dataField: 'address1' },
    { label: 'Address 2', dataField: 'address2' },
    { label: 'Address 3', dataField: 'address3' },
    { label: 'Address Id', dataField: 'addressid',visible:false},
    { label: 'Town/City', dataField: 'city' },
    { label: 'County', dataField: 'county' },
    { label: 'Postcode', dataField: 'postcode' },
    { label: 'Country', dataField: 'countrycode' },
    { label: 'Company ID', dataField: 'companyid', visible: false },
    { label: 'Address Type ' , dataField: 'addresstypeid', visible: false }
    
  ];

  
  const Exportcolumns = [
    { label: 'Business ID', dataField: 'businessid', align: 'center', },
    { label: 'Description', dataField: 'description' ,cellsFormat: 'c2',},
    { label: 'Address 1', dataField: 'address1',cellsFormat: 'c2' },
    { label: 'Address 2', dataField: 'address2',cellsFormat: 'c2' },
    { label: 'Address 3', dataField: 'address3',cellsFormat: 'c2' },
    { label: 'Town/City', dataField: 'city',cellsFormat: 'c2' },
    { label: 'County', dataField: 'county',cellsFormat: 'c2' },
    { label: 'Postcode', dataField: 'postcode',cellsFormat: 'c2' },
    { label: 'Country', dataField: 'countrycode',cellsFormat: 'c2' },
    { label: 'Address Type ', dataField: 'addressType',cellsFormat: 'c2'   }
   
    
  ];

  const dataSourceSettings = {
    dataFields: [
      'businessid: string',
      'address1: string',
      'address2: string',
      'address3: string',
      'addressid: number',
      'county: string',
      'description: string',
      'postcode: string',
      'city: string',
      'countrycode: string',
      'companyid: string',
      'addresstypeid: string'
    ],
  };


//   const dataSourceCusContact= useMemo(() => new Smart.DataAdapter({
//     dataSource: customerContactData,
// }), [customerContactData]);

const dataSourceCusContact = useMemo(() => {
  return new Smart.DataAdapter({
      dataSource: customerContactData && customerContactData.length > 0 ? customerContactData : [{}],
  });
}, [customerContactData]);

  const behavior = {
    columnResizeMode: 'growAndShrink'
  };

  const filtering = {
    enabled: true,
    filterRow: {
      visible: true
    },
  };

  const appearance = {
    alternationCount: 2,
    showRowHeader: true
  };

  const paging = {
    enabled: true,
    pageSize: 30
  };

  const pager = {
    visible: true
  };

  const sorting = {
    enabled: true,
    mode: 'many'
  };


  const selection = {
    enabled: true,
    allowCellSelection: false,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    mode: 'extended'
  };

  const header = {
    visible: true,
    buttons: ['filter', 'sort', 'search']
  };



  const toggleMaximize = () => {
    setisMaximizedCustomerAddressPage(!isMaximizedCustomerAddressPage);
  };

  const modalDialogclassName = isMaximizedCustomerAddressPage ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggle = () => {
    setIsColumn2Visible(!isColumn2Visible);
  };  
  const handleOpenModal = () => {
    setShowModalAddressCreate(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    refetchaddresscreate();
    setShowModalAddressCreate(false);
  };

 


  

  const handleexportdata = (e) => {
    // Create the header row using the column labels
    const headerRow = Exportcolumns.map(col => col.label);
  
    // Create the data rows by mapping over SelectedAddressData
    const dataRows = dataGridCustomerAddressPage.map(row => 
      Exportcolumns.map(col => row[col.dataField])
    );
  
    // Add header row at the top of the data rows
    const fullData = [headerRow, ...dataRows];
  
    // Create a new worksheet from the data
    const ws = XLSX.utils.aoa_to_sheet(fullData);
  
    // Create a new workbook with the worksheet
    const wb = XLSX.utils.book_new();
   
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Contacts');
    const filename = `${CustomerSelectAddressPage.businessid}_${SelectedDescripton}.xlsx`;

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, filename);
  };




// const handleexportdata =()=>{
//   UpdateContactRef.current.exportData()('xlsx');
// };
const [isMinimizedCustomerCategory1, setisMinimizedCustomerCategory1]= useState(false);


const handleMinimizecustomerCategory1page = ()=>{
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
const heightPercentage = 85; // 30% of screen height

const resizableWidth = (screenSize.width * widthPercentage) / 100;
const resizableHeight = (screenSize.height * heightPercentage) / 100;






  return (


    
    <>
    <Draggable handle=".e4kmodal-header">
    {/* <div className={`modal fade ${showModalAddressPage ? 'in' : ''}`} style={{ display: showModalAddressPage ? 'block' : 'none' }}> */}
    <div className={`modal fade mymodal ${(isMinimizedCustomerCategory1 === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalAddressPage ? 'block' : 'none' }}>
    <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogclassName}>

      {/* <div className={modalDialogclassName}> */}
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
                                      {SelectedDescripton || selectContactsaddresspage.adresstype}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">

                                    <div className="breadcomb-ctn">

                                      <span><a href="#createNewAddress" onClick={handleOpenModal}> <i className="fa fa-plus"></i> New</a> | </span>
                                      <span><a href="#DeleteAddress"  onClick = {handleDeleteClick}id="sa-warning"> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      <span><a href="#EditAddresss"  onClick={handleAddressEditClick} ><i className="fa fa-pencil"></i> Edit </a> | </span>
                                      <span><a href="#Export"  onClick={handleexportdata} ><i  className="fa fa-external-link"></i> Export </a> | </span>
                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className='popup-topbar-title'>
                                {/* {SelectedDescripton} */}
                                  {/* </div> */}
                                </div>
                                  <div className='popup-top-rightdiv'>
                                  <button className="close modalMinimize" onClick={handleMinimizecustomerCategory1page}>
                                                                        <i className={`fa ${isMinimizedCustomerCategory1 ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                                    <button type="button" className="btn-link" onClick={toggleMaximize}>
                                        {isMaximizedCustomerAddressPage ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                    </button>
                                    <button type="button" className="close" onClick={handleCloseAddressPage}>
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

    

                  {/* <!-- customer name area Start--> */}
                  <div className="breadcomb-area">
                    <div className="container-fluid remove-padding">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                          <div className="customer-newbold">
                          {CustomerSelectAddressPage.businessid}-{CustomerSelectAddressPage.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row">
                    <div id="AddressList" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>   
                      {dataGridCustomerAddressPage.length > 0  ? (
                         <Grid
                         id="AddressData"
                         ref={addressDeleteRef}
                         header={header}
                         dataSource={dataGridCustomerAddressPage}
                         columns={columns}
                         appearance={appearance}
                         behavior={behavior}
                         selection={selection}
                         paging={paging}
                         pager={pager}
                         sorting={sorting}
                         dataSourceSettings={dataSourceSettings}
                         filtering={filtering}
                         onRowClick={handleAllAddressRowClick}
                         
                          />

                      ):(
                        <div>
                          No Customer AddressData Found.....! Please Create a New Address </div>
                      )}
                     
                      
                       </div>
                      </div>
                      <div id="Addresspopup" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                        <div className="mainpopup-right">
                          <div className="contact-list">
                            <div className="contact-des">
                                <h4>{CustomerSelectAddressPage.name}</h4>
                                {/* <p className="contact-des-line">Contact Details : </p> */}
                            </div>
                            <div className="leftsidebar-clickdiv">   
                           {dataGridCustomerAddressPage.length > 0 ? (
                            <Grid
                                id="e4ktblContactDataUpdate"
                                ref={UpdateContactRef}
                                dataSource ={dataSourceCusContact.length > 0 ? dataSourceCusContact : [{}]}
                                selection={selection1}
                                behavior={behavior1}
                                header={header}
                                appearance={appearance1}
                                // sorting={sorting1}
                                // filtering={filtering1}
                                editing={editing1}
                                columns={columns1}
                                paging={paging}
                                pager={pager}
                                onEndEdit={handleEndEdit}
                                onCommand={handleCommand}
                                messages={message}
                      
                             />

                           ) : null}
                           
                        
                         </div>

                          </div>
                        </div>

                      </div>

                    </div>
                  </div>


                </div>
              </div>
              {showConfirmContactDelete && (
     <div className="modal fade in" style={{ display: 'block' }}>
    <div className="modal-dialog modal-confirm">
      <div className="modal-content">
        <div className="modal-header justify-content-center modal-header-error">
          <div className="icon-box">
            <i className="fa fa-exclamation" aria-hidden="true"></i>
          </div>
          <button type="button" className="close" onClick={() => setShowConfirmContactDelete(false)}>&times;</button>
        </div>
        <div className="modal-body text-center">
          <h4>Confirm Delete</h4>
          <p>Are you sure you want to delete this record?</p>
          <button type="button" className="btn btn-default" onClick={() => setShowConfirmContactDelete(false)}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteContact}>Confirm</button>
        </div>
      </div>
    </div>
  </div>

  
)}   
 <div className='popup-tab-footerbar'> 


<E4kTblCustomerAddressEditPage
    AddressEditshowModal={AddressEditshowModal}
    handleCloseAddressEdit={handleCloseAddressEdit}
    businessid={selectedAddressData.businessid} 
    selectedAddressTypeid = {selectedAddressTypeId} 
    SelectedDescripton = {addressSelect.adresstype}
  
    />


        <E4kTblCustomerAddressCreatePage
          showModalAddressCreate={showModalAddressCreate}
          handleCloseMediumAddress={handleCloseModal}
          SelectedDescripton = {SelectedDescripton}
          selectaddresstypeid = {selectedAddressRowData}
        />
      


           

          </div>



       </ResizableBox>
            </div>
            </Draggable>  
             {/* pop up code : {/ <<<<<<<<<<<<Pop up code >>>>>>>>>                         /} */}
           {showConfirmAddressDelete && (
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

     
   
      {/* </div> */}
      
     
      

    </>
  );
};

export default E4kTblCustomerAddressPage;