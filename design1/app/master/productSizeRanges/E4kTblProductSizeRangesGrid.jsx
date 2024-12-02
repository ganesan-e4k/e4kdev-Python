// 'use client';
// import { Grid } from 'smart-webcomponents-react/grid';
// import { useEffect, useState ,useRef} from 'react';
// import { toast } from 'react-toastify';
// import {
//     useGetProductSizeRangesQuery,
//     useGetProductSizeRangeValuesQuery,
//     useCreateProductSizeRangeValuesMutation,
//     useCreateProductSizeRangesMutation,
//     useUpdateProductSizeRangeValuesMutation,
//     useUpdateProductSizeRangesMutation,
//     useUpdateProductSizeRangeValuesSizeValueMutation,
//     useDeleteProductSizeRangeValuesMutation,
//     useDeleteProductSizeRangesMutation,
// } from '../../store/services/e4kTblProductSizeRanges';
// // import {
// //     //useGetProductSizeRangesQuery,
// //     useGetProductSizeRangeValuesQuery,
// //     useCreateProductSizeRangeValuesMutation,
// //     //useCreateProductSizeRangesMutation,
// //     useUpdateProductSizeRangeValuesMutation,
// //     //useUpdateProductSizeRangesMutation,
// //     useUpdateProductSizeRangeValuesSizeValueMutation,
// //     useDeleteProductSizeRangeValuesMutation,
// //     //useDeleteProductSizeRangesMutation,
// // } from '../../store/services/e4kTblProductSizeRangeValues';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWindowMaximize, faWindowRestore, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// import { visit } from 'graphql';

// const E4kTblProductSizeRangesGrid = ({ showModalMediumSizeRanges, handleCloseModalMediumSizeRanges }) => {
//     const [dataGrid, setDataGrid] = useState([]);
//     const [dataGridSize, setDataGridSize] = useState([]);
//     const [companyid, setCompanyid] = useState('001');
//     const [rangeid, setRangeid] = useState('');
//     const [sizenumber, setSizenumber] = useState(null);
    
//     ///////// Size Ranges Values
    
//     const gridSizeRangeValues = useRef()
//     const { data, error, isLoading, isError } = useGetProductSizeRangeValuesQuery({companyid:companyid,rangeid:rangeid,sizenumber:sizenumber});
//     const [createProductSizeRangeValues, { isLoading: isCreating }] = useCreateProductSizeRangeValuesMutation();
//     const [updateProductSizeRangeValues, { isLoading: isUpdating }] = useUpdateProductSizeRangeValuesMutation();
//     const [updateProductSizeRangeValuesSizeValue, { isLoading: isUpdating1 }] = useUpdateProductSizeRangeValuesSizeValueMutation();
//     const [deleteProductSizeRangeValues, { isLoading: isDeleting }] = useDeleteProductSizeRangeValuesMutation();
    
//     ////////// Product size ranges
//     const gridSizeRanges = useRef()
//     const { data :sizerangedata, error:sizerangeerror, isLoading:sizerangeloading, isError:sizerangeiserror } = useGetProductSizeRangesQuery({companyid:companyid,rangeid:rangeid});
//     const [createProductSizeRanges, { isLoading: isCreating2 }] = useCreateProductSizeRangesMutation();
//     const [updateProductSizeRanges, { isLoading: isUpdating2 }] = useUpdateProductSizeRangesMutation();
//     const [deleteProductSizeRanges, { isLoading: isDeleting2 }] = useDeleteProductSizeRangesMutation();


//     //////////////pop up delete
//     const [showConfirmSizeRanges, setShowConfirmSizeRanges] = useState(false);
//     const [recordToDeleteSizeRanges, setRecordToDeleteSizeRanges] = useState(null);

//     const [showConfirmSizeRangeValues, setShowConfirmSizeRangeValues] = useState(false);
//     const [recordToDeleteSizeRangeValues, setRecordToDeleteSizeRangeValues] = useState(null);


//     const [isMaximized, setIsMaximized] = useState(false);
//     const [Isvalid, setIsvalid] = useState(false);

//     useEffect(() => {
//         if (data) {
//             console.log("datagridSizeRangesValue s   ##=", data);
//             transformData();
//         }
//     }, [isLoading, data]);

//     const transformData = () => {
//         ///Size ranges values
//         if (!data) return [];
//         const datagrid = data.e4kTblproductProductSizeRangeValues.map(category => ({
//             id: Number(category.id),
//             rangeid: category.rangeid.rangeid,
//             //companyid: category.companyid.companyid,
//             sizeNumber: category.sizeNumber,
//             sizeValue: category.sizeValue
//             }));

        
//         setDataGrid(datagrid);

//          ///Size ranges 
//         if (!sizerangedata) return [];
//         const datagrid1 = sizerangedata.e4kTblproductProductSizeRanges.map(category => ({
//             id: Number(category.id),
//             rangeid: category.rangeid,
//             companyid: category.companyid.companyid,
            
//             }));
//         setDataGridSize(datagrid1);

//     };

//     useEffect(() => {
//         window.commandColumnCustomCommand12 = function(row) {
//             //console.log("Successfully selected", row.data.category1id);
//             let deletedata = {
//                 companyid: companyid,
//                 rangeid:row.data.rangeid,
//                 sizeNumber: Number(row.data.sizeNumber)
        
//               }
//             setRecordToDeleteSizeRangeValues(deletedata);
//             setShowConfirmSizeRangeValues(true);
//               //handleProductSizeRangeValuesDelete(deletedata);
//         };


