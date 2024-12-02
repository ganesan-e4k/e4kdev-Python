'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductObsoleteTypesQuery,
    useCreateProductObsoleteTypesMutation,
    useUpdateProductObsoleteTypesMutation,
    useDeleteProductObsoleteTypesMutation,
} from '../../store/services/e4kTblProductObsoleteTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const E4kTblProductObsoleteTypesGrid = ({ showModalMediumObsoleteTypes, handleCloseModalMediumObsoleteTypes }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanyProductObsolete = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductObsolete);
    const { data, error, isLoading, isError } = useGetProductObsoleteTypesQuery(companyid);
    const [createProductObsoleteTypes, { isLoading: isCreating }] = useCreateProductObsoleteTypesMutation();
    const [updateProductObsoleteTypes, { isLoading: isUpdating }] = useUpdateProductObsoleteTypesMutation();
    const [deleteProductObsoleteTypes, { isLoading: isDeleting }] = useDeleteProductObsoleteTypesMutation();
    const [isMaximizedObsoleteTypes, setIsMaximizedObsoleteTypes] = useState(false);

    //////////////pop up delete
    const [showConfirmObsoleteTypes, setShowConfirmObsoleteTypes] = useState(false);
    const [recordToDeleteObsoleteTypes, setRecordToDeleteObsoleteTypes] = useState(null);

    useEffect(() => {
        if (data) {
            //console.log("datagridObsoleteTypes=", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductObsoleteTypes.map(category => ({
            obsoleteid: category.obsoleteid,
            companyid: category.companyid.companyid,
            description: category.description,
            allowSale: category.allowSale
            }));
        //console.log("datagrid obsolete ttpes=", datagrid);
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand6 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                obsoleteid:row.data.obsoleteid
        
              }
            setRecordToDeleteObsoleteTypes(deletedata);
            setShowConfirmObsoleteTypes(true);
              //handleProductObsoleteTypesDelete(deletedata);
        };
    }, []);

    const toggleMaximizeObsoleteTypes = () => {
        setIsMaximizedObsoleteTypes(!isMaximizedObsoleteTypes);
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
        //mode: 'row',
        //action: 'click',
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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand6', visible: true, label: '' },
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

    // const dataSource4 = useMemo(() => new Smart.DataAdapter({
    //     dataSource: dataGrid,
    //     dataFields: [
    //         'companyid: string',
	// 		'obsoleteid: number',
	// 		'description: string',
	// 		'allowSale: boolean',
          
    //     ],
    //   }), [dataGrid]);
      const dataSourceSettings4 = {
		dataFields: [
			'companyid: string',
			'obsoleteid: number',
			'description: string',
			'allowSale: boolean',
			
		]
	};

    const dataSourceObsolete = useMemo(() => dataGrid, [dataGrid]);
    

    const columns = [
        { label: 'CompanyId', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Obsoleteid', dataField: 'obsoleteid', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        { label: 'Allow Sale', dataField: 'allowSale',template: 'checkBox',editor: 'checkBox'
             },
        
    ];

    const handleProductObsoleteTypesCreate = async (category) => {
        try {
            const result = await createProductObsoleteTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductobsoletetypesCreate.obsoleteType === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductobsoletetypesCreate.obsoleteType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductObsoleteTypesUpdate = async (category) => {
        try {
            const result = await updateProductObsoleteTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductobsoletetypesUpdate.obsoleteType === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductobsoletetypesUpdate.obsoleteType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductObsoleteTypesDelete = async (category) => {
        try {
            const result = await deleteProductObsoleteTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductobsoletetypesDelete);
                if(result.data.E4kTblproductProductobsoletetypesDelete.success === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductobsoletetypesDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmObsoleteTypesDelete = async () => {
        setShowConfirmObsoleteTypes(false);
        if (recordToDeleteObsoleteTypes) {
            try {
                const result = await deleteProductObsoleteTypes(recordToDeleteObsoleteTypes);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductobsoletetypesDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductobsoletetypesDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////
    // const handleEndEdit = (e) => {
    //     e.preventDefault();
    //     const newcategory = e.detail.data;
    //     newcategory.companyid = companyid
    //     console.log('<<<<<<<<-----',newcategory.obsoleteid);
    //     console.log('newData form data: ', e.detail.data);

    //     if ((newcategory.obsoleteid >=0 && newcategory.obsoleteid !=null ) && newcategory.companyid && newcategory.description || newcategory.allowSale) {
    //         let UpdateData = {
        
    //             companyid: newcategory.companyid,
    //             description :newcategory.description,
    //             obsoleteid:newcategory.obsoleteid,
    //             allowSale:newcategory.allowSale //=== "true" ? true : false,
                        
    //           }
    //         console.log('newData form Update: ', UpdateData);
    //         handleProductObsoleteTypesUpdate(UpdateData);
    //     } else {
    //         if ((newcategory.obsoleteid === null) && newcategory.companyid && newcategory.description && newcategory.allowSale ){
    //         let NewData = {
        
    //             companyid: newcategory.companyid,
    //             description :newcategory.description,
    //             allowSale:newcategory.allowSale //=== "true" ? true : false,
                
        
    //           }
    //         console.log('newData form Create: ', NewData);
    //        handleProductObsoleteTypesCreate(NewData);
    //     }
    // }
    // };

    /////////////update the code 

    const handleEndEdit = (e) => {
        e.preventDefault();
        const newCategory = e.detail.data;
        newCategory.companyid = companyid;
        //console.log('<<<<<<<<-----', newCategory.obsoleteid);
        //console.log('newData form data: ', e.detail.data);
    
        // Check if this is an update
        const isUpdate = newCategory.obsoleteid !== null && newCategory.obsoleteid >= 0;
        const hasRequiredFields = newCategory.companyid && newCategory.description ;
    
        if (isUpdate && hasRequiredFields) {
            let updateData = {
                companyid: newCategory.companyid,
                description: newCategory.description,
                obsoleteid: newCategory.obsoleteid,
                allowSale: newCategory.allowSale || false,
            };
            //console.log('newData form Update: ', updateData);
            handleProductObsoleteTypesUpdate(updateData);
        } else if (!isUpdate && hasRequiredFields) {
            let newData = {
                companyid: newCategory.companyid,
                description: newCategory.description,
                allowSale: newCategory.allowSale || false,
            };
            //console.log('newData form Create: ', newData);
            handleProductObsoleteTypesCreate(newData);
        } else {
            console.error('Missing required fields or invalid obsoleteid.');
        }
    };
    

    const modalDialogclassName = isMaximizedObsoleteTypes ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumObsoleteTypes ? 'in' : ''}`} style={{ display: showModalMediumObsoleteTypes ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeObsoleteTypes}>
                                                            {isMaximizedObsoleteTypes ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseModalMediumObsoleteTypes}>
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
                                            <div className="customer-newbold">Tbl Product Obsolete Types </div>
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
                                                    id="tblproductobsoletetypesgrid"
                                                    dataSourceSettings={dataSourceSettings4}
                                                    onEndEdit={handleEndEdit}
                                                    header={header}
                                                    dataSource={dataSourceObsolete}
                                                    filtering={filtering}
                                                    columns={columns}
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

            {showConfirmObsoleteTypes && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmObsoleteTypes(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmObsoleteTypes(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmObsoleteTypesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductObsoleteTypesGrid;
