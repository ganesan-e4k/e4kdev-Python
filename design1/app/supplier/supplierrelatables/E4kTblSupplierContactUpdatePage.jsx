"use client";
import * as XLSX from 'xlsx';
import { Grid } from 'smart-webcomponents-react/grid';
import { useState,useRef, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore,faChain, faChainBroken } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {useGetSupplierContactlistQuery,useGetSupplierAddressQuery,useGetSupplierAddressTypesQuery,useUpdateSupplierContactMutation,useDeleteSupplierContactRowMutation} from '../../store/services/Supplier/e4kTblsupplieraddresstypelist';
import Draggable from 'react-draggable';
import {setSupplierContacts} from '../../store/slices/supplier/e4kSupplierContactAddressSlice';
import {setSupplierContactlistselect} from '../../store/slices/supplier/e4ksuppliercontactlistselectionSlice';
import E4kSupplierAddressUpdatePage from '../supplierrelatables/E4kSupplierAddressUpdatePage';




const E4kTblSupplierContactUpdatePage = ({ showModalSupplierContactupdate, handleCloseSupplierContactupdate,businessid, companyid , addresstype, addresstypeid }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [showModalSupplieraddressupdate , setshowModalSupplieraddressupdate] = useState(false);
  const suppliercontactlistselect = useSelector((state)=> state.suppliercontactlist.suppliercontactlistselection)
  const {data: SupplierAddresstypesData, refetch:supplieraddresstypesrefetch} =useGetSupplierAddressTypesQuery({companyid: companyid , businessid: businessid})
  const [updateCustomerContact] = useUpdateSupplierContactMutation();
  const [deleteSupplierRowContact] = useDeleteSupplierContactRowMutation();
  const suppliercontactData = suppliercontactlistselect?.length > 0 ? suppliercontactlistselect[0]: {};
  const suppliercontactselection = useSelector((state) => state.SupplierContactAddress.suppliercontactsselect);
  console.log("KGGGGGGGGGGGG0",suppliercontactselection)
  const dispatch = useDispatch();
  const [showConfirmSupplierContactDelete, setShowConfirmSupplierContactDelete] = useState(false);

  const [SupplierContactListDataGrid, setSupplierContactListData] =useState([]); 
  const {data: SupplierContactListData, refetch: contactlistrefetch } = useGetSupplierContactlistQuery({
    companyid : companyid,
    businessid : businessid ,
    addresstypeid : addresstypeid || '',
  })



  const { data: supplierAddressData } = useGetSupplierAddressQuery({
    companyid: companyid,
    businessid: businessid,
    addressid: String(suppliercontactselection.addressid || ''),
    addresstypeid:String(addresstypeid || '')
  });
  console.log("JKGHJFHFHAFHA",supplierAddressData )
  

/////////////////////////////////////  //////////////////////////\\

  useEffect(()=>{
    if(SupplierContactListData) {

      transformSupplierContact(SupplierContactListData)
    }
  },[SupplierContactListData]);


  const transformSupplierContact = (SupplierContactListData) => {
    if (!SupplierContactListData || !SupplierContactListData.E4kGetsuppliercontactlist) return;
  
    const ContactListData = SupplierContactListData.E4kGetsuppliercontactlist.map((contactList) => {
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
    })
    setSupplierContactListData(ContactListData)
      
  
  };


  useEffect(()=>{
    if(supplierAddressData){
      const addressData=supplierAddressData.E4kTblsupplieraddress.map((add) =>{
        return {
          address1 : add.address1,
          address2 : add.address2,
          address3 : add.address3,
          addressid : add.addressid,
          city : add.city,
          county : add.county,
          description : add.description,
          postcode : add.postcode,
          addresstypeid : add.addresstypeid.addresstypeid,
          addresstype: add.addresstypeid.description,
          countrycode : add.countrycode.country
        }
      });

      dispatch(setSupplierContactlistselect(addressData))
    }
  },[supplierAddressData]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog large-popup';

  const [isColumn2Visible, setIsColumn2Visible] = useState(true);

  const handleTogglecontact = () => {
    setIsColumn2Visible(!isColumn2Visible);
  }; 
  const selectedSupplier = useSelector(state => state.supplierSelect.selectedSupplier);
   
  const handleclosestockTypecontactpage = () =>{  
    handleCloseSupplierContactupdate();
    supplieraddresstypesrefetch();
  };


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
        // dataSource: dropdownContactDataSource.map(ff => ff.text),
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


  const ExportSupplierContactContactcolumns = [
    { label: 'Business ID', dataField: 'BusinessID', visible: false },  
    { label: 'addressId', dataField: 'addressId', visible: false }, 
    {label: 'ID', dataField: 'ID', visible: false},
    {
      label: 'Contact Type',
      dataField: 'name',
      editor: {
        template: 'dropDownList',
        // dataSource: dropdownContactDataSource.map(ff => ff.text),
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
            commandColumnCustom: { icon: 'fa fa-trash', command: 'commandColumnSupplierCommandContactdelete', visible: true },
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



  ///////////////////// Row clcick contactList ///////////////////////

  const handleSupplierContactRowClick = async (event) => {
    const rowData = event.detail.data;
  
    const clickedContactData = {
      businessid: rowData.BusinessID,
      addressid: rowData.addressId,
      addresstypeid: rowData.addressTypeId,
      name: rowData.name,
      value: rowData.value,
      ID: rowData.ID,
      companyid: companyid,
    };
    setSupplierContactlistselect(clickedContactData)
    dispatch(setSupplierContacts(clickedContactData))
 
  };


  const handlecontactpageopen=() =>{
    if(suppliercontactselection.companyid && suppliercontactselection.addressid && suppliercontactselection.businessid){
      setshowModalSupplieraddressupdate(true);
      contactlistrefetch();
    }
    else{
      toast.error("Please select a contact first", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
    }
  };

  

  const handleCloseSupplieraddressupdate =()=>{
    setshowModalSupplieraddressupdate(false);
    contactlistrefetch();
    
  };

  const handleEndEditcontact = (e)=>{
    const updatedContact = e.detail.data;
    

    if (!updatedContact) {
      return;
    }

    if (updatedContact.ID) {
      handleCellSupplierContactUpdate(updatedContact);  
    }
    //  else {
    //   handleRowAdd(updatedContact);  
    // }
  }


  const handleCellSupplierContactUpdate = async (rowData) =>{
    const { ID, value, name,contactTypeId } = rowData;


    try {
      if (ID && Number.isInteger(Number(ID))) {
        await updateCustomerContact({
          companyid: String(companyid),
          id: parseInt(ID, 10),
          value,
          contacttypeId: String(contactTypeId),
          addressid: String(suppliercontactselection.addressid),
        });
      
        toast.success("Supplier Contact updated successfully!", { position: 'top-center', hideProgressBar: true, autoClose: true });
        contactlistrefetch()
      }
    } catch (error) {
      toast.error("Failed to update Supplier contact. Please try again.", { position: 'top-center' , hideProgressBar: true , autoClose: true });
    }




  }


  /////////////////////////////////////////////////////////////////////////  supplier contact row delete  /////////////////////////////////////

  const handleGridCommandsuppliercontactdelete = (event) => {

    const command = event.name;
  
    if (command === 'commandColumnSupplierCommandContactdelete' ) {
      handleDeleteClick();
    } else {
    }
  };
  
  const handleDeleteClick = () => {
  
    setShowConfirmSupplierContactDelete(true);
   
  };
  
  const handleConfirmDeleteAddress = async () => {
    const deleteData = {
      companyid: String(companyid),
      id: parseInt(suppliercontactselection.ID ,10),
    };
  
    try {
      const contactResult = await deleteSupplierRowContact(deleteData).unwrap();
      const contactSuccess = contactResult?.E4kSupplierrowcontactDelete?.success === true;
  
      if (contactSuccess) {
          toast.success('Supplier contact deleted successfully.', { position: 'top-center' , hideProgressBar: true ,
            autoClose: 3000,
          });
          contactlistrefetch()
       
      } else {
        toast.error(`Failed to delete Supplier contact: ${contactResult?.E4kSupplierrowcontactDelete?.error || 'Unknown error'}`, { position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true 
         });
      }
    } catch (error) {
      toast.error('Unexpected error during delete operation.', { position: 'top-center',hideProgressBar: true, autoClose: 3000 });
    } finally {
      setShowConfirmSupplierContactDelete(false);
    }
  };


  // const handleExportSupplierData = (e) => {
    
  //   const headerRow = ExportSupplierContactContactcolumns
  //     .map(col => col.label)  
  //     .join(',');
  

  //   const csvData = SupplierContactListDataGrid.map(row => {
  //     return ExportSupplierContactContactcolumns
  //       .map(col => row[col.dataField])  
  //       .join(',');
  //   }).join('\n');
  
  //   // Combine the header and the data rows
  //   const fullCsvData = headerRow + '\n' + csvData;
  
  //   // Create a Blob and trigger a download
  //   const blob = new Blob([fullCsvData], { type: 'text/csv;charset=utf-8;' });
  //   const link = document.createElement('a');
  //   const url = URL.createObjectURL(blob);
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', 'exported_data.csv');
  //   link.style.visibility = 'hidden';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }


  const handleExportSupplierData = (e) => {
    // Create the header row using the column labels
    const headerRow = ExportSupplierContactContactcolumns.map(col => col.label);
  
    // Create the data rows by mapping over SelectedAddressData
    const dataRows = SupplierContactListDataGrid.map(row => 
      ExportSupplierContactContactcolumns.map(col => row[col.dataField])
    );
  
    // Add header row at the top of the data rows
    const fullData = [headerRow, ...dataRows];
  
    // Create a new worksheet from the data
    const ws = XLSX.utils.aoa_to_sheet(fullData);
  
    // Create a new workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Supplier Contacts');
  
    const filename = `${selectedSupplier.BusinessID}_${addresstype}.xlsx`;
    XLSX.writeFile(wb, filename);
  };
  
  

  return (
    <>
    <Draggable handle=".e4kmodal-header">
    <div className={`modal fade ${showModalSupplierContactupdate ? 'in' : ''}`} style={{ display: showModalSupplierContactupdate ? 'block' : 'none' }}>
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
                                      <span><a href="#newsuppliercontact" onClick={handlecontactpageopen} > <i className="fa fa-plus"></i> NewContact</a> | </span>
                                      <span><a href="#exportsupplieercontactdata" onClick={handleExportSupplierData} > <i className="fa fa-plus"></i>Export</a> | </span>
                                      <span><a href="#" onClick={toggleMaximize}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a></span>
                                    </div>
                                  </div>
                                </div>
                               <div className='popup-top-rightdiv'>
                                      <button type="button" className="btn-link" onClick={toggleMaximize}>
                                      {isMaximized ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                      </button>
                                      <button type="button" className="close" 
                                      onClick={() => handleclosestockTypecontactpage()}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- customer name area End-->	 */}
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
                                    <>
                                      <Grid
                                      //  ref={contactlistref}
                                      id="suppliercontactdatalist"
                                      dataSource={SupplierContactListDataGrid}
                                      columns={Contactcolumns}
                                      selection={selection}
                                      behavior={behavior}
                                      appearance={appearance}
                                      sorting={sorting}
                                      filtering={filtering}
                                      editing={editing}
                                      pager={pager}
                                      paging = {paging}
                                      className="mx-auto"
                                      onRowClick={(event) => handleSupplierContactRowClick(event)}
                                      onEndEdit={handleEndEditcontact}
                                      onCommand={handleGridCommandsuppliercontactdelete}
                                      />
                                    
                                    </>
                                </div>
                            </div>
                        </div>             
                       </div>
                      </div>
                      <div id="suppliercontactcolumnpopup2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>

                        <div className="mainpopup-right">
                          <div className="contact-list">
                          

                            <div className="contact-des">
                                <h4>{selectedSupplier.name}</h4>
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
                                     <a>{suppliercontactData?.description || 'N/A'}</a>
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Address 1</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>{suppliercontactData?.address1 || 'N/A'}</a>
                                    </div>
                                </div>


                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Address 2</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>{suppliercontactData?.address2 || 'N/A'}</a>
                                    </div>
                                </div>

                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Address 3</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>{suppliercontactData.address3 ||'N/A'}</a>
                                    </div>
                                </div>
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Town/City</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>{suppliercontactData?.city || 'N/A'}</a>
                                    </div>
                                </div>
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>County</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>{suppliercontactData.county || 'N/A'}</a>
                                    </div>
                                </div>
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Post Code </span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>{suppliercontactData?.postcode || 'N/A'}</a>
                                    </div>
                                </div>
                                <div className="col-xs-8">
                                    <div className='input-lable'>
                                          <span>Country</span>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className='input-lablevalue'>
                                      <a>{suppliercontactData.countrycode || 'N/A'}</a>
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
            {showConfirmSupplierContactDelete&& (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSupplierContactDelete(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSupplierContactDelete(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteAddress}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}



          </div>
      </Draggable>
      {showModalSupplieraddressupdate && (
         <E4kSupplierAddressUpdatePage
         showModalSupplieraddressupdate ={showModalSupplieraddressupdate}
         handleCloseSupplieraddressupdate={handleCloseSupplieraddressupdate}
         companyid ={suppliercontactselection.companyid}
         businessid ={suppliercontactselection.businessid}
         addressid={suppliercontactselection.addressid}
         />  

      )}
      
    </>
  );
};

export default E4kTblSupplierContactUpdatePage;