//         //////////////////////////////// size ranges 
//         window.commandColumnCustomCommand13 = function(row) {
//             let deletedata = {
//                 companyid: row.data.companyid,
//                 rangeid:row.data.rangeid,
//                 id: row.data.id
//               }
//             setRecordToDeleteSizeRanges(deletedata);
//             setShowConfirmSizeRanges(true);
//               //handleProductSizeRangesDelete(deletedata);
//         };
//     }, []);

//     const toggleMaximize = () => {
//         setIsMaximized(!isMaximized);
//     };

//     const filtering = {
//         enabled: true,
//         filterRow: {
//             visible: true,
//         },
//     };

//     const behavior = {
//         columnResizeMode: 'growAndShrink',
//         allowRowReorder: true,
//         //allowColumnReorder: true
//     };

//     const appearance = {
// 		alternationCount: 2,
// 		alternationStart: -1,
// 		showRowHeader: true,
// 		showRowHeaderSelectIcon: true,
// 		showRowHeaderFocusIcon: true,
// 		showRowHeaderEditIcon: true,
// 		autoShowColumnFilterButton: false,
// 		showColumnLines: true,
// 		showRowLines: false,
//         showRowHeaderDragIcon: true
// 	};
//     const appearance1 = {
// 		alternationCount: 2,
// 		alternationStart: -1,
// 		// showRowHeader: true,
// 		// showRowHeaderSelectIcon: true,
// 		// showRowHeaderFocusIcon: true,
// 		// showRowHeaderEditIcon: true,
// 		// autoShowColumnFilterButton: false,
// 		// showColumnLines: true,
// 		// showRowLines: false,
//         // showRowHeaderDragIcon: true
// 	};

//     const paging = {
//         enabled: true,
//         pageSize: 100,
//     };

//     const pager = {
//         visible: true,
//     };

//     const sorting = {
//         enabled: true,
//         mode: 'many',
        
//     };

//     const editing = {
//         enabled: true,
//         addNewRow: {
//             visible: true,
//             position:"near",
//         },
//         commandColumn: {
//             visible: true,
//             displayMode: 'icon',
//             dataSource: {
//                 'commandColumnDelete': { visible: false },
//                 'commandColumnEdit': { visible: true },
//                 'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand12', visible: true, label: 'deleteSizeRangeValues' },
//             },
//         },
//     };


//     const editing1 = {
//         enabled: true,
//         addNewRow: {
//             visible: true,
//             position:"near",
//         },
//         commandColumn: {
//             visible: true,
//             displayMode: 'icon',
//             dataSource: {
//                 'commandColumnDelete': { visible: false },
//                 'commandColumnEdit': { visible: true },
//                 'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand13', visible: true, label: 'deleteSizeRanges' },
//             },
//         },
//     };

//     const selection = {
//         enabled: true,
//         mode: 'extended',
//         allowCellSelection: true,
		
        
//     };

//     const header = {
//         visible: true,
//         buttons: ['filter','sort','search']
//       };

//     const grouping = {
// 		enabled: true,
// 		renderMode: 'basic',
//         groupBy: ['rangeid'],
// 		groupBar: {
// 			visible: true
// 		}
// 	};


//     const columns = [
//         { label: 'ID', dataField: 'id', allowEdit: false},
//         //{ label: 'Company ID', dataField: 'companyid' ,allowEdit: false},
//         { 
//             label: 'Range ID', 
//             dataField: 'rangeid', 
//             allowEdit: true, 
//             // editor: {
//             //     template: 'autoComplete',
//             //     readonly: true,
// 			//     autoOpen: true
//             //     },

//         },
//         { label: 'SizeNumber', dataField: 'sizeNumber',allowEdit: false },
//         {label: 'SizeValue', dataField: 'sizeValue'}
        
        
//     ];
//     const columns1 = [
//         { label: 'ID', dataField: 'id', allowEdit: false,visible:false},
//         { label: 'Company ID', dataField: 'companyid' ,allowEdit: false,visible:false},
//         { label: 'Range ID', dataField: 'rangeid',},
        
        
        
//     ];

//     /////////////// Size range values

//     const handleProductSizeRangeValuesCreate = async (category) => {
//         try {
//             const result = await createProductSizeRangeValues(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data);
//                 if(result.data.E4kTblproductProductsizerangesvaluesCreate.sizeRanges === "Success"){
//                     toast.success('Created',{position: "top-center"});
//                 }else{
//                     toast.error(result.data.E4kTblproductProductsizerangesvaluesCreate.sizeRanges,{position: "top-center"});
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };

//     const handleProductSizeRangeValuesUpdate = async (category) => {
//         try {
//             const result = await updateProductSizeRangeValues(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data);
//                 if(result.data.E4kTblproductProductsizerangesvaluesUpdate.success === "Success"){
//                     toast.success('Updated',{position: "top-center"});
//                 }else{
//                     toast.error(result.data.E4kTblproductProductsizerangesvaluesUpdate.success,{position: "top-center"});
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };

//     ////////////// update Size value 
//     const handleProductSizeRangeValuesSizevalueUpdate = async (category) => {
//         try {
//             const result = await updateProductSizeRangeValuesSizeValue(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data);
//                 if(result.data.E4kTblproductProductsizerangevaluessizevalueUpdate.sizeRanges === "Success"){
//                     toast.success('Updated',{position: "top-center"});
//                 }else{
//                     toast.error(result.data.E4kTblproductProductsizerangevaluessizevalueUpdate.sizeRanges,{position: "top-center"});
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };

