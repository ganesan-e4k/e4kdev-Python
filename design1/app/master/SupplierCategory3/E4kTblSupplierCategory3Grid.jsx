import {  Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetSupplierCategory3Query,
    useCreateSupplierCategory3Mutation,
    useUpdateSupplierCategory3Mutation,
    useDeleteSupplierCategory3Mutation,
  
} from '../../store/services/Supplier/e4kTblsuppliercategory3';


const E4kTblSupplierCategory3Grid = ({ showModalMediumSupplierCategory3, handleCloseMediumSupplierCategory3 }) => {
    const [dataGridSupplierCategory3, setdataGridSupplierCategory3] = useState([]);
    const CompanySelectCusCategory3 = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectCusCategory3);
    const { data: suppliercategory3data, error, isLoading } = useGetSupplierCategory3Query(companyId);
    const [createSupplierCategory3, { isLoading: isCreating }] = useCreateSupplierCategory3Mutation();
    const [updateSupplierCategory3, { isLoading: isUpdating }] = useUpdateSupplierCategory3Mutation();
    const [deleteSupplierCategory3, { isLoading: isDeleting }] = useDeleteSupplierCategory3Mutation();
    const [isMaximizedCustomerCategory3, setisMaximizedCustomerCategory3] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmCategory3, setShowConfirmCategory3] = useState(false);
    const [recordToDeleteCategory3, setRecordToDeleteCategory3] = useState(null);

    useEffect(() => {
        if (suppliercategory3data) {
            transformDataCustomerCategory3();
            
        }
    }, [suppliercategory3data]);

    const transformDataCustomerCategory3 = () => {
        if (!suppliercategory3data) return [];
        const dataGridCustomerCategory3 = suppliercategory3data.E4kTblsuppliercategory3.map(category3 => ({
            category3id: parseInt(category3.category3id, 10),
            companyid: category3.companyid.companyid,
            category3name: category3.category3name,
        }));
        setdataGridSupplierCategory3(dataGridCustomerCategory3);
    };

    useEffect(() => {
        window.commandColumnCustomtblSupplierCategory3 = function(row) {
            let deletedata = {
                companyid: row.data.companyid,
                category3id: parseInt(row.data.category3id, 10),
            };
            setRecordToDeleteCategory3(deletedata);
            setShowConfirmCategory3(true);
        };
    }, []);


    const toggleMaximizeCustomerCategory3 = () => {
        setisMaximizedCustomerCategory3(!isMaximizedCustomerCategory3);
    };

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

    const header = {
        visible: true,
        buttons: ['filter','sort','search']
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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomtblSupplierCategory3', visible: true, label: '' },
            },
        },
    };

    const selection = {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    };

    const dataSourceSettings = {
        dataFields: [
            'companyid: string',
            'category3id: number',
            'category3name: string',
            
            
          ]

    };

 

    const columns = [
        { label: 'CompanyId', dataField: 'companyid', allowEdit: false,  visible: false },
        { label: 'Category3ID', dataField: 'category3id', allowEdit: false },
        { label: 'category3name', dataField: 'category3name' },
    ];

    
    const handleCategory3Create = async (Category3) =>{
        if(!Category3){
            toast.error('Please enter all required fields.');
            return;
        }
        try{
            const result = await createSupplierCategory3 ({
                ...Category3,
            }) ;
                if(result.data.E4kTblsuppliercategory3create.success == true) {
                    toast.success('Category created successfully', { position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true, });
                }
                else {
                    toast.error(`Error deleting category: ${result.data.E4kTblsuppliercategory3create.error}`, {  
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true, 
                    });
                }
            
        }
        catch(error){
            console.error('Mutation Error:', error);
            toast.error('Error creating category', {  position: "top-center",
                autoClose: 500,
                hideProgressBar: true, });
        }
    
    } ;

  
    const handleCategory3Update = async (Category3) => {
        try{
            const result = await updateSupplierCategory3({
                ...Category3,
                category3id: parseInt(Category3.category3id, 10)
            });
            if(result.data.E4kTblsuppliercategory3update.success === true) {
               toast.success('Category updated successfully', { position: 'top-center' });
            }
            else {
                toast.error(`Error updating category: ${result.data.E4kTblsuppliercategory3update.error}`, { position: 'top-center' });
            }

        }
        catch(error){
            console.error('Mutation Error:', error);
            toast.error('Error updating category', { position: 'top-center' });
        }
    };


    const handleDeleteConfirmedcategory3 = async () => {
        if (recordToDeleteCategory3) {
            try {
                const result = await deleteSupplierCategory3({
                    ...recordToDeleteCategory3,
                    category3id: parseInt(recordToDeleteCategory3.category3id, 10)
                });
                if(result.data.E4kTblsuppliercategory3delete.success === true) {
                    toast.success('Category deleted successfully', { position: 'top-center',autoClose: 500, hideProgressBar: true });
                }
                else{
                    toast.error(`Error deleting category: ${result.data.E4kTblsuppliercategory3delete.error}`, {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                }
                
            } catch (error) {
                console.error('Mutation Error:', error);
                toast.error('Error deleting category', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        }
        setShowConfirmCategory3(false);
    };


    const handleEndEdit = (e) =>{
        e.preventDefault();
        const newCategory3 = e.detail.data;
        newCategory3.companyid = companyId;
        if (newCategory3.category3id) {
            handleCategory3Update(newCategory3);
        } else {
            handleCategory3Create(newCategory3);
        }

    }
        const modalDialogClassName = isMaximizedCustomerCategory3 ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';
        
        return (
            <>
                <div className={`modal fade ${showModalMediumSupplierCategory3 ? 'in' : ''}`} style={{ display: showModalMediumSupplierCategory3 ? 'block' : 'none' }}>
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
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeCustomerCategory3}>
                                                                    {isMaximizedCustomerCategory3 ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>

                                                                <button type="button" className="close" onClick={handleCloseMediumSupplierCategory3}>
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
                                                <div className="customer-newbold">Tbl Supplier Category3 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="medium-modal-section">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                {errorMessage && (
                                                    <div className="alert alert-danger">
                                                        {errorMessage}
                                                    </div>
                                                )}
                                                {isLoading ? (
                                                    "Loading..."
                                                ) : (
                                                    <Grid
                                                        id="TblcustomerCategory3grid"
                                                        onEndEdit={handleEndEdit}
                                                        header={header}
                                                        dataSource={dataGridSupplierCategory3}
                                                        filtering={filtering}
                                                        columns={columns}
                                                        behavior={behavior}
                                                        paging={paging}
                                                        pager={pager}
                                                        sorting={sorting}
                                                        selection={selection}
                                                        editing={editing}
                                                        dataSourceSettings={dataSourceSettings}
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
                {showConfirmCategory3 && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCategory3(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCategory3(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedcategory3}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
            </>
        );
    };
    
    export default E4kTblSupplierCategory3Grid;
    