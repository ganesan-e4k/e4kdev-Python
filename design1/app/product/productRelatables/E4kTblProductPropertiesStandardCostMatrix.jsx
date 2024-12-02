'use client';
import { useEffect, useState,useMemo,useRef } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { Table } from 'smart-webcomponents-react/table';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import { PivotTable } from 'smart-webcomponents-react/pivottable';

import { 
    useGetProductStandardCostMatrixLevelQuery,
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useUpdateProductStandardCostMatrixLevelMutation
 } from '../../store/services/e4kTblProductProductPropertyLevelAPI';

 
import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

const E4kTblProductPropertiesStandardCostMatrix = ({ showModalMediumStandardCostMatrix, handleCloseMediumStandardCostMatrix }) => {
    const [dataGridStandardCost, setDataGridStandardCost] = useState([]);
    const [dataGridstandardCostcol, setDataGridStandardCostcol] = useState([]);
    const [pivotModeCost, setPivotModeCost] = useState(false);
    const CompanyProductStandardCost = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const tableStandardCostRef = useRef();
    const pivotTableStandardCostRef = useRef();
    const switchbuttonStandardCostRef = useRef();
    const [filterRowCost, setFilterrowCost] = useState(true);

    const [selectPriceTypeCost, setSelectPriceTypeCost] = useState("");
    const [dataGridPriceTypeAllCost, setDataGridPriceTypeAllCost] = useState([]);
    const [filterColumnsCost,setFilterColumnsCost]  = useState([]);
    const [filterButtonClickCost, setFilterButtonClickCost] = useState(false);
    const inputRefProductPriceTypeStandardCost = useRef();

    const ProductIDSelect = useSelector((state) => state.selectProduct.selectProduct);
    
    useEffect(() => {
        if (CompanyProductStandardCost) {
            setCompanyid(CompanyProductStandardCost);
        }
        }, [CompanyProductStandardCost]);
    
    const skipQuery = !ProductIDSelect?.productid?.trim();

    ///////////// Api call from Propery level api file 
    const { data : standardCostmatrixdata, 
        error :standardCostmatrixerror, 
        isLoading:standardCostmatrixisLoading,
        isError : standardCostmatrixisError } = useGetProductStandardCostMatrixLevelQuery({
                                                companyid:companyid,
                                                productid:ProductIDSelect.productid},{skip:skipQuery});

    const { data : stocklevelcolmatrixdata, 
        error :stocklevelcolmatrixerror, 
        isLoading:stocklevelcolmatrixisLoading,
        isError : stocklevelcolmatrixisError } = useGetProductPropertiesLevelColMatrixLevelQuery({
                                                companyid:companyid,
                                                productid:ProductIDSelect.productid},{skip:skipQuery});


    //  ///////////// Api call from Propery level api file 
    //  const { data : standardCostmatrixdata, 
    //     error :standardCostmatrixerror, 
    //     isLoading:standardCostmatrixisLoading,
    //     isError : standardCostmatrixisError } = useGetProductStandardCostMatrixLevelQuery({
    //                                             companyid:companyid,
    //                                             productid:ProductIDSelect.productid},{skip:(ProductIDSelect.productid === '') ? true:false});

    // const { data : stocklevelcolmatrixdata, 
    //     error :stocklevelcolmatrixerror, 
    //     isLoading:stocklevelcolmatrixisLoading,
    //     isError : stocklevelcolmatrixisError } = useGetProductPropertiesLevelColMatrixLevelQuery({
    //                                             companyid:companyid,
    //                                             productid:ProductIDSelect.productid},{skip:(ProductIDSelect.productid === '') ? true:false});



    const [isMaximizedStandardCost, setIsMaximizedStandardCost] = useState(false);

    const [updateProductStandardCostMatrixlevel] = useUpdateProductStandardCostMatrixLevelMutation();

    /////////////// Price types data all
    const { data :costdata,
        error:costerror, 
        isLoading :costisloading,
       isError :costiserror
       } = useGetProductPriceTypesQuery({companyid:companyid,priceid:null});

    useEffect(() => {
        if (costdata) {
            
            transformDataCostData();
        }
    }, [costisloading, costdata]);


    useEffect(() => {
        if (selectPriceTypeCost !== '') {
            filterDataByPriceTypeCost();
        } else {
            setDataGridStandardCost([]); // Clear the data grid if no warehouse is selected
        }
    }, [selectPriceTypeCost]);


    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStandardCost([]);
        setDataGridStandardCostcol([]);
        setFilterrowCost(true);
    
        if (!standardCostmatrixisLoading && standardCostmatrixdata && stocklevelcolmatrixdata && ProductIDSelect.productid) {
            const response = standardCostmatrixdata.e4kTblproductProductCostStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardCost([]);
            } else if (responseKeys.includes('stdcostmatix')) {
                transformDataStandardCostmatrix();
            }
        }
    
        if (!stocklevelcolmatrixisLoading && standardCostmatrixdata && stocklevelcolmatrixdata && ProductIDSelect.productid) {

            const response = standardCostmatrixdata.e4kTblproductProductCostStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardCostcol([]);
            } else if (responseKeys.includes('stdcostmatix')) {
                transformDataStandardCostmatrix();
                setFilterrowCost(true);
            }


            
        }
    }, [standardCostmatrixisLoading, stocklevelcolmatrixisLoading, standardCostmatrixdata, stocklevelcolmatrixdata, ProductIDSelect.productid]);
    
   
    ///////////////////////transform rpice data
    const transformDataCostData = () => {
        if (!costdata) return [];
        const datagrid = costdata.e4kTblproductProductPriceTypes.map(category => ({
            priceid: category.priceid,
            companyid: category.companyid.companyid,
            description: category.description,
            priceType: category.priceType
            }));
        const result  = datagrid.filter(category => category.priceType === 1)
        
        setDataGridPriceTypeAllCost(result);
    };




    const transformDataStandardCostmatrix = () => {
        if (!standardCostmatrixdata) return [];
        setDataGridStandardCost(JSON.parse(standardCostmatrixdata.e4kTblproductProductCostStandardMatrix[0].stdcostmatix));
    
        if (!stocklevelcolmatrixdata) return [];
        
        let standCostcolumns = JSON.parse(stocklevelcolmatrixdata.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
    
        // Ensure standPricecolumns is an array
        if (!Array.isArray(standCostcolumns)) {
            standCostcolumns = [];
        }
    

        standCostcolumns = standCostcolumns.filter(column => column.dataField  && !column.dataField.includes('summary'));
        
        const updatedColumns = standCostcolumns.map(column => {
            if (column.dataField === 'price' ) {
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

        const columnss  = updatedColumns.filter(column => column.dataField !== 'pricetype');
        const updatedColumn = columnss.map(col => {
            if (col.dataField === 'price'){
                col.label = 'Cost';
                col.allowEdit = true;
            }else{
                col.allowEdit = false;
            }
            return col;

        })
        setDataGridStandardCostcol(updatedColumn); // Check the updated columns
        
    };
    
    
    const filterDataByPriceTypeCost = () => {
        if (selectPriceTypeCost !== '') {

            if (!standardCostmatrixdata) return [];
            const response = standardCostmatrixdata.e4kTblproductProductCostStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardCost([]);
            } else if (responseKeys.includes('stdcostmatix')) {
                const pricetypeid = dataGridPriceTypeAllCost.filter(priceType => priceType.description === selectPriceTypeCost )
                const filteredData = (JSON.parse(standardCostmatrixdata.e4kTblproductProductCostStandardMatrix[0].stdcostmatix)).filter(item => item.pricetype === pricetypeid[0].priceid);
                
                setDataGridStandardCost(filteredData);
            }
            
        }
    };
    
    

    // const header = {
    //     visible: true,
    //     buttons: ['filter','sort','search']
    //   };

    const toggleMaximizeStandardCost = () => {
        setIsMaximizedStandardCost(!isMaximizedStandardCost);
      };

    const dataSourceStandardCost = useMemo(() => dataGridStandardCost, [dataGridStandardCost]);        

    const onColumnRenderStandardCost = (settings) => {
	
		if (settings.column.summary) {
			settings.text =  settings.column.originalColumn.label.charAt(0).toUpperCase() + 
                        settings.column.originalColumn.label.slice(1) ;
		}	
	};


    const handleChangePivotModeStandardCost = (e) => {
        setPivotModeCost(e.detail.value);
      };


    //////////// Copy first
    const handleCopyFirstStandardCost = () => {
       
        const table = document.getElementById('E4kTblProductPropertiesstandardCostmatrixTable') 
        const state = table.getState();

        //if (filterButtonClickCost && state.filtered && state.filtered.rowFilters) {
            if (state.filtered && state.filtered.rowFilters) {
            const filters = state.filtered.rowFilters;
            const filterColumns = [];
            const filterValues = [];
            
        
            filters.forEach(([column, filterInfo]) => {
                filterColumns.push(column);
                filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
            });
        
            const filteredRows = dataGridStandardCost.filter(row => {
                return filterColumns.every((column, index) => {
                    return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                });
            });
             if (filteredRows.length > 0) {
                    const firstRecord = filteredRows[0];
            
                    const updatedDataGridStandardCost = dataGridStandardCost.map(row => {
                        const isMatch = filterColumns.every((column, index) => {
                            return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                        });
            
                        if (isMatch) {
                            return {
                                ...row,
                                price: firstRecord.price,
                                pricetype: firstRecord.pricetype,
                               
                            };
                        }
                        return row;
                    });
            
                    const updatedDataGridStandardCostmatupdate = updatedDataGridStandardCost.map((row, index) => {

                        tableStandardCostRef.current.updateRow(index,row);
    
                    })


                    //setDataGridStandardCost(updatedDataGridStandardCost);
                } else {
                    console.log('No rows found matching the filters.');
                }
            //setFilterButtonClickCost(false);

        }else {
    
        if (filterColumnsCost.length === 0) {
            if (dataGridStandardCost.length > 0) {
                const firstRecord = dataGridStandardCost[0];
    
                const updatedDataGridStandardCost = dataGridStandardCost.map(row => {
                    return {
                        ...row,
                        'price': firstRecord['price'],
                        'pricetype': firstRecord['pricetype'],
                    };
                });

                const updatedDataGridStandardCostmatupdate = updatedDataGridStandardCost.map((row, index) => {

                    tableStandardCostRef.current.updateRow(index,row);


                })

                //setDataGridStandardCost(updatedDataGridStandardCost);
               
    
            } else {
                console.log('No rows found in the data grid.');
            }
            //setFilterButtonClickCost(false);
         } 
        }
    };
    
    ///////// dropdown chnage data 
    const handleDropDownonChangeStandardCost = (event) => {
        const value = event.detail.value;
        setSelectPriceTypeCost(value);
    };
   
    const handleCellEditStandardCost = (event) => {
        //event.preventDefault(); stdcostmatix
        const detail = event.detail,
            id = detail.id,
            dataField = detail.dataField,
            row = detail.row,
            value = detail.value


            tableStandardCostRef.current.updateRow(id, row)
            
        // const newData = [...dataGridStandardCost];
        // newData[id][dataField] = value;
        // setDataGridStandardCost(newData);
        
    };


    const handleProductStandardCostlevelUpdate = async (category) => {
        try {
            const result = await updateProductStandardCostMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductcoststandardmatrixUpdate.success === "Success") {
                    toast.success('Standard Cost Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                } else {
                    toast.error(result.data.E4kTblproductProductcoststandardmatrixUpdate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    ///////////// On filter function 
    const handleonFileterStandardCost = (event) => {
        event.preventDefault();
        const detail = event.detail;
       
        setFilterButtonClickCost(true);
    
    };

    const handleSaveStandardCost = () => {
        let update_standard_cost_save = []


        if (selectPriceTypeCost !== '') {

            if (!standardCostmatrixdata) return [];
            const response = standardCostmatrixdata.e4kTblproductProductCostStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardCost([]);
            } else if (responseKeys.includes('stdcostmatix')) {
                const pricetypeid = dataGridPriceTypeAllCost.find(priceType => priceType.description === selectPriceTypeCost ).priceid
                //const filteredData = (JSON.parse(standardCostmatrixdata.e4kTblproductProductCostStandardMatrix[0].stdcostmatix)).filter(item => item.pricetype === pricetypeid[0].priceid);
                
                const filteredData = JSON.parse(response.stdcostmatix).filter(item => item.pricetype !== pricetypeid);
               
                // Append filtered data to parent list
                update_standard_cost_save = filteredData.map(item => JSON.stringify(item));
            }
            
        }

        dataGridStandardCost.map(row => {
            
            update_standard_cost_save.push(JSON.stringify(row))

        })

        let Updatestandard_cost_save = {
                companyid: companyid,
                productid: ProductIDSelect.productid,
                "stdcostmatix": update_standard_cost_save,
            };

      handleProductStandardCostlevelUpdate(Updatestandard_cost_save)

    }

    const handleCloseStandardCost = () => {
        
        setFilterrowCost(false);
        setPivotModeCost(false);
        setSelectPriceTypeCost('')
        switchbuttonStandardCostRef.current.checked = false;
        handleCloseMediumStandardCostMatrix()
        

    }

    const modalDialogclassName = isMaximizedStandardCost ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumStandardCostMatrix ? 'in' : ''}`} style={{ display: showModalMediumStandardCostMatrix ? 'block' : 'none' }}>
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
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-topbar-title'>
                                                            {ProductIDSelect.productid} - Standard Cost
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveStandardCost()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">

                                                        <div className='popup-top-rightdiv'>
                                                                <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span>
                                                                <SwitchButton ref={switchbuttonStandardCostRef} rightToLeft onChange={handleChangePivotModeStandardCost}></SwitchButton>
                                                                <button type="button" className="btn-link" onClick={toggleMaximizeStandardCost}>
                                                                {isMaximizedStandardCost ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i> }
                                                                </button>
                                                                <button type="button" className="close" onClick={() => handleCloseStandardCost()}>
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
                                            <div className="customer-newbold">{ProductIDSelect.productid} - Standard Cost </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='height-alignment'> 
                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='input-lable'>
                                        <span>Price Type</span>
                                    </div>
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option'>                                
                                        <DropDownList
                                            ref={inputRefProductPriceTypeStandardCost}
                                            id="TblProductProductPriceTypeDropdownstandardCost"
                                            //selectedIndexes={[0]}
                                            filterable
                                            placeholder="Select Price Type"
                                            dataSource={dataGridPriceTypeAllCost.map(cat => cat.description)}
                                            className='px-8'
                                            onChange={(e) => handleDropDownonChangeStandardCost(e)}
                                            value = {selectPriceTypeCost} 
                                        />

                                        {pivotModeCost ? (
                                            <span>
                                                <button className="btn alter-button" onClick={() => handleCopyFirstStandardCost()} >Copy Frist</button>
                                            </span>) : (null)
                                        }


                                        
                                    </div>
                                </div>
                            </div> 



                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {selectPriceTypeCost !=="" ? (standardCostmatrixisLoading || stocklevelcolmatrixisLoading ? (
                                                "Loading..."
                                            ) : ( !pivotModeCost && (dataSourceStandardCost.length > 0)   ? (
                                                    <PivotTable
                                                      ref={pivotTableStandardCostRef}
                                                      id="E4kTblProductPropertiespivotstandardCostmatrixTable"
                                                      dataSource={dataSourceStandardCost}
                                                      // designer
                                                      freezeHeader
                                                      keyboardNavigation
                                                      onColumnRender={onColumnRenderStandardCost}
                                                      columns={dataGridstandardCostcol}
                                                    />
                                                  ) : (
                                                    <Table
                                                      ref={tableStandardCostRef}
                                                      id="E4kTblProductPropertiesstandardCostmatrixTable"
                                                      dataSource={dataSourceStandardCost}
                                                      freezeHeader
                                                      keyboardNavigation
                                                      columns={dataGridstandardCostcol}
                                                      editing
                                                      editMode={'row'}
                                                      filtering = {true}
                                                      filterRow = {showModalMediumStandardCostMatrix ? true : filterRowCost}
                                                      //paging = {true}
                                                      //pageIndex = {0}
                                                      //pageSize = {10}
                                                      sortMode = 'many'
                                                      onCellEndEdit={(e) => handleCellEditStandardCost(e)}
                                                     // onFilter= {(e) => handleonFileterStandardCost(e)}  
                                                    />
                                                  )
                                            )):null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
            {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}

            {/* {showConfirmCategory3 && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmCategory3(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Delete</h4>	
                                <p>Are you sure you want to delete this record?</p>
                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmCategory3(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleConfirmCategory3Delete}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )} */}
            </Draggable>
        </>
    );
};

export default E4kTblProductPropertiesStandardCostMatrix;
