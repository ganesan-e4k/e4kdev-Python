'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useRef,useMemo} from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductUnitOfIssueQuery,
    useCreateProductUnitOfIssueMutation,
    useUpdateProductUnitOfIssueMutation,
    useDeleteProductUnitOfIssueMutation,
} from '../../store/services/e4kTblProductUnitOfIssue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const E4kTblProductUnitOfIssueGrid = ({ showModalMediumUnitOfIssue, handleCloseModalMediumUnitOfIssue }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanyProductUnitofissue = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductUnitofissue);
    const [issueUnits, setIssueUnits] = useState(null);
    const gridUnitofIssue = useRef()
    const { data, error, isLoading, isError } = useGetProductUnitOfIssueQuery({companyid:companyid,issueUnits:issueUnits});
    const [createProductUnitOfIssue, { isLoading: isCreating }] = useCreateProductUnitOfIssueMutation();
    const [updateProductUnitOfIssue, { isLoading: isUpdating }] = useUpdateProductUnitOfIssueMutation();
    const [deleteProductUnitOfIssue, { isLoading: isDeleting }] = useDeleteProductUnitOfIssueMutation();
    const [isMaximizedUnitOfIssue, setIsMaximizedUnitOfIssue] = useState(false);

    //////////////pop up delete
    const [showConfirmUnitofIssue, setShowConfirmUnitofIssue] = useState(false);
    const [recordToDeleteUnitofIssue, setRecordToDeleteUnitofIssue] = useState(null);

    useEffect(() => {
        if (data) {
            //console.log("datagrid Unit Of Issue =", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductUnitofissue.map(category => ({
            companyid: category.companyid.companyid,
            description: category.description,
            issueUnits: category.issueUnits
            }));
        
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand11 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                issueUnits:row.data.issueUnits
        
              }
            setRecordToDeleteUnitofIssue(deletedata);
            setShowConfirmUnitofIssue(true);
              //handleProductUnitOfIssueDelete(deletedata);
        };
    }, []);

    const toggleMaximizeUnitOfIssue = () => {
        setIsMaximizedUnitOfIssue(!isMaximizedUnitOfIssue);
    };

    // const dataSource7 = useMemo(() => new Smart.DataAdapter({
    //     dataSource: dataGrid,
    //     dataFields: [
          
    //       'companyid: string',
    //       'issueUnits: number',
    //       'description: string',
          
    //     ],
    //   }), [dataGrid]);

      const dataSourceSettingsUnitOfIssue = {
		dataFields: [
			
            
          'companyid: string',
          'issueUnits: number',
          'description: string',
			
		]
	};

    const dataSourceUnitOfIssue = useMemo(() => dataGrid, [dataGrid]);

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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand11', visible: true, label: '' },
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
        { label: 'Issue Units', dataField: 'issueUnits', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        
        
    ];

    const handleProductUnitOfIssueCreate = async (category) => {
        try {
            const result = await createProductUnitOfIssue(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductunitofissueCreate.unitOfIssue === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductunitofissueCreate.unitOfIssue,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductUnitOfIssueUpdate = async (category) => {
        try {
            const result = await updateProductUnitOfIssue(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductunitofissueUpdate.unitOfIssue === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductunitofissueUpdate.unitOfIssue,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductUnitOfIssueDelete = async (category) => {
        try {
            const result = await deleteProductUnitOfIssue(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProductunitofissueDelete);
                if(result.data.E4kTblproductProductunitofissueDelete.success === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProductunitofissueDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmUnitofIssueDelete = async () => {
        setShowConfirmUnitofIssue(false);
        if (recordToDeleteUnitofIssue) {
            try {
                const result = await deleteProductUnitOfIssue(recordToDeleteUnitofIssue);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductunitofissueDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProductunitofissueDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handleUnitOfIssueEndEdit = (e) => {
        e.preventDefault();
        const newcategory = e.detail.data;
        newcategory.companyid = companyid
        //console.log('<<<<<<<<-----Unit ');
        //console.log('newData Unit Of Issue data: ', e.detail.data);

        if (newcategory.issueUnits && newcategory.companyid && newcategory.description ) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                description : newcategory.description,
                issueUnits:newcategory.issueUnits,
                        
              }
            //console.log('newData form Unit Of Issue Update: ', UpdateData);
            handleProductUnitOfIssueUpdate(UpdateData);
        } else {
            if (!newcategory.issueUnits && newcategory.companyid && newcategory.description ){
            let NewData = {
        
                companyid: newcategory.companyid,
                description :newcategory.description,
                
                
        
              }
            //console.log('newData form Unit Of Issue Create: ', NewData);
           handleProductUnitOfIssueCreate(NewData);
        }
    }
    };
    const modalDialogclassName = isMaximizedUnitOfIssue ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumUnitOfIssue ? 'in' : ''}`} style={{ display: showModalMediumUnitOfIssue ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeUnitOfIssue}>
                                                            {isMaximizedUnitOfIssue ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseModalMediumUnitOfIssue}>
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
                                            <div className="customer-newbold">Tbl Product Unit Of Issue </div>
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
                                                    id="tblproductunitofissuegrid"
                                                    dataSourceSettings={dataSourceSettingsUnitOfIssue}
                                                    ref={gridUnitofIssue}
                                                    onEndEdit={handleUnitOfIssueEndEdit}
                                                    header={header}
                                                    dataSource={dataSourceUnitOfIssue}
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
            {showConfirmUnitofIssue && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmUnitofIssue(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmUnitofIssue(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmUnitofIssueDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductUnitOfIssueGrid;