//     const handleProductSizeRangeValuesDelete = async (category) => {
//         try {
//             const result = await deleteProductSizeRangeValues(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data.E4kTblproductProductsizerangesvaluesDelete);
//                 if(result.data.E4kTblproductProductsizerangesvaluesDelete.success === "Success"){
//                     toast.success('Deleted',{position: "top-center"});
//                 }else{
//                     toast.error(result.data.E4kTblproductProductsizerangesvaluesDelete.success,{position: "top-center"});
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };

//     //////////////////////////////////////////pop up delete 
//     const handleConfirmSizeRangeValuesDelete = async () => {
//         setShowConfirmSizeRangeValues(false);
//         if (recordToDeleteSizeRangeValues) {
//             try {
//                 const result = await deleteProductSizeRangeValues(recordToDeleteSizeRangeValues);
//                 if (result.error) {
//                     console.error('Mutation Error:', result.error);
//                 } else {
//                     if (result.data.E4kTblproductProductsizerangesvaluesDelete.success === "Success") {
//                         toast.success('Deleted',{position: "top-center"});
//                     } else {
//                         toast.error(result.data.E4kTblproductProductsizerangesvaluesDelete.success,{position: "top-center",autoClose: 3000});
//                 }
//                 }
//             } catch (error) {
//                 console.error('Mutation Error:', error);
//             }
//         }
//     };
//     /////////////////////////////////////

//     //////////////////////////////////////////////////////////// size ranges
//     const handleProductSizeRangesCreate = async (category) => {
//         try {
//             const result = await createProductSizeRanges(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data);
//                 if(result.data.E4kTblproductProductsizerangesCreate.sizeRanges === "Success"){
//                     toast.success('Created',{position: "top-center"});
//                 }else{
//                     toast.error(result.data.E4kTblproductProductsizerangesCreate.sizeRanges,{position: "top-center"});
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };

//     const handleProductSizeRangesUpdate = async (category) => {
//         try {
//             const result = await updateProductSizeRanges(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data);
//                 if(result.data.E4kTblproductProductsizerangesUpdate.success === "Success"){
//                     toast.success('Updated',{position: "top-center"});
//                 }else{
//                     toast.error(result.data.E4kTblproductProductsizerangesUpdate.success,{position: "top-center"});
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };

//     const handleProductSizeRangesDelete = async (category) => {
//         try {
//             const result = await deleteProductSizeRanges(category);
//             if (result.error) {
//                 console.error('Mutation Error:', result.error);
//             } else {
//                 console.log('Mutation Success:', result.data.E4kTblproductProductsizerangesDelete);
//                 if(result.data.E4kTblproductProductsizerangesDelete.success === "Success"){
//                     toast.success('Deleted',{position: "top-center"});
//                 }else{
//                     toast.error(result.data.E4kTblproductProductsizerangesDelete.success,{position: "top-center"});
//                 }
//             }
//         } catch (error) {
//             console.error('Mutation Error:', error);
//         }
//     };
//     ///////////////////////////////////////////////////////////////

//     //////////////////////////////////////////pop up delete 
//     const handleConfirmSizeRangesDelete = async () => {
//         setShowConfirmSizeRanges(false);
//         if (recordToDeleteSizeRanges) {
//             try {
//                 const result = await deleteProductSizeRanges(recordToDeleteSizeRanges);
//                 if (result.error) {
//                     console.error('Mutation Error:', result.error);
//                 } else {
//                     if (result.data.E4kTblproductProductsizerangesDelete.success === "Success") {
//                         toast.success('Deleted',{position: "top-center"});
//                     } else {
//                         toast.error(result.data.E4kTblproductProductsizerangesDelete.success,{position: "top-center",autoClose: 3000});
//                 }
//                 }
//             } catch (error) {
//                 console.error('Mutation Error:', error);
//             }
//         }
//     };
//     /////////////////////////////////////

    

//     const handleSizeRangeValuesEndEdit = (e) => {
//         e.preventDefault();
//         const newcategory = e.detail.data;
//         newcategory.companyid = companyid
//         console.log('<<<<<<<<-----');
//         console.log('newData form data: ', e.detail.data);

//         if (newcategory.id && newcategory.rangeid && newcategory.companyid && newcategory.sizeNumber && newcategory.sizeValue) {
//             setIsvalid(false)
//             let UpdateData = {
        
//                 companyid: newcategory.companyid,
//                 rangeid : newcategory.rangeid,
//                 sizeNumber:Number(newcategory.sizeNumber),
//                 sizeValue:newcategory.sizeValue,
                
                        
//               }
//             console.log('Size Value Update: ', UpdateData);
//            handleProductSizeRangeValuesSizevalueUpdate(UpdateData);
//         } else {
//             setIsvalid(true)
//             if (!newcategory.id && newcategory.companyid && newcategory.rangeid && newcategory.sizeNumber && newcategory.sizeValue) {
//             let NewData = {
        
//                 companyid: newcategory.companyid,
//                 rangeid :newcategory.rangeid,
//                 sizeNumber:Number(newcategory.sizeNumber),
//                 sizeValue: newcategory.sizeValue,
                
                
        
//               }
//             console.log('newData Product property types form Create: ', NewData);
//            handleProductSizeRangeValuesCreate(NewData);
//         }
//     }
//     };

//     const handleSizeRangesEndEdit = (e) => {
//         e.preventDefault();
//         const newcategory = e.detail.data;
//         newcategory.companyid = companyid
//         console.log('<<<<<<<<-----');
//         console.log('newData form data: ', e.detail.data);

