'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductCategories3Query,
    useCreateProductCategory3Mutation,
    useUpdateProductCategory3Mutation,
    useDeleteProductCategory3Mutation,
} from '../../store/services/e4kTblProductCategory3';


const E4kTblProductCategory3Grid = ({ showModalMediumcategory3, handleCloseMediumcategory3 }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanySelectCategory3 = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanySelectCategory3);
    const { data, error, isLoading, isError } = useGetProductCategories3Query(companyid);
    const [createProductCategory3, { isLoading: isCreating }] = useCreateProductCategory3Mutation();
    const [updateProductCategory3, { isLoading: isUpdating }] = useUpdateProductCategory3Mutation();
    const [deleteProductCategory3, { isLoading: isDeleting }] = useDeleteProductCategory3Mutation();
    const [isMaximizedCategory3, setIsMaximizedCategory3] = useState(false);

    //////////////pop up delete
    const [showConfirmCategory3, setShowConfirmCategory3] = useState(false);
    const [recordToDeleteCategory3, setRecordToDeleteCategory3] = useState(null);

    useEffect(() => {
        if (data) {
            //console.log("datagrid3=", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductCategory3.map(category => ({
            category3id: category.category3id,
            companyid: category.companyid.companyid,
            description: category.description,
            }));
        //console.log("datagrid=", datagrid);
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand3 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                category3id:row.data.category3id
        
              }
            setRecordToDeleteCategory3(deletedata);
            setShowConfirmCategory3(true);
            //handleProductCategory3Delete(deletedata);
        };
    }, []);

    const toggleMaximizeCategory3 = () => {
        setIsMaximizedCategory3(!isMaximizedCategory3);
      };

    
    //   const dataSource2 = useMemo(() => new Smart.DataAdapter({
    //     dataSource: dataGrid,
    //     dataFields: [
          
    //       'companyid: string',
    //       'category3id: number',
    //       'description: string',
          
    //     ],
    //   }), [dataGrid]);

    const dataSourceSettings3 = {
		dataFields: [
			'companyid: string',
			'category3id: number',
			'description: string',
			
		]
	};

      const dataSource2 = useMemo(() => dataGrid, [dataGrid]);

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
            //display:"row",
            position:"near",
        },
        commandColumn: {
            visible: true,
            displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand3', visible: true, label: '' },
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
        { label: 'CompanyId', dataField: 'companyid',allowEdit: false,visible:false },
        { label: 'Category3ID', dataField: 'category3id', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        
    ];

    const handleProductCategory3Create = async (category) => {
        try {
            const result = await createProductCategory3(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductcategory3Create.category3id === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductcategory3Create.category3id,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCategory3Update = async (category) => {
        try {
            const result = await updateProductCategory3(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductcategory3Update.category3id === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductcategory3Update.category3id,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCategory3Delete = async (category) => {
        try {
            const result = await deleteProductCategory3(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductcategory3Delete);
                if(result.data.E4kTblproductProductcategory3Delete.category3id === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductcategory3Delete.category3id,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmCategory3Delete = async () => {
        setShowConfirmCategory3(false);
        if (recordToDeleteCategory3) {
            try {
                const result = await deleteProductCategory3(recordToDeleteCategory3);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductcategory3Delete.category3id === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductcategory3Delete.category3id,{position: "top-center"});
                    }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handleEndEdit = (e) => {
        e.preventDefault();
        const newcategory = e.detail.data;
        newcategory.companyid=companyid
        //console.log('<<<<<<<<-----');
        //console.log('newData form data: ', e.detail.data);

        if ((newcategory.category3id || newcategory.category3id === 0) && newcategory.companyid && newcategory.description) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                category :newcategory.description,
                category3id:newcategory.category3id,
                        
              }
            //console.log('newData form Update: ', UpdateData);
            handleProductCategory3Update(UpdateData);
        } else {
            if (!newcategory.category3id && newcategory.companyid && newcategory.description ){
            let NewData = {
        
                companyid: newcategory.companyid,
                category :newcategory.description,
                
        
              }
            //console.log('newData form Create: ', NewData);
           handleProductCategory3Create(NewData);
        }
    }
    };

    const modalDialogclassName = isMaximizedCategory3 ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumcategory3 ? 'in' : ''}`} style={{ display: showModalMediumcategory3 ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCategory3}>
                                                            {isMaximizedCategory3 ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseMediumcategory3}>
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
                                            <div className="customer-newbold">Tbl Product Category3</div>
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
                                                    id="tblproductcategory3grid"
                                                    dataSourceSettings={dataSourceSettings3}
                                                    onEndEdit={handleEndEdit}
                                                    header={header}
                                                    dataSource={dataSource2}
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

            {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
            {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
            {showConfirmCategory3 && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCategory3(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCategory3(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmCategory3Delete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductCategory3Grid;
