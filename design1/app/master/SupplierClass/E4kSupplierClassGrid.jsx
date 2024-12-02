import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector } from 'react-redux';
import { useEffect, useState,useMemo } from 'react';
import { toast } from 'react-toastify';
import {
    useGetSupplierClassQuery,
    useCreateSupplierClassMutation,
    useUpdateSupplierClassMutation,
    useDeleteSupplierClassMutation,
} from "../../store/services/Supplier/e4ksupplierclassApi";


const E4kSupplierClassGrid = ({ showModalMediumSupplierClass, handleCloseMediumSupplierClass }) => {
    const [dataGridSupplierClass, setdataGridSupplierClass] = useState([]);
    const CompanySelectTblSupplierClass = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectTblSupplierClass);
    const { data: Supplierclassdata, error, isLoading } = useGetSupplierClassQuery(companyId);
    const [createSupplierClass, { isLoading: isCreating }] = useCreateSupplierClassMutation();
    const [updateSupplierClass, { isLoading: isUpdating }] = useUpdateSupplierClassMutation();
    const [deleteSupplierClass, { isLoading: isDeleting }] = useDeleteSupplierClassMutation();
    const [isMaximizedCustomerClass, setisMaximizedCustomerClass] = useState(false);
    
    const [showConfirmSupplierClass, setshowConfirmSupplierClass] = useState(false);
    const [recordToDeleteSupplierClass, setrecordToDeleteCustomerClass] = useState(null);

    useEffect(() => {
        if (Supplierclassdata) {
            transformDataCustomerClass();
        }
    }, [Supplierclassdata]);

    const transformDataCustomerClass = () => {
        if (!Supplierclassdata) return [];
        const transformedData = Supplierclassdata.E4kTblsupplierclass.map(item => ({
            classid: parseInt(item.classid, 10), // Ensure classid is an integer
            companyid: item.companyid.companyid,
            className: item.className, // Corrected from item.classname
        }));
        setdataGridSupplierClass(transformedData);
    };

    useEffect(() => {
        window.commandColumnCustomCommandtblSupplierClass = function(row) {
            let dataToDelete = {
                companyid: row.data.companyid,
                classid: parseInt(row.data.classid, 10), // Ensure classid is an integer
            };
            setrecordToDeleteCustomerClass(dataToDelete);
            setshowConfirmSupplierClass(true);
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
    
    const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };

    const message = useMemo(() => ({
    en: {
        addNewRow: '+New',
    },
    }), [companyId]);

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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandtblSupplierClass', visible: true, label: '' },
            },
        },
    };

    const dataSourceSettings = {
		dataFields: [
			'companyid: string',
			'classid: number',
			'className: string',
           
			
		]
	};

    const selection = {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    };


    const columns = [
        { label: 'CompanyId', dataField: 'companyid', defaultValue: '001', visible: false , allowEdit: false },
        { label: 'Class ID', dataField: 'classid', allowEdit: false },
        { label: 'Class Name', dataField: 'className' },
    ];

    const handleClassCreate = async (categoryClass) => {
        if (!categoryClass || !categoryClass.className) {
            toast.error('Please enter all required fields.',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
            return;
        }

        try {
            const result = await createSupplierClass({
                ...categoryClass,
                classid: parseInt(categoryClass.classid, 10) // Ensure classid is an integer
            });
            if(result.data.E4kTblsupplierclasscreate.success === true) {
                
                toast.success('Class created successfully',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
            else{
                
                toast.error('Error creating class',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            
            toast.error('Error creating class',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
        }
    };

    const handleClassUpdate = async (categoryClass) => {
        try {
            const result = await updateSupplierClass({
                ...categoryClass,
                classid: parseInt(categoryClass.classid, 10) // Ensure classid is an integer
            });
            if(result.data.E4kTblsupplierclassupdate.success === true) {
                
                toast.success('Class updated successfully',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            } else {
                
                toast.error('Error updating class',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            
            toast.error('Error updating class',{
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
        }
    };

    const handleDeleteConfirmedClass = async () => {
        if (recordToDeleteSupplierClass) {
            try {
                const result = await deleteSupplierClass({
                    ...recordToDeleteSupplierClass,
                    classid: parseInt(recordToDeleteSupplierClass.classid, 10) // Ensure classid is an integer
                });
                if(result.data.E4kTblsupplierclassdelete.success===true) {
                    
                    toast.success('Class deleted successfully',{
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                }
                else{
                    
                    toast.error('Error deleting class',{
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                }
            } catch (error) {
                
                toast.error('Error deleting class',{
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        }
        setshowConfirmSupplierClass(false);
    };
    
    const handleEndEdit =(e)=>{
        const newCategoryClass = e.detail.data;
        newCategoryClass.companyid = companyId;
        if (newCategoryClass.classid!=null) {
            handleClassUpdate(newCategoryClass);
        } else {
            handleClassCreate(newCategoryClass);
        }
    }

    const modalDialogClassName = isMaximizedCustomerClass ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';
    const toggleMaximizeCustomerClass = () => {
        setisMaximizedCustomerClass(!isMaximizedCustomerClass);
    };


    return (
        <>
            <div className={`modal fade ${showModalMediumSupplierClass ? 'in' : ''}`} style={{ display: showModalMediumSupplierClass ? 'block' : 'none' }}>
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
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCustomerClass}>
                                                                {isMaximizedCustomerClass ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>

                                                            <button type="button" className="close" onClick={handleCloseMediumSupplierClass}>
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
                                            <div className="customer-newbold">Supplier Class</div>
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
                                                    id="e4ktblCustomerClassGrid"
                                                    onEndEdit={handleEndEdit}
                                                    header={header}
                                                    dataSource={dataGridSupplierClass}
                                                    filtering={filtering}
                                                    columns={columns}
                                                    behavior={behavior}
                                                    paging={paging}
                                                    pager={pager}
                                                    sorting={sorting}
                                                    selection={selection}
                                                    editing={editing}
                                                    appearance={appearance}
                                                    dataSourceSettings={dataSourceSettings}
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
            {showConfirmSupplierClass && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setshowConfirmSupplierClass(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setshowConfirmSupplierClass(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmedClass}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kSupplierClassGrid;
