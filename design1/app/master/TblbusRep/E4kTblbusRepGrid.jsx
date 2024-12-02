
import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector } from 'react-redux';
import { useEffect, useState,useMemo } from 'react';
import {
    useGetSalespeopleListQuery,
    useCreateRepMutation,
    useUpdateRepMutation,
    useDeleteRepMutation,
} from '../../store/services/Customer/e4kTblbussalespeople';
import { toast } from 'react-toastify';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';



const E4kTblbusRepGrid = ({ showModalMediumBusRep, handleCloseMediumBusRep }) => {
    const [dataGridrepdata, setdataGridRepdata] = useState([]);
    const CompanySelectTblNominalAccount = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyId, setCompanyId] = useState(CompanySelectTblNominalAccount);
    const { data: Repdata, error, isLoading } = useGetSalespeopleListQuery(companyId);
    const [createRep, { isLoading: isCreating }] = useCreateRepMutation();
    const [updateRep, { isLoading: isUpdating }] = useUpdateRepMutation();
    const [deleteRep, { isLoading: isDeleting }] = useDeleteRepMutation();
    const [isMaximizedNominalAccount, setisMaximizedNominalAccount] = useState(false);
    const [showConfirmrep, setShowConfirmRep] = useState(false);
    const [recordToDeleteRep, setRecordToDeleteRep] = useState(null);



    
    useEffect(() => {
        if (Repdata) {
            transformDataRep();
        }
    }, [Repdata]);

    const transformDataRep = () => {
        if (!Repdata) return [];
        const transformedData = Repdata.E4kTblbussalespeople.map(person => ({
            repid: person.repid,
            forename: person.forename,
            surname: person.surname,
            live: person.live,
            repkey: person.repkey,
            companyid : person.companyid.companyid
        }));
      
        setdataGridRepdata(transformedData);
    };
     ////// Delete /////////////////////////////////////////////////////////////////////////

     useEffect(() => {
        window.commandColumnCustomCommandRep = function(row) {
            
            let deletedata = {
                companyid: row.data.companyid,
                repid: parseInt(row.data.repid),
            };
            
            setRecordToDeleteRep(deletedata);
            setShowConfirmRep(true);
        };
    }, []);

    const toggleMaximizeaccNominal = () => {
        setisMaximizedNominalAccount(!isMaximizedNominalAccount);
    };

    const handleRepCreate = async (rep)=>{
        try{
            const result = await createRep({
                ...rep,

            })
            if(result.data.E4kTblbussalespeoplecreate.success === true) {
                toast.success("Account created successfully" , { 
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            }
            else{
                toast.error(`Error creating account : ${result.data.E4kTblbussalespeoplecreate.error}`, {  
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            }
        }
        catch(error) {
         
            toast.error(`Error creating account : ${error.message}` ,{  
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
            });
        }
    };


    

    
    const handleRepUpdate = async (rep) => {
        try {
            const result = await updateRep({
                ...rep,
                repid: parseInt(rep.repid),
                // live: rep.live ? 1 : 0,

            })
            if(result.data.E4kTblbussalespeopleupdate.success === true) {
                toast.success("Account updated successfully" , { 
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            }
            else{
                toast.error(`Account update Failed : ${result.data.E4kTblbussalespeopleupdate.error}`, {  
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            console.error('Mutation Error:', error);
            toast.error(`Error updating account : ${error.message}` ,{  
                position: "top-center",
                autoClose: 5000,
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


    const appearance = {
        showRowHeaderNumber: false,
        showRowHeader: true,
        showRowHeaderSelectIcon: true,
        showRowHeaderFocusIcon: true
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
                commandColumnCustom: { icon: 'fa fa-trash', command: 'commandColumnCustomCommandRep', visible: true },
            },
        }}

 
    const dataSourceSettings = {
		dataFields: [
			'companyid: string',
            'repid: string',
            'forename: string',
            'surname: string',
            'live: boolean',
            'repkey: string',
			
			
		]
	};
    const message = useMemo(() => ({
        en: {
            addNewRow: '+New',
        },
      }), [companyId]);

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
        { label: 'Rep ID', dataField:'repid',  allowEdit: false },
        { label: 'Forename', dataField: 'forename',  allowEdit: true },
        { label: 'Surname', dataField:'surname',  allowEdit: true },
        { label: 'Live', dataField: 'live',   allowEdit: true ,template: 'checkBox',editor: 'checkBox'},
        { label: 'Rep Key', dataField:'repkey',  allowEdit: true },
    ];
    

   

    const handleConfirmDeleteRep = async () =>{
        try{
            const result = await deleteRep({
                ...recordToDeleteRep,
                repid: parseInt(recordToDeleteRep.repid),
            }) ;
            console.log("deletdfehdge", result);
            if(result.data.E4kTblbussalespeopldelete.success===true){
                toast.success('Rep deleted successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                });
            }
            else{
                toast.error('Failed to delete', {  position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,});
              
            }
        }
        catch (error) {
            toast.error(`Failed to delete: ${error.message}`, {position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,});
            console.error('Mutation Error:', error);
        }
        setShowConfirmRep(false); 
    };


    const handleEndEdit = async (e) =>{
        const newrep= e.detail.data;
        console.log("GFHHHHHHHHH", newrep)
        newrep.companyid= companyId;
        if(newrep.repid!= ''){
            handleRepUpdate(newrep);
        }
        else{
            handleRepCreate(newrep);
        }
    }


    
const [isMaximizedRepTablePage, setisMaximizedRepTablePage]= useState(false);


const modalDialogClassName = isMaximizedNominalAccount ? 'modal-content modal-fullscreen' : 'modal-content medium-popup';
// const toggleMaximizeaccNominal = () => {
//     setisMaximizedNominalAccount(!isMaximizedNominalAccount);
// };

const RepDraggable =({ isMaximizedRepMasterTable, children }) => (
    isMaximizedRepMasterTable ? children : <Draggable handle=".e4kmodal-headerrep">{children}</Draggable>
 );    

 const handleMinimizedRep = () => {
    setisMaximizedRepTablePage(!isMaximizedRepTablePage);
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
   
            <div className={`modal fade ${showModalMediumBusRep ? 'in' : ''}`} style={{ display: showModalMediumBusRep ? 'block' : 'none' }}>
            <div className={modalDialogClassName}>
                <div className="modal-content-min medium-popup-div">
                    <div className="modal-body">
                        <div className="breadcomb-area e4kmodal-headers e4kmodal-headerrep">
                            <div className="container-fluid remove-padding">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="breadcomb-list">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="popup-topbar-title">
                                                Tbl RepAccount
                                                </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <div className='popup-top-rightdiv'>
                                                        <button className="close modalMinimize" onClick={handleMinimizedRep}>
                                                                <i className={`fa ${isMaximizedRepTablePage ? 'fa-plus' : 'fa-minus'}`}></i>
                                                        </button>
                                                        <button type="button" className="btn-link" onClick={toggleMaximizeaccNominal}>
                                                            {isMaximizedNominalAccount ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                        </button>
                                                        <button type="button" className="close" onClick={handleCloseMediumBusRep}>
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
                                        <div className="customer-newbold">Tbl RepAccount</div>
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
                                                dataSource={dataGridrepdata}
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
                </div>
            {/* </ResizableBox> */}
        </div>
        {/* </RepDraggable> */}
        {/* pop up code : {/ <<<<<<<<<<<<Pop up code >>>>>>>>>                         /} */}
            {showConfirmrep && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header justify-content-center modal-header-error">
                                    <div class="icon-box">
                                        <i class="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmRep(false)}>&times;</button>
                            </div>

                                <div class="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmRep(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteRep}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
    </>
);
};

export default E4kTblbusRepGrid;