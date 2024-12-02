import { Smart, Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetCustomerCategory2Query,
    useCreateCustomerCategory2Mutation,
    useUpdateCustomerCategory2Mutation,
    useDeleteCustomerCategory2Mutation,
} from '../../store/services/Customer/e4kTblCustomerCategory2';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

const E4kTblCustomerCategory2Grid = ({ showModalMediumCustomerCategory2, handleCloseMediumCustomerCategory2 }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanySelectCusCategory2 = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectCusCategory2);
    const { data, error, isLoading } = useGetCustomerCategory2Query(companyId);
    const [createCustomerCategory2, { isLoading: isCreating }] = useCreateCustomerCategory2Mutation();
    const [updateCustomerCategory2, { isLoading: isUpdating }] = useUpdateCustomerCategory2Mutation();
    const [deleteCustomerCategory2, { isLoading: isDeleting }] = useDeleteCustomerCategory2Mutation();
    const [isMaximizedCustomerCategory2, setisMaximizedCustomerCategory2] = useState(false);
    
    const [showConfirmCategory2, setShowConfirmCategory2] = useState(false);
    const [recordToDeleteCategory2, setRecordToDeleteCategory2] = useState(null);

    useEffect(() => {
        if (data) {
          transformDataCustomerCategory2();
        }
      }, [data]);
    
      const transformDataCustomerCategory2 = () => {
        if (!data) return [];
        
        const datagrid = data.E4kTblcustomercategory2.map(Category2 => ({ // Adjusted to Category2
          category2id: Number(Category2.category2id), // Adjusted to Category2
          companyid: Category2.companyid.companyid,
          category2name: Category2.category2name,
        }));
        setDataGrid(datagrid);
      };
    
      useEffect(() => {
        window.commandColumnCustomtblCustomerCategory2 = function(row) { // Adjusted to Category2
          let deletedata = {
            companyid: row.data.companyid,
            category2id: parseInt(row.data.category2id, 10), 
          };
          setRecordToDeleteCategory2(deletedata);
          setShowConfirmCategory2(true);
        };
      }, []);


      const message = useMemo(() => ({
        en: {
            addNewRow: '+New',
        },
    }), [companyId]);
    
      const filtering = {
        enabled: true,
        filterRow: {
          visible: true,
        },
      };

      const header = {
        visible: true,
        buttons: ['filter','sort','search']
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
        'category2id: number',
        'category2name: string',
        
        
      ]
    };

      const editing = {
        enabled: true,
        mode:'row',
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
            'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomtblCustomerCategory2', visible: true, label: '' }, // Adjusted to Category2
          },
        },
      };
    
      const selection = {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
      };
    
    
      const columns = [
        { label: 'CompanyId', dataField: 'companyid',  allowEdit: false, visible: false },
        { label: 'Category ID', dataField: 'category2id', allowEdit: false }, // Adjusted to Category2
        { label: 'Category Name', dataField: 'category2name' }, // Adjusted to Category2
      ];
    
    
      const handleCategory2Create  = async (newCategory2) => {
        if (newCategory2.category2name == ''){
          toast.error('Please enter all required fields.', {  position: "top-center",
            autoClose: 500,
            hideProgressBar: true, });
          return;
        }
        try{
          const result = await createCustomerCategory2 ({
            ...newCategory2,

          }) ;
          if (result.data.E4kCustomercategory2create.success === true) {
            toast.success('Category created successfully', { position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          } else {
            toast.error(`Error deleting category: ${result.data.E4kCustomercategory2create.error}`, {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          }
        } 
        catch (error) {
        console.error('Error creating category', error);
        toast.error(`Error creating category :${error.message}`, {  position: "top-center",
          autoClose: 500,
          hideProgressBar: true,});
      }
    };

    
    const handleCategory2Update = async (newCategory2) =>{
      try{
        const result = await updateCustomerCategory2({
          ...newCategory2,
          category2id: parseInt(newCategory2.category2id)
        });
        if (result.data.E4kCustomercategory2update.success === true){
          toast.success('Category updated successfully', { position: "top-center",
            autoClose: 500,
            hideProgressBar: true,});
        }
        
        else{
          toast.error(`Error deleting category: ${result.data.E4kCustomercategory2update.error}`, {position: "top-center",
            autoClose: 500,
            hideProgressBar: true, });
        }
      }
      catch (error) {
        console.error('Error updating category', error);
        toast.error(`Error updating category:${error.message}`, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
         });
      }
            
      }
    
    
      const  handleDeleteConfirmedcategory2 = async ()=>{
        if (recordToDeleteCategory2){
          try{
            const result = await deleteCustomerCategory2 ({
              ...recordToDeleteCategory2,
              category2id: parseInt(recordToDeleteCategory2.category2id, 10)
          });
          if (result.data.E4kCustomercategory2delete.success == true){
            toast.success('Category deleted successfully', { position: "top-center",
              autoClose: 500,
              hideProgressBar: true,});
          }
          else{
            toast.error(`Error deleting category: ${result.data.E4kCustomercategory2delete.error}`, {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          }
         }
         catch (error) {
          console.error('Error deleting category', error);
          toast.error(`Error deleting category:${error.message}`, { position: "top-center",
            autoClose: 500,
            hideProgressBar: true, });
        
        }
        setShowConfirmCategory2(false);
      };
    }

    const handleEndEdit = (e) => {
      const newCategory2 = e.detail.data;
      newCategory2.companyid = companyId;
    
   
      if (newCategory2.category2id!=''){
        handleCategory2Update(newCategory2);
      }
      else{
        handleCategory2Create(newCategory2);
      }
    };





    const toggleMaximizeCustomerCategory2 = () => {
        setisMaximizedCustomerCategory2(!isMaximizedCustomerCategory2);
    };
    const [isMinimizedcategory2Page,setisMinimizedcategory2Page] = useState(false);
    const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    
    const modalDialogClassName = isMaximizedCustomerCategory2 ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';


    const Category2Draggable =  ({ isMaximizedCustomerCategory2Mastertable, children }) => (
      isMaximizedCustomerCategory2Mastertable ? children : <Draggable handle=".e4kmodal-headercustomercategory2">{children}</Draggable>

    );   

    const handleMinimizedcategory2page = ()=>{
      setisMinimizedcategory2Page(!isMinimizedcategory2Page)

    };

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
    const heightPercentage = 78; // 30% of screen height
  
    const resizableWidth = (screenSize.width * widthPercentage) / 100;
    const resizableHeight = (screenSize.height * heightPercentage) / 100;
        
        return (
            <>  
            <Category2Draggable  isMaximizedCustomerCategory2Mastertable = {isMinimizedcategory2Page}>
                <div className={`modal fade mymodal ${(isMinimizedcategory2Page === true) ? 'min min-subpopup-footerbar' : 'in'}`} style={{ display: showModalMediumCustomerCategory2 ? 'block' : 'none' }}>
                <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}>
                        <div className="modal-content-min medium-popup-div">
                            <div className="modal-body">
                                <div className="breadcomb-area e4kmodal-headers e4kmodal-headercustomercategory2">
                                    <div className="container-fluid remove-padding">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="breadcomb-list">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                          <div className="popup-topbar-title">
                                                          Tbl Customer Category 2
                                                          </div>

                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className='popup-top-rightdiv'>
                                                            <button className="close modalMinimize" onClick={handleMinimizedcategory2page}>
                                                                        <i className={`fa ${isMinimizedcategory2Page ? 'fa-plus' : 'fa-minus'}`}></i>
                                                                </button>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeCustomerCategory2}>
                                                                    {isMaximizedCustomerCategory2 ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={handleCloseMediumCustomerCategory2}>
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
                                                <div className="customer-newbold">Tbl Customer Category 2</div>
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
                                                        id="e4kTblcustomerCategory2grid"
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
                                                        editing={editing}
                                                        appearance={appearance}
                                                        // className='mx-auto'
                                                        dataSourceSettings={ dataSourceSettings }
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
                </Category2Draggable>
                {showConfirmCategory2 && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCategory2(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCategory2(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedcategory2}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
            </>
        );
    };
    
    export default E4kTblCustomerCategory2Grid;
    