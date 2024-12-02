

'use client';
import {Smart, Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useRef,useMemo} from 'react';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import {
    useGetProductPropertyTypesValuesQuery,
    useCreateProductPropertyTypesValuesMutation,
    useUpdateProductPropertyTypesValuesMutation,
    useDeleteProductPropertyTypesValuesMutation,
} from '../../store/services/e4kTblProductPropertyTypesValues';

import {  addSelectProductPropertyTypesValues, 
    removeSelectProductPropertyTypesValues, 
    resetSelectProductPropertyTypesValues  } from '../../store/slices/e4kTblProductProductPropertyTypeValues';

const E4kTblProductPropertyTypesValuesGrid = ({ showModalMediumPropertyTypesValues, handleCloseModalMediumPropertyTypesValues,isEdit,property }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanyProductPropertyTypevalue = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductPropertyTypevalue);
    const [propertyid, setPropertyid] = useState(null);
    const gridPropertyTypes = useRef()
    const gridPropertyTypesSelect = useRef()

    const { data, error, isLoading, isError } = useGetProductPropertyTypesValuesQuery({
        companyid:companyid,
        propertyid:propertyid,
        propertyvalue:''
    
    },{skip:(companyid === '' ) ? true: ((typeof(propertyid) === String || propertyid === "") ? true : false)});
    
  
    
    
    const [createProductPropertyTypesValues, { isLoading: isCreating }] = useCreateProductPropertyTypesValuesMutation();
    const [updateProductPropertyTypesValues, { isLoading: isUpdating }] = useUpdateProductPropertyTypesValuesMutation();
    const [deleteProductPropertyTypesValues, { isLoading: isDeleting }] = useDeleteProductPropertyTypesValuesMutation();
    const [isMaximizedPropertyTypesValues, setIsMaximizedPropertyTypesValues] = useState(false);

    ////////Dispatch store properties--------------------------------
    const dispatch = useDispatch();
    //const ProductAddProperty = useSelector((state) => state.selectProductAddProperty.selectProductProperty);

    // useEffect(() => {
    //     if (ProductAddProperty.length === 0) {
    //         //console.log('Product reset', ProductAddProperty);
    //     }

        
    // }, [ProductAddProperty]);

    useEffect(() => {
        setPropertyid(property)
       
    }, [property]);

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
        const datagrid = data.e4kTblproductProductPropertyTypesValues.map(category => ({
            propertyid: category.proptypeid.propertyid,
            id : category.id,
            proptypeValues: category.proptypeValues,
            }));
        setDataGrid(datagrid);
    
    };

    useEffect(() => {
        window.commandColumnCustomCommandpropertytypevalues = function(row) {
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
            'proptypeValues: string',
		]
	};
    const dataSourcePropertyTypes = useMemo(() => dataGrid, [dataGrid]);


    const toggleMaximizePropertyTypesValues = () => {
        setIsMaximizedPropertyTypesValues(!isMaximizedPropertyTypesValues);
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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommandpropertytypevalues', visible: true, label: '' },
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
        { label: 'Property Value', dataField: 'proptypeValues' },
        
        
    ] :[
        { label: 'Company ID', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Property ID', dataField: 'propertyid', allowEdit: false },
        { label: 'Property Value', dataField: 'proptypeValues' ,allowEdit: false },
        
        
    ];

    const handleProductPropertyTypesCreate = async (category) => {
        try {
            const result = await createProductPropertyTypesValues(category);
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
            const result = await updateProductPropertyTypesValues(category);
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
            const result = await deleteProductPropertyTypesValues(category);
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
    const handleConfirmPropertyTypesValuesDelete = async () => {
        setShowConfirmPropertyTypes(false);
        if (recordToDeletePropertyTypes) {
            try {
                const result = await deleteProductPropertyTypesValues(recordToDeletePropertyTypes);
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
            
            const existingItem = var1.find(item => item.proptypeValues === rowData.proptypeValues);
                
            if (!existingItem) {
                var1.push({ 
                    propertyid: rowData.propertyid, 
                    proptypeValues: rowData.proptypeValues, 
                  
                });
                dispatch(addSelectProductPropertyTypesValues({ 
                    propertyid: rowData.propertyid,
                    proptypeValues: rowData.proptypeValues ,
                    }));
            }
            } else {
            var1 = var1.filter(item => item.proptypeValues !== rowData.proptypeValues);
           dispatch(removeSelectProductPropertyTypesValues({ proptypeValues: rowData.proptypeValues }));
            }
        }
        console.log('Var------------------', var1);
        
        };

    const handleclosegridselect =() => {
        const grid = gridPropertyTypesSelect.current;
        if (grid) {
            
            grid.clearSelection();
            
        }

        handleCloseModalMediumPropertyTypesValues()

    }


    const modalDialogclassName = isMaximizedPropertyTypesValues ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumPropertyTypesValues ? 'in' : ''}`} style={{ display: showModalMediumPropertyTypesValues ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizePropertyTypesValues}>
                                                            {isMaximizedPropertyTypesValues ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
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
                                            <div className="customer-newbold">Tbl Product Property Type Value </div>
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
                                                                id={isEdit ? `tblproductpropertytypesvluesgrid${property}` : `tblproductpropertytypesvaluesgridselect${property}`}
                                                                dataSourceSettings={dataSourceSettingsProperty}
                                                                ref={isEdit ? gridPropertyTypes : gridPropertyTypesSelect}
                                                                //onEndEdit={isEdit ? handlePropertyEndEdit : undefined}
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
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmPropertyTypesValuesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductPropertyTypesValuesGrid;
