'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useRef,useMemo} from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductTypeOfIssueQuery,
    useCreateProductTypeOfIssueMutation,
    useUpdateProductTypeOfIssueMutation,
    useDeleteProductTypeOfIssueMutation,
} from '../../store/services/e4kTblProductTypeOfIssue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const E4kTblProductTypeOfIssueGrid = ({ showModalMediumTypeOfIssue, handleCloseModalMediumTypeOfIssue }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const CompanyProductTypeofissue = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductTypeofissue);
    const [issueType, setIssueType] = useState(null);
    const gridTypeOfIssue = useRef()
    const { data, error, isLoading, isError } = useGetProductTypeOfIssueQuery({companyid:companyid,issueType:issueType});
    const [createProductTypeOfIssue, { isLoading: isCreating }] = useCreateProductTypeOfIssueMutation();
    const [updateProductTypeOfIssue, { isLoading: isUpdating }] = useUpdateProductTypeOfIssueMutation();
    const [deleteProductTypeOfIssue, { isLoading: isDeleting }] = useDeleteProductTypeOfIssueMutation();
    const [isMaximizedTypeOfIssue, setIsMaximizedTypeOfIssue] = useState(false);

    //////////////pop up delete
    const [showConfirmTypeofIssue, setShowConfirmTypeofIssue] = useState(false);
    const [recordToDeleteTypeofIssue, setRecordToDeleteTypeofIssue] = useState(null);

    useEffect(() => {
        if (data) {
            //console.log("datagrid Type Of Issue =", data);
            transformData();
        }
    }, [isLoading, data]);

    const transformData = () => {
        if (!data) return [];
        const datagrid = data.e4kTblproductProductTypeofissue.map(category => ({
            companyid: category.companyid.companyid,
            description: category.description,
            issueType: category.issueType
            }));
        //console.log("datagrid Type Of Issue =", datagrid);
        setDataGrid(datagrid);
    };

    useEffect(() => {
        window.commandColumnCustomCommand10 = function(row) {
            //console.log("Successfully selected", row.data.category1id);
            let deletedata = {
                companyid: row.data.companyid,
                issueType:row.data.issueType
        
              }
            setRecordToDeleteTypeofIssue(deletedata);
            setShowConfirmTypeofIssue(true);
              //handleProductTypeOfIssueDelete(deletedata);
        };
    }, []);

    const toggleMaximizeTypeOfIssue = () => {
        setIsMaximizedTypeOfIssue(!isMaximizedTypeOfIssue);
    };

    // const dataSource6 = useMemo(() => new Smart.DataAdapter({
    //     dataSource: dataGrid,
    //     dataFields: [
          
    //       'companyid: string',
    //       'issueType: number',
    //       'description: string',
          
    //     ],
    //   }), [dataGrid]);

      const dataSourceSettingsTypeOfIssue = {
		dataFields: [
			
          'companyid: string',
          'issueType: number',
          'description: string',
			
		]
	};

    const dataSourceTypeOfIssue = useMemo(() => dataGrid, [dataGrid]);

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
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand10', visible: true, label: '' },
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
        { label: 'IssueType', dataField: 'issueType', allowEdit: false },
        { label: 'Description', dataField: 'description' },
        
        
    ];

    const handleProductTypeOfIssueCreate = async (category) => {
        try {
            const result = await createProductTypeOfIssue(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProducttypeofissueCreate.typeOfIssue === "Success"){
                    toast.success('Created',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProducttypeofissueCreate.typeOfIssue,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductTypeOfIssueUpdate = async (category) => {
        try {
            const result = await updateProductTypeOfIssue(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProducttypeofissueUpdate.typeOfIssue === "Success"){
                    toast.success('Updated',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProducttypeofissueUpdate.typeOfIssue,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleProductTypeOfIssueDelete = async (category) => {
        try {
            const result = await deleteProductTypeOfIssue(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data.E4kTblproductProducttypeofissueDelete);
                if(result.data.E4kTblproductProducttypeofissueDelete.success === "Success"){
                    toast.success('Deleted',{position: "top-center"});
                }else{
                    toast.error(result.data.E4kTblproductProducttypeofissueDelete.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmTypeofIssueDelete = async () => {
        setShowConfirmTypeofIssue(false);
        if (recordToDeleteTypeofIssue) {
            try {
                const result = await deleteProductTypeOfIssue(recordToDeleteTypeofIssue);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProducttypeofissueDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                    } else {
                        toast.error(result.data.E4kTblproductProducttypeofissueDelete.success,{position: "top-center",autoClose: 3000});
                }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    /////////////////////////////////////

    const handleTypeOfIssueEndEdit = (e) => {
        e.preventDefault();
        const newcategory = e.detail.data;
        newcategory.companyid = companyid
        //console.log('<<<<<<<<-----');
        //console.log('newData Type Of Issue data: ', e.detail.data);

        if (newcategory.issueType && newcategory.companyid && newcategory.description ) {
            let UpdateData = {
        
                companyid: newcategory.companyid,
                description : newcategory.description,
                issueType:newcategory.issueType,
                        
              }
            //console.log('newData form Type Of Issue Update: ', UpdateData);
            handleProductTypeOfIssueUpdate(UpdateData);
        } else {
            if (!newcategory.issueType && newcategory.companyid && newcategory.description ){
            let NewData = {
        
                companyid: newcategory.companyid,
                description :newcategory.description,
                
                
        
              }
            //console.log('newData form Type Of Issue Create: ', NewData);
           handleProductTypeOfIssueCreate(NewData);
        }
    }
    };
    const modalDialogclassName = isMaximizedTypeOfIssue ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumTypeOfIssue ? 'in' : ''}`} style={{ display: showModalMediumTypeOfIssue ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeTypeOfIssue}>
                                                            {isMaximizedTypeOfIssue ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleCloseModalMediumTypeOfIssue}>
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
                                            <div className="customer-newbold">Tbl Product Type Of Issue </div>
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
                                                    id="tblproducttypeofissuegrid"
                                                    dataSourceSettings={dataSourceSettingsTypeOfIssue}
                                                    ref={gridTypeOfIssue}
                                                    onEndEdit={handleTypeOfIssueEndEdit}
                                                    header={header}
                                                    dataSource={dataSourceTypeOfIssue}
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
            {showConfirmTypeofIssue && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmTypeofIssue(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmTypeofIssue(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmTypeofIssueDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductTypeOfIssueGrid;
