import {  Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetPaymentTermsListQuery,
    useCreatePaymentTermsMutation,
    useUpdatePaymentTermsMutation,
    useDeletePaymentTermsMutation,
    useGetpaymenttermsRefQuery,

} from '../../store/services/Customer/e4kTblbuspaymentterms';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';




const E4kPaymentterms = ({ showModalMediumPaymentterms, handleCloseMediumPaymentterms }) => {
    const [dataGridPaymentterms, setdataGridPaymentterms] = useState([]);
    const [paymentref, setpaymentref] = useState([]);
    const CompanySelectCusCurrency = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectCusCurrency);
    const { data: paymenttermsdata, error, isLoading, isError } = useGetPaymentTermsListQuery(companyId);
    const {data: paymentRefdata} = useGetpaymenttermsRefQuery(companyId);
    const [createPaymentterms, { isLoading: isCreating }] = useCreatePaymentTermsMutation();
    const [updatePaymenterms, { isLoading: isUpdating }] = useUpdatePaymentTermsMutation();
    const [deletePaymenterms, { isLoading: isDeleting }] = useDeletePaymentTermsMutation();
    const [isMaximizedCurrecy, setisMaximizedCurrecy] = useState(false);
   
    const [showConfirmCurrency, setShowConfirmPaymentterms] = useState(false);
    const [recordToDeletepaymentterms, setRecordToDeletePaymentterms] = useState(null);
  
    useEffect(() => {
      if (paymenttermsdata) {
         console.log("JHKHKHKHKHKHKHKHKHKHKHK", paymenttermsdata)
          transformDataCurrecy();
      }
  }, [paymenttermsdata]);

  useEffect(()=>{
    if(paymentRefdata){
      const dropdownDataSource = paymentRefdata.E4kTblbuspaymenttermsref.map(payment=>{
        return {
          text: payment.termTypeName,
          value: payment.termTypeid
        }
      });
      setpaymentref(dropdownDataSource)
    }
  },[paymentRefdata]);
  
  const transformDataCurrecy = () => {
      if (!paymenttermsdata || !paymenttermsdata.E4kTblbuspaymenttermslist) return []; // Add null check here
      const transformedData = paymenttermsdata.E4kTblbuspaymenttermslist.map(term => ({
          companyid: term.companyid.companyid, // This line will only execute if data and companyid are not null
          paymenttermsid: term.paymenttermsid,
          description: term.description,
          days: term.days,
          typeid:term.typeid.termTypeName,
      }));
      setdataGridPaymentterms(transformedData);
  };
  
  

  useEffect(() => {
    window.commandColumnCustomCommandPaymentterms = function(row) {
        if (!row.data) return; // Add null check here
        let deletedata = {
            companyid: row.data.companyid,
            paymenttermsid: parseInt(row.data.paymenttermsid),
        };
        setRecordToDeletePaymentterms(deletedata);
        setShowConfirmPaymentterms(true);
    };
}, []);

  
    const filtering = {
      enabled: true,
      filterRow: {
        visible: true,
      },
    };
  
    const behavior = {
      rowResizeMode: 'growAndShrink',
      columnResizeMode: 'growAndShrink'
  };
 

  const message = useMemo(() => ({
    en: {
        addNewRow: '+New',
    },
  }), [companyId]);
  
  const appearance = {
    showRowHeaderNumber: false,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true
  };
    const paging = {
      enabled: true,
      pageSize: 100,
    };
  
    const pager = {
      visible: true,
    };
  
    const sorting = {
      enabled: true,
      mode: 'many',
    };
  
    const dataSourceSettings = {
      dataFields: [
        'companyid: string',
        'paymenttermsid: string',
        'description: string',
        'days: number',
        'typeid: string',
      ]
    };
  
    const selection = {
      enabled: true,
      mode: 'extended',
      allowCellSelection: true,
    };
  
    const header = {
      visible: true,
      buttons: ['filter', 'sort', 'search']
    };
  
    const editing = {
      enabled: true,
      mode:'row',
      addNewRow: {
        visible: true,
        position: 'near',
      },
      commandColumn: {
        visible: true,
        // displayMode: 'icon',
        dataSource: {
          'commandColumnDelete': { visible: false },
          'commandColumnEdit': { visible: true },
          'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandPaymentterms', visible: true, label: '' },
        },
      },
    };
  
    const columns = [
      { label: 'Company ID', dataField: 'companyid', allowEdit: false, visible: false },
      { label: 'Payment Terms ID', dataField: 'paymenttermsid', allowEdit: false },
      {
        label: 'Type',
        dataField: 'typeid',
        editor: {
          template: 'dropDownList',
          dataSource: paymentref.map(ff => ff.text)
        }
        
      },
      { label: 'Description', dataField: 'description', allowEdit: true },
      { label: 'Days', dataField: 'days', allowEdit: true },
      

    ];
  
    
  
  const handlePaymenttermsCreate = async (payment) => {
    console.log("hdfdfhdgfjkif" , payment);
    const { companyid,typeid } = payment; 
    console.log("you have updated", payment)
    const selectedgroup = paymentref.find(item => item.text === typeid);
    console.log("GHHHHHHHHHHH", selectedgroup)
    const Type = selectedgroup ? selectedgroup.value : null;
    console.log("Country updated", Type)
  
    if (!payment) {
        toast.error('Please enter all required fields.');
        return;
    }

    try {
        const result = await createPaymentterms({
          ...payment,
          typeid: Type,
          days: parseInt(payment.days)
        });
        if(result.data.E4kTblbuspaymenttermscreate.success=== true){
          toast.success('paymenterms created successfully' , { position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,});
        } 
        else{
          toast.error(`Error creating paymenterms: ${result.data.E4kTblbuspaymenttermscreate.error}`, {  
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
           });
        }
   
        // }
    } catch (error) {
      toast.error(`Error creating Paymenterms: ${error.message}`, { position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,});

    }
};
  
