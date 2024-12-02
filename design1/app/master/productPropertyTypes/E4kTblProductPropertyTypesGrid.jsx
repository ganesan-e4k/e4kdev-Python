

'use client';
import {Smart, Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useRef,useMemo} from 'react';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import {
    useGetProductPropertyTypesQuery,
    useCreateProductPropertyTypesMutation,
    useUpdateProductPropertyTypesMutation,
    useDeleteProductPropertyTypesMutation,
} from '../../store/services/e4kTblProductPropertyTypes';

import {  addSelectProductProperty, removeSelectProductProperty,resetSelectProductProperty } from '../../store/slices/e4kTblProductPropertyAddSelect';

const E4kTblProductPropertyTypesGrid = ({ showModalMediumPropertyTypes, handleCloseModalMediumPropertyTypes,isEdit }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const [dataGridSelect, setDataGridSelect] = useState([]);
    const CompanyProductPropertytype = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductPropertytype);
    const [propertyid, setPropertyid] = useState(null);
    const gridPropertyTypes = useRef()
    const gridPropertyTypesSelect = useRef()

    const { data, error, isLoading, isError } = useGetProductPropertyTypesQuery({companyid:companyid,propertyid:propertyid});
    const [createProductPropertyTypes, { isLoading: isCreating }] = useCreateProductPropertyTypesMutation();
    const [updateProductPropertyTypes, { isLoading: isUpdating }] = useUpdateProductPropertyTypesMutation();
    const [deleteProductPropertyTypes, { isLoading: isDeleting }] = useDeleteProductPropertyTypesMutation();
    const [isMaximizedPropertyTypes, setIsMaximizedPropertyTypes] = useState(false);

    ////////Dispatch store properties--------------------------------
    const dispatch = useDispatch();
    const ProductAddProperty = useSelector((state) => state.selectProductAddProperty.selectProductProperty);

    useEffect(() => {
        if (ProductAddProperty.length === 0) {
            //console.log('Product reset', ProductAddProperty);
        }

        
    }, [ProductAddProperty]);

    useEffect(() => {
        // Clear the selection state when the component mounts
        dispatch(resetSelectProductProperty());
    }, [dispatch]);

    //////////////pop up delete
    const [showConfirmPropertyTypes, setShowConfirmPropertyTypes] = useState(false);
    const [recordToDeletePropertyTypes, setRecordToDeletePropertyTypes] = useState(null);

    useEffect(() => {
        if (data) {
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductPropertyTypes.map(category => ({
            propertyid: category.propertyid,
            companyid: category.companyid.companyid,
            description: category.description,
            isstatic: category.isstatic,
            }));
        setDataGrid(datagrid);
        setDataGridSelect(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand8 = function(row) {
            let deletedata = {
                companyid: row.data.companyid,
                propertyid:row.data.propertyid
        
              }
            setRecordToDeletePropertyTypes(deletedata);
            setShowConfirmPropertyTypes(true);
        };
    }, []);


      const dataSourceSettingsProperty =  {
		dataFields: [
            'companyid: string',
            'propertyid: number',
            'description: string',
			'isstatic: number'
		]
	};
    const dataSourcePropertyTypes = useMemo(() => dataGrid, [dataGrid]);


    const toggleMaximizePropertyTypes = () => {
        setIsMaximizedPropertyTypes(!isMaximizedPropertyTypes);
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

    const appearance1 = {
        showRowHeader: false,
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

    const editing = isEdit ? {
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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand8', visible: true, label: '' },
            },
        },
    } : { enabled: false ,
        addNewRow: {
        visible: false,
        
    },};

    const selection = isEdit ? {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    } : {
        enabled: true,
        checkBoxes: {
            enabled: true
        }
    };

    const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };

    

    const columns = isEdit ? [
        { label: 'Company ID', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Property ID', dataField: 'propertyid', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        { label: 'Isstatic', dataField: 'isstatic' ,visible:false},
        
        
    ] :[
        { label: 'Company ID', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Property ID', dataField: 'propertyid', allowEdit: false },
        { label: 'Description', dataField: 'description',allowEdit: false },
        { label: 'Isstatic', dataField: 'isstatic' ,allowEdit: false,visible:false },
        
        
    ];

    const handleProductPropertyTypesCreate = async (category) => {
        try {
            const result = await createProductPropertyTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductpropertytypesCreate.propertyType === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductpropertytypesCreate.propertyType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductPropertyTypesUpdate = async (category) => {
        try {
            const result = await updateProductPropertyTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductpropertytypesUpdate.propertyType === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductpropertytypesUpdate.propertyType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductPropertyTypesDelete = async (category) => {
        try {
            const result = await deleteProductPropertyTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductpropertytypesDelete);
                if(result.data.E4kTblproductProductpropertytypesDelete.success === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductpropertytypesDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmPropertyTypesDelete = async () => {
        setShowConfirmPropertyTypes(false);
        if (recordToDeletePropertyTypes) {
            try {
                const result = await deleteProductPropertyTypes(recordToDeletePropertyTypes);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductpropertytypesDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductpropertytypesDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////
    const handlePropertyEndEdit = (e) => {
        e.preventDefault();
        const newcategory = e.detail.data;
        newcategory.companyid = companyid

        if (newcategory.propertyid && newcategory.companyid && newcategory.description) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                description : String(newcategory.description),
                propertyid:Number(newcategory.propertyid),
                
                        
              }
            handleProductPropertyTypesUpdate(UpdateData);
        } else {
            if (!newcategory.propertyid && newcategory.companyid && newcategory.description){
            let NewData = {
        
                companyid: newcategory.companyid,
                description :newcategory.description,
                
                
        
              }
           handleProductPropertyTypesCreate(NewData);
        }
    }
    };

let var1 = []; // Use 'let' for variable declaration

        
const handlePropertyRowClickEvent = (e) => {
        e.preventDefault();
        const rowData = e.detail.row.data;
        const selected = e.detail.row.selected;
        
        if (rowData) {
            if (selected) {
            
            const existingItem = var1.find(item => item.propertyid === rowData.propertyid);
                
            if (!existingItem) {
                var1.push({ 
                    propertyid: rowData.propertyid, 
                    description: rowData.description, 
                    isstatic: rowData.isstatic,
                });
                dispatch(addSelectProductProperty({ 
                    propertyid: rowData.propertyid,
                     description: rowData.description ,
                     isstatic: rowData.isstatic,
                    }));
            }
            } else {
            var1 = var1.filter(item => item.propertyid !== rowData.propertyid);
            dispatch(removeSelectProductProperty({ propertyid: rowData.propertyid }));
            }
        }
        
        };

    const handleclosegridselect =() => {
        const grid = gridPropertyTypesSelect.current;
        if (grid) {
            
            grid.clearSelection();
            
        }

        handleCloseModalMediumPropertyTypes()

    }


    const modalDialogclassName = isMaximizedPropertyTypes ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumPropertyTypes ? 'in' : ''}`} style={{ display: showModalMediumPropertyTypes ? 'block' : 'none' }}>
                {/* <div className="modal-dialog medium-popup"> */}
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizePropertyTypes}>
                                                            {isMaximizedPropertyTypes ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleclosegridselect}>
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
                                            <div className="customer-newbold">Tbl Product Property Types </div>
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
                                                                id={isEdit ? "tblproductpropertytypesgrid" : "tblproductpropertytypesgridselect"}
                                                                dataSourceSettings={dataSourceSettingsProperty}
                                                                ref={isEdit ? gridPropertyTypes : gridPropertyTypesSelect}
                                                                onEndEdit={isEdit ? handlePropertyEndEdit : undefined}
                                                                header={header}
                                                                dataSource={dataSourcePropertyTypes}
                                                                filtering={filtering}
                                                                columns={columns}
                                                                behavior={isEdit ? behavior : undefined}
                                                                paging={isEdit ? paging : undefined}
                                                                pager={isEdit ? pager : undefined}
                                                                sorting={sorting}
                                                                selection={selection}
                                                                editing={editing}
                                                                appearance={isEdit ? appearance : appearance1}
                                                                className='mx-auto'
                                                                onRowClick={!isEdit ? handlePropertyRowClickEvent : undefined}
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

            {showConfirmPropertyTypes && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmPropertyTypes(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmPropertyTypes(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmPropertyTypesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductPropertyTypesGrid;