//         if (newcategory.id && newcategory.companyid && newcategory.rangeid){
//             console.log('Update')
//             let NewData = {
//                 companyid: newcategory.companyid,
//                 rangeid :newcategory.rangeid,
//                 id:Number(newcategory.id),
//               }
//             console.log('newData Product property types form Update: ', NewData);
//             handleProductSizeRangesUpdate(NewData)
//         }else{
//             if (!newcategory.id && newcategory.companyid && newcategory.rangeid){
//                 console.log('Create')
//                 let NewData = {
//                     companyid: newcategory.companyid,
//                     rangeid :newcategory.rangeid,
//                 }
//                 console.log('newData Product property types form Create: ', NewData);
//                 handleProductSizeRangesCreate(NewData)
//             }
//         }
		

// 	}

//     const handRowDragEnd =(ev) => {
//         //console.log('Row Drag End', ev.detail);
//         //console.log('Row Drag End data ', ev.detail.row.data);
//         //console.log('Row Drag End new index', ev.detail.newIndex);

//         let old_row = ev.detail.index+1;
//         let new_row = ev.detail.newIndex+1;
//         const data1 = ev.detail.row.data
//         data1.companyid = companyid

//         if (new_row && data1){
//             //console.log("Data for update = ",data1)
//             let UpdateData = {
        
//                 companyid: data1.companyid,
//                 rangeid : data1.rangeid,
//                 sizeNumber:old_row,
//                 newSizeNumber:new_row,
                
                        
//               }
//             console.log('newData form Update: ', UpdateData);
//             handleProductSizeRangeValuesUpdate(UpdateData);
            
//         }


//     }



//     const modalDialogclassName = isMaximized ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

//     return (
//         // <>
//         //     <div className={`modal fade ${showModalMediumSizeRanges ? 'in' : ''}`} style={{ display: showModalMediumSizeRanges ? 'block' : 'none' }}>
//         //         {/* <div className="modal-dialog medium-popup"> */}
//         //         <div className={modalDialogclassName}>
                   
//         //             <div className="modal-content medium-popup-div">
//         //                 <div className="modal-body">
//         //                     <div className="breadcomb-area">
//         //                         <div className="container-fluid remove-padding">
//         //                             <div className="row">
//         //                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//         //                                     <div className="breadcomb-list">
//         //                                         <div className="row">
//         //                                             <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
//         //                                             <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
//         //                                             <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    
//         //                                                 <div className='popup-top-rightdiv'>
//         //                                                     <button type="button" className="close" onClick={handleCloseModalMediumSizeRanges}>
//         //                                                     &times;
//         //                                                     </button>
//         //                                                     <button type="button" className="btn-link" onClick={toggleMaximize}>
//         //                                                     <FontAwesomeIcon icon={isMaximized ? faWindowRestore : faWindowMaximize} />
//         //                                                     </button>
//         //                                                 </div>



//         //                                             </div>
//         //                                         </div>
//         //                                     </div>
//         //                                 </div>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                     <div className="breadcomb-area">
//         //                         <div className="container-fluid remove-padding">
//         //                             <div className="row">
//         //                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
//         //                                     <div className="customer-newbold">Tbl Product Size Ranges </div>
//         //                                 </div>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                     <div className="medium-modal-section">
//         //                         <div className="container-fluid">
//         //                             <div className="row">
//         //                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//         //                                     {isLoading ? (
//         //                                         "Loading..."
//         //                                     ) : (
//         //                                         <Grid
//         //                                             id="TblProductSizeRangesGrid"
//         //                                             ref={gridSizeRanges}
//         //                                             //dataSourceSettings={dataSourceSettings}
//         //                                             onEndEdit={handleSizeRangeValuesEndEdit}
//         //                                             header={header}
//         //                                             dataSource={dataGrid}
//         //                                             grouping={grouping}
//         //                                             filtering={filtering}
//         //                                             //columns={columns}
//         //                                             columns={columns.map(col => ({
//         //                                                 ...col,
//         //                                                 allowEdit: (col.dataField !== 'rangeid' && col.dataField !== "id" && col.dataField !=='sizeNumber' && col.dataField !=='companyid') || Isvalid
//         //                                             }))}
//         //                                             behavior={behavior}
//         //                                             paging={paging}
//         //                                             pager={pager}
//         //                                             sorting={sorting}
//         //                                             selection={selection}
//         //                                             editing={editing}
//         //                                             appearance={appearance}
//         //                                             className='mx-auto'
//         //                                            // onAfterInit={handleGridAfterInit}
//         //                                             onRowDragEnd = {handRowDragEnd}
//         //                                         />
//         //                                     )}
//         //                                 </div>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //             </div>
//         //         </div>
//         //     </div>
//         // </>
//         <>
//     <div className={`modal fade ${showModalMediumSizeRanges ? 'in' : ''}`} style={{ display: showModalMediumSizeRanges ? 'block' : 'none' }}>
//       <div className={modalDialogclassName}>
//       {/* <div className="modal-dialog medium-popup"> */}
//         <div className="modal-content medium-popup-div">
//           <div className="modal-body">

//                     {/* <!-- Breadcomb area Start--> */}
//                     <div className="breadcomb-area">
//                       <div className="container-fluid remove-padding">
//                         <div className="row">
//                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                             <div className="breadcomb-list">
//                               <div className="row">
//                                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
//                                 </div>
//                                 <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

//                                 <div className='popup-top-rightdiv'>
//                                     <button type="button" className="close" onClick={handleCloseModalMediumSizeRanges}>
//                                       &times;
//                                     </button>
//                                     <button type="button" className="btn-link" onClick={toggleMaximize}>
//                                       <FontAwesomeIcon icon={isMaximized ? faWindowRestore : faWindowMaximize} />
//                                     </button>
//                                   </div>

