

'use client';

import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useRef } from 'react';
import { useSelector} from'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductCommodityCodeQuery,
    useCreateProductCommodityCodeMutation,
    useUpdateProductCommodityCodeMutation,
    useDeleteProductCommodityCodeMutation,
} from '../../store/services/e4kTblProductCommodityCode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const E4kTblProductCommodityCodeGrid = ({ showModalMediumCommodityCode, handleCloseMediumCommodityCode }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const gridRef1 = useRef(null);
    const CompanyProductCommodity = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductCommodity);
    const { data, error, isLoading, isError } = useGetProductCommodityCodeQuery(companyid);
    const [createProductCommodityCode, { isLoading: isCreating }] = useCreateProductCommodityCodeMutation();
    const [updateProductCommodityCode, { isLoading: isUpdating }] = useUpdateProductCommodityCodeMutation();
    const [deleteProductCommodityCode, { isLoading: isDeleting }] = useDeleteProductCommodityCodeMutation();
    const [isMaximizedCommodityCode, setIsMaximizedCommodityCode] = useState(false);
    const [Isvalid, setIsvalid] = useState(false);

    //////////////pop up delete
    const [showConfirmCommotitycode, setShowConfirmCommotitycode] = useState(false);
    const [recordToDeleteCommotitycode, setRecordToDeleteCommotityCode] = useState(null);

    useEffect(() => {
        if (data) {
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductCommoditycodes.map((category, index) => ({
            id: index + 1, // Assign an incremental id starting from 1
            commoditycode: category.commodityCode,
            companyid: category.companyid.companyid,
            description: category.description,
        }));
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand5 = function(row) {
            let deletedata = {
                companyid: row.data.companyid,
                commoditycode: row.data.commoditycode
            };
            setRecordToDeleteCommotityCode(deletedata);
            setShowConfirmCommotitycode(true);
            //handleProductCommodityCodeDelete(deletedata);
        };
    }, []);

    const toggleMaximizeCommodityCode = () => {
        setIsMaximizedCommodityCode(!isMaximizedCommodityCode);
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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand5', visible: true, label: '' },
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
        buttons: ['filter','sort','search']
      };

    const columns = [
        { label: 'ID', dataField: 'id', visible: false }, // Hidden id column
        { label: 'CompanyId', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Commodity Code', dataField: 'commoditycode', allowEdit: true },
        { label: 'Description', dataField: 'description',allowEdit: true },
    ];

    const handleProductCommoditycodeCreate = async (category) => {
        try {
            const result = await createProductCommodityCode(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductCommoditycodesCreate.commoditycode === "Success") {
                    toast.success('Created',{position: "top-center"});
                    transformData(); // Refresh the grid data
                } else {
                    toast.error(result.data.E4kTblproductCommoditycodesCreate.commoditycode,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCommodityCodeUpdate = async (category) => {
        try {
            const result = await updateProductCommodityCode(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductCommoditycodesUpdate.commoditycode === "Success") {
                    toast.success('Updated',{position: "top-center"});
                    transformData(); // Refresh the grid data
                } else {
                    toast.error(result.data.E4kTblproductCommoditycodesUpdate.commoditycode,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCommodityCodeDelete = async (category) => {
        try {
            const result = await deleteProductCommodityCode(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductCommoditycodesDelete);
                if (result.data.E4kTblproductCommoditycodesDelete.success === "Success") {
                    toast.success('Deleted',{position: "top-center"});
                    //transformData(); // Refresh the grid data
                } else {
                    toast.error(result.data.E4kTblproductCommoditycodesDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmCommodityCodeDelete = async () => {
        setShowConfirmCommotitycode(false);
        if (recordToDeleteCommotitycode) {
            try {
                const result = await deleteProductCommodityCode(recordToDeleteCommotitycode);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductCommoditycodesDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductCommoditycodesDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handleEndEdit = async (e) => {
        e.preventDefault();
        const newCategory = e.detail.data;
        newCategory.companyid = companyid
        //console.log('newData form data: ', e.detail.data);

        // Check if the row has an id
        if (newCategory.id) {
            // Existing record - update
            setIsvalid(false)
            if (newCategory.commoditycode && newCategory.companyid && newCategory.description) {
                await handleProductCommodityCodeUpdate(newCategory);
            }
        } else {
            // New record - create
            setIsvalid(true)
            if (newCategory.commoditycode && newCategory.companyid && newCategory.description) {
                const newId = dataGrid.length > 0 ? Math.max(...dataGrid.map(item => item.id)) + 1 : 1;
                newCategory.id = newId; // Assign a new id
                await handleProductCommoditycodeCreate(newCategory);
            }
        }
    };
    const modalDialogclassName = isMaximizedCommodityCode ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumCommodityCode ? 'in' : ''}`} style={{ display: showModalMediumCommodityCode ? 'block' : 'none' }}>
                {/* <div className="modal-dialog medium-popup">
                    <div className="modal-content"> */}
                <div className={modalDialogclassName}>
                   
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCommodityCode}>
                                                            {isMaximizedCommodityCode ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseMediumCommodityCode}>
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
                                            <div className="customer-newbold">Tbl Product Commodity Codes </div>
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
                                                    ref={gridRef1}
                                                    id="tblproductcommoditycodegrid"
                                                    onEndEdit={handleEndEdit}
                                                    header={header}
                                                    dataSource={dataGrid}
                                                    filtering={filtering}
                                                    columns={columns.map(col => ({
                                                        ...col,
                                                        allowEdit: col.dataField !== 'commoditycode' || Isvalid
                                                    }))}
                                                    //columns={columns}
                                                    behavior={behavior}
                                                    paging={paging}
                                                    pager={pager}
                                                    sorting={sorting}
                                                    selection={selection}
                                                    editing={editing}
                                                    appearance={appearance}
                                                    className='mx-auto'
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
                    {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
            {showConfirmCommotitycode && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCommotitycode(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCommotitycode(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmCommodityCodeDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductCommodityCodeGrid;

