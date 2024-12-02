

'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductCategories1Query,
    useCreateProductCategory1Mutation,
    useUpdateProductCategory1Mutation,
    useDeleteProductCategory1Mutation,
} from '../../store/services/e4kTblProductCategory1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// import AlertMessage from '../../template-popup/AlertMessages';
// import PopupNotification from  "../../customComponents/PopupNotification";


const addImageKey = (record) => {
    if (record.imagePath){
        const imagePathParts = record.imagePath.split('\\');
        const imageName = imagePathParts[imagePathParts.length - 1];
        //console.log('imagePath: ' + imageName);
        return { ...record, imagePath: "../product/category1/".concat(imageName) };
    }else{
        return { ...record, imagePath: "" };
    }
};



const E4kTblProductCategory1Grid = ({ showModalMediumcategory1, handleCloseMediumcategory1 }) => {
    const [dataGrid, setDataGrid] = useState([]);
    
    const CompanySelectCategory1 = useSelector((state) => state.selectCompanyid.Companyid);

    const [companyid, setCompanyid] = useState(CompanySelectCategory1);
    const { data, error, isLoading, isError } = useGetProductCategories1Query(companyid);
    
    const [createProductCategory, { isLoading: isCreating }] = useCreateProductCategory1Mutation();
    const [updateProductCategory, { isLoading: isUpdating }] = useUpdateProductCategory1Mutation();
    const [deleteProductCategory, { isLoading: isDeleting }] = useDeleteProductCategory1Mutation();
    const [isMaximizedCategory1, setIsMaximizedCategory1] = useState(false);

    //////////////pop up delete
    const [showConfirmCategory1, setShowConfirmCategory1] = useState(false);
    const [recordToDeleteCategory1, setRecordToDeleteCategory1] = useState(null);

    /////////// Alert message
    /********** Alert popup *********/
	const [showModalAlert, setShowModalAlert] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    

	

    useEffect(() => {
        if (data) {
            //console.log("datagrid category1 =", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductCategory1.map(category => ({
            category1id: category.category1id,
            companyid: category.companyid.companyid,
            category: category.description,
            imagePath: category.imagepath ,
            //attachments:category.imagepath
        }));
        const Data = datagrid.map(addImageKey);
        
        setDataGrid(Data);
        
    };

    useEffect(() => {
        window.commandColumnCustomCommand1 = function(row) {
            let deletedata = {
                companyid: row.data.companyid,
                category1id:row.data.category1id
        
              }
            setRecordToDeleteCategory1(deletedata);
            setShowConfirmCategory1(true);
        };
    }, []);

    const toggleMaximizeCategory1 = () => {
        setIsMaximizedCategory1(!isMaximizedCategory1);
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
        dialog: {
			height: 600
		},
        commandColumn: {
            visible: true,
            displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand1', visible: true, label: '' },
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
			'category1id: number',
			'category: string',
			'imagePath: string',
            //'attachments :string',
		]
	};


    const columns = [
        
        { label: 'CompanyId',dataField: 'companyid',allowEdit: false,visible:false  },
        { 
            label: 'Category1ID', 
            dataField: 'category1id', 
            allowEdit: false ,
            
        },
        { 
            label: 'Category',
             dataField: 'category',
        },

        { 
            label: 'ImagePath', 
            dataField: 'imagePath', 
            showIcon: true,  
            template: 'image', 
            editor: 'image',
            cardHeight: 6 },
        
        
    ];

    //////////////////////////////// Alert Message
    const handleOpenModalAlert = () => {
		setShowModalAlert(true);
	};
	  
	const handleCloseModalAlert = () => {
		setShowModalAlert(false);
	};

    const handleClosePopup = () => {
        setShowPopup(false);
      };

    ///////////////////////////////////////
    const handleProductCategory1Create = async (category) => {
        try {
            const result = await createProductCategory(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                //console.log('Mutation Success:', result.data);
                if(result.data.E4KTblproductProductcategory1Create.category1id === "Success"){
                    toast.success(result.data.E4KTblproductProductcategory1Create.message,
                        {
                            position: "top-center",
                            autoClose: 500,
                            hideProgressBar: true,
                        }
                    );
                }else{
                    toast.error(result.data.E4KTblproductProductcategory1Create.message,
                        {
                            position: "top-center",
                            autoClose: 500,
                            hideProgressBar: true,
                        }
                    );
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCategory1Update = async (category) => {
        try {
            const result = await updateProductCategory(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                //console.log('Mutation Success:', result.data);
                if(result.data.E4KTblproductProductcategory1Update.category1id === "Success"){
                    //setPopupMessage('API call was successful!');
                    //setPopupType('success');
                    //setShowPopup(true);
                    toast.success(result.data.E4KTblproductProductcategory1Update.message,
                        {
                            position: "top-center",
                            autoClose: 500,
                            hideProgressBar: true,
                        }
                    );
                }else{
                    
                    toast.error(result.data.E4KTblproductProductcategory1Update.message ,
                        {
                            position: "top-center",
                            autoClose: 500,
                            hideProgressBar: true,
                        }
                    
                    );
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductCategory1Delete = async (category) => {
        try {
            const result = await deleteProductCategory(category);
            if (result.error) {
                //console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4KTblproductProductcategory1Delete.category1id);
                if(result.data.E4KTblproductProductcategory1Delete.category1id === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4KTblproductProductcategory1Delete.category1id,{position: "top-center",autoClose: 3000});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };


    //////////////////////////////////////////pop up delete 
    const handleConfirmCategory1Delete = async () => {
        setShowConfirmCategory1(false);
        if (recordToDeleteCategory1) {
            try {
                const result = await deleteProductCategory(recordToDeleteCategory1);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4KTblproductProductcategory1Delete.category1id === "Success") {
                        toast.success(result.data.E4KTblproductProductcategory1Delete.message,
                            {
                                position: "top-center",
                                autoClose: 500,
                                hideProgressBar: true,
                            }
                        );
                    } else {
                        toast.error(result.data.E4KTblproductProductcategory1Delete.message,
                            {
                                position: "top-center",
                                autoClose: 500,
                                hideProgressBar: true,
                            }
                        );
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
        
        
        const isImage = (newcategory.imagePath !== '') ? (newcategory.imagePath.includes("../product/category1/") ? false : true) : false;
        //console.log(newcategory,'New category isImage#########:', isImage)

        if ((newcategory.category1id || newcategory.category1id === 0) && newcategory.companyid && newcategory.category) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                category :newcategory.category,
                category1id:newcategory.category1id,
                imagePath: isImage ? JSON.parse(newcategory.imagePath)[0].value : "",
                filename:newcategory.category
        
              }
            //console.log('newData form Update: ', UpdateData);
            handleProductCategory1Update(UpdateData);
        } else {
            if (!newcategory.category1id && newcategory.companyid && newcategory.category ){
            let NewData = {
        
                companyid: newcategory.companyid,
                category :newcategory.category,
                imagePath: isImage ? JSON.parse(newcategory.imagePath)[0].value : "",
                filename:newcategory.category
        
              }
            
              //console.log('Create new categiry1: ', NewData);
           handleProductCategory1Create(NewData);
        }
    }
    };
    const modalDialogclassName = isMaximizedCategory1 ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';
    return (
        <>
            <div className={`modal fade ${showModalMediumcategory1 ? 'in' : ''}`} style={{ display: showModalMediumcategory1 ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCategory1}>
                                                            {isMaximizedCategory1 ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseMediumcategory1}>
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
                                            <div className="customer-newbold">Tbl Product Category1</div>
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
                                                    id="tblproductcategory1grid"
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
            {showConfirmCategory1 && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCategory1(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCategory1(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmCategory1Delete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
            

        </>
    );
};

export default E4kTblProductCategory1Grid;

