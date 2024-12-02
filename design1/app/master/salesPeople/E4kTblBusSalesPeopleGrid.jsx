

'use client';
import {Smart, Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState ,useRef,useMemo} from 'react';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import {
    useGetTblBusSalesPeopleAPIQuery,
    
} from '../../store/services/e4kTblProductProductReps';


import {   addSelectProductSalesPeople, 
    removeSelectProductSalesPeople,
    resetSelectProductSalesPeople } from '../../store/slices/e4kTblProductSalesPeopleAdd';

const E4kTblBusSalesPeopleGrid = ({ showModalMediumSalesPeople, handleCloseModalMediumSalesPeople,isEdit }) => {
    const [dataGridSalesPeople, setDataGridSalesPeople] = useState([]);
    const [dataGridSelectSalesPeople, setDataGridSelectSalesPeople] = useState([]);
    const CompanyProductSalesPeople = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductSalesPeople);
    const [propertyid, setPropertyid] = useState(null);
    const gridSalesPeople = useRef()
    const gridSalesPeopleSelect = useRef()

    const { data, error, isLoading, isError } =     useGetTblBusSalesPeopleAPIQuery({
                        companyid:companyid});
    
    const [isMaximizedSalesPeople, setIsMaximizedSalesPeople] = useState(false);

    ////////Dispatch store properties--------------------------------
    const dispatchSalesPeople = useDispatch();
    const ProductAddPropertySalesPeople = useSelector((state) => state.selectProductSalesPeopleAdd.selectProductSalesPeople);

    useEffect(() => {
        if (ProductAddPropertySalesPeople.length === 0) {
            //console.log('Product reset', ProductAddPropertySalesPeople);
        }

        
    }, [ProductAddPropertySalesPeople]);

    useEffect(() => {
        // Clear the selection state when the component mounts
        dispatchSalesPeople(resetSelectProductSalesPeople());
    }, [dispatchSalesPeople]);

    //////////////pop up delete
    const [showConfirmSalesPeople, setShowConfirmSalesPeople] = useState(false);
    const [recordToDeleteSalesPeople, setRecordToDeleteSalesPeople] = useState(null);

    useEffect(() => {
        if (data) {
            transformDataSalesPeople();
        }
    }, [isLoading, data]);

    const transformDataSalesPeople = () => {
        if (!data) return [];
        const datagrid = data.e4kTblbusSalesPeople.map(category => ({
            repkey: category.repkey,
            forename: category.forename,
            repid: category.repid,
            surname : category.surname,
            live: category.live

            }));
        setDataGridSalesPeople(datagrid);
        setDataGridSelectSalesPeople(datagrid);
    };

    


      const dataSourceSettingsSalesPeople =  {
		dataFields: [
            'repid: number',
            'repkey: string',
            'forename: string',
            'surname: string',
            'live: boolean'
			
		]
	};
    const dataSourceSalesPeople = useMemo(() => dataGridSalesPeople, [dataGridSalesPeople]);


    const toggleMaximizeSalesPeople = () => {
        setIsMaximizedSalesPeople(!isMaximizedSalesPeople);
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
        
    } : { enabled: false ,
        addNewRow: {
        visible: false,
        
    },};

    const selection = isEdit ? {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    } : {
        enabled: true,
        checkBoxes: {
            enabled: true
        }
    };

    const message = useMemo(() => ({
        en: {
            addNewRow: '+New',
        },
      }), [companyid]);

    const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };

    const columns = isEdit ? [
        { label: 'Rep ID', dataField: 'repid' ,allowEdit: false,visible:false},
        { label: 'Rep Key', dataField: 'repkey', allowEdit: false },
        { label: 'Fore Name', dataField: 'forename' ,allowEdit: false},
        { label: 'Sur Name', dataField: 'surname' ,allowEdit: false},
        { label: 'Live', dataField: 'live' ,allowEdit: false,visible:false},
        
        
    ] :[
        { label: 'Rep ID', dataField: 'repid' ,allowEdit: false,visible:false},
        { label: 'Rep Key', dataField: 'repkey', allowEdit: false },
        { label: 'Fore Name', dataField: 'forename' ,allowEdit: false},
        { label: 'Sur Name', dataField: 'surname' ,allowEdit: false},
        { label: 'Live', dataField: 'live' ,allowEdit: false,visible:false},
        
        
    ];

   
  
let var1 = []; // Use 'let' for variable declaration

        
const handleSalesPeopleRowClickEvent = (e) => {
        e.preventDefault();
        const rowData = e.detail.row.data;
        const selected = e.detail.row.selected;
        
        if (rowData) {
            if (selected) {
            
            const existingItem = var1.find(item => item.repkey === rowData.repkey);

            if (!existingItem) {
                var1.push({
                    repid: rowData.repid, 
                    repkey: rowData.repkey, 
                    forename:rowData.forename,
                    surname:rowData.surname,
                    live: rowData.live });
                    dispatchSalesPeople(addSelectProductSalesPeople({ 
                    repid: rowData.repid, 
                    repkey: rowData.repkey, 
                    forename:rowData.forename,
                    surname:rowData.surname,
                    live: rowData.live 
                
                }));
            }
            } else {
            var1 = var1.filter(item => item.repkey !== rowData.repkey);
            dispatchSalesPeople(removeSelectProductSalesPeople({ repkey: rowData.repkey }));
            }
        }
        
        };

    const handleclosegridselect =() => {
        const grid = gridSalesPeopleSelect.current;
        //console.log('handleclosegridselect@@@@@@@@@@@@@@',isEdit)
        if (grid) {
            
            grid.clearSelection();
            
        }

        handleCloseModalMediumSalesPeople()

    }


    const modalDialogclassName = isMaximizedSalesPeople ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumSalesPeople ? 'in' : ''}`} style={{ display: showModalMediumSalesPeople ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeSalesPeople}>
                                                            {isMaximizedSalesPeople ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleclosegridselect}>
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
                                            <div className="customer-newbold">Tbl Product Sales People </div>
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
                                                                id={isEdit ? "tblproductpropertytypesgrid" : "tblproductpropertytypesgridselect"}
                                                                dataSourceSettings={dataSourceSettingsSalesPeople}
                                                                ref={isEdit ? gridSalesPeople : gridSalesPeopleSelect}
                                                               // onEndEdit={isEdit ? handleSalesPeopleRowClickEvent : undefined}
                                                                header={header}
                                                                dataSource={dataSourceSalesPeople}
                                                                filtering={filtering}
                                                                columns={columns}
                                                                behavior={isEdit ? behavior : undefined}
                                                                paging={isEdit ? paging : undefined}
                                                                pager={isEdit ? pager : undefined}
                                                                sorting={sorting}
                                                                selection={selection}
                                                                editing={editing}
                                                                appearance={isEdit ? appearance : appearance1}
                                                                className='mx-auto'
                                                                onRowClick={!isEdit ? handleSalesPeopleRowClickEvent : undefined}
                                                                messages={message}
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

           
        </>
    );
};

export default E4kTblBusSalesPeopleGrid;