//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* <!-- Breadcomb area End-->		 */}
//                 {/* </div> */}
//                 <div className="breadcomb-area">
//                     <div className="container-fluid remove-padding">
//                         <div className="row">
//                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 grid-flex">
//                                 <div className="customer-newbold">Tbl Product Size Ranges </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <!-- Main Area Start-->	 */}
//                   <div className="container-fluid">

//                     <div className="row">
//                       <div className="col-md-6 col-xs-12">
//                         <div className="medium-modal-section medium-model-2column">
//                         {sizerangeloading ? (
//                                         "Loading..."
//                                     ) : (
//                                         <Grid
//                                             id="TblProductSizeRangesGrid"
//                                             ref={gridSizeRanges}
//                                             onEndEdit={handleSizeRangesEndEdit}
//                                             header={header}
//                                             dataSource={dataGridSize}
//                                             filtering={filtering}
//                                             columns={columns1.map(col => ({
//                                                 ...col,
//                                                 allowEdit: (col.dataField !== 'companyid') || Isvalid
//                                             }))}
//                                             behavior={behavior}
//                                             paging={paging}
//                                             pager={pager}
//                                             sorting={sorting}
//                                             selection={selection}
//                                             editing={editing1}
//                                             appearance={appearance1}
//                                             className='mx-auto'
                                            
//                                         />
//                                         )}
//                          </div> 
//                       </div> 
//                       <div className="col-md-6 col-xs-12">
//                         <div className="medium-modal-section medium-model-2column">
//                         {isLoading ? (
//                                         "Loading..."
//                                     ) : (
//                                                 <Grid
//                                                     id="TblProductSizeRangeValuesGrid"
//                                                     ref={gridSizeRangeValues}
//                                                     //dataSourceSettings={dataSourceSettings}
//                                                     onEndEdit={handleSizeRangeValuesEndEdit}
//                                                     header={header}
//                                                     dataSource={dataGrid}
//                                                     grouping={grouping}
//                                                     filtering={filtering}
//                                                     //columns={columns}
//                                                     columns={columns.map(col => ({
//                                                         ...col,
//                                                         allowEdit: (col.dataField !== 'rangeid' && col.dataField !== "id" && col.dataField !=='sizeNumber') || Isvalid
//                                                     }))}
//                                                     behavior={behavior}
//                                                     paging={paging}
//                                                     pager={pager}
//                                                     sorting={sorting}
//                                                     selection={selection}
//                                                     editing={editing}
//                                                     appearance={appearance}
//                                                     className='mx-auto'
//                                                    // onAfterInit={handleGridAfterInit}
//                                                     onRowDragEnd = {handRowDragEnd}
//                                                 />
//                                             )}
//                         </div>
//                       </div> 
//                     </div>

                  
//                 </div>
//                 {/* <!-- Main Area End-->	 */}
                
//                 </div>
//               </div>
//             </div>

//           </div>

//           {showConfirmSizeRanges && (
//                 <div className="modal fade in" style={{ display: 'block' }}>
//                      <div class="modal-dialog modal-confirm">
//                         <div class="modal-content">
//                             <div class="modal-header justify-content-center modal-header-error">
//                                     <div class="icon-box">
//                                         <i class="fa fa-exclamation" aria-hidden="true"></i>
//                                     </div>
                                
//                                     <button type="button" className="close"  onClick={() => setShowConfirmSizeRanges(false)}>&times;</button>
//                             </div>

//                                 <div class="modal-body text-center">
//                                 <h4>Confirm Delete</h4>	
//                                 <p>Are you sure you want to delete this record?</p>
//                                 <button type="button" className="btn btn-default" onClick={() => setShowConfirmSizeRanges(false)}>Cancel</button>
//                                     <button type="button" className="btn btn-danger" onClick={handleConfirmSizeRangesDelete}>Confirm</button>
//                                 </div>
//                             </div>
//                     </div>
//                 </div>
//             )}

//         {showConfirmSizeRangeValues && (
//                 <div className="modal fade in" style={{ display: 'block' }}>
//                      <div class="modal-dialog modal-confirm">
//                         <div class="modal-content">
//                             <div class="modal-header justify-content-center modal-header-error">
//                                     <div class="icon-box">
//                                         <i class="fa fa-exclamation" aria-hidden="true"></i>
//                                     </div>
                                
//                                     <button type="button" className="close"  onClick={() => setShowConfirmSizeRangeValues(false)}>&times;</button>
//                             </div>

//                                 <div class="modal-body text-center">
//                                 <h4>Confirm Delete</h4>	
//                                 <p>Are you sure you want to delete this record?</p>
//                                 <button type="button" className="btn btn-default" onClick={() => setShowConfirmSizeRangeValues(false)}>Cancel</button>
//                                     <button type="button" className="btn btn-danger" onClick={handleConfirmSizeRangeValuesDelete}>Confirm</button>
//                                 </div>
//                             </div>
//                     </div>
//                 </div>
//             )}

//     </>
//     );
// };

// export default E4kTblProductSizeRangesGrid;


'use client';
import { Grid } from 'smart-webcomponents-react/grid';
import { useEffect, useState, useRef,useMemo } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetProductSizeRangeValuesBulkQuery,
    useCreateProductSizeRangeValuesBulkMutation,
    useUpdateProductSizeRangeValuesBulkMutation,
    //useDeleteProductSizeRangeValuesBulkMutation,
    useGetProductSizeRangesQuery,
    useCreateProductSizeRangesMutation,
    useDeleteProductSizeRangesMutation,
} from '../../store/services/e4kTblProductSizeRangesValuesBulk';

