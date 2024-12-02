

'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'smart-webcomponents-react/table';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';


import {
    useGetProductStockingTypesQuery,
} from '../../store/services/e4kTblProductStockingTypes';

import { 
    useGetProductStockingTypeMatrixLevelQuery,
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useUpdateProductStockingTypeMatrixLevelMutation,

 } from '../../store/services/e4kTblProductProductPropertyLevelAPI';


const E4kTblProductPropertiesStockingTypeMatrix = ({ showModalMediumStockingTypeMatrix, handleCloseMediumStockingTypeMatrix }) => {
    const [dataGridStockType, setDataGridStockType] = useState([]);
    const [dataGridstockTypecol, setDataGridStockTypecol] = useState([]);
    const [StockingTypeAllData, setStockingTypeAllData] = useState([]);

    const CompanyProductStockingType = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const tableStockingTypeRef = useRef();
    const [filterRowStockingType, setFilterrowStockingType] = useState(true);

    
    const [filterColumnsStockType,setFilterColumnsStockType]  = useState([]);
    const [filterValuesStockType ,setFilterValuesStockType]= useState([]);
    const ProductIDSelect = useSelector((state) => state.selectProduct.selectProduct);




    // ////////////// Api call from propeties level set api
    // const {
    //      data: stockTypematrixdata, 
    //      error: stockTypematrixerror, 
    //      isLoading: stockTypematrixisLoading,
    //       isError: stockTypematrixisError } = useGetProductStockingTypeMatrixLevelQuery({
    //                                             companyid: companyid,
    //                                             productid: ProductIDSelect.productid
    //                                         },{skip:(ProductIDSelect.productid === '') ? true:false});

                                             ////////////// Api call from propeties level set api

    useEffect(() => {
    if (CompanyProductStockingType) {
        setCompanyid(CompanyProductStockingType);
    }
    }, [CompanyProductStockingType]);

    const skipQuery = !ProductIDSelect?.productid?.trim();
    const {
        data: stockTypematrixdata, 
        error: stockTypematrixerror, 
        isLoading: stockTypematrixisLoading,
         isError: stockTypematrixisError } = useGetProductStockingTypeMatrixLevelQuery({
                                               companyid: companyid,
                                               productid: ProductIDSelect.productid
                                           },{skip:skipQuery});

    const { 
        data: stockTypecolmatrixdata,
         error: stockTypecolmatrixerror, 
         isLoading: stockTypecolmatrixisLoading,
          isError: stockTypecolmatrixisError } = useGetProductPropertiesLevelColMatrixLevelQuery({
                                                        companyid: companyid,
                                                        productid: ProductIDSelect.productid
                                                    },{skip:skipQuery});

    const [isMaximizedStockType, setIsMaximizedStockType] = useState(false);

    ///////////// Stocking type table data for dropdow
    const { 
        data:StockTypeData, 
        error :StockTypeDataerror,
        isLoading : StockTypeDataIsLoading, 
        isError:StockTypeDataisError } = useGetProductStockingTypesQuery({
                                                            companyid:companyid,
                                                            stockingtype:''});

  
    ////////////// Update Product stoking type
const [updateProductStockingTypeMatrixlevel,
    { isLoading: isUpdatingupdateProductStockingTypeMatrixlevel }
   ] = useUpdateProductStockingTypeMatrixLevelMutation();
 
    useEffect(() => {
        if (StockTypeData) {
            transformData();
        }
    }, [StockTypeDataIsLoading, StockTypeData]);



    const transformData = () => {
        if (!StockTypeData) return [];
        const datagrid = StockTypeData.e4kTblproductProductStockingTypes.map((category, index) => ({
            stockingtype: category.stockingtype,
            companyid: category.companyid.companyid,
            description: category.description,
        }));
        setStockingTypeAllData(datagrid);
    };                                                       




    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStockType([]);
        setDataGridStockTypecol([]);
        setFilterrowStockingType(true);

        if (!stockTypematrixisLoading && stockTypematrixdata && stockTypecolmatrixdata && ProductIDSelect.productid) {
          

            const response = stockTypematrixdata.e4kTblproductProductStockingtypeMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStockType([]);
            } else if (responseKeys.includes('stocktypematix')) {
                transformDataStockTypematrix();
            }


        }

        if (!stockTypecolmatrixisLoading && stockTypecolmatrixdata && stockTypematrixdata && ProductIDSelect.productid) {
            


            const response = stockTypematrixdata.e4kTblproductProductStockingtypeMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStockTypecol([]);
            } else if (responseKeys.includes('stocktypematix')) {
                transformDataStockTypeColmatrix();
                setFilterrowStockingType(true);
            }


        }
    }, [stockTypematrixisLoading, stockTypematrixdata, stockTypecolmatrixisLoading, stockTypecolmatrixdata, ProductIDSelect.productid]);



    const transformDataStockTypematrix = () => {
        if (!stockTypematrixdata) return [];
        setDataGridStockType(JSON.parse(stockTypematrixdata.e4kTblproductProductStockingtypeMatrix[0].stocktypematix));

        if (!StockingTypeAllData) return [];


        const transformedStockType = JSON.parse(stockTypematrixdata.e4kTblproductProductStockingtypeMatrix[0].stocktypematix).map(column => {

            if (column['stocktype'] !== "None" && column['stocktype'] !== ""){
                //console.log('Ps220 stoick type = !!!!!!!!!',StockingTypeAllData.filter(stockType => (stockType.stockingtype) === column['stocktype']))
            column['stocktype'] = (StockingTypeAllData.filter(stockType => (stockType.stockingtype) === column['stocktype']))[0].description
            }

            return column;
        });

        setDataGridStockType(transformedStockType)
    };


    const transformDataStockTypeColmatrix = () => {
        
        if (!stockTypecolmatrixdata && stockTypecolmatrixdata.e4kTblproductProductPropertyLevelColmatrix.length === 0) return [];

        const transformedColumns = JSON.parse(stockTypecolmatrixdata.e4kTblproductProductPropertyLevelColmatrix[0].stktypecolmatrix)
        const standCostcolumns = transformedColumns.filter(column => column.dataField  && !column.dataField.includes('summary'));
        
        const transformedColumns1 = standCostcolumns.map(column => {
            const { dataField, dataType, label } = column;
            let newColumn = { label, dataField, dataType };

            if (dataField === "stocktype") {
                newColumn = { 
                    label : "Stocking Type", 
                    dataField, 
                    dataType: "string",
                    editor: {
                        template: '<smart-drop-down-list></smart-drop-down-list>',
                        onInit(row, column, editor, value) {
                            editor.dataSource = StockingTypeAllData.map(stock => stock.description)
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
            } else {
                newColumn.allowEdit = false;
            }

            return newColumn;
        });

        setDataGridStockTypecol(transformedColumns1);
    };



    const header = {
        visible: true,
        buttons: ['filter', 'sort', 'search']
    };



    const toggleMaximizeStockType = () => {
        setIsMaximizedStockType(!isMaximizedStockType);
    };

    const dataSourceStockType = useMemo(() => dataGridStockType, [dataGridStockType]);

    
    const handleCellEditStockType = (event) => {
        const detail = event.detail,
            id = detail.id,
            dataField = detail.dataField,
            row = detail.row;


            tableStockingTypeRef.current.updateRow(id, row)

        // const newData = [...dataGridStockType];
        // newData[id][dataField] = value;
        // setDataGridStockType(newData);
    
        
        
    };
    

///// handle Filter function when click filter
const handleonFileterStockType =(event) => {
    const detail = event.detail
    const filters = detail.filters

}

 //////////// Copy first
 const handleCopyFirstStockType = () => {
       
    const tableStockType = document.getElementById('E4kTblProductPropertiesstokingTypematrixTable') 
    const statstocktype = tableStockType.getState();

    //if (filterButtonClick && state.filtered && state.filtered.rowFilters) {
        if (statstocktype.filtered && statstocktype.filtered.rowFilters) {
        const filters = statstocktype.filtered.rowFilters;
        const filterColumns = [];
        const filterValues = [];
        
    
        filters.forEach(([column, filterInfo]) => {
            filterColumns.push(column);
            filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
        });
    
        const filteredRows = dataGridStockType.filter(row => {
            return filterColumns.every((column, index) => {
                return filterValues[index].some(value => row[column].toUpperCase().includes(value));
            });
        });
         if (filteredRows.length > 0) {
                const firstRecord = filteredRows[0];
        
                const updatedDataGridStockType = dataGridStockType.map(row => {
                    const isMatch = filterColumns.every((column, index) => {
                        return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                    });
        
                    if (isMatch) {
                        return {
                            ...row,
                            stocktype: firstRecord.stocktype,
                           
                           
                        };
                    }
                    return row;
                });

                const updatedDataGridStockingTypematupdate = updatedDataGridStockType.map((row, index) => {

                    tableStockingTypeRef.current.updateRow(index,row);


                })
        
                //setDataGridStockType(updatedDataGridStockType);
            } else {
                console.log('No rows found matching the filters.');
            }
        

    }else {

    if (filterColumnsStockType.length === 0) {
        if (dataGridStockType.length > 0) {
            //const firstRecord = dataGridStockType[0];
            const firstRecord = tableStockingTypeRef.current.props.dataSource[0]
            const updatedDataGridStockType = dataGridStockType.map(row => {
                return {
                    ...row,
                    'stocktype': firstRecord['stocktype'],
                };
            });

            const updatedDataGridStockingTypematupdate = updatedDataGridStockType.map((row, index) => {

                tableStockingTypeRef.current.updateRow(index,row);


            })

            //setDataGridStockType(updatedDataGridStockType);
           

        } else {
            console.log('No rows found in the data grid.');
        }
        
     } 
    }
};

///////////////// Handle save buttonclick 
const handleSaveStockType = () => {

    let update_stock_Type_save = []

    const data_stock_type  = dataGridStockType.map(row => {

        if (row.stocktype.length > 1){
           // console.log(StockingTypeAllData.filter(stock => stock.description === row.stocktype),'Stock type update change = ')
            let stock_type = (StockingTypeAllData.filter(stock => stock.description === row.stocktype))[0].stockingtype;
           // console.log(StockingTypeAllData.filter(stock => stock.description === row.stocktype),'Stock type update change = ', stock_type)
            row.stocktype = stock_type
            return row;
        }else {
            return row;
        }

    })

    data_stock_type.map(row => {
        update_stock_Type_save.push(JSON.stringify(row))

    })
    
    let Updatestocktype_save = {
            companyid: companyid,
            productid: ProductIDSelect.productid,
            "stocktypematix": update_stock_Type_save,
        };
        handleProductStockingtypelevelUpdate(Updatestocktype_save)

}


     /////////////// Product Stocking type update
 const handleProductStockingtypelevelUpdate = async (category) => {
    try {
      const result = await updateProductStockingTypeMatrixlevel(category);
      if (result.error) {
        console.error('Mutation Error:', result.error);
      } else {
        console.log('Mutation Success:', result.data);
        if (result.data.E4kTblproductProductstockingtypematrixUpdate.success === "Success") {
          toast.success('Stocking type Updated', {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
          });
          
          
        } else {
          toast.error(result.data.E4kTblproductProductstockingtypematrixUpdate.success, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error('Mutation Error:', error);
    }
  };


  const handleclosestockType = () =>{
    setFilterrowStockingType(false);
    setFilterColumnsStockType([])
    setFilterValuesStockType([])
  
    handleCloseMediumStockingTypeMatrix()
  }

    const modalDialogclassName = isMaximizedStockType ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumStockingTypeMatrix ? 'in' : ''}`} style={{ display: showModalMediumStockingTypeMatrix ? 'block' : 'none' }}>
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
                                                            {ProductIDSelect.productid} - Stocking Type
                                                        </div>


                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                            <div className="breadcomb-wp">
                                                                <div className="breadcomb-ctn">
                                                                <span onClick={() => handleSaveStockType()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                                </div>
                                                            </div>



                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                       

                                                        <div className='popup-top-rightdiv'>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeStockType}>
                                                                {isMaximizedStockType ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={() => handleclosestockType()}>
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
                                            <div className="customer-newbold">{ProductIDSelect.productid} - Stocking Type </div>
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
                                            <button className="btn alter-button" onClick={() => handleCopyFirstStockType()} >Copy Frist</button>
                                        </span>
                                    </div>
                                </div>
                            </div>  




                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {stockTypematrixisLoading || stockTypecolmatrixisLoading ? (
                                                "Loading..."
                                            ) : (dataSourceStockType.length > 0) ? (
                                                <Table
                                                    ref={tableStockingTypeRef}
                                                    id="E4kTblProductPropertiesstokingTypematrixTable"
                                                    dataSource={dataSourceStockType}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridstockTypecol}
                                                    editing
                                                    editMode={'row'}
                                                    filtering={true}
                                                    filterRow={showModalMediumStockingTypeMatrix ? true : filterRowStockingType}
                                                    //paging={true}
                                                    //pageIndex={0}
                                                    //pageSize={10}
                                                    sortMode='many'
                                                    onCellEndEdit={(e) => handleCellEditStockType(e)}
                                                   // onFilter= {(e) => handleonFileterStockType(e)}
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

export default E4kTblProductPropertiesStockingTypeMatrix;

