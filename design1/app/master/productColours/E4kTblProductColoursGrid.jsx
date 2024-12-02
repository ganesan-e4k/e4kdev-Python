'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductColoursQuery,
    useCreateProductColoursMutation,
    useUpdateProductColoursMutation,
    useDeleteProductColoursMutation,
} from '../../store/services/e4kTblProductColours';

import {  addSelectProductPropertyColour, removeSelectProductPropertyColour ,resetSelectProductPropertyColour} from '../../store/slices/e4kTblProductPropertyColourSelect';


const E4kTblProductColoursGrid = ({ showModalMediumColours, handleCloseMediumColours, isEdit }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const gridColours = useRef(null);
    const gridColoursSelect = useRef(null);
    const CompanyProductColour = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductColour);

    const { data, error, isLoading, isError } = useGetProductColoursQuery({companyid:companyid});
    const [createProductColours, { isLoading: isCreating }] = useCreateProductColoursMutation();
    const [updateProductColours, { isLoading: isUpdating }] = useUpdateProductColoursMutation();
    const [deleteProductColours1, { isLoading: isDeleting }] = useDeleteProductColoursMutation();
    const [isMaximizedProductColour, setIsMaximizedProductColour] = useState(false);
    const [Isvalid, setIsvalid] = useState(false);

    //////////////pop up delete
    const [showConfirmColours, setShowConfirmColours] = useState(false);
    const [recordToDeleteColours, setRecordToDeleteColours] = useState(null);



    ////////////////////// Dispatch Colour select const dispatch = useDispatch();
    const dispatch = useDispatch();
    const ProductAddPropertyColour = useSelector((state) => state.selectProductAddPropertyColour.selectProductPropertyColour);
    const ProductidSelectColourAll = useSelector((state) => state.selectProduct.selectProduct);


    useEffect(() => {
        // Clear the selection state when the component mounts
        dispatch(resetSelectProductPropertyColour());
        var1 = []; // Clear the local array when the component mounts
    }, [dispatch]);

    useEffect(() => {
        if (ProductAddPropertyColour.length > 0 && ProductidSelectColourAll.productid !=='') {
            // if (dataGrid.length > 0) {
            //     const datagridupdate = dataGrid.filter(col => !ProductAddPropertyColour.some(prop => prop.description === col.description));
            //     console.log('Product datagridupdate', datagridupdate);
                
            //     setDataGrid(datagridupdate);
                               
            // }

           // console.log('Product reset', ProductAddPropertyColour);
        }

        
    }, [ProductAddPropertyColour,ProductidSelectColourAll]);

    useEffect(() => {
        if (data) {
            //console.log("data grid Colours =", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductColours.map((category, index) => ({
            id: index + 1, // Assign an incremental id starting from 1
            companyid: category.companyid.companyid,
            colourid: category.colourid,
            description: category.description,
            colourcode: category.colourcode || "none",
        }));
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand14 = function(row) {
            let deletedata = {
                companyid: row.data.companyid,
                colourid: row.data.colourid
            };
        setRecordToDeleteColours(deletedata);
        setShowConfirmColours(true); 
        //handleProductColoursDelete(deletedata);
        };
    }, []);

    const toggleMaximizeProductColour = () => {
        setIsMaximizedProductColour(!isMaximizedProductColour);
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
            position: "far",
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand14', visible: true, label: '' },
            },
        },
    }: { enabled: false ,
        addNewRow: {
        visible: false,
        
    },};

    

    const selection =isEdit ? {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    }: {
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
        { label: 'ID', dataField: 'id', visible: false }, // Hidden id column
        { label: 'CompanyId', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Colour ID', dataField: 'colourid', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        { 
            label: 'Colour Code',
            dataField: 'colourcode',
            
            editor: {
                template: `<smart-color-input enableCustomColors editable></smart-color-input>`,
                autoOpen: true,
                
                settings: {
                    dropDownAppendTo: 'body',
                    dropDownWidth: 400,
                    dropDownHeight: 700,
                    horizontalScrollBarVisibility: 'hidden',
                    verticalScrollBarVisibility: 'hidden',
                    placeholder: 'Select a Colours',
                    
                    },
                    
            }
        
        },
    ]:[
        { label: 'ID', dataField: 'id', visible: false }, // Hidden id column
        { label: 'CompanyId', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Colour ID', dataField: 'colourid', allowEdit: false },
        { label: 'Description', dataField: 'description', allowEdit: false  },
        { 
            label: 'Colour Code',
            dataField: 'colourcode',
            allowEdit: false
        },
        
        
    ];
    

    const handleProductColoursCreate = async (category) => {
        try {
            const result = await createProductColours(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductcoloursCreate.colour === "Success") {
                    toast.success('Created',{position: "top-center"});
                    //transformData(); // Refresh the grid data
                } else {
                    toast.error(result.data.E4kTblproductProductcoloursCreate.colour,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductColoursUpdate = async (category) => {
        try {
            const result = await updateProductColours(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductcoloursUpdate.colourId === "Success") {
                    toast.success('Updated',{position: "top-center"});
                   // transformData(); // Refresh the grid data
                } else {
                    toast.error(result.data.E4kTblproductProductcoloursUpdate.colourId,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductColoursDelete = async (category) => {
        try {
            const result = await deleteProductColours1(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductcoloursDelete);
                if (result.data.E4kTblproductProductcoloursDelete.success === "Success") {
                    toast.success('Deleted',{position: "top-center"});
                    
                } else {
                    toast.error(result.data.E4kTblproductProductcoloursDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmColoursDelete = async () => {
        setShowConfirmColours(false);
        if (recordToDeleteColours) {
            try {
                const result = await deleteProductColours1(recordToDeleteColours);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductcoloursDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductcoloursDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handleColoursEndEdit = async (e) => {
        e.preventDefault();
        const newCategory = e.detail.data;
        newCategory.companyid = companyid
        //console.log('newData Colours form data: ', e.detail.data);

        // Check if the row has an id
        if (newCategory.id) {
            // Existing record - update
            setIsvalid(false)
            if (newCategory.colourid && newCategory.companyid && newCategory.description && newCategory.colourcode) {
                await handleProductColoursUpdate(newCategory);
            }
        } else {
            // New record - create
            setIsvalid(true)
            if (newCategory.colourid && newCategory.companyid && newCategory.description && newCategory.colourcode) {
                const newId = dataGrid.length > 0 ? Math.max(...dataGrid.map(item => item.id)) + 1 : 1;
                newCategory.id = newId; // Assign a new id
                await handleProductColoursCreate(newCategory);
            }
        }
    };

    /////////////////////// Row Select
let var1 = []; // Use 'let' for variable declaration

        
const handlePropertyColourRowClickEvent = (e) => {
    e.preventDefault();
    const rowData = e.detail.row.data;
    const selected = e.detail.row.selected;

    if (rowData) {
        if (selected) {
            const existingItem = var1.find(item => item.colourid === rowData.colourid);

            if (!existingItem) {
                var1.push({
                    colourid: rowData.colourid,
                    description: rowData.description,
                    colourcode: rowData.colourcode,
                });
                dispatch(addSelectProductPropertyColour({
                    colourid: rowData.colourid,
                    description: rowData.description,
                    colourcode: rowData.colourcode
                }));
                //console.log('Added',ProductAddPropertyColour)
            }
        } else {
            var1 = var1.filter(item => item.colourid !== rowData.colourid);
            dispatch(removeSelectProductPropertyColour({
                colourid: rowData.colourid
            }));
           // console.log('AFinal ',ProductAddPropertyColour)
        }
    }
};

    ///////////////// handle close product colours
    const handlecloseColoursgridselect =() => {
        const grid = gridColoursSelect.current;
        if (grid) {
            grid.clearSelection(); 
        }
        handleCloseMediumColours()

    }

    const modalDialogclassName = isMaximizedProductColour ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumColours ? 'in' : ''}`} style={{ display: showModalMediumColours ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeProductColour}>
                                                            {isMaximizedProductColour ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handlecloseColoursgridselect}>
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
                                            <div className="customer-newbold">Tbl Product Colours </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <ColorPicker onChange={handleChange}  enableCustomColors></ColorPicker> */}

                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {isLoading ? (
                                                "Loading..."
                                            ) : (
                                                
                                                    <Grid
                                                    id={isEdit ? "tblproductcoloursgrid" : "tblproductcoloursgridselect"}
                                                    ref={isEdit ? gridColours : gridColoursSelect}
                                                    onEndEdit={isEdit ? handleColoursEndEdit : undefined}
                                                    
                                                    header={header}
                                                    dataSource={dataGrid}
                                                    filtering={filtering}
                                                    columns = {columns.map(col => ({
                                                        ...col,
                                                        allowEdit: isEdit 
                                                            ? ((dataGrid.find(griddata => griddata.id !== col.id)) && (col.dataField === 'colourid') && (Isvalid === false)) ? false : true
                                                            : col.allowEdit
                                                    }))}
                                                    behavior={isEdit ? behavior : undefined}
                                                    paging={isEdit ? paging : undefined}
                                                    pager={isEdit ? pager : undefined}
                                                    sorting={sorting}
                                                    selection={selection}
                                                    editing={editing}
                                                    appearance={isEdit ? appearance : appearance1}
                                                    onRowClick={!isEdit ? handlePropertyColourRowClickEvent : undefined}
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
            {showConfirmColours && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmColours(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmColours(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmColoursDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductColoursGrid;

