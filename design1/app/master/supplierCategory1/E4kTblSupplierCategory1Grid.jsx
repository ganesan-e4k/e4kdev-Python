import {  Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetSupplierCategory1Query,
  useCreateSupplierCategory1Mutation,
  useUpdateSupplierCategory1Mutation,
  useDeleteSupplierCategory1Mutation,
} from '../../store/services/Supplier/e4kTblsuppliercategory1';


const E4kTblSupplierCategory1Grid = ({ showModalMediumSupplierCategory1, handleCloseMediumSupplierCategory1 }) => {
    const [dataGridSupplierdata, setDataGridSupplierdata] = useState([]);

    const CompanySelectCusCategory1 = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectCusCategory1);
    const { data: Suppliercategory1data, error, isLoading, isError } = useGetSupplierCategory1Query(companyId);
    const [createSupplierCategory1, { isLoading: isCreating }] = useCreateSupplierCategory1Mutation();
    const [updateSupplierCategory1, { isLoading: isUpdating }] = useUpdateSupplierCategory1Mutation();
    const [deleteSupplierCategory1, { isLoading: isDeleting }] = useDeleteSupplierCategory1Mutation();
    const [isMaximizedSupplierCategory1, setIsMaximizedSupplierCategory1] = useState(false);
    const [showConfirmCategory1, setShowConfirmCategory1] = useState(false);
    const [recordToDeleteCategory1, setRecordToDeleteCategory1] = useState(null);

    useEffect(() => {
        if (Suppliercategory1data) {
          transformData();
        }
      }, [Suppliercategory1data]);
      
    
      const transformData = () => {
        if (!Suppliercategory1data) return [];
        const datagrid = Suppliercategory1data.E4kTblsuppliercategory1.map(Category1 => ({
          category1id: parseInt(Category1.category1id, 10), // Ensure category1id is an integer
          companyid: Category1.companyid.companyid,
          category1name: Category1.category1name,
        }));
        setDataGridSupplierdata(datagrid);
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
        { label: 'Category Name', dataField: 'category1name' },
      ];
    
     
      const handleCategory1Create = async (category1) => {
      
        if (!category1){
          toast.error('Please enter all required fields.', { position: 'top-center' });
          return;
        }
        try {
          const result = await createSupplierCategory1({
             ...category1,
          });
          if (result.data.E4kTblsuppliercategory1create.success === true) {
            toast.success('Category created successfully', {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true,});
          } else {
            toast.error(`Error creating category: ${result.data.E4kTblsuppliercategory1create.error}`, { position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          }
        }
        catch(error)
          {
          console.error('Mutation Error:', error);
          toast.error('Error creating category', {  position: "top-center",
            autoClose: 500,
            hideProgressBar: true, });
        }
      
      };
    
    
     

      const handleCategory1Update  = async (category1) => {
   
        try{
          const result = await updateSupplierCategory1({
             ...category1,
              category1id: parseInt(category1.category1id)
          });
          console.log("HGKJJJJJJJJJJJJ" ,result)
          if (result.data.E4kTblsuppliercategory1update.success == true) {
            toast.success('Category updated successfully', {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true,});
          } else {
            toast.error(`Error updating category: ${result.data.E4kTblsuppliercategory1update.error}`, {  position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          }
        }
        catch(error){
          console.error('Mutation Error:', error);
          toast.error('Error updating category', { position: "top-center",
            autoClose: 500,
            hideProgressBar: true, });
        }
      };
    
     

      const handleDeleteConfirmed = async () => { 
        if(recordToDeleteCategory1) {
          try{
            const result = await deleteSupplierCategory1({
              ...recordToDeleteCategory1,
              category1id: parseInt(recordToDeleteCategory1.category1id) 
            });
      

            
            if(result.data.E4kTblsuppliercategory1delete.success === true){
              toast.success('Category deleted successfully', { position: 'top-center' });
            }
            else{
              toast.error(`Error deleting category: ${result.data.E4kTblsuppliercategory1delete.error}`, {position: "top-center",
                autoClose: 500,
                hideProgressBar: true, });
            }
          }
          
          catch(error){
            console.error('Mutation Error:', error);
            toast.error('Error deleting category', { position: "top-center",
              autoClose: 500,
              hideProgressBar: true, });
          }
        }
        setShowConfirmCategory1(false);
      };
    

      const handleEndEdit = (e) => {
          e.preventDefault();
          const newCategory1 = e.detail.data;
          newCategory1.companyid = companyId;
         
  
          if (newCategory1.category1id!=null) {
              handleCategory1Update(newCategory1);
          } else {
              handleCategory1Create(newCategory1);
          }
      };

    const modalDialogClassName = isMaximizedSupplierCategory1 ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';
    const toggleMaximizeCustomerCategory = () => {
        setIsMaximizedSupplierCategory1(!isMaximizedSupplierCategory1);
    };

        
        return (
            <>
                <div className={`modal fade ${showModalMediumSupplierCategory1 ? 'in' : ''}`} style={{ display: showModalMediumSupplierCategory1 ? 'block' : 'none' }}>
                    <div className={modalDialogClassName}>
                        <div className="modal-content medium-popup-div">
                            <div className="modal-body">
                                <div className="breadcomb-area">
                                    <div className="container-fluid remove-padding">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="breadcomb-list">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className='popup-top-rightdiv'>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeCustomerCategory}>
                                                                    {isMaximizedSupplierCategory1 ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={handleCloseMediumSupplierCategory1}>
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
                                                <div className="customer-newbold">Tbl supplier Category1</div>
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
                                                        dataSource={dataGridSupplierdata}
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
                                                        className='mx-auto'
                                                        messages={message}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    
    export default E4kTblSupplierCategory1Grid;
    