const handlePaymenttermsUpdate = async (payment) => {
  const { companyid,typeid } = payment; 
  console.log("you have updated", payment)
  const selectedgroup = paymentref.find(item => item.text === typeid);
  console.log("GHHHHHHHHHHH", selectedgroup)
  const Type = selectedgroup ? selectedgroup.value : null;
  console.log("Country updated", Type)

  try {
    const result= await updatePaymenterms({
      ...payment,
      paymenttermsid:parseInt(payment.paymenttermsid),
      typeid: Type,
      days: parseInt(payment.days)
    })
    if(result.data.E4kTblbuspaymenttermsUpdate.success === true){
      toast.success('paymenterms updated successfully' , { position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,});
    }
    else{
      toast.error(`Error updating paymenterms: ${result.data.E4kTblbuspaymenttermsUpdate.error}`, { position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,});
    }
      
  } catch (error) {
      toast.error(`Error updating paymenterms:${error.message}`, { position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
       });
  }
};


  

const handleEndEdit = async (e) =>{
  const newpayment= e.detail.data;
  console.log("OYYYYYYYYYH", newpayment)
  newpayment.companyid = companyId;
  if(newpayment.paymenttermsid!=''){
    handlePaymenttermsUpdate(newpayment);
  
  
  }
  else{
    handlePaymenttermsCreate(newpayment);
  }
};


const handleDeleteConfirmedPaymentterms = async () => {
  if (!recordToDeletepaymentterms) return; // Add null check here

  try {
      const result = await deletePaymenterms({
        ...recordToDeletepaymentterms,
        paymenttermsid: parseInt(recordToDeletepaymentterms.paymenttermsid),
      });
      if (result.data.E4kTblbuspaymenttermsdelete.success === true) {
        toast.success('Paymentterms Deleted successfully' , {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
        });
      } else {
        toast.error(`Error Deleting  Paymentterms`, { 
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
         });
      }
  } catch (error) {
      toast.error(`Error deleting Paymentterms:${error.message}`,{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
  }
  setShowConfirmPaymentterms(false);
};

const  [isMinimizedPaymenttermspage, setisMinimizedPaymenttermspage]= useState(false);
const modalDialogClassName = isMaximizedCurrecy ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';

    
  const toggleMaximizeCurrency = () => {
      setisMaximizedCurrecy(!isMaximizedCurrecy);
    };

  const PaymenttermsDraggable =({ isMaximizedPaymenttermsMasterTable, children }) => (
    isMaximizedPaymenttermsMasterTable ? children : <Draggable handle=".e4kmodal-headerPaymenteterms">{children}</Draggable>
 );    

 const handleminimizedpaymentterms = ()=>{
  setisMinimizedPaymenttermspage(!isMinimizedPaymenttermspage);
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
 const widthPercentage = 60; // 50% of screen width
 const heightPercentage = 80; // 30% of screen height

 const resizableWidth = (screenSize.width * widthPercentage) / 100;
 const resizableHeight = (screenSize.height * heightPercentage) / 100;




  return (
    <>
      <PaymenttermsDraggable isMaximizedPaymenttermsMasterTable = {isMinimizedPaymenttermspage}>
      {/* <div className={`modal fade ${showModalMediumPaymentterms ? 'in' : ''}`} style={{ display: showModalMediumPaymentterms ? 'block' : 'none' }}> */}
      <div className={`modal fade mymodal ${(isMinimizedPaymenttermspage === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumPaymentterms ? 'block' : 'none' }}>
      <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}>
      {/* <div className={isMaximizedCurrecy ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup'}> */}
        <div className="modal-content-min medium-popup-div">
          <div className="modal-body">
            <div className="breadcomb-area e4kmodal-headers e4kmodal-headerPaymenteterms">
              <div className="container-fluid remove-padding">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="breadcomb-list">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className="popup-topbar-title">
                         Payment Terms 
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className='popup-top-rightdiv'>
                          <button className="close modalMinimize" onClick={handleminimizedpaymentterms}>
                                  <i className={`fa ${isMinimizedPaymenttermspage ? 'fa-plus' : 'fa-minus'}`}></i>
                          </button>
                            <button type="button" className="btn-link" onClick={toggleMaximizeCurrency}>
                             {isMaximizedCurrecy ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                            </button>
                            <button type="button" className="close" onClick={handleCloseMediumPaymentterms}>
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
            <div className="breadcomb-area">
              <div className="container-fluid remove-padding">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
                    <div className="customer-newbold">Payment Terms </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="medium-modal-section">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    
                    {isLoading ? (
                      "Loading..."
                    ) : (
                        <Grid
                          id="E4kPaymentetrmsGrid"
                          onEndEdit={handleEndEdit}
                          header={header}
                          dataSource={dataGridPaymentterms}
                          filtering={filtering}
                          columns={columns}
                          behavior={behavior}
                          paging={paging}
                          pager={pager}
                          sorting={sorting}
                          selection={selection}
                          dataSourceSettings={dataSourceSettings}
                          editing={editing}
                          appearance={appearance}
                          messages={message}
                          
                        />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ResizableBox>
      </div>
    {/* </div> */}
    </PaymenttermsDraggable>
    {showConfirmCurrency && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmPaymentterms(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmPaymentterms(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedPaymentterms}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
    </>
  );
};

export default E4kPaymentterms;
