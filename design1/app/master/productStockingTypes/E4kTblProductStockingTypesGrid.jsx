'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useRef,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductStockingTypesQuery,
    useCreateProductStockingTypesMutation,
    useUpdateProductStockingTypesMutation,
    useDeleteProductStockingTypesMutation,
} from '../../store/services/e4kTblProductStockingTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const E4kTblProductStockingTypesGrid = ({ showModalMediumStockingTypes, handleCloseMediumStockingTypes }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const gridStockingTypes = useRef(null);
    const CompanyProductStockingtype = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductStockingtype);
    const [stockingtype, setStockingtype] = useState("");
    const { data, error, isLoading, isError } = useGetProductStockingTypesQuery({companyid:companyid,stockingtype:stockingtype});
    const [createProductStockingTypes, { isLoading: isCreating }] = useCreateProductStockingTypesMutation();
    const [updateProductStockingTypes, { isLoading: isUpdating }] = useUpdateProductStockingTypesMutation();
    const [deleteProductStockingTypes, { isLoading: isDeleting }] = useDeleteProductStockingTypesMutation();
    const [isMaximizedStockingTypes, setIsMaximizedStockingTypes] = useState(false);
    const [Isvalid, setIsvalid] = useState(false);

    //////////////pop up delete
    const [showConfirmStockingTypes, setShowConfirmStockingTypes] = useState(false);
    const [recordToDeleteStockingTypes, setRecordToDeleteStockingTypes] = useState(null);

    useEffect(() => {
        if (data) {
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductStockingTypes.map((category, index) => ({
            id: index + 1, // Assign an incremental id starting from 1
            stockingtype: category.stockingtype,
            companyid: category.companyid.companyid,
            description: category.description,
        }));
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand9 = function(row) {
            let deletedata = {
                companyid: row.data.companyid,
                stockingtype: row.data.stockingtype
            };
            setRecordToDeleteStockingTypes(deletedata);
            setShowConfirmStockingTypes(true);
            //handleProductStockingTypesDelete(deletedata);
        };
    }, []);

    const toggleMaximizeStockingTypes = () => {
        setIsMaximizedStockingTypes(!isMaximizedStockingTypes);
    };

    // const dataSource5 = useMemo(() => new Smart.DataAdapter({
    //     dataSource: dataGrid,
    //     dataFields: [
          
    //       'companyid: string',
    //       'stockingtype: string',
    //       'description: string',
          
    //     ],
    //   }), [dataGrid]);

      const dataSourceSettingsStockingType = {
		dataFields: [
			
            'companyid: string',
            'stockingtype: string',
            'description: string',
			
		]
	};

    const dataSourceStockingType = useMemo(() => dataGrid, [dataGrid]);

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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand9', visible: true, label: '' },
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
        { label: 'Stocking Type', dataField: 'stockingtype', allowEdit: false },
        { label: 'Description', dataField: 'description' },
    ];

    const handleProductStockingTypesCreate = async (category) => {
        try {
            const result = await createProductStockingTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductstockingtypesCreate.stockingType === "Success") {
                    toast.success('Created',{position: "top-center"});
                    //transformData(); // Refresh the grid data
                } else {
                    toast.error(result.data.E4kTblproductProductstockingtypesCreate.stockingType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductStockingTypesUpdate = async (category) => {
        try {
            const result = await updateProductStockingTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductstockingtypesUpdate.stockingType === "Success") {
                    toast.success('Updated',{position: "top-center"});
                   // transformData(); // Refresh the grid data
                } else {
                    toast.error(result.data.E4kTblproductProductstockingtypesUpdate.stockingType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductStockingTypesDelete = async (category) => {
        try {
            const result = await deleteProductStockingTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductstockingtypesDelete);
                if (result.data.E4kTblproductProductstockingtypesDelete.success === "Success") {
                    toast.success(result.data.E4kTblproductProductstockingtypesDelete.success,{position: "top-center"});
                    
                } else {
                    toast.error(result.data.E4kTblproductProductstockingtypesDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmStockingTypesDelete = async () => {
        setShowConfirmStockingTypes(false);
        if (recordToDeleteStockingTypes) {
            try {
                const result = await deleteProductStockingTypes(recordToDeleteStockingTypes);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductstockingtypesDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductstockingtypesDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handleStockingEndEdit = async (e) => {
        e.preventDefault();
        const newCategory = e.detail.data;
        newCategory.companyid = companyid
        //console.log('newData stoking form data: ', e.detail.data);

        // Check if the row has an id
        if (newCategory.id) {
            // Existing record - update
            setIsvalid(false)
            if (newCategory.stockingtype && newCategory.companyid && newCategory.description) {
                await handleProductStockingTypesUpdate(newCategory);
            }
        } else {
            // New record - create
            setIsvalid(true)
            if (newCategory.stockingtype && newCategory.companyid && newCategory.description) {
                const newId = dataGrid.length > 0 ? Math.max(...dataGrid.map(item => item.id)) + 1 : 1;
                newCategory.id = newId; // Assign a new id
                await handleProductStockingTypesCreate(newCategory);
            }
        }
    };
    const modalDialogclassName = isMaximizedStockingTypes ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumStockingTypes ? 'in' : ''}`} style={{ display: showModalMediumStockingTypes ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeStockingTypes}>
                                                            {isMaximizedStockingTypes ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseMediumStockingTypes}>
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
                                            <div className="customer-newbold">Tbl Product Stocking Types </div>
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
                                                    ref={gridStockingTypes}
                                                    id="tblproductstockingtypesgrid"
                                                    dataSourceSettings={dataSourceSettingsStockingType}
                                                    onEndEdit={handleStockingEndEdit}
                                                    header={header}
                                                    dataSource={dataSourceStockingType}
                                                    filtering={filtering}
                                                    // columns={columns.map(col => ({
                                                    //     ...col,
                                                    //     allowEdit: col.dataField !== 'stockingtype' || Isvalid
                                                    // }))}
                                                    columns={columns.map(col => ({
                                                        ...col,
                                                        allowEdit: ( (col.dataField === 'stockingtype') && (Isvalid ===false)) ? false : true
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

            {showConfirmStockingTypes && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmStockingTypes(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmStockingTypes(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmStockingTypesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductStockingTypesGrid;

