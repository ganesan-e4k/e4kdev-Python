'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useRef,useMemo } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductFitsQuery,
    useCreateProductFitsMutation,
    useUpdateProductFitsMutation,
    useDeleteProductFitsMutation,
} from '../../store/services/e4kTblProductFits';

import {  addSelectProductPropertyFit, removeSelectProductPropertyFit ,resetSelectProductPropertyFit} from '../../store/slices/e4kTblProductPropertyFItSelect';

const E4kTblProductFitsGrid = ({ showModalMediumProducctFits, handleCloseMediumProducctFits,isEditFits }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const gridFits = useRef()
    const gridFitSelect = useRef(null);
    const CompanyProductfit = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductfit);
    const { data, error, isLoading, isError } = useGetProductFitsQuery(companyid);
    
    const [createProductFits, { isLoading: isCreating }] = useCreateProductFitsMutation();
    const [updateProductFits, { isLoading: isUpdating }] = useUpdateProductFitsMutation();
    const [deleteProductFits, { isLoading: isDeleting }] = useDeleteProductFitsMutation();
    const [isMaximizedProductFits, setIsMaximizedProductFits] = useState(false);
    const [Isvalid, setIsvalid] = useState(false);

    //////////////pop up delete
    const [showConfirmFits, setShowConfirmFits] = useState(false);
    const [recordToDeleteFits, setRecordToDeleteFits] = useState(null);


    ///////////////// Fit select from store
    const dispatch_fit = useDispatch();
    const ProductAddPropertyFit = useSelector((state) => state.selectProductAddPropertyFit.selectProductPropertyFit);

    useEffect(() => {
        // Clear the selection state when the component mounts
        dispatch_fit(resetSelectProductPropertyFit());
    }, [dispatch_fit]);

    useEffect(() => {
        if (ProductAddPropertyFit.length === 0) {
            //console.log('Product reset', ProductAddPropertyFit);
        }

        
    }, [ProductAddPropertyFit]);



    useEffect(() => {
        if (data) {
            //console.log("datagrid category1 =", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductFits.map((category, index) => ({
            id: index + 1,
            fitid: category.fitid,
            companyid: category.companyid.companyid,
            description: category.description,
        }));
       // console.log("datagrid Product Fits=", datagrid);
        setDataGrid(datagrid);
        
    };

    useEffect(() => {
        window.commandColumnCustomCommand15 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                fitid:row.data.fitid
        
              }
            setRecordToDeleteFits(deletedata);
            setShowConfirmFits(true);
              //handleProductCategory1Delete(deletedata);
        };
    }, []);

    const toggleMaximizeProductFits = () => {
        setIsMaximizedProductFits(!isMaximizedProductFits);
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

    const editing = isEditFits ? {
        enabled: true,
        addNewRow: {
            visible: true,
            //display:"row",
            position:"near",
        },
        commandColumn: {
            visible: true,
            displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand15', visible: true, label: '' },
            },
        },
    }: { enabled: false ,
        addNewRow: {
        visible: false,
        
    },};

    

    const selection =  isEditFits ? {
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

    const dataSourceSettings = {
		dataFields: [
			'companyid: string',
			'fitid: string',
			'description: string',
			
		]
	};
    const dataSourceProductFits = useMemo(() => dataGrid, [dataGrid]);


    const columns = isEditFits ?  [
        { label: 'ID', dataField: 'id', visible: false },
        { label: 'CompanyId',dataField: 'companyid',allowEdit: false,visible:false  },
        { 
            label: 'Fit ID',
            dataField: 'fitid',
            allowEdit: true
        },
        { 
            label: 'Description',
            dataField: 'description',
            
        },
    ]: [
        { label: 'ID', dataField: 'id', visible: false },
        { label: 'CompanyId',dataField: 'companyid',allowEdit: false,visible:false  },
        { 
            label: 'Fit ID',
            dataField: 'fitid',
            allowEdit: false,
        },
        { 
            label: 'Description',
            dataField: 'description',
            allowEdit: false,
            
        },

    ]

    const handleProductFitsCreate = async (category) => {
        try {
            const result = await createProductFits(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                //console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductfitsCreate.fit === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductfitsCreate.fit,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductFitsUpdate = async (category) => {
        try {
            const result = await updateProductFits(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                //console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductfitsUpdate.fitId === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductfitsUpdate.fitId,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCategory1Delete = async (category) => {
        try {
            const result = await deleteProductFits(category);
            if (result.error) {
                //console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductfitsDelete.success);
                if(result.data.E4kTblproductProductfitsDelete.success === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductfitsDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };


    //////////////////////////////////////////pop up delete 
    const handleConfirmFitsDelete = async () => {
        setShowConfirmFits(false);
        if (recordToDeleteFits) {
            try {
                const result = await deleteProductFits(recordToDeleteFits);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductfitsDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductfitsDelete.success,{position: "top-center"});
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
        const newcategory = e.detail.data;
        newcategory.companyid=companyid
        
        

        if (newcategory.id) {
            // Existing record - update
            setIsvalid(false)
            if (newcategory.fitid && newcategory.companyid && newcategory.description) {
                await handleProductFitsUpdate(newcategory);
            }
        } else {
            // New record - create
            setIsvalid(true)
            if (newcategory.fitid && newcategory.companyid && newcategory.description) {
                const newId = dataGrid.length > 0 ? Math.max(...dataGrid.map(item => item.id)) + 1 : 1;
                newcategory.id = newId; // Assign a new id
                await handleProductFitsCreate(newcategory);
            }
        }
    
    };


    ////////////////////// Row Click for selection fits
    let var1 = [];
    const handlePropertyFitRowClickEvent = (e) => {
        e.preventDefault();
        const rowData = e.detail.row.data;
        const selected = e.detail.row.selected;
        //console.log('Selected',rowData,'###############',rowData)
    
        if (rowData) {
            if (selected) {
                 const existingItem = var1.find(item => item.description === rowData.description );
    
                if (!existingItem) {
                    var1.push({
                        fitid: rowData.fitid,
                        description: rowData.description,
                       
                    });
                    dispatch_fit(addSelectProductPropertyFit({
                        fitid: rowData.fitid,
                        description: rowData.description,
                    }));
                   // console.log('Selected')
               }
            } else {
                 var1 = var1.filter(item => item.description !== rowData.description);
                dispatch_fit(removeSelectProductPropertyFit({
                    description: rowData.description
                }));
               //console.log('not selected ')
            }
        }
    };

    const handlecloseFitgridselect =() => {
        const grid = gridFitSelect.current;
        //console.log('handlecloseFit gridselect@@@@@@@@@@@@@@',isEditFits)
        if (grid) {
            
            grid.clearSelection();
            
        }

        handleCloseMediumProducctFits()

    }

    const modalDialogclassName = isMaximizedProductFits ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';
    return (
        <>
            <div className={`modal fade ${showModalMediumProducctFits ? 'in' : ''}`} style={{ display: showModalMediumProducctFits ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeProductFits}>
                                                            {isMaximizedProductFits ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handlecloseFitgridselect}>
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
                                            <div className="customer-newbold">Tbl Product Fits</div>
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
                                                    id={isEditFits ? "tblproductfitsgrid" : "tblproductfitsgridselect"}
                                                    dataSourceSettings={dataSourceSettings}
                                                    ref={isEditFits ? gridFits : gridFitSelect}
                                                    onEndEdit={isEditFits ? handleEndEdit : undefined}
                                                    header={header}
                                                    dataSource={dataSourceProductFits}
                                                    filtering={filtering}
                                                    columns={columns.map(col => ({
                                                        ...col,
                                                        allowEdit: isEditFits 
                                                            ? col.fitid !== 'commoditycode' || Isvalid
                                                            : col.allowEdit
                                                    }))}
                                                    //columns={columns}
                                                    behavior={isEditFits ? behavior : undefined}
                                                    paging={isEditFits ? paging : undefined}
                                                    pager={isEditFits ? pager : undefined}
                                                    sorting={sorting}
                                                    selection={selection}
                                                    editing={editing}
                                                    appearance={isEditFits ? appearance : appearance1}
                                                    onRowClick={!isEditFits ? handlePropertyFitRowClickEvent : undefined}
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
            {showConfirmFits && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmFits(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmFits(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmFitsDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductFitsGrid;