import {  setSelectProductAddPropertySize,
    resetSelectProductPropertySize, 
    
    } from '../../store/slices/e4kTblProductPropertySizeRangeSelect';

function separateObjectValues(obj) {
    const sizeNumbers = [];
    const sizeValues = [];
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const nestedObj = obj[key];
        if (nestedObj.hasOwnProperty('sizeNumber')) {
          sizeNumbers.push(nestedObj.sizeNumber);
        }
        if (nestedObj.hasOwnProperty('sizeValue')) {
          sizeValues.push(nestedObj.sizeValue);
        }
      }
    }
    return [sizeNumbers, sizeValues]
}

const E4kTblProductSizeRangesGrid = ({ showModalMediumSizeRanges, handleCloseModalMediumSizeRanges,isEditSize }) => {
    const [dataGrid, setDataGrid] = useState([]);
    const [dataGridSize, setDataGridSize] = useState([]);
    const gridRef = useRef(null);
    const CompanyProductsizerange = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyProductsizerange);
    const [rangeid, setRangeid] = useState('');
    const [sizenumber, setSizenumber] = useState(null);

    ///////////// Product size ranges value bulk operations
    const { data, error, isLoading, isError,refetch} = useGetProductSizeRangeValuesBulkQuery({ companyid, rangeid, sizenumber });
    const [createProductSizeRangeValuesBulk, { isLoading: isCreatingSizerangesBulk }] = useCreateProductSizeRangeValuesBulkMutation();
    const [updateProductSizeRangeValuesBulk, { isLoading: isUpdatingSizeRangesBulk }] = useUpdateProductSizeRangeValuesBulkMutation();
    //const [deleteProductSizeRangeValuesBulk, { isLoading: isDeletingSizeRangesBulk }] = useDeleteProductSizeRangeValuesBulkMutation();

    // Product size ranges
    const gridSizeRanges = useRef();
    const { data: sizerangedata, error: sizerangeerror, isLoading: sizerangeloading, isError: sizerangeiserror,refetch:sizerangerefetch } = useGetProductSizeRangesQuery({ companyid, rangeid });
    const [createProductSizeRanges, { isLoading: isCreating2 }] = useCreateProductSizeRangesMutation();
    const [deleteProductSizeRanges, { isLoading: isDeleting2 }] = useDeleteProductSizeRangesMutation();

    //////////////pop up delete
    const [showConfirmSizeRanges, setShowConfirmSizeRanges] = useState(false);
    const [recordToDeleteSizeRanges, setRecordToDeleteSizeRanges] = useState(null);
    const [isMaximizedSizeRanges, setIsMaximizedSizeRanges] = useState(false);

    ////////////// Check the result stats for new record or not
    const [newSizeRangeRecord, setNewSizeRangeRecord] = useState(false);
    const [newSizeRangeValueRecord, setNewSizeRangeValueRecord] = useState(false);
    const [Isvalid, setIsvalid] = useState(false);


