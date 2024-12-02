import { useMemo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {  Grid } from 'smart-webcomponents-react/grid';
import {
  useGetVatCodesQuery,
  useCreateVatCodeMutation,
  useUpdateVatCodeMutation,
  useDeleteVatCodeMutation,
} from '../../store/services/Customer/e4kTblVatcode'; // Adjust the path as per your project structure
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';






const E4kTblAccVatCodesGrid = ({ showModalMediumVatCodes, handleCloseMediumVatCodes }) => {
  const [dataGridVatcode, setdataGridVatcode] = useState([]);

  const CompanySelectAccvatcodes = useSelector((state) => state.selectCompanyid.Companyid);
  const [companyId, setCompanyId] = useState(CompanySelectAccvatcodes); // Adjust as per your company ID logic
  const { data, error, isLoading, isError } = useGetVatCodesQuery(companyId);
  const [createVatCode, { isLoading: isCreating }] = useCreateVatCodeMutation();
  const [updateVatCode, { isLoading: isUpdating }] = useUpdateVatCodeMutation();
  const [deleteVatCode, { isLoading: isDeleting }] = useDeleteVatCodeMutation();
  const [isMaximizedVatcode, setisMaximizedVatcode] = useState(false);
  
  const [showConfirmVatCode, setShowConfirmVatCode] = useState(false);
  const [recordToDeleteVatCode, setRecordToDeleteVatCode] = useState(null);


  useEffect(() => {
    if (data) {
      transformDataVatcode();
    }
  }, [data]);

  const transformDataVatcode = () => {
    if (!data) return [];
    const dataGridVatcode = data.E4kTblaccvatcodes.map((vatCode) => ({
      companyid: vatCode.companyid.companyid,
      description: vatCode.description,
      sagecode: vatCode.sagecode,
      vatcode: vatCode.vatcode,
      vatpercent: vatCode.vatpercent,
    }));
    setdataGridVatcode(dataGridVatcode);
  };

  useEffect(() => {
    window.commandColumnCustomCommandtblAccountVatcode = function (row) {
      const deletedata = {
        companyid: row.data.companyid,
        vatcode: row.data.vatcode,
      };
      setRecordToDeleteVatCode(deletedata);
      setShowConfirmVatCode(true);
    };
  }, []);



    
      const filtering = {
        enabled: true,
        filterRow: {
          visible: true,
        },
      };
    
      const behavior = {
        columnResizeMode: 'growAndShrink',
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
    
      const editing = {
        enabled: true,
        mode:'row',
        addNewRow: {
          visible: true,
          position: 'near',
        },
        commandColumn: {
          visible: true,
          displayMode: 'icon',
          dataSource: {
            'commandColumnDelete': { visible: false },
            'commandColumnEdit': { visible: true },
            'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandtblAccountVatcode', visible: true, label: '' }, // Adjusted to Category2
          },
        },
      };
    
      const selection = {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
      };
    
      const header = {
        visible: true,
      };
    
      const columns = [
        { label: 'CompanyId', dataField: 'companyid',  allowEdit: false, visible: false },
        { label: 'VAT Code', dataField: 'vatcode', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        { label: 'VAT Percent', dataField: 'vatpercent' },
        { label: 'Sage Code', dataField: 'sagecode' },
      ];
    
      const handleVatCodeCreate = async (vatCode) => {
        if (!vatCode || !vatCode.description || !vatCode.sagecode || !vatCode.vatpercent) {
          toast.error('Please enter all required fields.',{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
        }
    
        try {
          const result = await createVatCode({
            ...vatCode,
            vatpercent: parseFloat(vatCode.vatpercent),
          });
          console.log("Created", result)
          if(result.data.E4kTblaccvatcodescreate.success === true){
            toast.success('VAT code created successfully',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }
          else{
            toast.error(`Error creating VAT code:${result.data.E4kTblaccvatcodescreate.error}`,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }
        } catch (error) {
          
          toast.error(`Error creating VAT code: ${error.message}`,{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
        }
      };
    
      const handleVatCodeUpdate = async (vatCode) => {
        try {
          const result = await updateVatCode({
            ...vatCode,
            vatcode: parseInt(vatCode.vatcode),
            vatpercent: parseFloat(vatCode.vatpercent),
            companyid: companyId,
          });
          if(result.data.E4kTblaccvatcodesupdate.success=== true) {
            toast.success('VAT code updated successfully',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }
          else{
            toast.error(`Error updating VAT code: ${result.data.E4kTblaccvatcodesupdate.error}`,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }
         
        } catch (error) {
        
          toast.error(`Error updating VAT code:${error.message}`,{
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
        });
        }
      };
    
      const handleDeleteVatcode = async () => {
        if (recordToDeleteVatCode) {
          try {
            const result = await deleteVatCode({
              ...recordToDeleteVatCode,
              vatcode: parseInt(recordToDeleteVatCode.vatcode),
            
            });
            if(result.data.E4kTblaccvatcodesdelete.success=== true){
              toast.success('VAT code deleted successfully',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
              });
            }
            else{
              toast.error(`Error deleting VAT code:${error.message}`,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
              });
            }
            
          } catch (error) {
            
            toast.error(`Error deleting VAT code: ${error.message}`,{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
          }
        }
        setShowConfirmVatCode(false);
      };
    
      // const handleEndEdit = (e) => {
      //   //e.preventDefault();
      //   const newVatCode = e.detail.data;
      //   newVatCode.companyid = companyId;
    
      //   if (newVatCode.vatcode) {
      //     handleVatCodeUpdate(newVatCode);
      //   } else {
      //     handleVatCodeCreate(newVatCode);
      //   }
      // };

      const handleEndEdit = async(e) => {
        const newVatCode = e.detail.data;
        console.log("GHFFFFFFFF", newVatCode)
        newVatCode.companyid = companyId;
        if(newVatCode.vatcode!=''){
          handleVatCodeUpdate(newVatCode);
        }
        else{
          handleVatCodeCreate(newVatCode);
        }
      };

    const [isMaximizedVatcodeMaseterTable, setisMaximizedVatcodeMaseterTable] = useState(false);



  
    
    const modalDialogClassName = isMaximizedVatcode ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';
    const toggleMaximizeVatcodes = () => {
      setisMaximizedVatcode(!isMaximizedVatcode);
  };

   const VatcodeDraggable = ({ isMinimizedCustomeVatcode, children }) => (
    isMinimizedCustomeVatcode ? children : <Draggable handle=".e4kmodal-headerVatCode">{children}</Draggable>
  );   
  const handleMinimizedVatcode = () =>{
    setisMaximizedVatcodeMaseterTable(!isMaximizedVatcodeMaseterTable);

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
  const heightPercentage = 75; // 30% of screen height

  const resizableWidth = (screenSize.width * widthPercentage) / 100;
  const resizableHeight = (screenSize.height * heightPercentage) / 100;


        return (
            <> 
              <VatcodeDraggable isMinimizedCustomeVatcode={isMaximizedVatcodeMaseterTable}>
                <div className={`modal fade mymodal ${(isMaximizedVatcodeMaseterTable === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumVatCodes ? 'block' : 'none' }}>
                <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}>
                   <div className="modal-content-min medium-popup-div">
                      <div className="modal-body">
                          <div className="breadcomb-area e4kmodal-headers e4kmodal-headerVatCode">
                                <div className="container-fluid remove-padding">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="breadcomb-list">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-topbar-title'>
                                                           Account Vat Code
                                                          </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className='popup-top-rightdiv'>
                                                            <button className="close modalMinimize" onClick={handleMinimizedVatcode}>
                                                                        <i className={`fa ${isMaximizedVatcodeMaseterTable ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeVatcodes}>
                                                                    {isMaximizedVatcode ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={handleCloseMediumVatCodes}>
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
                                                <div className="customer-newbold">Account Vat Code</div>
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
                                                        id="e4kTblAccountVatCodegrid"
                                                        onEndEdit={handleEndEdit}
                                                        header={header}
                                                        dataSource={dataGridVatcode}
                                                        filtering={filtering}
                                                        columns={columns}
                                                        behavior={behavior}
                                                        paging={paging}
                                                        pager={pager}
                                                        sorting={sorting}
                                                        selection={selection}
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
                        {/* </div> */}
                    </div>
                    </ResizableBox>
                </div>
                </VatcodeDraggable>
                {showConfirmVatCode && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmVatCode(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmVatCode(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteVatcode}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
            </>
        );
    };
    
    export default E4kTblAccVatCodesGrid;
    