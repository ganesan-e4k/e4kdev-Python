"use client";
import {  Grid } from 'smart-webcomponents-react/grid';
import {useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetCustomerCategory1Query,
  useCreateCustomerCategory1Mutation,
  useUpdateCustomerCategory1Mutation,
  useDeleteCustomerCategory1Mutation,
} from '../../store/services/Customer/e4kTblcustomercategory1';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';


const E4kTblCustomerCategory1Grid = ({ showModalMediumCustomerCategory1, handleCloseMediumCustomerCategory1 }) => {
    const [dataGrid, setDataGrid] = useState([]);

    const CompanySelectCusCategory1 = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectCusCategory1);
    const { data, error, isLoading, isError } = useGetCustomerCategory1Query(companyId);
    const [createCustomerCategory1, { isLoading: isCreating }] = useCreateCustomerCategory1Mutation();
    const [updateCustomerCategory1, { isLoading: isUpdating }] = useUpdateCustomerCategory1Mutation();
    const [deleteCustomerCategory1, { isLoading: isDeleting }] = useDeleteCustomerCategory1Mutation();
    const [isMaximizedCustomerCategory1, setIsMaximizedCustomerCategory1] = useState(false);
    const [showConfirmCategory1, setShowConfirmCategory1] = useState(false);
    const [recordToDeleteCategory1, setRecordToDeleteCategory1] = useState(null);

    useEffect(() => {
        if (data) {
          transformData();
        }
      }, [data]);
      
    
      const transformData = () => {
        if (!data) return [];
        const datagrid = data.E4kTblcustomercategory1.map(Category1 => ({
          category1id: parseInt(Category1.category1id, 10), // Ensure category1id is an integer
          companyid: Category1.companyid.companyid,
          category1name: Category1.category1name,
        }));
        setDataGrid(datagrid);
      };
    
      useEffect(() => {
        window.commandColumnCustomCommandtblCustomerCategory1 = function(row) {
          let deletedata = {
            companyid: row.data.companyid,
            category1id: Number(row.data.category1id),
          };
          setRecordToDeleteCategory1(deletedata);
          setShowConfirmCategory1(true);
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

    const appearance = {
        alternationCount: 2,
        showRowHeader: true,
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
        'category1id: number',
        'category1name: string',
        
        
      ]
    };
   


    const selection = {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    };

    const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };
    
      const editing = {
        enabled: true,
        addNewRow: {
          visible: true,
          position: "near",
        },
        commandColumn: {
          visible: true,
          displayMode: 'icon',
          dataSource: {
            'commandColumnDelete': { visible: false },
            'commandColumnEdit': { visible: true },
            'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandtblCustomerCategory1', visible: true, label: '' },
          },
        },
      };
    
      const columns = [
        { label: 'CompanyId', dataField: 'companyid', allowEdit: false, visible: false },
        { label: 'Category ID', dataField: 'category1id', allowEdit: false },
        { label: 'Category1 Name', dataField: 'category1name' },
      ];

      const message = useMemo(() => ({
        en: {
            addNewRow: '+New',
        },
    }), [dataGrid]);
     
      const handleCategory1Create = async (category1) => {
      
        if (category1.category1name == ''){
          toast.error('Please enter all required fields.', { position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
           });
          return;
        }
        try {
          const result = await createCustomerCategory1({
             ...category1,
          });
          if (result.data.E4kCustomercategory1create.success === true) {
            toast.success('Category created successfully', {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true,});
          } else {
            toast.error(`Error creating category: ${result.data.E4kCustomercategory1create.error}`, { position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          }
        }
        catch(error)
          {
          console.error('Mutation Error:', error);
          toast.error(`Error creating category: ${error.message}`, {  position: "top-center",
            autoClose: 500,
            hideProgressBar: true, });
        }
      
      };
    
    
     

      const handleCategory1Update  = async (category1) => {
         console.log("hcdcdhcbdhcdvb",category1)
        try{
          const result = await updateCustomerCategory1({
             ...category1,
        
              // category1id: parseInt(category1.category1id)
          });
          console.log("HGKJJJJJJJJJJJJ" ,{
            ...category1,
            
         })
         console.log("gchdgchdcdhcd", result)
          if (result.data.E4kCustomercategory1update.success === true) {
            toast.success('Category updated successfully', {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true,});
          } else {
            toast.error(`Error updating category: ${result.data.E4kCustomercategory1update.error}`, {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          }
        }
        catch(error){
          console.error('Mutation Error:', error.message);
          toast.error(`Error updating category:${error.message}`, { position: "top-center",
            autoClose: 5000,
            hideProgressBar: true, });
        }
      };
    
     

      const handleDeleteConfirmed = async () => { 
        if(recordToDeleteCategory1) {
          try{
            const result = await deleteCustomerCategory1({
              ...recordToDeleteCategory1,
              category1id: parseInt(recordToDeleteCategory1.category1id) 
            });
      

            
            if(result.data.E4kCustomercategory1delete.success === true){
              toast.success('Category deleted successfully', { position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
               });
            }
            else{
              toast.error(`Error deleting category: `, {position: "top-center",
                autoClose: 5000,
                hideProgressBar: true, });
            }
          }
          
          catch(error){
            console.error('Mutation Error:', error);
            toast.error(`Error deleting category : ${error.message}`, { 
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true, });
          }
        }
        setShowConfirmCategory1(false);
      };
    

      const handleEndEdit = (e) => {
          // e.preventDefault();
          const newCategory1 = e.detail.data;
   
          newCategory1.companyid = companyId;
         
  
          if (newCategory1.category1id!='' ) {
            console.log("vghschcdcd, ", newCategory1)
              handleCategory1Update(newCategory1);
          } else {
              handleCategory1Create(newCategory1);
          }
      };

    const [isMinimizedCustomerCategory1, setisMinimizedCustomerCategory1]= useState(false);

    const modalDialogClassName = isMaximizedCustomerCategory1 ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';
    const toggleMaximizeCustomerCategory = () => {
        setIsMaximizedCustomerCategory1(!isMaximizedCustomerCategory1);
    };

    const CustomerCategory1Dragable = ({ isMinimizedCustomercategory1mastertable, children }) => (
      isMinimizedCustomercategory1mastertable ? children : <Draggable handle=".e4kmodal-headercustomercategory1">{children}</Draggable>

    );   

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
    const widthPercentage = 60; // 50% of screen width
    const heightPercentage = 20; // 30% of screen height
  
    const resizableWidth = (screenSize.width * widthPercentage) / 100;
    const resizableHeight = (screenSize.height * heightPercentage) / 100;

        
        return (
            <> 
            <CustomerCategory1Dragable isMinimizedCustomercategory1mastertable={isMinimizedCustomerCategory1}>
            <div className={`modal fade mymodal ${(isMinimizedCustomerCategory1 === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumCustomerCategory1 ? 'block' : 'none' }}>
            <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}>

                {/* <div className={`modal fade ${showModalMediumCustomerCategory1 ? 'in' : ''}`} style={{ display: showModalMediumCustomerCategory1 ? 'block' : 'none' }}> */}
                    {/* <div className={modalDialogClassName}> */}
                    <div className="modal-content-min medium-popup-div">
                            <div className="modal-body">
                                <div className="breadcomb-area e4kmodal-headers e4kmodal-headercustomercategory1">
                                    <div className="container-fluid remove-padding">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               
                                                <div className="breadcomb-list">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="popup-topbar-title">
                                                          CustomerCategory1 
                                                        </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className='popup-top-rightdiv'>
                                                            <button className="close modalMinimize" onClick={handleMinimizecustomerCategory1page}>
                                                                        <i className={`fa ${isMinimizedCustomerCategory1 ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeCustomerCategory}>
                                                                    {isMaximizedCustomerCategory1 ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={handleCloseMediumCustomerCategory1}>
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
                                                <div className="customer-newbold">Customer Category1</div>
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
                                                        id="e4kTblcustomerCategory1grid"
                                                        onEndEdit={handleEndEdit}
                                                        header={header}
                                                        dataSource={dataGrid}
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
                                                        className='mx-auto'
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
                </CustomerCategory1Dragable>
                {showConfirmCategory1 && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCategory1(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCategory1(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmed}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
            </>
        );
    };
    
    export default E4kTblCustomerCategory1Grid;
    