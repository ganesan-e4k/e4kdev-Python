"use client";
import { useState,useRef, useEffect, useMemo  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { Grid } from 'smart-webcomponents-react/grid';
import {useGetContactRefListQuery,useGetSupplierAddressQuery,useGetSupplierContactQuery,useDeleteSupplierContactRowMutation,useUpdateSupplierContactMutation,useCreateSupplierContactMutation,useSupplierdeleteCustomerAddressandContactMutation,useGetSupplierAddressTypesQuery} from '../../store/services/Supplier/e4kTblsupplieraddresstypelist';
// import {useGetContactRefListQuery} from '../store/services/e4kcustomerAddresstypelist'
import Draggable from 'react-draggable';
import { useSelector, useDispatch } from 'react-redux';
import {setSelectedsupplierAddressContact} 
from '../../store/slices/supplier/e4kSelectedsupplierAddressContact';
import E4KTblSupplierAddressEditPage from '../supplierrelatables/E4KTblSupplierAddressEditPage';
import E4kTblSupplierAddressCreate from '../supplierrelatables/E4kTblSupplierAddressCreate';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
// import supplierSelectSlice from '../store/slices/supplierSelectSlice';



const E4kSupplierAddressUpdatePage = ({ showModalSupplieraddressupdate, handleCloseSupplieraddressupdate, businessid, companyid , addresstype, addressid,addresstypeid }) => {
  const selectedSupplier = useSelector(state => state.supplierSelect.selectedSupplier);
  const [showConfirmsupplierAddressDelete, setShowConfirmsupplierAddressDelete] = useState(false);
  const [selectedAddressDeleteData, setSelectedAddressDeleteData] = useState(null);
  const {data: SupplierAddresstypesData, refetch:supplieraddresstypesrefetch} =useGetSupplierAddressTypesQuery({companyid: companyid , businessid: businessid})
  const [showConfirmSupplierContactDelete, setShowConfirmSupplierContactDelete] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [deleteSupplierRowDataDeleteContact] = useDeleteSupplierContactRowMutation()

  const [showModalSupplieraddressEdit, setshowModalSupplieraddressEdit] = useState(false);
  const [showModalSupplieraddressCreate , setshowModalSupplieraddressCreate] = useState(false);
  const addressGridRef = useRef(null);
  const addresslistref = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [SelectedAddressData,setSelectedAddressData] = useState([]);
  const [SelectSupplierContact, setSelectSupplierContact] = useState([]);
  const [Selectedcontact,setSelectedcontact] = useState([]);
  // console.log("GHDDHD" ,SelectedAddressData);
  // const suppliercountselectedData = useSelector((state)=> state.supplierAddresscount.supplierAddresscount)
  // console.log("IOYYYYYYY" , suppliercountselectedData)

  // const SupplierAddresssCountData = suppliercountselectedData?.length > 0 ? suppliercountselectedData[0]: {};
  

  const SelectedSupplierContat = useSelector((state)=>state.SelectedsupplierAddressContact.SelectedsupplierAddressContact);                         
  // console.log("22222222222" , SelectedSupplierContat)
  const dispatch = useDispatch();

  const {data: CustomercontactRefData } = useGetContactRefListQuery(companyid)

  console.log("OPUUUUUUUUU" ,CustomercontactRefData )
  const {data: supplierAddressData} = useGetSupplierAddressQuery({
    companyid: companyid,
    businessid: businessid,
    addresstypeid: addresstypeid || '',
    addressid : String(addressid ||''),
  })


  const {data: SupplierContactData, refetch: suppliercontactrefetch} = useGetSupplierContactQuery({
    companyid:String(companyid),
    businessid:String(businessid),
    addressid : String(Selectedcontact.addressid)
  })

  // console.log("IOUUUU",SupplierContactData)
  // const companyID =String(SelectedSupplierContat.companyid)

   
  const dropdownDataSource = CustomercontactRefData?.E4kTblbuscontactref.map(item => ({
    value: item.contacttypeId,
    text: item.name
  })) || [];
  console.log("dropdownDataSource", dropdownDataSource)


  /////////////////////////////// contact update function //////////////////////////////////////////////////////////////

  const [updateSupplierContact, { isLoading, error }] = useUpdateSupplierContactMutation();
  // const [createSupplierContact] = useCreateSupplierContactMutation();
  const [createSupplierContact]= useCreateSupplierContactMutation()
  const [deleteSupplierAddressandContact] =useSupplierdeleteCustomerAddressandContactMutation()
  

  /////////////////////////// Auto selest firdt row function /////////////////////

  //////////////////// select row automaticlly //////////
  useEffect(() => {
    if (addresslistref.current && SelectedAddressData.length > 0) {
      addresslistref.current.nativeElement.select(0);      
      const firstRowData = addresslistref.current.nativeElement.rows[0].data;
      handleAllSupplierAddressRowClick({ detail: { data: firstRowData } });
    }
  }, [SelectedAddressData]);


 

  



  useEffect(()=>{
    if(supplierAddressData){
      console.log("JKGGGGGGGJFK" , supplierAddressData)
      const supplierAddress = supplierAddressData.E4kTblsupplieraddress.map(address =>({
          businessid : address.businessid.businessid|| '' ,
          address1: address.address1 || '',
          address2 : address.address2 || '',
          address3 : address.address3 || '',
          addressid : address.addressid || '',
          city : address.city || '',
          county : address.county || '',
          description : address.description || '',
          postcode : address.postcode || '',
          addresstypeid: address.addresstypeid.description || '',
          countrycode : address.countrycode.country|| '',
      }));
      console.log("UIYYYYYYYYYYY" ,supplierAddress)
      setSelectedAddressData(supplierAddress);
      
    }
}, [supplierAddressData]);


  useEffect(()=>{
    if(SupplierContactData && SupplierContactData.E4kSuppliercontact && CustomercontactRefData ){
      console.log("JKGGGGGGGJFK1232" , SupplierContactData)
      transformDataContact(SupplierContactData);
    }
  }, [SupplierContactData]);


  const transformDataContact = (SupplierContactData) => {
 
   
    if (!SupplierContactData || !SupplierContactData.E4kSuppliercontact) {
        return;
    }

    const transformedData = SupplierContactData.E4kSuppliercontact.map(contact => {
        const contactType = CustomercontactRefData.E4kTblbuscontactref.find(
            item => item.contacttypeId === contact.contacttype?.contacttypeId
        );


        return {
            id: contact.id,
            value: contact.value,
            contacttype: contactType ? contactType.name : null,
            contacttypeid: contactType ? contactType.contacttypeId : null
        };
    });
    console.log("JKKKKKKKKKKK" ,transformedData )
    setSelectSupplierContact(transformedData)
};




  
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleToggle = () => {
    setIsColumn2Visible(!isColumn2Visible);
  };
  
  const handleclosestockType = () =>{  
    handleCloseSupplieraddressupdate()
    supplieraddresstypesrefetch();
    
  };



  

  
////////////////////////// Addresss row click function ////////////////////////

const handleAllSupplierAddressRowClick = async (event) => {
  const rowData = event.detail.data;

  if (!rowData) {
    console.error("Row data is null or undefined");
    return; 
  }

 
  const clickAdressdata = {
    businessid: String(businessid),
    address1: rowData.address1 || '',
    address2: rowData.address2 || '',
    address3: rowData.address3 || '',
    addressid: rowData.addressid || '',
    county: rowData.county || '',
    description: rowData.description || ' ',
    postcode: rowData.postcode || '',
    city: rowData.city || '',
    countrycode: rowData.countrycode || '',
    companyid: String(companyid) || '',
    addresstypeid: rowData.addresstypeid || '',
  };

  
  setSelectedcontact(clickAdressdata);
  
  dispatch(setSelectedsupplierAddressContact(clickAdressdata));
};

  /////////////////////////////////////////////  


//   const dataSourceSupplierContact= useMemo(() => new Smart.DataAdapter({
//     dataSource: SelectSupplierContact,
// }), [SelectSupplierContact]);

const dataSourceSupplierContact = useMemo(() => {
  return new Smart.DataAdapter({
      dataSource: SelectSupplierContact && SelectSupplierContact.length > 0 ? SelectSupplierContact : [{}],
  });
}, [SelectSupplierContact]);

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


  const ExporSupplierAddresscolumns = [
    { label: 'Business ID', dataField: 'businessid', align: 'center',},
    { label: 'Description', dataField: 'description' },
    { label: 'Address 1', dataField: 'address1' },
    { label: 'Address 2', dataField: 'address2' },
    { label: 'Address 3', dataField: 'address3' },
    { label: 'Town/City', dataField: 'city' },
    { label: 'County', dataField: 'county' },
    { label: 'Postcode', dataField: 'postcode' },
    { label: 'Country', dataField: 'countrycode' },
    { label: 'Address Type ' , dataField: 'addresstypeid', visible: false }
    
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
    pageSize: 10
  };

  const pager = {
    visible: true
  };

  const sorting = {
    enabled: true,
    mode: 'many'
  };

  const editing = {
    enabled: false
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

  const grouping = {
    enabled: true
  };


  //////////////////// contact grid //////////

  const columns1 = [
    {
      label: 'Contact Type',
      dataField: 'contacttype',
      editor: {
        template: 'dropDownList',
        dataSource: dropdownDataSource.map(ff => ff.text)
      }
      
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
    enabled: true

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
        'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnSupplierContactdelete', visible: true  }, 
      }
    },
  };
  
  
  
  
  
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

  // const handleopenAddressEdit = () => {
  //   // if(SelectedSupplierContat.companyid || SelectedSupplierContat.businessid || SelectedSupplierContat.addressid || SelectedSupplierContat.addresstypeid){
  //     setshowModalSupplieraddressEdit(true);
  //   // }
  // };


  // useEffect(()=>{
  //   if(SelectedSupplierContat.companyid || SelectedSupplierContat.buusinessid || SelectedSupplierContat.addressid || SelectedSupplierContat.addresstypeid){
  //     setshowModalSupplieraddressEdit(true)
  //   }
  // }, [SelectedSupplierContat.companyid,SelectedSupplierContat.businessid,SelectedSupplierContat.addressid,SelectedSupplierContat.addresstypeid])


  const handleEditClick = (event) => {
    event.preventDefault();
    setshowModalSupplieraddressEdit(true);
  
  };




  const handleCloseSupplieraddressEdit1 =()=>{
    setshowModalSupplieraddressEdit(false);
  }


  const handleopensupplieraddressCreate =() => {
    setshowModalSupplieraddressCreate(true);

  };


  const handleCloseSupplieraddressCreate =() => {
    setshowModalSupplieraddressCreate(false);
    
  };




  //////////////////////////////////////////////  Supplier Contact ROw Delete ///////////////////////////////////////////////////////////////////////////////////////




  const handlesupplierRowDeleteContact = (event) => {
    const command = event.name; 
    const rowData = event.details.data; 
  
    if (command === 'commandColumnSupplierContactdelete') {
      const { companyid, id } = rowData; 
      
      setSelectedRowData({ companyid, id }); 
      setShowConfirmSupplierContactDelete(true); 
    }
  };

  const handleConfirmDeleteContact = async () => {
    if (selectedRowData) {
      const { companyid, id } = selectedRowData; 

  
      try {
        const result = await deleteSupplierRowDataDeleteContact({ companyid: selectedSupplier.CompanyID, id : parseInt(id,10) });
        if (result.data?.E4kSupplierrowcontactDelete?.success) {
          console.log('Row deleted successfully');
          toast.success("Contact deleted successfully",{
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000,
          
          });
          suppliercontactrefetch();
        } else {
          console.log('Failed to delete row', result.data?.E4kSupplierrowcontactDelete?.error);
          toast.error("Failed to delete contact",{
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000,
          })
        }
      } catch (error) {
        console.error('Error deleting row:', error);
        toast.error("Failed to delete contact",{
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000,
      })
      }
  
      setShowConfirmSupplierContactDelete(false); // Close the confirmation modal
    }
  };
  




  const handleCellUpdate = async (rowData) =>{
    const { id, value, contacttype } = rowData; 
    const selectedContactType = dropdownDataSource.find(item => item.text === contacttype);
    const contacttypeid = selectedContactType ? selectedContactType.value : null;

    if(!contacttypeid) {
      toast.error("Please select a valid contact type.",{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      setSelectSupplierContact((prevData) => {
        return prevData.filter(row => row.id !== '');
      });
      return;
    };
    if(!selectedContactType){
      toast.error("Please select a contact type.",{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      setSelectSupplierContact((prevData) => {
        return prevData.filter(row => row.id !== '');
      });
      return;
    };
    if (value === ''){
      toast.error("Value field is required.",{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      setSelectSupplierContact((prevData) => {
        return prevData.filter(row => row.id!== '');
      });
      return;
    }
    try{
      const result = await updateSupplierContact({
        ...rowData,
        companyid:String(selectedSupplier.CompanyID),
        id: parseInt(id, 10),
        value,
        contacttypeId: String(contacttypeid), 
        addressid: String(SelectedSupplierContat.addressid),
      });
      if(result.data.E4kTblsuppliercontactupdate.success === true) {
        toast.success("Contact updated successfully",
          {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,

          }
        );
        suppliercontactrefetch();

      }
      else{
        toast.error(`Failed to update supplier contact: ${result.data.E4kTblsuppliercontactupdate.error}`,{
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
        });
        setSelectSupplierContact((prevData) => {
          return prevData.filter(row => row.id !== '');
        });

      };
    }
    catch(error){
      toast.error(`Failed to save contact. Please try again.: ${error}` ,{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      setSelectSupplierContact((prevData) => {
        return prevData.filter(row => row.id !== '');
      });
    }

  };


  const handleRowAdd = async (rowData) => {
    const { value, contacttype } = rowData; 
    const selectedContactType = dropdownDataSource.find(item => item.text === contacttype);
    const contacttypeid = selectedContactType ? selectedContactType.value : null;

    if(!contacttypeid) {
      toast.error("Please select a valid contact type.",{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
    });
    setSelectSupplierContact((prevData) => {
      return prevData.filter(row => row.id !== '');
    });

    };



    if(value === ''){
      toast.error("Please Enter value.",{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      setSelectSupplierContact((prevData) => {
        return prevData.filter(row => row.id!== '');
      });
    };
    
    
    try{

     const result= await createSupplierContact({
        ...rowData,
        companyid: String(selectedSupplier.CompanyID),
        contacttypeId:  String(contacttypeid), 
        value,
        addressid:  String(SelectedSupplierContat.addressid),
      });
      if(result.data.E4kTblsuppliercontactcreate.success=== true){
        toast.success("Contact created successfully!",{
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      
        setSelectSupplierContact((prevData) => {
          return prevData.filter(row => row.id !== '');
        });
        suppliercontactrefetch();

      }
      else{
        toast.error(`Failed to create supplier contact: ${result.data.E4kTblsuppliercontactcreate.error}`,{
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
        setSelectSupplierContact((prevData) => {
          return prevData.filter(row => row.id !== '');
        });
      }
      
      
    }
    catch(error){
      toast.error(`Failed to create contact. Please try again.: ${error}` ,{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      setSelectSupplierContact((prevData) => {
        return prevData.filter(row => row.id !== '');
      });
    }
  } 


  const handleEndEditSupplierContact = (event) => {
    const updatedContact = event.detail.data;
    if(updatedContact.id!= ''){
      handleCellUpdate(updatedContact);
    }
    else{
      handleRowAdd(updatedContact);
    }
  };



  /////////////////////////// address contact delete ///////////////////////////////

  const handlesupplierDeleteClick = (addressData) => {
    setSelectedAddressDeleteData(addressData);
    setShowConfirmsupplierAddressDelete(true);
  };
  
  
   ///////////////////////////  both address and contact delete in one function //////////////////////////////////////////////////
  
   const handleConfirmDeleteAddress = async () => {
    if (!selectedAddressDeleteData) return;
  
    const deleteData = {
      companyid:selectedSupplier.CompanyID, 
      addressid: SelectedSupplierContat.addressid ,
    };
  
    try {
  
      const result = await deleteSupplierAddressandContact(deleteData).unwrap();
  
     
      const success = result?.E4kSupplierdeleteaddressandcontacts?.success;
      const error = result?.E4kSupplierdeleteaddressandcontacts?.error;
  
      if (success) {
        toast.success('Customer address and contact deleted successfully.', { position: 'top-center' ,
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.error(`Failed to delete: ${error}`, { position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
         });
      }
    } catch (error) {
      toast.error('Unexpected error during delete operation.', { position: 'top-center' ,
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setShowConfirmsupplierAddressDelete(false); 
    }
  };
  

  



const handleExportSupplierAddress = (e) => {
  // Create the header row using the column labels
  const headerRow = ExporSupplierAddresscolumns.map(col => col.label);

  // Create the data rows by mapping over SelectedAddressData
  const dataRows = SelectedAddressData.map(row => 
    ExporSupplierAddresscolumns.map(col => row[col.dataField])
  );

  // Add header row at the top of the data rows
  const fullData = [headerRow, ...dataRows];

  // Create a new worksheet from the data
  const ws = XLSX.utils.aoa_to_sheet(fullData);

  // Create a new workbook with the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Supplier Addresses');
  const filename = `${selectedSupplier.BusinessID}_${addresstype}.xlsx`;
  // Export the workbook as an Excel file
  XLSX.writeFile(wb, filename);
};











  

 

 

  return (
    <>
    <Draggable handle=".e4kmodal-header">
    <div className={`modal fade ${showModalSupplieraddressupdate ? 'in' : ''}`} style={{ display: showModalSupplieraddressupdate ? 'block' : 'none' }}>
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
                                      {addresstype}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                  <div className="breadcomb-wp">
                                   
                                    <div className="breadcomb-ctn">
                                      <span><a href="#createNewAddress" onClick={handleopensupplieraddressCreate}> <i className="fa fa-plus"></i> New</a> | </span>

                                      <span><a href="#" id="sa-success"> <i className="fa fa-check"></i> Save</a> | </span>
                                      <span><a href="#"  onClick = {handlesupplierDeleteClick} id="sa-warning"> <i className="fa fa-trash"></i> Delete</a> | </span>
                                      <span><a href=""onClick={handleEditClick}><i className="fa fa-pencil"></i> Edit</a> | </span>
                                      <span><a href="#Exportsupplieraddres"onClick={handleExportSupplierAddress}><i className="fa fa-pencil"></i> Export</a> | </span>

                                      <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>

                                    </div>
                                  </div> 
                                </div>
                           
                              <div className='popup-top-rightdiv'>
                                      <button type="button" className="btn-link" onClick={handleToggle}>
                                      {isMaximized ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                      </button>
                                      <button type="button" className="close" 
                                      onClick={() => handleclosestockType()}
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
                  <div className="container-fluid">
                    <div className="row">
                    <div id="popumsupplier" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
                      <div className='mainpopup-left'>
                        <div className="panel panel-default accrodion-div">
                          <h4 className="panel-title"> 
                            <a data-toggle="collapse" href="#supplieraddressedit" aria-expanded="true" aria-controls="supplieraddressedit"><i className="plus-icon" aria-hidden="true"></i> Supplier Address  </a> 
                          </h4>
                            <div id="supplieraddressedit" className="collapse in" aria-expanded="true" >
                                <div className="panel-box-div">
                               
                                    <Grid
                                    id="AddressData"
                                    ref={addresslistref}
                                    header={header}
                                    dataSource={SelectedAddressData}
                                    columns={columns}
                                    appearance={appearance}
                                    behavior={behavior}
                                    selection={selection}
                                    paging={paging}
                                    pager={pager}
                                    sorting={sorting}
                                    dataSourceSettings={dataSourceSettings}
                                    filtering={filtering}
                                    onRowClick={handleAllSupplierAddressRowClick}
                                    className="lg w-full"
                                    />
                                </div>
                            </div>
                        </div>
                       </div>
                      </div>
                      <div id="suppliercontactpopup" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                        <div className="mainpopup-right">
                          <div className="contact-list">
                            <div className="contact-des">
                                <h4>{selectedSupplier.name}</h4>
                            </div>
                            <>
                            <Grid
                          id="suppliercontactlist"
                          ref={addressGridRef}
                          dataSource = {dataSourceSupplierContact.length>0 ? dataSourceSupplierContact :[{}]}
                          selection={selection1}
                          behavior={behavior1}
                          header={header}
                          appearance={appearance1}
                          sorting={sorting1}
                          filtering={filtering1}
                          editing={editing1}
                          columns={columns1}
                          paging={paging}
                          pager={pager}
                          className="lg w-full"
                          onEndEdit={handleEndEditSupplierContact}
                          onCommand={handlesupplierRowDeleteContact}
                          
                         />
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  {showConfirmSupplierContactDelete && (
                  <div className="modal fade in" style={{ display: 'block' }}>
                  <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                      <div className="modal-header justify-content-center modal-header-error">
                        <div className="icon-box">
                          <i className="fa fa-exclamation" aria-hidden="true"></i>
                        </div>
                        <button type="button" className="close" onClick={() => setShowConfirmSupplierContactDelete(false)}>&times;</button>
                      </div>
                      <div className="modal-body text-center">
                        <h4>Confirm Delete</h4>
                        <p>Are you sure you want to delete this record?</p>
                        <button type="button" className="btn btn-default" onClick={() => setShowConfirmSupplierContactDelete(false)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteContact}>Confirm</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {showConfirmsupplierAddressDelete && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmsupplierAddressDelete(false)}>&times;</button>
                            </div>
                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmsupplierAddressDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteAddress}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
          </div>

   
      </Draggable>  
        
       
 

        {showModalSupplieraddressCreate && (
        <E4kTblSupplierAddressCreate
        showModalSupplieraddressCreate={showModalSupplieraddressCreate}
        handleCloseSupplieraddressCreate={handleCloseSupplieraddressCreate}
        SelectedDescripton = {addresstype}
        selectaddresstypeid = {Selectedcontact}
        />
  
        )}

       {showModalSupplieraddressEdit && (
        <E4KTblSupplierAddressEditPage
        showModalSupplieraddressEdit = {showModalSupplieraddressEdit}
        handleCloseSupplieraddressEdit1={handleCloseSupplieraddressEdit1}
        companyid = {SelectedSupplierContat.companyid}
        businessid={SelectedSupplierContat.businessid}
        addressid={SelectedSupplierContat.addressid}
        addresstypeid ={SelectedSupplierContat.addresstypeid}
        /> 
       )} 

        
       
      

 
    </>
  );
};

export default E4kSupplierAddressUpdatePage;