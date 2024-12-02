'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductCategories2Query,
    useCreateProductCategory2Mutation,
    useUpdateProductCategory2Mutation,
    useDeleteProductCategory2Mutation,
} from '../../store/services/e4kTblProductCategory2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const addImageKey = (record) => {
    if (record.imagePath){
        const imagePathParts = record.imagePath.split('\\');
        const imageName = imagePathParts[imagePathParts.length - 1];
        //console.log('imagePath: ' + imageName);
        return { ...record, imagePath: "../product/category2/".concat(imageName) };
    }else{
        return { ...record, imagePath: "" };
    }
};

const E4kTblProductCategory2Grid = ({ showModalMediumcategory2, handleCloseMediumcategory2 }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanySelectCategory2 = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanySelectCategory2);
    const { data, error, isLoading, isError } = useGetProductCategories2Query(companyid);
    const [createProductCategory2, { isLoading: isCreating }] = useCreateProductCategory2Mutation();
    const [updateProductCategory2, { isLoading: isUpdating }] = useUpdateProductCategory2Mutation();
    const [deleteProductCategory2, { isLoading: isDeleting }] = useDeleteProductCategory2Mutation();
    const [isMaximizedCategory2, setIsMaximizedCategory2] = useState(false);

    //////////////pop up delete
    const [showConfirmCategory2, setShowConfirmCategory2] = useState(false);
    const [recordToDeleteCategory2, setRecordToDeleteCategory2] = useState(null);

    useEffect(() => {
        if (data) {
            //console.log("datagrid2=", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductCategory2.map(category => ({
            category2id: category.category2id,
            companyid: category.companyid.companyid,
            category: category.description,
            imagePath: category.imagepath ,
        }));

        const Data = datagrid.map(addImageKey);
        //console.log("datagrid=", Data);
        setDataGrid(Data);
    };

    useEffect(() => {
        window.commandColumnCustomCommand2 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                category2id:row.data.category2id
        
              }
            setRecordToDeleteCategory2(deletedata);
            setShowConfirmCategory2(true);
            //handleProductCategory2Delete(deletedata);
        };
    }, []);

    const toggleMaximizeCategory2 = () => {
        setIsMaximizedCategory2(!isMaximizedCategory2);
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
            //display:"row",
            position:"near",
        },
        commandColumn: {
            visible: true,
            displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand2', visible: true, label: '' },
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
    const dataSourceSettings = {
		dataFields: [
			'companyid: string',
			'category2id: number',
			'category: string',
			'imagePath: string',
			
		]
	};

    const columns = [
        { label: 'CompanyId', dataField: 'companyid',allowEdit: false,visible:false  },
        { label: 'Category2ID', dataField: 'category2id', allowEdit: false },
        { label: 'Category', dataField: 'category' },
        { 
            label: 'ImagePath', 
            dataField: 'imagePath', 
            showIcon: true,  
            template: 'image', 
            editor: 'image',
            cardHeight: 6
        },
    ];

    const handleProductCategory2Create = async (category) => {
        try {
            const result = await createProductCategory2(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4KTblproductProductcategory2Create.category2id === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4KTblproductProductcategory2Create.category2id,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCategory2Update = async (category) => {
        try {
            const result = await updateProductCategory2(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4KTblproductProductcategory2Update.category2id === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4KTblproductProductcategory2Update.category2id,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCategory2Delete = async (category) => {
        try {
            const result = await deleteProductCategory2(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductcategory2Delete);
                if(result.data.E4kTblproductProductcategory2Delete.category2id === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductcategory2Delete.category2id,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmCategory2Delete = async () => {
        setShowConfirmCategory2(false);
        if (recordToDeleteCategory2) {
            try {
                const result = await deleteProductCategory2(recordToDeleteCategory2);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductcategory2Delete.category2id === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductcategory2Delete.category2id,{position: "top-center"});
                    }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handleEndEdit = (e) => {
        //e.preventDefault();
        const newcategory = e.detail.data;
        newcategory.companyid=companyid
      

        //const isImage = newcategory.imagePath !== '' 
        const isImage = (newcategory.imagePath !== '') ? (newcategory.imagePath.includes("../product/category2/") ? false : true) : false;
        if ((newcategory.category2id || newcategory.category2id === 0) && newcategory.companyid && newcategory.category ) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                category :newcategory.category,
                category2id:newcategory.category2id,
                imagePath: isImage ? JSON.parse(newcategory.imagePath)[0].value : "",
                filename:newcategory.category
              }
            
            handleProductCategory2Update(UpdateData);
        } else {
            if (!newcategory.category2id && newcategory.companyid && newcategory.category ){
            let NewData = {
        
                companyid: newcategory.companyid,
                category :newcategory.category,
                imagePath: isImage ? JSON.parse(newcategory.imagePath)[0].value : "",
                filename:newcategory.category
              }
            
           handleProductCategory2Create(NewData);
        }
    }
    };

    const modalDialogclassName = isMaximizedCategory2 ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumcategory2 ? 'in' : ''}`} style={{ display: showModalMediumcategory2 ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCategory2}>
                                                            {isMaximizedCategory2 ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseMediumcategory2}>
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
                                            <div className="customer-newbold">Tbl Product Category2</div>
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
                                                    id="tblproductcategory2grid"
                                                    dataSourceSettings={dataSourceSettings}
                                                    onEndEdit={handleEndEdit}
                                                    header={header}
                                                    dataSource={dataGrid}
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
            {showConfirmCategory2 && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCategory2(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCategory2(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmCategory2Delete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductCategory2Grid;
