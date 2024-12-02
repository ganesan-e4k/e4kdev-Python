

'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { Table } from 'smart-webcomponents-react/table';
import { PivotTable } from 'smart-webcomponents-react/pivottable';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import { 
    useGetProductStockingLevelMatrixLevelQuery,
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useUpdateProductStockingLevelMatrixLevelMutation,
    useCreateProductStockingLevelMatrixLevelMutation,

 } from '../../store/services/e4kTblProductProductPropertyLevelAPI';

import { useGetTblWarehousesQuery } from '../../store/services/e4kTblWhoWarehousesAPI';

const E4kTblProductPropertiesStockingLevelMatrix = ({ showModalMediumStockingLevelMatrix, handleCloseMediumStockingLevelMatrix }) => {
    const [dataGridStockLevel, setDataGridStockLevel] = useState([]);
    const [dataGridstocklevelcol, setDataGridStockLevelcol] = useState([]);
    const [dataGridWarehouse, setDataGridWarehouse] = useState([]);
    const [selectWarehouse, setSelectWarehouse] = useState("");
    const [selectWarehouseDropDownChange, setSelectWarehouseDropDownChange] = useState("");
    const [pivotMode, setPivotMode] = useState(false);

    const CompanyProductStockingLevel = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const tableStockLevelRef = useRef();
    const pivotTableStockLeveRef = useRef();
    const SwitchButtonStockLeveRef = useRef();
    const inputRefProductWarehouse = useRef();
    const [filterColumns,setFilterColumns]  = useState([]);
    const [filterValues ,setFilterValues]= useState([]);
    const [filterButtonStockLevelClick, setFilterButtonStockLevelClick] = useState(false);


    const [filterRowStockLevel, setFilterrowStockLevel] = useState(true);
    
    const ProductIDSelect = useSelector((state) => state.selectProduct.selectProduct);

    useEffect(() => {
        if (CompanyProductStockingLevel) {
          setCompanyid(CompanyProductStockingLevel);
        }
      }, [CompanyProductStockingLevel]);
    
      const skipQuery = !ProductIDSelect?.productid?.trim();

    
   


    /////////////// Api Call from Propery level api file
    const { data: stocklevelmatrixdata, isLoading: stocklevelmatrixisLoading } = useGetProductStockingLevelMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelect.productid
    },{skip:skipQuery});

    const { data: stocklevelcolmatrixdata, isLoading: stocklevelcolmatrixisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelect.productid
    },{skip:skipQuery});


    const { data: warehousedata, isLoading: warehouseisLoading } = useGetTblWarehousesQuery({
        companyid: companyid,
        warehouseid: ''
    });


        ////////////// Update Product stoking Level api call
