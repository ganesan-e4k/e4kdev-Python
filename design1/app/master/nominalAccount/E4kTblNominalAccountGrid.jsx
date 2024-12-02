
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector } from 'react-redux';
import { useEffect, useState,useMemo } from 'react';
import {
    useGetNominalAccountsQuery,
    useCreateNominalAccountMutation,
    useUpdateNominalAccountMutation,
    useDeleteNominalAccountMutation,
} from '../../store/services/Customer/e4kTblNominalAccount';

import { toast } from 'react-toastify';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';





const E4kTblNominalAccountGrid = ({ showModalMediumNominalAccount, handleCloseMediumNominalAccount }) => {
    const [dataGridNominalAccount, setdataGridNominalAccount] = useState([]);
    const CompanySelectTblNominalAccount = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectTblNominalAccount);
    const { data, error, isLoading } = useGetNominalAccountsQuery(companyId);
    const [createNominalAccount, { isLoading: isCreating }] = useCreateNominalAccountMutation();
    const [updateNominalAccount, { isLoading: isUpdating }] = useUpdateNominalAccountMutation();
    const [deleteNominalAccount, { isLoading: isDeleting }] = useDeleteNominalAccountMutation();
    const [isMaximizedNominalAccount, setisMaximizedNominalAccount] = useState(false);
    const [showConfirm, setShowConfirmNominal] = useState(false);
    const [recordToDeleteNominal, setRecordToDeleteNominal] = useState(null);



    
    useEffect(() => {
        if (data) {
            transformDataNominalAccount();
        }
    }, [data]);

    const transformDataNominalAccount = () => {
        if (!data) return [];
        const transformedData = data.E4kTblnominallist.map(account => ({
            nomcode: account.nomcode.toString(),
            companyid: account.companyid.companyid,
            nomdescription: account.nomdescription,
            live: account.live,
            nombs: account.nombs,
            nomdc: account.nomdc,
            nompl: account.nompl,
        }));
        console.log("GHHHHHHHJK", transformedData)
        setdataGridNominalAccount(transformedData);
    };
     ////// Delete /////////////////////////////////////////////////////////////////////////

     useEffect(() => {
        window.commandColumnCustomCommandtblaccNominal = function(row) {
            
            let deletedata = {
                companyid: row.data.companyid,
                nomcode: parseInt(row.data.nomcode, 10),
            };
            
            setRecordToDeleteNominal(deletedata);
            setShowConfirmNominal(true);
        };
    }, []);

    const toggleMaximizeaccNominal = () => {
        setisMaximizedNominalAccount(!isMaximizedNominalAccount);
    };

    //   const handleEndEdit = async (e) =>{
    //     console.log("jsgchcgc", e)
    //     const updatedAccount =e.detail.row.data;
    //     console.log('hgds',handleEndEdit)
    //     updatedAccount.companyid = companyId;
    //     if(updatedAccount.companyid != ''){
    //         await handleNominalAccountCreate(updatedAccount);
    //     }
    //     else{
    //         if(updatedAccount.companyid = ''){
    //             await handleNominalAccountUpdate(updatedAccount);
    //         }
            
            
    //     }
    //   }
  

   const handleEndEdit = async(e)=>{
    const updatedAccount = e.detail.data;
    console.log("chscvhcvdcdhc",updatedAccount )
    if (updatedAccount.companyid !=''){
        await handleNominalAccountUpdate(updatedAccount);
    }
    else{
        await handleNominalAccountCreate(updatedAccount);
    }
   };

    const handleNominalAccountCreate = async (account) =>{
        if(!account){
            toast.error('Please enter all required fields.');
            return;
        }
        try {
            const result = await createNominalAccount({
                ...account,
                companyid : String(companyId),
                nomcode: String(account.nomcode),
                nombs: account.nombs ? 1 : 0,
                nompl: account.nompl ? 1 : 0,  
            });
            console.log("JHJHJHJHJHJHJHJHJHJH", {
                ...account,
                nomcode: String(account.nomcode),
                nombs: account.nombs ? 1 : 0,
                nompl: account.nompl ? 1 : 0,  
            });
            if (result.data.E4kTblacctnominalcreate.success === true) {
                toast.success("Nominal account created successfully" , { position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,})
            }
            else {
                toast.error(`Account creation Failed : ${result.data.E4kTblacctnominalcreate.error}`, { 
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
        }
        catch (error) {
            console.error('Mutation Error:', error);
            toast.error(`Error creating account : ${error}` ,{ position: "top-center",
                autoClose: 500,
                hideProgressBar: true,});
        }
    } ;
    
    const handleNominalAccountUpdate = async (account) => {
        try {
            
            const result = await updateNominalAccount({
                ...account,
                nombs: account.nombs ? 1 : 0,
                nompl: account.nompl ? 1 : 0,
            });
            if (result.data.E4kTblaccnominalupdate.success === true) {
                console.error('Mutation Error:', result.error);
                toast.success('Account updated successfully' , {   position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,});
            } else {

                toast.error(`Account updated Failed : ${result.data.E4kTblaccnominalupdate.error}`, {   position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,});
            }
        } catch (error) {
            console.error('Mutation Error:', error);
            toast.error(`Error updating account : ${error}` ,{  
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
            });
        }
    };
    


    const filtering = {
        enabled: true,
        filterRow: {
            visible: true,
        },
    };

    const behavior = {
        rowResizeMode: 'growAndShrink',
        columnResizeMode: 'growAndShrink'
    };

    const message = useMemo(() => ({
        en: {
            addNewRow: '+New',
        },
      }), [companyId]);


    const appearance = {
        showRowHeaderNumber: false,
        showRowHeader: true,
        showRowHeaderSelectIcon: true,
        showRowHeaderFocusIcon: true
    };

    const paging = {
        enabled: true,
        pageSize: 20,
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
        mode:'row',
        addNewRow: {
            visible: true,
            position: 'near',
        },
        commandColumn: {
            visible: true,
            //displayMode: 'icon',
            dataSource: {
                commandColumnDelete: { visible: false },
                commandColumnEdit: { visible: true },
                commandColumnCustom: { icon: 'fa fa-trash', command: 'commandColumnCustomCommandtblaccNominal', visible: true },
            },
        }}

 
    const dataSourceSettings = {
		dataFields: [
			'companyid: string',
			'nomcode: string',
			'nomdescription: string',
            'live: boolean',
            'nombs: boolean',
            'nomdc: string',
            'nompl: boolean',
			
			
		]
	};

    const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };

    const selection = {
        enabled: true,
        mode: 'extended',
        allowCellSelection: true,
    };


    const columns = [
        { label: 'Company ID', dataField: 'companyid',  allowEdit: false, visible: false },
        { label: 'Nominal Code', dataField: 'nomcode' },
        { label: 'Nominal Description', dataField: 'nomdescription', allowEdit: true },
        { label: 'Nom DC', dataField: 'nomdc'},
        { label: 'Nom BS', dataField: 'nombs',template: 'checkBox',editor: 'checkBox'},
       
        { label: 'Nom PL', dataField: 'nompl',template: 'checkBox',editor: 'checkBox'},
        { label: 'Live', dataField: 'live',template: 'checkBox',editor: 'checkBox'},
      
    ];
    

   

    const handleConfirmDeleteNominal = async () =>{
        try{
            result = await deleteNominalAccount({
                ...recordToDeleteNominal,
                nomcode: recordToDeleteNominal.nomcode,
            }) ;
            if( result.data.E4kTblaccnominaldelete.success === true){
                toast.success('Account deleted successfully', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                });
            }
            else{
                toast.error('Failed to delete', {  position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,});
              
            }
        }
        catch (error) {
            toast.error('Failed to delete', {position: "top-center",
                autoClose: 500,
                hideProgressBar: true,});
            console.error('Mutation Error:', error);
        }
        setShowConfirmNominal(false); 
    };


    
    
const [isMaximizedNominalAccountTable ,setisMaximizedNominalAccountTable]= useState(false);

const modalDialogClassName = isMaximizedNominalAccount ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';
// const toggleMaximizeaccNominal = () => {
//     setisMaximizedNominalAccount(!isMaximizedNominalAccount);
// };

 const NominalPageDraggable =({ isMaximizedNomianlMasterTable, children }) => (
    isMaximizedNomianlMasterTable ? children : <Draggable handle=".e4kmodal-headerNominal">{children}</Draggable>
 );    

  const handleMinimizedNominal = ()=>{
    setisMaximizedNominalAccountTable(!isMaximizedNominalAccountTable);
  };
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

 useEffect(() => {
   const updateScreenSize = () => {
     setScreenSize({
       width: window.innerWidth,
       height: window.innerHeight
     });
   };

   // Update screen size on window resize
   window.addEventListener('resize', updateScreenSize);

   return () => {
     window.removeEventListener('resize', updateScreenSize);
   };
 }, []);

 // Set width and height as percentages of the screen size
 const widthPercentage = 60; // 50% of screen width
 const heightPercentage = 72; // 30% of screen height

 const resizableWidth = (screenSize.width * widthPercentage) / 100;
 const resizableHeight = (screenSize.height * heightPercentage) / 100;



return (
    <>

        {/* <NominalPageDraggable isMaximizedNomianlMasterTable = {isMaximizedNominalAccountTable}> */}
        <div className={`modal fade ${showModalMediumNominalAccount ? 'in' : ''}`} style={{ display: showModalMediumNominalAccount ? 'block' : 'none' }}>
        {/* <ResizableBox width={resizableWidth} height={resizableHeight} className={modalDialogClassName}> */}
            <div className={modalDialogClassName}>
                <div className="modal-content-min medium-popup-div">
                    <div className="modal-body">
                        <div className="breadcomb-area e4kmodal-headers e4kmodal-headerNominal">
                            <div className="container-fluid remove-padding">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="breadcomb-list">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="popup-topbar-title">
                                                 Tbl Nominal Account
                                                </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <div className='popup-top-rightdiv'>
                                                        <button className="close modalMinimize" onClick={handleMinimizedNominal}>
                                                                <i className={`fa ${isMaximizedNominalAccountTable ? 'fa-plus' : 'fa-minus'}`}></i>
                                                        </button>
                                                        <button type="button" className="btn-link" onClick={toggleMaximizeaccNominal}>
                                                            {isMaximizedNominalAccount ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                        </button>
                                                        <button type="button" className="close" onClick={handleCloseMediumNominalAccount}>
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
                                        <div className="customer-newbold">Tbl Nominal Account</div>
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
                                                id="TblnominalAccountGrid"
                                                onEndEdit={handleEndEdit}
                                                header={header}
                                                dataSource={dataGridNominalAccount}
                                                filtering={filtering}
                                                columns={columns}
                                                behavior={behavior}
                                                paging={paging}
                                                pager={pager}
                                                sorting={sorting}
                                                selection={selection}
                                                editing={editing}
                                                dataSourceSettings={dataSourceSettings}
                                                appearance={appearance}
                                                messages={message}
                                                
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </ResizableBox> */}
            </div>
        </div>
     {/* </NominalPageDraggable> */}
        {/* pop up code : {/ <<<<<<<<<<<<Pop up code >>>>>>>>>                         /} */}
            {showConfirm && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmNominal(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmNominal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteNominal}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
    </>
);
};

export default E4kTblNominalAccountGrid;