'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useRef,useMemo} from 'react';
import { useSelector } from'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductPriceTypesQuery,
    useCreateProductPriceTypesMutation,
    useUpdateProductPriceTypesMutation,
    useDeleteProductPriceTypesMutation,
} from '../../store/services/e4kTblProductPriceTypes';

const E4kTblProductPriceTypesGrid = ({ showModalMediumPriceTypes, handleCloseModalMediumPriceTypes }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanyProductPricetype = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductPricetype);
    const [priceid, setPriceid] = useState(null);
    const gridPriceTypes = useRef()
    const { data, error, isLoading, isError } = useGetProductPriceTypesQuery({companyid:companyid,priceid:priceid});
    const [createProductPriceTypes, { isLoading: isCreating }] = useCreateProductPriceTypesMutation();
    const [updateProductPriceTypes, { isLoading: isUpdating }] = useUpdateProductPriceTypesMutation();
    const [deleteProductPriceTypes, { isLoading: isDeleting }] = useDeleteProductPriceTypesMutation();
    const [isMaximizedPriceTypes, setIsMaximizedPriceTypes] = useState(false);

    //////////////pop up delete
    const [showConfirmPriceTypes, setShowConfirmPriceTypes] = useState(false);
    const [recordToDeletePriceTypes, setRecordToDeletePriceTypes] = useState(null);

    useEffect(() => {
        if (data) {
            
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductPriceTypes.map(category => ({
            priceid: category.priceid,
            companyid: category.companyid.companyid,
            description: category.description,
            priceType: category.priceType
            }));
        
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand7 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                priceid:row.data.priceid
        
              }
            setRecordToDeletePriceTypes(deletedata);
            setShowConfirmPriceTypes(true);
              //handleProductPriceTypesDelete(deletedata);
        };
    }, []);

    const toggleMaximizePriceTypes = () => {
        setIsMaximizedPriceTypes(!isMaximizedPriceTypes);
    };

    

      const dataSourceSettingsPrice = {
		dataFields: [
          'companyid: string',
          'priceid: number',
          'description: string',
          'priceType: number'
			
		]
	};

    const dataSourcePriceTypes = useMemo(() => dataGrid, [dataGrid]);

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
       // action: 'none',
		//mode: 'row',
        addNewRow: {
            visible: true,
            position:"near",
        },
        commandColumn: {
            visible: true,
            displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand7', visible: true, label: '' },
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
        { label: 'CompanyId', dataField: 'companyid' ,allowEdit: false,visible:false},
        { label: 'Price ID', dataField: 'priceid', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        { label: 'Price Type', dataField: 'priceType' },
        
    ];

    const handleProductPriceTypesCreate = async (category) => {
        try {
            const result = await createProductPriceTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductpricetypesCreate.priceType === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductpricetypesCreate.priceType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductPriceTypesUpdate = async (category) => {
        try {
            const result = await updateProductPriceTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductpricetypesUpdate.priceType === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductpricetypesUpdate.priceType,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductPriceTypesDelete = async (category) => {
        try {
            const result = await deleteProductPriceTypes(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductpricetypesDelete);
                if(result.data.E4kTblproductProductpricetypesDelete.success === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error('Failed',{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmDelete = async () => {
        setShowConfirmPriceTypes(false);
        if (recordToDeletePriceTypes) {
            try {
                const result = await deleteProductPriceTypes(recordToDeletePriceTypes);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductpricetypesDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductpricetypesDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handlePriceEndEdit = (e) => {
        e.preventDefault();
        const newcategory = e.detail.data;
        newcategory.companyid = companyid
        //console.log('<<<<<<<<-----');
        //console.log('newData form data: ', e.detail.data);

        if (newcategory.priceid && newcategory.companyid && newcategory.description && newcategory.priceType) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                description : String(newcategory.description),
                priceid:Number(newcategory.priceid),
                priceType:Number(newcategory.priceType ),
                        
              }
            //console.log('newData form Update: ', UpdateData);
            handleProductPriceTypesUpdate(UpdateData);
        } else {
            if (!newcategory.priceid && newcategory.companyid && newcategory.description && newcategory.priceType ){
            let NewData = {
        
                companyid: newcategory.companyid,
                description :newcategory.description,
                priceType:Number(newcategory.priceType),
                
        
              }
            //console.log('newData form Create: ', NewData);
           handleProductPriceTypesCreate(NewData);
        }
    }
    };
    const modalDialogclassName = isMaximizedPriceTypes ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumPriceTypes ? 'in' : ''}`} style={{ display: showModalMediumPriceTypes ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizePriceTypes}>
                                                            {isMaximizedPriceTypes ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseModalMediumPriceTypes}>
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
                                            <div className="customer-newbold">Tbl Product Price Types </div>
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
                                                    id="tblproductpricetypesgrid"
                                                    dataSourceSettings={dataSourceSettingsPrice}
                                                    ref={gridPriceTypes}
                                                    onEndEdit={handlePriceEndEdit}
                                                    header={header}
                                                    dataSource={dataSourcePriceTypes}
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

            {showConfirmPriceTypes && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmPriceTypes(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmPriceTypes(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductPriceTypesGrid;