const [updateProductStockingLevelMatrixlevel, { isLoading: isUpdatingupdateProductStockingLevelMatrixlevel }
   ] = useUpdateProductStockingLevelMatrixLevelMutation();

   const [createProductStockingLevelMatrixlevel,
     { isLoading: isCreatingupdateProductStockingLevelMatrixlevel }
   ] = useCreateProductStockingLevelMatrixLevelMutation();


    const [isMaximizedStockLevel, setIsMaximizedStockLevel] = useState(false);





    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStockLevel([]);
        setDataGridStockLevelcol([]);
        setFilterrowStockLevel(true);

        if (!stocklevelmatrixisLoading && stocklevelmatrixdata && ProductIDSelect.productid) {
          //  transformDataStocklevelmatrix();

            const response = stocklevelmatrixdata.e4kTblproductProductStockinglevelMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStockLevel([]);
            } else if (responseKeys.includes('stocklevelmatix')) {
                transformDataStocklevelmatrix();
            }

        }

        if (!stocklevelcolmatrixisLoading && stocklevelcolmatrixdata && ProductIDSelect.productid) {
            

            const response = stocklevelmatrixdata.e4kTblproductProductStockinglevelMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStockLevelcol([]);
            } else if (responseKeys.includes('stocklevelmatix')) {
                transformDataStocklevelmatrix();
                setFilterrowStockLevel(true);
            }


        }
    }, [stocklevelmatrixisLoading, stocklevelcolmatrixisLoading, stocklevelmatrixdata, stocklevelcolmatrixdata, ProductIDSelect.productid]);





    useEffect(() => {
        if (warehousedata) {
            if (ProductIDSelect.productid !== ''){
                transformDataStocklevelmatrix();
              }

           
        }
    }, [warehouseisLoading, warehousedata]);

    useEffect(() => {
        if (selectWarehouse !== '') {
            filterDataByWarehouse();
        } else {
            setDataGridStockLevel([]); // Clear the data grid if no warehouse is selected
        }
    }, [selectWarehouse]);

    const transformDataStocklevelmatrix = () => {
        if (!stocklevelmatrixdata) return [];
        setDataGridStockLevel(JSON.parse(stocklevelmatrixdata.e4kTblproductProductStockinglevelMatrix[0].stocklevelmatix));

        if (!stocklevelcolmatrixdata) return [];
        //setDataGridStockLevelcol(JSON.parse(stocklevelcolmatrixdata.e4kTblproductProductPropertyLevelColmatrix[0].stklvlcolmatrix));

        const transformedColumnslevel = JSON.parse(stocklevelcolmatrixdata.e4kTblproductProductPropertyLevelColmatrix[0].stklvlcolmatrix)

        const standCostcolumns = transformedColumnslevel.filter(column => column.dataField  && !column.dataField.includes('summary'));

        const transformedColumnslevel1 = standCostcolumns.map(column => {

            if (column.dataField === "maxqty" || column.dataField === "minqty" || column.dataField === "reorderqty") {
                column.allowEdit = true;
                if (column.dataField === "minqty"){
                    column.label = "Minimum Quantity";
                }
                if (column.dataField === "maxqty"){
                    column.label = "Maximum Quantity";
                }
                if (column.dataField === "reorderqty"){
                    column.label = "Reorder Quantity";
                }
            } else {
                column.allowEdit = false;
            }

            return column;
        });

        setDataGridStockLevelcol(transformedColumnslevel1)





        if (!warehousedata) return [];
        const warehouse = warehousedata.e4kTblwhowarehouse.map((category) => ({
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
        setDataGridWarehouse(warehose);
    };


    const filterDataByWarehouse = () => {
        if (selectWarehouse !== '') {
            //setDataGridStockLevel(JSON.parse(stocklevelmatrixdata.e4kTblproductProductStockinglevelMatrix[0].stocklevelmatix));
       
            const filteredData = JSON.parse(stocklevelmatrixdata.e4kTblproductProductStockinglevelMatrix[0].stocklevelmatix).filter(item => item.WarehouseID === selectWarehouse);
            setDataGridStockLevel(filteredData);
        }
    };

    const header = {
        visible: true,
        buttons: ['filter', 'sort', 'search']
    };

    const toggleMaximizeStockLevel = () => {
        setIsMaximizedStockLevel(!isMaximizedStockLevel);
    };

    const dataSourceStockLevel = useMemo(() => dataGridStockLevel, [dataGridStockLevel]);

    const onColumnRenderStockLevel = (settings) => {
        if (settings.column.summary) {
            settings.text = settings.column.originalColumn.label.charAt(0).toUpperCase() +
                settings.column.originalColumn.label.slice(1);
        }
    };

    const handleChangePivotMode = (e) => {
        setPivotMode(e.detail.value);
    };

    const handleCellEditStockLevel = (event) => {
        const detail = event.detail,
            id = detail.id,
            dataField = detail.dataField,
            row = detail.row;

            tableStockLevelRef.current.updateRow(id, row)

        // const newData = [...dataGridStockLevel];
        // newData[id][dataField] = value;
        // setDataGridStockLevel(newData);
    };

    const handleDropDownonChange = (event) => {
        const value = event.detail.value;
        const waredata = value.split(' -')[0];
        //console.log(value,'---------------?>>>', waredata)
        setSelectWarehouse(waredata);
        setSelectWarehouseDropDownChange(value)
        

        if (waredata !== '' && selectWarehouse !=='') {
            if (!stocklevelmatrixdata) return;
    
            const response = stocklevelmatrixdata.e4kTblproductProductStockinglevelMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
                setDataGridStandardPrice([]);
            } else if (responseKeys.includes('stocklevelmatix')) {
                const filteredData = JSON.parse(response.stocklevelmatix).some(item => item.WarehouseID === waredata);
               
                // Append filtered data to parent list
                // update_stock_level_save = filteredData.map(item => JSON.stringify(item));
                if (!filteredData){
                    //console.log('Update Stock Level Warehouse ID:------->>>>>>',filteredData)
                    let NewStockdata = {
                        companyid: companyid,
                        productid: ProductIDSelect.productid,
                        warehouseid: waredata,
                    }
                    //console.log('---------------?>>>NewStockdata', NewStockdata)
                    setSelectWarehouse('')
                    setSelectWarehouseDropDownChange('')
                    handleProductStockingLevelCreate(NewStockdata)
                }
                
            }
        }






    };
    

    const handleCopyFirstStockLevel = () => {
        

        const table = document.getElementById('E4kTblProductPropertiesstokinglevelmatrixTable') 
        const state = table.getState();



        //if (filterButtonStockLevelClick && state.filtered && state.filtered.rowFilters) {
            if (state.filtered && state.filtered.rowFilters) {
            const filters = state.filtered.rowFilters;
            const filterColumns = [];
            const filterValues = [];
            
        
            filters.forEach(([column, filterInfo]) => {
                filterColumns.push(column);
                filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
            });
        
            const filteredRows = dataGridStockLevel.filter(row => {
                return filterColumns.every((column, index) => {
                    return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                });
            });
             if (filteredRows.length > 0) {
                    const firstRecord = filteredRows[0];
            
                    const updatedDataGridStockLevel = dataGridStockLevel.map(row => {
                        const isMatch = filterColumns.every((column, index) => {
                            return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                        });
            
                        if (isMatch) {
                            return {
                                ...row,
                                'maxqty': firstRecord['maxqty'],
                                'minqty': firstRecord['minqty'],
                                'reorderqty': firstRecord['reorderqty'],
                                'WarehouseID':selectWarehouse
                               
                            };
                        }
                        return row;
                    });

                    const updatedDataGridStockLevelmatupdate = updatedDataGridStockLevel.map((row, index) => {

                        tableStockLevelRef.current.updateRow(index,row);
        
        
                    })
            
                    //setDataGridStockLevel(updatedDataGridStockLevel);
                } else {
                    console.log('No rows found matching the filters.');
                }
            //setFilterButtonStockLevelClick(false);

        }else {
    
        if (filterColumns.length === 0) {
            if (dataGridStockLevel.length > 0) {
                //const firstRecord = dataGridStockLevel[0];
                const firstRecord = tableStockLevelRef.current.props.dataSource[0]
                const updatedDataGridStockLevel = dataGridStockLevel.map(row => {
                    return {
                        ...row,
                        'maxqty': firstRecord['maxqty'],
                        'minqty': firstRecord['minqty'],
                        'reorderqty': firstRecord['reorderqty'],
                        'WarehouseID':selectWarehouse
                        
                    };
                });

                const updatedDataGridStockLevelmatupdate = updatedDataGridStockLevel.map((row, index) => {

                    tableStockLevelRef.current.updateRow(index,row);
    
    
                })

               // setDataGridStockLevel(updatedDataGridStandardPrice);
               
    
            } else {
                console.log('No rows found in the data grid.');
            }
            //setFilterButtonStockLevelClick(false);
         } 
        }
    
    };


    const handleonFileterStocklevel =(event) => {
        event.preventDefault();

        setFilterButtonStockLevelClick(true);
       
    }



    const handleProductStockingLevelUpdate = async (category) => {
        try {
          const result = await updateProductStockingLevelMatrixlevel(category);
          if (result.error) {
            console.error('Mutation Error:', result.error);
          } else {
            console.log('Mutation Success:', result.data);
            if (result.data.E4kTblproductProductstockinglevelmatrixUpdate.success === "Success") {
                toast.success('Stocking Level Updated', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                  });
              
            } else {
              toast.error(result.data.E4kTblproductProductstockinglevelmatrixUpdate.success, { position: "top-center" });
            }
          }
        } catch (error) {
          console.error('Mutation Error:', error);
        }
      };




    const handleSaveStockLevel = () => {
        let update_stock_level_save = []




        if (selectWarehouse !== '') {
            if (!stocklevelmatrixdata) return;
    
            const response = stocklevelmatrixdata.e4kTblproductProductStockinglevelMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
                setDataGridStandardPrice([]);
            } else if (responseKeys.includes('stocklevelmatix')) {
                const warehouesclickid = dataGridWarehouse.find(ware => ware.warehouseid === selectWarehouse).warehouseid;
                const filteredData = JSON.parse(response.stocklevelmatix).filter(item => item.WarehouseID !== warehouesclickid);
               
                // Append filtered data to parent list
                update_stock_level_save = filteredData.map(item => JSON.stringify(item));
            }
        }


       

        dataGridStockLevel.map(row => {
            
            update_stock_level_save.push(JSON.stringify(row))

        })

        let Updatestocklevel_save = {
                companyid: companyid,
                productid: ProductIDSelect.productid,
                "stocklevelmatix": update_stock_level_save,
            };
        handleProductStockingLevelUpdate(Updatestocklevel_save)

    }


    ///////////// create stock level for various warehouseid
    const handleProductStockingLevelCreate = async (category) => {
        try {
          const result = await createProductStockingLevelMatrixlevel(category);
          if (result.error) {
            console.error('Mutation Error:', result.error);
          } else {
            console.log('Mutation Success:', result.data);
            if (result.data.E4kTblproductProductstockinglevelmatrixCreate.success === "Success") {
                toast.success('Stocking Level Created', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                  });
                  setSelectWarehouse('')
                  setSelectWarehouseDropDownChange('')
            } else {
              toast.error(result.data.E4kTblproductProductstockinglevelmatrixCreate.success, { position: "top-center" });
            }
          }
        } catch (error) {
          console.error('Mutation Error:', error);
        }
      };

    const handleCloseStockinglevel = () => {
        setFilterrowStockLevel(false);
        setPivotMode(false)
        setSelectWarehouse('')
        setFilterColumns([])
        setFilterValues([])
        setFilterButtonStockLevelClick(false);
        // setDataGridStockLevel([]);
        // setDataGridStockLevelcol([]);
        SwitchButtonStockLeveRef.current.checked=false;
        handleCloseMediumStockingLevelMatrix()

    }


    const modalDialogclassName = isMaximizedStockLevel ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumStockingLevelMatrix ? 'in' : ''}`} style={{ display: showModalMediumStockingLevelMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassName}>
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
                                                            {ProductIDSelect.productid} Stock Level
                                                        </div>             

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveStockLevel()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        {/* <div className='popup-top-rightdiv'>
                                                            <SwitchButton rightToLeft onChange={handleChangePivotMode}></SwitchButton>
                                                            <button type="button" className="close" onClick={handleCloseMediumStockingLevelMatrix}>
                                                                &times;
                                                            </button>
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeStockLevel}>
                                                                {isMaximizedStockLevel ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                        </div> */}
                                                        <div className='popup-top-rightdiv'>
                                                                <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span><SwitchButton ref={SwitchButtonStockLeveRef} rightToLeft onChange={handleChangePivotMode}></SwitchButton>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeStockLevel}>
                                                                {isMaximizedStockLevel ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={() => handleCloseStockinglevel()}>
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
                                            <div className="customer-newbold">{ProductIDSelect.productid} Stock Level </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='height-alignment'> 
                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='input-lable'>
                                        <span>WareHouse</span>
                                    </div>
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option'>                                
                                        <DropDownList
                                            ref={inputRefProductWarehouse}
                                            id="TblProductWarehouse"
                                            //selectedIndexes={[0]}
                                            filterable
                                            placeholder="Select Warehouse"
                                            dataSource={dataGridWarehouse.map(cat => cat.fullname)}
                                            className='px-8'
                                            onChange={handleDropDownonChange}
                                            value = {selectWarehouseDropDownChange} 
                                        />

                                        {pivotMode ? (
                                            <span>
                                                <button className="btn alter-button" onClick={() => handleCopyFirstStockLevel()} >Copy Frist</button>
                                            </span>

                                        ) : (null)}
                                        
                                    </div>
                                </div>
                            </div>    
                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {stocklevelmatrixisLoading || stocklevelcolmatrixisLoading ? (
                                                "Loading..."
                                            ) : (
                                                (selectWarehouse !=="") && dataGridStockLevel.length > 0 ? (
                                                    !pivotMode ? (
                                                        <PivotTable
                                                            ref={pivotTableStockLeveRef}
                                                            id="E4kTblProductPropertiespivotstokinglevelmatrixTable"
                                                            dataSource={dataSourceStockLevel}
                                                            freezeHeader
                                                            keyboardNavigation
                                                            onColumnRender={onColumnRenderStockLevel}
                                                            columns={dataGridstocklevelcol}
                                                        />
                                                    ) : (
                                                        <Table
                                                            ref={tableStockLevelRef}
                                                            id="E4kTblProductPropertiesstokinglevelmatrixTable"
                                                            dataSource={dataSourceStockLevel}
                                                            freezeHeader
                                                            keyboardNavigation
                                                            columns={dataGridstocklevelcol}
                                                            editing
                                                            editMode={'row'}
                                                            filtering={true}
                                                            filterRow={showModalMediumStockingLevelMatrix ? true : filterRowStockLevel}
                                                            //paging={true}
                                                            //pageIndex={0}
                                                            //pageSize={10}
                                                            sortMode='many'
                                                            onCellEndEdit={(e) => handleCellEditStockLevel(e)}
                                                            //onFilter= {(e) => handleonFileterStocklevel(e)}
                                                        />
                                                    )
                                                ) : (
                                                    "Please select a warehouse to view data."
                                                )
                                            )}
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

export default E4kTblProductPropertiesStockingLevelMatrix;