////////////////////////////////// Use Dispatch for selection 
const gridSizeRangesPropertySelect = useRef();

 ////////////////////// Dispatch Colour select const dispatch = useDispatch();
 const dispatch = useDispatch();
 const ProductAddPropertySize = useSelector((state) => state.selectProductAddPropertySize.selectProductPropertySize);

 useEffect(() => {
     // Clear the selection state when the component mounts
     dispatch(resetSelectProductPropertySize());
     var1 = []; // Clear the local array when the component mounts
 }, [dispatch]);

 useEffect(() => {
     if (ProductAddPropertySize.length === 0) {
         //console.log('Product reset', ProductAddPropertySize);
     }

     
 }, [ProductAddPropertySize]);


    useEffect(() => {
        if (data && sizerangedata) {
            transformData(data, sizerangedata);
        }
    }, [data, sizerangedata]);

    useEffect(() => {
        window.commandColumnCustomCommand16 = function (row) {
            //console.log("Successfully selected", row.data);
            let deletedata = {
                companyid: companyid,
                rangeid:row.data.rangeid
              }
              //console.log("deletedata", deletedata);
              setRecordToDeleteSizeRanges(deletedata);
              setShowConfirmSizeRanges(true);
        };
    }, []);

    

    const transformData = (bulkData, sizerangeData) => {
        if (!sizerangeData || !bulkData) return;
    
        const datagrid1 = sizerangeData.e4kTblproductProductSizeRanges.map(category => ({
            id: Number(category.id),
            rangeid: category.rangeid,
            companyid: category.companyid.companyid,
        }));
        setDataGridSize(datagrid1);
        //console.log('Sizeranged data:', datagrid1);
    
        const validRangeIds = new Set(datagrid1.map(range => range.rangeid));
    
        // Filter out sizeRangeValues that do not have valid rangeids
        const filteredBulkData = bulkData.e4kTblproductProductSizeRangeValues.filter(item => 
            validRangeIds.has(item.rangeid?.rangeid)
        );
    
        const transformedData = filteredBulkData.reduce((acc, item) => {
            const { id, rangeid, sizeNumber, sizeValue } = item;
            
            let size_range_id = datagrid1.find(range1 => range1.rangeid === rangeid.rangeid);
    
            if (!size_range_id) {
                console.log('Invalid item structure:', item);
                return acc;
            }
    
            let row = acc.find(r => r.rangeid === rangeid.rangeid);
    
            if (!row) {
                row = { id: size_range_id.id, rangeid: rangeid.rangeid };
                for (let i = 1; i <= 300; i++) {
                    row[i] = '';
                }
                acc.push(row);
            }
    
            row[sizeNumber] = sizeValue;
            return acc;
        }, []);
    
        // Filter out any remaining invalid items from transformedData
        const filteredData = transformedData.filter(row => row.rangeid !== undefined);
    
       // console.log('Size Ranges Values Bulk :', filteredData);
        setDataGrid(filteredData.length ? filteredData : []);
    };
    
    
    
    

    const selection = isEditSize ? {
        enabled: true,
        allowCellSelection: true,
        mode: 'extended',
        allowColumnHeaderSelection: true,
        allowRowHeaderSelection: true
    }: {
        enabled: true,
        checkBoxes: {
            enabled: true
        }
    };

    const editing = isEditSize ? {
        enabled: true,
		mode:'row',
        addNewRow: {
            visible: true,
            position: 'near'
        },
        commandColumn: {
            visible: true,
            //displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnEdit': { visible: true },
                'commandColumnCustom': { icon: "fa fa-trash", command: 'commandColumnCustomCommand16', visible: true, label: '' },
            },
        },
    }: { enabled: false ,
        addNewRow: {
        visible: false,
        
    },};

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
    const appearance1size = {
        showRowHeader: false,
    };

    const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };

    const filtering = {
        enabled: true,
        filterRow: {
            visible: true,
        },
    };

    
    const sorting = {
        enabled: true,
        mode: 'many',
    };

    // Dynamically generate dataFields
    const dataFields = ['id:number'];
    dataFields.push('rangeid:string');
    for (let i = 1; i <= 300; i++) {
        dataFields.push(`${i}:string`);
    }

    // const dataSource = useMemo(() => new Smart.DataAdapter({
    //     dataSource: dataGrid,
    //     dataFields: dataFields
    // }), [dataGrid]);

    const dataSourceSettingsSizeRanges = {
		dataFields: dataFields
	};

    const dataSourceSizeRanges = useMemo(() => dataGrid, [dataGrid]);

    // Dynamically generate columns
    const columns = isEditSize ? [
        {
            label: 'ID',
            dataField: 'id',
            align: 'center',
            width: 50,
            allowEdit: false,
        },
        {
            label: 'Rangeid',
            dataField: 'rangeid',
            align: 'center',
            width: 100,
            editor: {
                template: 'autoComplete',
                dropDownButtonPosition: 'right'
            },
            
        }
    ]:[
        { label: 'ID', dataField: 'id', visible: false }, // Hidden id column
        { label: 'Rangeid', dataField: 'rangeid' ,allowEdit: false},
        
        
        
    ];
    for (let i = 1; i <= 300; i++) {
        columns.push({
            label: `${i}`,
            dataField: `${i}`,
            align: 'left',
            width: 100
        });
    }

    const toggleMaximizeSizeRanges = () => {
        setIsMaximizedSizeRanges(!isMaximizedSizeRanges);
      };



    /////////////// Size range values

    const handleProductSizeRangeValuesBulkCreate = async (sizeRangesvals) => {
        try {
            const result = await createProductSizeRangeValuesBulk(sizeRangesvals);
            if (result.error) {
                console.error('Mutation Error:', result.error);
                return false
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductsizerangesvaluesBulkCreate.sizeRanges === "Success"){
                    //toast.success('Created',{position: "top-center"});
                    //setNewSizeRangeValueRecord(true)
                    return true
                }else{
                    toast.error(result.data.E4kTblproductProductsizerangesvaluesBulkCreate.sizeRanges,{position: "top-center"});
                    return false
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
            return false
        }
    };

    

    // Handle Product Size Range CRUD
    const handleProductSizeRangesCreate = async (category) => {
        try {
            const result = await createProductSizeRanges(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductsizerangesCreate.sizeRanges === "Success") {

                    //toast.success('Created', { position: "top-center" });
                    setNewSizeRangeRecord(true)
                } else {
                    toast.error(result.data.E4kTblproductProductsizerangesCreate.sizeRanges, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

        ////////////// update Size value 
    const handleProductSizeRangeValuesBulkUpdate = async (category) => {
        try {
            const result = await updateProductSizeRangeValuesBulk(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
                return false;
            } else {
                console.log('Mutation Success:', result.data);
                if(result.data.E4kTblproductProductsizerangesvaluesBulkUpdate.success === "Success"){
                    //toast.success('Updated',{position: "top-center"});
                    return true
                }else{
                    toast.error(result.data.E4kTblproductProductsizerangesvaluesBulkUpdate.success,{position: "top-center"});
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
            return false;
        }
    };

    //////////////////////////////////////////pop up delete 
    const handleConfirmSizeRangesDelete = async () => {
        setShowConfirmSizeRanges(false);
        if (recordToDeleteSizeRanges) {
            try {
                const result = await deleteProductSizeRanges(recordToDeleteSizeRanges);
                if (result.error) {
                    console.error('Mutation Error:', result.error);
                } else {
                    if (result.data.E4kTblproductProductsizerangesDelete.success === "Success") {
                        toast.success('Deleted',{position: "top-center"});
                        console.log('Deleted successfully');
                        // Refetch data here
                        await sizerangerefetch();
                        await refetch();
                    } else {
                        toast.error(result.data.E4kTblproductProductsizerangesDelete.success,{position: "top-center"});
                    }
                }
            } catch (error) {
                console.error('Mutation Error:', error);
            }
        }
    };
    

    const handleSizeRangeValuesEndEdit = async (e) => {
        const newCategory = e.detail.data;
        newCategory.companyid = companyid;
        //console.log('e.detail.data', e.detail.data);
        const newRangeId = dataGridSize.find(record => record.rangeid === newCategory.rangeid);
    
        const cleanData = {};
        for (const [key, value] of Object.entries(newCategory)) {
            if (value !== "") {
                cleanData[key] = value;
            }
        }
    
        const sizeRangeValues = Object.entries(cleanData).reduce((acc, [key, value]) => {
            if (!isNaN(key) && value) {
                acc.push({ sizeNumber: Number(key), sizeValue: value });
            }
            return acc;
        }, []);
    
        // Function to check if all sizeValue fields are empty
        const areAllSizeValuesEmpty = (sizeValues) => {
            return sizeValues.every(({ sizeValue }) => sizeValue === "");
        };
    
        // Check if all sizeValue fields are empty
        if (areAllSizeValuesEmpty(sizeRangeValues)) {
            toast.error('Cannot create Range ID with all empty size values.',{position: "top-center"});
            return;
        }
    
        if (!newRangeId) {
            try {
                const newData = {
                    companyid: newCategory.companyid,
                    rangeid: newCategory.rangeid,
                };
                await handleProductSizeRangesCreate(newData);
                console.log('Range ID created successfully', newCategory.rangeid);
            } catch (error) {
                console.error('Error creating Range ID:', error);
                return;
            }
        }
    
        const isUpdate = newCategory.id !== null && newCategory.id >= 1;
        const hasRequiredFields = newCategory.companyid && newCategory.rangeid;
    
        if (isUpdate && hasRequiredFields && sizeRangeValues.length > 0) {
            try {
                const [sizeNumbers, sizeValues] = separateObjectValues(sizeRangeValues);
    
                let newSizeRangeValues = {
                    companyid: newCategory.companyid,
                    rangeid: newCategory.rangeid,
                    sizeNumber: sizeNumbers,
                    sizeValue: sizeValues,
                }
                let resul = await handleProductSizeRangeValuesBulkUpdate(newSizeRangeValues);
                if (resul) {
                    toast.success('Updated', { position: "top-center" });
                }
            } catch (error) {
                console.error('Error updating Size Range Values:', error);
            }
        } else if (!isUpdate && hasRequiredFields && sizeRangeValues.length > 0) {
            try {
                const [sizeNumbers, sizeValues] = separateObjectValues(sizeRangeValues);
                let newSizeRangeValues = {
                    companyid: newCategory.companyid,
                    rangeid: newCategory.rangeid,
                    sizeNumber: sizeNumbers,
                    sizeValue: sizeValues,
                }
                let resul = await handleProductSizeRangeValuesBulkCreate(newSizeRangeValues);
                if (resul) {
                    toast.success('Created', { position: "top-center" });
                }
            } catch (error) {
                console.error('Error creating Size Range Values:', error);
            }
        }
    };
    ////////////////////////////////// Size range select row click
    let var1 = []; // Use 'let' for variable declaration

        
const handlePropertySizeRangeRowClickEvent = (e) => {
    e.preventDefault();
    const rowData = e.detail.row.data;
    const selected = e.detail.row.selected;

    if (rowData) {
        if (selected) {
            const filteredValues = Object.keys(rowData)
                    .filter(key => typeof rowData[key] === 'string' && rowData[key].trim() !== '')
                    .map(key => ({
                        rangeid: rowData['rangeid'],
                        values: rowData[key]
                    }));
            const filteredValuesWithoutLast = filteredValues.slice(0, filteredValues.length - 1);       
            //console.log(filteredValuesWithoutLast,'sizerange values!!!!!!!!!!!!!!');
            
            dispatch(setSelectProductAddPropertySize(filteredValuesWithoutLast));
            handleclosesizerangegridselect()
            } else {
                console.log('############# No Selection @@@@@@@@@@@@@@');
            }
    }
};

    ///////////////// handle close product colours
    const handleclosesizerangegridselect =() => {
        
        const grid = gridSizeRangesPropertySelect.current;
        //console.log('handleclosecolour gridselect@@@@@@@@@@@@@@',isEditSize)
        if (grid) {
            
            grid.clearSelection();
            
        }
        handleCloseModalMediumSizeRanges()

    }
    
    const modalDialogclassName = isMaximizedSizeRanges ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
            <div className={`modal fade ${showModalMediumSizeRanges ? 'in' : ''}`} style={{ display: showModalMediumSizeRanges ? 'block' : 'none' }}>
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
                                                            
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeSizeRanges}>
                                                            {isMaximizedSizeRanges ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                            </button>
                                                            <button type="button" className="close" onClick={handleclosesizerangegridselect}>
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
                                            <div className="customer-newbold">Tbl Product Size Ranges </div>
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
                                                    id={isEditSize ? "tblproductgridsizerangesvaluesbulk" : "tblproductgridsizerangesvaluesselect"}
                                                    dataSourceSettings={dataSourceSettingsSizeRanges}
                                                    ref={isEditSize ? gridSizeRanges : gridSizeRangesPropertySelect}
                                                    onEndEdit={isEditSize ? handleSizeRangeValuesEndEdit : undefined}
                                                    header={header}
                                                    selection={selection}
                                                    sorting={sorting}
                                                    filtering={filtering}
                                                    editing={editing}
                                                    behavior={isEditSize ? behavior : undefined}
                                                    appearance={isEditSize ? appearance : appearance1size}
                                                    dataSource={dataSourceSizeRanges}
                                                    
                                                    columns={columns}
                                                    onRowClick={!isEditSize ? handlePropertySizeRangeRowClickEvent : undefined}
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

            {showConfirmSizeRanges && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmSizeRanges(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmSizeRanges(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmSizeRangesDelete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default E4kTblProductSizeRangesGrid;





