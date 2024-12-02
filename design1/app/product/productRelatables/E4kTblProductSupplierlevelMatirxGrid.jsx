

'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'smart-webcomponents-react/table';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import { CheckBox } from 'smart-webcomponents-react/checkbox';


import {useGetAllSupplierQuery} from '../../store/services/e4kTblSupplier';

import { useGetTblWarehousesQuery } from '../../store/services/e4kTblWhoWarehousesAPI';

import {useGetProductSupplierLevelColSetsSelectQuery,
    useGetProductSupplierLevelMatrixSelectQuery,
    useUpdateProductSupplierMatrixLevelSettingsMutation
} from '../../store/services/e4kTblProductSupplierLevelSettings';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

const E4kTblProductSupplierlevelMatirxGrid = ({ showModalMediumSupplierLevelMatrix, handleCloseMediumSupplierLevelMatrix,supplieleveldata }) => {
    const [dataGridSupplierLevelMatrix, setDataGridSupplierLevelMatrix] = useState([]);
    const [dataGridSupplierLevelMatrixcol, setDataGridSupplierLevelMatrixcol] = useState([]);
    
    
    

   // const [filterButtonClickSupplier, setFilterButtonClickSupplier] = useState(false);

    const CompanyProductSupplierLevelMatrix = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');

    const [allsupplierlist, setAllSupplierlist] = useState([]);
    
    
    const [filterColumnsSupplierLevel,setFilterColumnsSupplierLevel]  = useState([]);
    const tableSupplierLevelMatrixRef = useRef();
   
    const [filterRowSupplier, setFilterrowSupplier] = useState(true);
    const [isMaximizedSupplierLevelMatrix, setIsMaximizedSupplierLevelMatrix] = useState(false);


    /////////// WareHouse state varibale
    const [SupplierdataGridWarehouse, setSupplierDataGridWarehouse] = useState([]);
    const [SupplierselectWarehouse, setSupplierSelectWarehouse] = useState("");


    ///////////// data to be Edited cell
    const [dataeditCellUpdate,setDataeditCellUpdate] = useState({});
    const [filterColumnsData,setFilterColumnsData] = useState(null);
    const [filteredColumnValues,setFilteredColumnValues] = useState(null);
    

    useEffect(() => {
        if (CompanyProductSupplierLevelMatrix) {
            setCompanyid(CompanyProductSupplierLevelMatrix);
        }
        }, [CompanyProductSupplierLevelMatrix]);
    
    const skipQuery = !supplieleveldata?.productid?.trim();


    // API calls
    const { data: SupplierLevelMatrix, isLoading: SupplierLevelMatrixisLoading } = useGetProductSupplierLevelMatrixSelectQuery({
        companyid: companyid,
        supplierid: supplieleveldata.supplierid,
        productid: supplieleveldata.productid 
    },{skip:skipQuery});

 

    const { data: stocklevelcolmatrixdataSupplier, isLoading: stocklevelcolmatrixSupplierisLoading } = useGetProductSupplierLevelColSetsSelectQuery({
        companyid: companyid,
        productid: supplieleveldata.productid,
        supplierid: supplieleveldata.supplierid,
    },{skip:skipQuery});

    /////////// Warehouse api cal
    const { data: supplierwarehousedata, isLoading: supplierwarehouseisLoading } = useGetTblWarehousesQuery({
        companyid: companyid,
        warehouseid: ''
    });
  

     /////////////// Price types data all
 const { data :AllSupplierdata,
    error:AllSupplierdataerror, 
    isLoading :AllSupplierdataisloading,
   isError :AllSupplierdataiserror
   } = useGetAllSupplierQuery(companyid);

 /////////// Update Supplier Level Matrix
 ////////////// Update Product Property level
const [updateProductSuppliermatrixLevelSettings, { isLoading: isUpdatingProductSuppliermatrixLevelSettings }] = useUpdateProductSupplierMatrixLevelSettingsMutation();



useEffect(() => {
    const filterRefreshHandler = () => {
        if (tableSupplierLevelMatrixRef.current) {
            tableSupplierLevelMatrixRef.current.filtering = true;
            tableSupplierLevelMatrixRef.current.filterRow = true;
        }
    };

    if (showModalMediumSupplierLevelMatrix === true) {
        const timer = setTimeout(() => {
            filterRefreshHandler();
        }, 1000);

        
        return () => clearTimeout(timer);
    }
}, [showModalMediumSupplierLevelMatrix,isMaximizedSupplierLevelMatrix,SupplierLevelMatrix]); 




    useEffect(() => {
        if (supplierwarehousedata) {
            if (supplieleveldata.productid !== ''){
                

                const warehouse = supplierwarehousedata.e4kTblwhowarehouse.map((category) => ({
                    warehouseid: category.warehouseid,
                    warehousename: category.warehousename,
                }));
        
                if (warehouse.length > 0) {
                    const lastWarehouseName = warehouse[warehouse.length - 1].warehousename;
                    warehouse.unshift({
                        warehouseid: "ALL",
                        warehousename: lastWarehouseName,
                    });
                }
                const warehose = warehouse.map(ware => {
                    return {
                        warehouseid: ware.warehouseid,
                        warehousename: ware.warehousename,
                        fullname: ware.warehouseid + " - " + ware.warehousename
                    }
        
        
                })
                setSupplierDataGridWarehouse(warehose);

              }

           
        }
    }, [supplierwarehouseisLoading, supplierwarehousedata]);

    ///////////////// DropDown change


    
    useEffect(() => {
        if (AllSupplierdata) {
            
            if (!AllSupplierdata) return [];
            const datagrid11 = AllSupplierdata.e4kTblsupplierAll.map(category => ({
                name: category.name,
                businessid: category.businessid,
                
                }));
            setAllSupplierlist(datagrid11);
            }
    }, [AllSupplierdataisloading, AllSupplierdata]);



    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridSupplierLevelMatrix([]);
        setDataGridSupplierLevelMatrixcol([]);
        setFilterrowSupplier(true);
        
    
        if (!SupplierLevelMatrixisLoading && SupplierLevelMatrix && stocklevelcolmatrixdataSupplier && supplieleveldata.supplierid) {
            const response = SupplierLevelMatrix.e4kTblproductProductSupplierMatrix;
            
    
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridSupplierLevelMatrix([]);
            } else if (response.some(item => 'suppliermatrix' in item)) {
               
                // if (selectSupplier !=='' && selectSupplierLevelMatrixType !== '') {
                    transformDataSupplierLevelMatrixmatrix();
                    setFilterrowSupplier(true);
               // }
            }
        }
    
        if (!stocklevelcolmatrixSupplierisLoading && stocklevelcolmatrixdataSupplier && SupplierLevelMatrix && supplieleveldata.supplierid) {
            const response = SupplierLevelMatrix.e4kTblproductProductSupplierMatrix;
    
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridSupplierLevelMatrixcol([]);
            } else if (response.some(item => 'suppliermatrix' in item)) {
                
                // if (selectSupplier !== '' && selectSupplierLevelMatrixType !== '') {
                    transformDataSupplierLevelMatrixmatrix();
                    setFilterrowSupplier(true);
                // }
            }
        }
    }, [SupplierLevelMatrixisLoading,showModalMediumSupplierLevelMatrix, stocklevelcolmatrixSupplierisLoading, SupplierLevelMatrix, stocklevelcolmatrixdataSupplier, supplieleveldata.supplierid]);
    
 
  
    const transformDataSupplierLevelMatrixmatrix = () => {
        if (!SupplierLevelMatrix) return [];

        //const cuscosttypeid = dataGridPriceTypeAllSupplier.filter(priceType => priceType.description === selectSupplierLevelMatrixType )
        const supplierlevelmatdata = SupplierLevelMatrix.e4kTblproductProductSupplierMatrix
        if (supplierlevelmatdata && SupplierdataGridWarehouse.length > 0){
            const filteredData = (JSON.parse(supplierlevelmatdata[0].suppliermatrix))

                    
            setDataGridSupplierLevelMatrix(filteredData);

        }

        if (!stocklevelcolmatrixdataSupplier) return [];
    
        let supMatrixcolumns = JSON.parse(stocklevelcolmatrixdataSupplier.e4kTblproductProductSupplierLevelColmatrix[0].suppliercolmatrix);
    
        
        if (!Array.isArray(supMatrixcolumns)) {
            supMatrixcolumns = [];
        }
        
    

        supMatrixcolumns = supMatrixcolumns.filter(column => column.dataField && !column.dataField.includes('summary'));
        const hideColumn = ['SupplierCode','LeadTime','WarehouseID','SupplierXRate','IsBulkOrder','Select']

        const transformedColumns1s = supMatrixcolumns.map(column => {
            const { dataField, dataType, label } = column;
            let newColumn = { label, dataField, dataType };

            if (dataField === "WarehouseID") {
                newColumn = { 
                    label : "WarehouseID", 
                    dataField, 
                    dataType: "string",
                    editor: {
                        template: '<smart-drop-down-list></smart-drop-down-list>',
                        onInit(row, column, editor, value) {
                            editor.dataSource = SupplierdataGridWarehouse.map(hou => hou.warehouseid)
                            editor.dropDownAppendTo = 'body';
                            editor.dropDownOpenMode = 'auto';
                        },
                        onRender(row, column, editor, value) {
                            editor.selectedValues = [value];
                            
                        },
                        getValue(editor) {
                            //return StockingTypeAllData.find(stock => stock.description === editor.selectedValues[0]).stockingtype;
                            return editor.selectedValues[0];
                        }
                    }
                    
                 };
            } 
            if (dataField === "IsBulkOrder") {
                newColumn = { 
                    label : "IsBulkOrder", 
                    dataField, 
                    dataType: "string",
                    editor: {
                        template: '<smart-drop-down-list></smart-drop-down-list>',
                        onInit(row, column, editor, value) {
                            editor.dataSource = ['Yes','No']
                            editor.dropDownAppendTo = 'body';
                            editor.dropDownOpenMode = 'auto';
                        },
                        onRender(row, column, editor, value) {
                            editor.selectedValues = [value];
                            
                        },
                        getValue(editor) {
                            //return StockingTypeAllData.find(stock => stock.description === editor.selectedValues[0]).stockingtype;
                            return editor.selectedValues[0];
                        }
                    }
                    
                 };
            } 

            return newColumn;
        });

        const updatedColumn = transformedColumns1s.map(col => {
            if (col.dataField === 'Select') {
                col.allowEdit = true,
                col.formatFunction =  (settings) => {
                    const isChecked = settings.value === true ? 'checked' : ''; // Adjust the condition as needed
                    settings.template = `
                        <input type="checkbox" id="checkbox-${settings.row}" name="select" value="${settings.value}" ${isChecked} />
                    `;
                }
            } else if (hideColumn.includes(col.dataField)){
                col.allowEdit = true;
            }   else{
                col.allowEdit = false;
            }         
            return col;
        });


        const updatedColumnss = updatedColumn.map(column => {
            if (column.dataField === 'SupplierXRate' ) {
                return {
                    ...column,
                    summarySettings: {
                        // prefix: '$',
                        decimalPlaces: 2
                    }
                };
            }
            return column;
        });


        setDataGridSupplierLevelMatrixcol(updatedColumnss);

    };
   

    const toggleMaximizeSupplierLevelMatrix = () => {
        setIsMaximizedSupplierLevelMatrix(!isMaximizedSupplierLevelMatrix);
    };

   // const dataSourceSupplierLevelMatrix = useMemo(() => dataGridSupplierLevelMatrix, [dataGridSupplierLevelMatrix]);


    const handleProductSupplierLevelMatrixlevelUpdate = async (category) => {
        try {
            const result = await updateProductSuppliermatrixLevelSettings(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductsuppliermatrixUpdate.success === "Success") {
                    toast.success('Supplier Matrix  Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                } else {
                    toast.error(result.data.E4kTblproductProductsuppliermatrixUpdate.success, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                    });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };
    
    const handleSaveSupplierLevelMatrix = () => {
        let update_supplier_matrix_save = []

        dataGridSupplierLevelMatrix.map(row => {
            update_supplier_matrix_save.push(JSON.stringify(row))

        })

        //console.log('Updated Data for update = ,',update_supplier_matrix_save)

        let Updatesupplier_levelMatrix_save = {
                companyid: companyid,
                supplierid: supplieleveldata.supplierid,
                productid: supplieleveldata.productid,
                "suppliermatrix": update_supplier_matrix_save,
            };
      handleProductSupplierLevelMatrixlevelUpdate(Updatesupplier_levelMatrix_save)

    }


const handleCellClickSupplierLevelMatrix = (event) => {
    
    const checkbox = document.getElementById(`checkbox-${event.detail.id}`);
    const clickrow = event.detail.row;
    console.log(checkbox.checked,' ->>>Event trigger cell click select :',clickrow)

    if (checkbox) {
        const isChecked = checkbox.checked;
        // Update only the 'Select' state
            const updateRowdata = {
                ...clickrow,
                Select: isChecked // Set to the desired new value
            };

        tableSupplierLevelMatrixRef.current.updateRow(event.detail.id, updateRowdata)
        

      
    } else {
        console.log(`Checkbox with id 'checkbox-${event.detail.id}' not found`);
    }
}



const handleSupplierCheckboxonChangeEventmatrix = (event) => {
    const checkboxStatus = event.detail.value;

    // console.log(checkboxStatus,'**********************************')

    // const datasourceupdate = dataGridSupplierLevelMatrix.map(record => {
    //     return {
    //         ...record,
    //         Select: checkboxStatus

    //     }


    // })

//////////////// Filter 
const tablesuppliermatrix = document.getElementById('E4kTblProductSupplierlevelsetTypematrixTable') 
    const statsuppliermat = tablesuppliermatrix.getState();

  


    //if (filterButtonClick && state.filtered && state.filtered.rowFilters) {
        if (statsuppliermat.filtered && statsuppliermat.filtered.rowFilters) {
        const filters = statsuppliermat.filtered.rowFilters;
       
        const filterColumns = [];
        const filterValues = [];
        
    
        filters.forEach(([column, filterInfo]) => {
            filterColumns.push(column);
            filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
        });
    
        const filteredRows = dataGridSupplierLevelMatrix.filter(row => {
            return filterColumns.every((column, index) => {
                return filterValues[index].some(value => row[column].toUpperCase().includes(value));
            });
        });
         if (filteredRows.length > 0) {
                

                
                const updatedDataGridSuppliermattickall = dataGridSupplierLevelMatrix.map(row => {
                    const isMatch = filterColumns.every((column, index) => {
                        return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                    });
        
                    if (isMatch) {
                        return {
                            ...row,
                            //'Select': isChecked,
                            'Select': checkboxStatus,
                           
                        };
                    }
                    return row;
                });

                const updatedDataGridSuppliermatupdate = updatedDataGridSuppliermattickall.map((row, index) => {

                    tableSupplierLevelMatrixRef.current.updateRow(index,row);


                })

            } else {
                console.log('No rows found matching the filters.');
            }
        

     }else{

        const updatedDataGridSuppliermatTick = dataGridSupplierLevelMatrix.map(row => {
            return {
                ...row,
                
                'Select': checkboxStatus,
            };
        });
      
        const updatedDataGridSuppliermatupdate = updatedDataGridSuppliermatTick.map((row, index) => {

            tableSupplierLevelMatrixRef.current.updateRow(index,row);


        })

     }





   
//    setDataGridSupplierLevelMatrix(datasourceupdate)

}

const findMatchingIndex = (obj, list) => {
    return list.findIndex(item => 
        Object.keys(obj).every(key => obj[key] === item[key])
    );
};



const handleCopyFirstSuppliermatrixLevel = () => {
       
    const tablesuppliermatrix = document.getElementById('E4kTblProductSupplierlevelsetTypematrixTable') 
    const statsuppliermat = tablesuppliermatrix.getState();

  


    //if (filterButtonClick && state.filtered && state.filtered.rowFilters) {
        if (statsuppliermat.filtered && statsuppliermat.filtered.rowFilters) {
        const filters = statsuppliermat.filtered.rowFilters;
       
        const filterColumns = [];
        const filterValues = [];
        
    
        filters.forEach(([column, filterInfo]) => {
            filterColumns.push(column);
            filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
        });
    
        const filteredRows = dataGridSupplierLevelMatrix.filter(row => {
            return filterColumns.every((column, index) => {
                return filterValues[index].some(value => row[column].toUpperCase().includes(value));
            });
        });
         if (filteredRows.length > 0) {
                const firstRecord = filteredRows[0];
                


                //const matchingIndex = findMatchingIndex(firstRecord, dataGridSupplierLevelMatrix);
               
                //const checkbox = document.getElementById(`checkbox-${matchingIndex}`);
                //const isChecked = checkbox.checked;
                
                const updatedDataGridSuppliermat = dataGridSupplierLevelMatrix.map(row => {
                    const isMatch = filterColumns.every((column, index) => {
                        return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                    });
        
                    if (isMatch) {
                        return {
                            ...row,
                            'SupplierCode': firstRecord['SupplierCode'],
                            'LeadTime': firstRecord['LeadTime'],
                            'IsBulkOrder': firstRecord['IsBulkOrder'],
                            'WarehouseID': firstRecord['WarehouseID'],
                            'SupplierXRate': firstRecord['SupplierXRate'],
                            //'Select': isChecked,
                            'Select': firstRecord['Select'],
                           
                        };
                    }
                    return row;
                });

                const updatedDataGridSuppliermatupdate = updatedDataGridSuppliermat.map((row, index) => {

                    tableSupplierLevelMatrixRef.current.updateRow(index,row);


                })


                //setDataGridSupplierLevelMatrix(updatedDataGridSuppliermat);
            } else {
                console.log('No rows found matching the filters.');
            }
        

     } else if ((filterColumnsData !==null && filteredColumnValues !== null) || (filterColumnsData?.length > 0 && filteredColumnValues?.length > 0) ) {

        const filteredRows = dataGridSupplierLevelMatrix.filter(row => {
            return filterColumnsData.every((column, index) => {
                return filteredColumnValues[index].some(value => row[column].toUpperCase().includes(value));
            });
        });
         if (filteredRows.length > 0) {
                //const firstRecord = filteredRows[0];
                //const firstRecord1 = dataeditCellUpdate;
                const firstRecord = tableSupplierLevelMatrixRef.current.props.dataSource[0]
               
                // Separate the `$` object from the rest of the properties
            //const { $, ...firstRecord } = firstRecord1;

                
                //const checkbox = document.getElementById(`checkbox-${$['id']}`);
                //const isChecked = checkbox.checked;
                
                const updatedDataGridSuppliermat = dataGridSupplierLevelMatrix.map(row => {
                    const isMatch = filterColumnsData.every((column, index) => {
                        return filteredColumnValues[index].some(value => row[column].toUpperCase().includes(value));
                    });
        
                    if (isMatch) {
                        return {
                            ...row,
                            'SupplierCode': firstRecord['SupplierCode'],
                            'LeadTime': firstRecord['LeadTime'],
                            'IsBulkOrder': firstRecord['IsBulkOrder'],
                            'WarehouseID': firstRecord['WarehouseID'],
                            'SupplierXRate': firstRecord['SupplierXRate'],
                           // 'Select': isChecked,
                           'Select': firstRecord['Select'],
                           
                        };
                    }
                    return row;
                });

                const updatedDataGridSuppliermatupdate = updatedDataGridSuppliermat.map((row, index) => {

                    tableSupplierLevelMatrixRef.current.updateRow(index,row);


                })

                //setDataGridSupplierLevelMatrix(updatedDataGridSuppliermat);
                // setDataeditCellUpdate({})
                // setFilterColumnsData(null)
                // setFilteredColumnValues(null)

            } else {
                console.log('No rows found matching the filters.');
            }

     }else {


    if (filterColumnsSupplierLevel.length === 0) {
        if (dataGridSupplierLevelMatrix.length > 0) {

           
            const isEmpty = Object.keys(dataeditCellUpdate).length === 0;
            if (isEmpty) {
                const firstRecord = tableSupplierLevelMatrixRef.current.props.dataSource[0]
                
                const updatedDataGridSuppliermat = dataGridSupplierLevelMatrix.map(row => {
                    return {
                        ...row,
                        'SupplierCode': firstRecord['SupplierCode'],
                        'LeadTime': firstRecord['LeadTime'],
                        'IsBulkOrder': firstRecord['IsBulkOrder'],
                        'WarehouseID': firstRecord['WarehouseID'],
                        'SupplierXRate': firstRecord['SupplierXRate'],
                        //'Select': isChecked,
                        'Select': firstRecord['Select'],
                    };
                });
              
                const updatedDataGridSuppliermatupdate = updatedDataGridSuppliermat.map((row, index) => {

                    tableSupplierLevelMatrixRef.current.updateRow(index,row);


                })
                // const updatedDataGridSuppliermatupdate = updatedDataGridSuppliermat.map((row, index) => {

                //     tableSupplierLevelMatrixRef.updateRow(index,row);


                // })
               
                //setDataeditCellUpdate({})

            } else {

               // const firstRecord1 = dataeditCellUpdate;
                const firstRecord = tableSupplierLevelMatrixRef.current.props.dataSource[0]


                    // Separate the `$` object from the rest of the properties
                //const { $, ...firstRecord } = firstRecord1;

                
                
                //const checkbox = document.getElementById(`checkbox-${$['id']}`);

            
               // const isChecked = checkbox.checked;
                
                
                const updatedDataGridSuppliermat = dataGridSupplierLevelMatrix.map(row => {
                    return {
                        ...row,
                        'SupplierCode': firstRecord['SupplierCode'],
                        'LeadTime': firstRecord['LeadTime'],
                        'IsBulkOrder': firstRecord['IsBulkOrder'],
                        'WarehouseID': firstRecord['WarehouseID'],
                        'SupplierXRate': firstRecord['SupplierXRate'],
                        //'Select': isChecked,
                        'Select': firstRecord['Select'],
                    };
                });
              
                const updatedDataGridSuppliermatupdate = updatedDataGridSuppliermat.map((row, index) => {

                    tableSupplierLevelMatrixRef.current.updateRow(index,row);


                })
                
                
                //setDataGridSupplierLevelMatrix(updatedDataGridSuppliermat);
                //setDataeditCellUpdate({})
        }
        } else {
            console.log('No rows found in the data grid.');
        }
        
     } 
    }
};


const handleCellEditSupplierLevelMatrix = (event) => {
    
    const detail = event.detail;
    const id = detail.id;
    


        // Update only the 'Select' state
            const updateRowdata = {
                ...detail.row,
                Select: detail.row.Select === 'true' ? true:false // Set to the desired new value
            };

        tableSupplierLevelMatrixRef.current.updateRow(id, updateRowdata)
  
    // const tableSupplierMatrix = document.getElementById('E4kTblProductSupplierlevelsetTypematrixTable');
    // const stateSupplierMatrix = tableSupplierMatrix.getState();


    // if (stateSupplierMatrix.filtered && stateSupplierMatrix.filtered.rowFilters) {
    //     const filters = stateSupplierMatrix.filtered.rowFilters;
       
    //     const filterColumns = [];
    //     const filterValues = [];
        
    
    //     filters.forEach(([column, filterInfo]) => {
    //         filterColumns.push(column);
    //         filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
    //     });
  
    //     setFilterColumnsData(filterColumns)
    //     setFilteredColumnValues(filterValues)

    // }
   
    // const newData = [...dataGridSupplierLevelMatrix];
    // newData[id][dataField] = value;






    //setDataGridSupplierLevelMatrix(newData);
  
   
    
  };
  
  const handleCloseSupplierLevelMatrix = () => {
    tableSupplierLevelMatrixRef.current.filtering = false;
    tableSupplierLevelMatrixRef.current.filterRow = false
  
    //setDataGridSupplierLevelMatrix([])
    //setDataGridSupplierLevelMatrixcol([]);
    setFilterrowSupplier(false);
    
    setDataeditCellUpdate({})
    setFilterColumnsData(null)
    setFilteredColumnValues(null)
    
    //setFilterButtonClickSupplier(false);
    
    
  
    handleCloseMediumSupplierLevelMatrix()

}



    const modalDialogclassNameSupplierLevelMatrix = isMaximizedSupplierLevelMatrix ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumSupplierLevelMatrix ? 'in' : ''}`} style={{ display: showModalMediumSupplierLevelMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassNameSupplierLevelMatrix}>
                    <div className="modal-content medium-popup-div">
                        <div className="modal-body">
                            <div className="breadcomb-area">
                            
                                <div className="container-fluid remove-padding">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="breadcomb-list">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-topbar-title'>
                                                            {supplieleveldata.supplierid} - Supplier Setup
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveSupplierLevelMatrix()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            {/* <span onClick={() => handleCreateNewSupplierPrice()}><a href="#"> <i className="fa fa-plus" ></i> New</a></span> */}
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                            {/* <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span>
                                                            <SwitchButton ref={switchbuttonSupplierLevelMatrixRef} rightToLeft onChange={(e) => handleChangePivotModeSupplierLevelMatrix(e)}></SwitchButton> */}
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeSupplierLevelMatrix}>
                                                                {isMaximizedSupplierLevelMatrix ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseSupplierLevelMatrix()}>
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
                                            <div className="customer-newbold">{supplieleveldata.supplierid} - Supplier Setup </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='height-alignment'>                                  
                            

                            <div className='popupmasterpage-topfield'>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        
                                    </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option button-right'>                                
                                        <span>
                                            <button className="btn alter-button" onClick={() => handleCopyFirstSuppliermatrixLevel()} >Copy Frist</button>
                                        </span>
                                    </div>
                                </div>
                            </div>      
                                    
                            
                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                
                                                </div> 
                                                        
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <div className='form-group master-option flexflow-right'>                                
                                                    
                                                    <div>
                                                        <CheckBox 
                                                        id="checkBoxSupplierlevelmatix" 
                                                        rightToLeft
                                                        onChange={(e) => handleSupplierCheckboxonChangeEventmatrix(e)}
                                                        >Tick All</CheckBox>
                                                    </div>
                                                        
                                                    </div>
                                                </div>

                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            


                                            {SupplierLevelMatrixisLoading || stocklevelcolmatrixSupplierisLoading ? (
                                                "Loading..."
                                            ) : (dataGridSupplierLevelMatrix.length > 0 && showModalMediumSupplierLevelMatrix === true) ? (
                                                <Table
                                                    ref={tableSupplierLevelMatrixRef}
                                                    id="E4kTblProductSupplierlevelsetTypematrixTable"
                                                    dataSource={dataGridSupplierLevelMatrix}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridSupplierLevelMatrixcol}
                                                    editing
                                                    editMode={'row'}
                                                    filtering={false}
                                                    filterRow={false}
                                                    //filtering={true}
                                                    //filterRow={showModalMediumSupplierLevelMatrix ? true : filterRowSupplier}
                                                    //paging={true}
                                                    // pageIndex={0}
                                                    // pageSize={10}
                                                    sortMode='many'
                                                    /// Need to change the code little bit 
                                                    //endUpdate={endupdate}
                                                    onCellEndEdit={(e) => handleCellEditSupplierLevelMatrix(e)}
                                                    //onCellClick={(e) => handleCellClickSupplierLevelMatrix(e)}
                                                />
                                            ) : (null)}


                                            


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Draggable>
</>
    );
};    

export default E4kTblProductSupplierlevelMatirxGrid;