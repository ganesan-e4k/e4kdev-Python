'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useMemo} from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductClassQuery,
    useCreateProductClassMutation,
    useUpdateProductClassMutation,
    useDeleteProductClassMutation,
} from '../../store/services/e4kTblProductClass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const E4kTblProductClassGrid = ({ showModalMedium, handleCloseMedium }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanySelectClass = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanySelectClass);
    const { data, error, isLoading, isError } = useGetProductClassQuery(companyid);
    const [createProductClass, { isLoading: isCreating }] = useCreateProductClassMutation();
    const [updateProductClass, { isLoading: isUpdating }] = useUpdateProductClassMutation();
    const [deleteProductClass, { isLoading: isDeleting }] = useDeleteProductClassMutation();
    const [isMaximizedProductClass, setIsMaximizedProductClass] = useState(false);

    //////////////pop up delete
    const [showConfirmClass, setShowConfirmClass] = useState(false);
    const [recordToDeleteClass, setRecordToDeleteClass] = useState(null);

    useEffect(() => {
        if (data) {
            //console.log("datagridclass=", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductClass.map(category => ({
            classid: category.classid,
            companyid: category.companyid.companyid,
            description: category.description,
            }));
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand4 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                classid:row.data.classid
        
              }
            setRecordToDeleteClass(deletedata);
            setShowConfirmClass(true);
            //handleProductClassDelete(deletedata);
        };
    }, []);

    const toggleMaximizeProductClass = () => {
        setIsMaximizedProductClass(!isMaximizedProductClass);
    };

    // const dataSource3 = useMemo(() => new Smart.DataAdapter({
    //     dataSource: dataGrid,
    //     dataFields: [
          
    //       'companyid: string',
    //       'classid: number',
    //       'description: string',
          
    //     ],
    //   }), [dataGrid]);

      const dataSourceSettings3 = {
		dataFields: [
			'companyid: string',
			'classid: number',
			'description: string',
			
		]
	};

    const dataSource3 = useMemo(() => dataGrid, [dataGrid]);

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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand4', visible: true, label: '' },
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
        { label: 'ClassId', dataField: 'classid', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        
    ];

    const handleProductClassCreate = async (category) => {
        try {
            const result = await createProductClass(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductclassCreate.class_ === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductclassCreate.class_,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductClassUpdate = async (category) => {
        try {
            const result = await updateProductClass(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductclassUpdate.classId === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductclassUpdate.classId,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductClassDelete = async (category) => {
        try {
            const result = await deleteProductClass(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductclassDelete);
                if(result.data.E4kTblproductProductclassDelete.success === "Success"){
                    toast.success('Saved',{position: "top-center"});
                }else{
                    toast.error('Failed',{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmClassDelete = async () => {
        setShowConfirmClass(false);
        if (recordToDeleteClass) {
            try {
                const result = await deleteProductClass(recordToDeleteClass);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductclassDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductclassDelete.success,{position: "top-center",autoClose: 3000});
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
        newcategory.companyid = companyid
        //console.log('<<<<<<<<-----');
        //console.log('newData form data: ', e.detail.data);

        if ((newcategory.classid || newcategory.classid === 0) && newcategory.companyid && newcategory.description) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                description :newcategory.description,
                classid:newcategory.classid,
                        
              }
           // console.log('newData form Update: ', UpdateData);
            handleProductClassUpdate(UpdateData);
        } else {
            if (!newcategory.classid && newcategory.companyid && newcategory.description ){
            let NewData = {
        
                companyid: newcategory.companyid,
                className :newcategory.description,
                
        
              }
           //console.log('newData form Create: ', NewData);
           handleProductClassCreate(NewData);
        }
    }
    };

    const modalDialogclassName = isMaximizedProductClass ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMedium ? 'in' : ''}`} style={{ display: showModalMedium ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeProductClass}>
                                                            {isMaximizedProductClass ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseMedium}>
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
                                            <div className="customer-newbold">Tbl Product Class </div>
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
                                                    id="tblProductclassgrid"
                                                    onEndEdit={handleEndEdit}
                                                    dataSourceSettings={dataSourceSettings3}
                                                    header={header}
                                                    dataSource={dataSource3}
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
            {showConfirmClass && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmClass(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmClass(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmClassDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductClassGrid;
