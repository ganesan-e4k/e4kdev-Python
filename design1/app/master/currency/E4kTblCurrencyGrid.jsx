import {  Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetCurrenciesQuery,
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation,
} from '../../store/services/Customer/e4kTblCurrency';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';




const E4kTblCurrencyGrid = ({ showModalMediumCurrency, handleCloseMediumCurrency }) => {
    const [dataGridCurrency, setdataGridCurrency] = useState([]);
    const CompanySelectCusCurrency = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectCusCurrency);
    const { data, error, isLoading, isError } = useGetCurrenciesQuery(companyId);
    const [createCurrency, { isLoading: isCreating }] = useCreateCurrencyMutation();
    const [updateCurrency, { isLoading: isUpdating }] = useUpdateCurrencyMutation();
    const [deleteCurrency, { isLoading: isDeleting }] = useDeleteCurrencyMutation();
    const [isMaximizedCurrecy, setisMaximizedCurrecy] = useState(false);
   
    const [showConfirmCurrency, setShowConfirmCurrency] = useState(false);
    const [recordToDeleteCurrency, setRecordToDeleteCurrency] = useState(null);
  
    useEffect(() => {
      if (data) {
          transformDataCurrecy();
      }
  }, [data]);
  
  const transformDataCurrecy = () => {
      if (!data || !data.E4kCurrency) return []; // Add null check here
      const transformedData = data.E4kCurrency.map(currency => ({
          currencyCode: parseInt(currency.currencyCode, 10),
          companyid: currency.companyid.companyid, // This line will only execute if data and companyid are not null
          currencyName: currency.currencyName,
          currencyExchangeRate: parseFloat(currency.currencyExchangeRate),
          currencySymbol: currency.currencySymbol,
          isocode: currency.isocode,
      }));
      setdataGridCurrency(transformedData);
  };
  
  

  useEffect(() => {
    window.commandColumnCustomCommandCurrency = function(row) {
        if (!row.data) return; // Add null check here
        let deletedata = {
            companyid: row.data.companyid,
            currencyCode: parseInt(row.data.currencyCode, 10),
        };
        setRecordToDeleteCurrency(deletedata);
        setShowConfirmCurrency(true);
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
        'currencyCode: number',
        'currencyName: string',
        'currencyExchangeRate: decimal',
        'currencySymbol: string',
        'isocode: string',
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
          'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandCurrency', visible: true, label: '' },
        },
      },
    };
  
    const columns = [
      { label: 'Company ID', dataField: 'companyid', allowEdit: false, visible: false },
      { label: 'Currency Code', dataField: 'currencyCode', allowEdit: false },
      { label: 'Currency Name', dataField: 'currencyName' },
      { label: 'Exchange Rate', dataField: 'currencyExchangeRate' },
      { label: 'Symbol', dataField: 'currencySymbol' },
      { label: 'ISO Code', dataField: 'isocode' },
    ];
  
    
  
  const handleCurrencyCreate = async (currency) => {
    console.log("hdfdfhdgfjkif" , currency);
    if (!currency || !currency.currencyName || !currency.currencyExchangeRate) {
        toast.error('Please enter all required fields.',{
          position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
        return;
    }

    try {
        const result = await createCurrency({
          ...currency,
          currencyExchangeRate: parseFloat(currency.currencyExchangeRate)
        });
        if(result.data.E4kCurrencycreate.success=== true){
          toast.success('Currency created successfully' , { position: "top-center",
            autoClose: 500,
            hideProgressBar: true,});
        } 
        else{
          toast.error(`Error creating Currency: ${result.data.E4kCurrencycreate.error}`, {  
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
           });
        }
   
        // }
    } catch (error) {
      toast.error(`Error creating Currency: ${error.message}`, { position: "top-center",
        autoClose: 500,
        hideProgressBar: true,});

    }
};
  
const handleCurrencyUpdate = async (currency) => {
  if (!currency) return; // Add null check here

  try {
    const result= await updateCurrency({
      ...currency,
      currencyExchangeRate: parseFloat(currency.currencyExchangeRate)
    })
    console.log("KHHHHHHHH",{
      ...currency,
      currencyExchangeRate: parseFloat(currency.currencyExchangeRate)
    } )
    console.log("Ljskc", result)
    if(result.data.E4kCurrencyupdate.success=== true) {
      toast.success('Currency Update successfully' , {  position: "top-center",
        autoClose: 5000,
        hideProgressBar: true});
    
    }
    else{
      toast.error(`Error updating Currency: ${result.data.E4kCurrencyupdate.error}`, {   position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,});
    }
      
  } catch (error) {
      toast.error(`Error updating currency: ${error.message}`, { position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
       });
  }
};


  
// const handleEndEdit = async (e) => {
//   e.preventDefault();
//   const editedCurrency = e.detail.data;
//   if (!editedCurrency) return; // Add null check here

//   editedCurrency.companyid = companyId;

//   try {
//       if (editedCurrency.currencyCode) {
//           await handleCurrencyUpdate(editedCurrency);
//       } else {
//           await handleCurrencyCreate(editedCurrency);
//       }
//   } catch (error) {
//       toast.error('Error processing row operation');
//   }
// };

const handleEndEdit = async (e) =>{
  // e.preventDefault();
  const editedCurrency = e.detail.data;
  editedCurrency.companyid = companyId;
  if(editedCurrency.currencyCode != ''){
    await handleCurrencyUpdate(editedCurrency);
  }
  else{
    await handleCurrencyCreate(editedCurrency);
  }
};


const handleDeleteConfirmedCurrency = async () => {
  if (!recordToDeleteCurrency) return; // Add null check here

  try {
      const result = await deleteCurrency(recordToDeleteCurrency);
      if (result.data.E4KCurrencydelete.success === true) {
        toast.success('Currency Deleted successfully' , {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
        });
      } else {
        toast.error(`Error Deleting  Currency`, { 
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
         });
      }
  } catch (error) {
      toast.error(`Error deleting currency: ${error.message}`,{
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
      });
  }
  setShowConfirmCurrency(false);
};

    
  const toggleMaximizeCurrency = () => {
      setisMaximizedCurrecy(!isMaximizedCurrecy);
    };

    // const [isMaximizedCurrencymaster, setIsMaximizedStockType] = useState(false);

    const [isMinimizedCustomerupdatepage, setIsMinimizedCustomerupdatepage] = useState(false);
    const modalDialogclassName = isMaximizedCurrecy ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';

    const CurrencyDragable = ({ isMinimizedCurrencymastertable, children }) => (
      isMinimizedCurrencymastertable ? children : <Draggable handle=".e4kmodal-headercurrency">{children}</Draggable>
    );   

    const handleMinimizecustomerupdatepage = () => {
      // console.log(isMinimizedproductpropertiesstockingtype,'Stocking Type Opem close updated..................',isOpenStockingType)
      // if (isOpenStockingType){
          setIsMinimizedCustomerupdatepage(!isMinimizedCustomerupdatepage);
      // }
      
  };

    const [isopencurrency , setcurrency]= useState(true)
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
    const heightPercentage = 75; // 30% of screen height
  
    const resizableWidth = (screenSize.width * widthPercentage) / 100;
    const resizableHeight = (screenSize.height * heightPercentage) / 100;


  return (
    <>
    {/* {isopencurrency()} */}
    <CurrencyDragable isMinimizedCurrencymastertable={isMinimizedCustomerupdatepage}>
    <div className={`modal fade mymodal ${(isMinimizedCustomerupdatepage === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumCurrency ? 'block' : 'none' }}>
    <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogclassName}>
       {/* <div className={`modal fade ${showModalMediumCurrency ? 'in' : ''}`} style={{ display: showModalMediumCurrency ? 'block' : 'none' }}>
      <div className={isMaximizedCurrecy ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup'}> */}
      
        <div className="modal-content-min medium-popup-div">
          <div className="modal-body">
            <div className="breadcomb-area e4kmodal-headers e4kmodal-headercurrency">
              <div className="container-fluid remove-padding">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="breadcomb-list">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className='popup-topbar-title'>
                          Currency
                       </div>

                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div className='popup-top-rightdiv'>
                          <button className="close modalMinimize" onClick={handleMinimizecustomerupdatepage}>
                                                                        <i className={`fa ${isMinimizedCustomerupdatepage ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                            <button type="button" className="btn-link popup-topbar-hidden" onClick={toggleMaximizeCurrency}>
                             {isMaximizedCurrecy ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                            </button>
                            <button type="button" className="close" onClick={handleCloseMediumCurrency}>
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
                    <div className="customer-newbold">Currency</div>
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
                          id="E4ktblCurrencygridmaster"
                          onEndEdit={handleEndEdit}
                          header={header}
                          dataSource={dataGridCurrency}
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
      {/* </div> */}
      </ResizableBox>
    </div>
    </CurrencyDragable>
    {showConfirmCurrency && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCurrency(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCurrency(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedCurrency}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
    </>
  );
};

export default E4kTblCurrencyGrid;
