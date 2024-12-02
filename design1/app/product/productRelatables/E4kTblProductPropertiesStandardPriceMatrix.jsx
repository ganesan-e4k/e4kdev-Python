

'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SwitchButton } from 'smart-webcomponents-react/switchbutton';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { Table } from 'smart-webcomponents-react/table';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import { PivotTable } from 'smart-webcomponents-react/pivottable';
import {
    useGetProductStandardPriceMatrixLevelQuery,
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useUpdateProductStandardPriceMatrixLevelMutation
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';


import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

const E4kTblProductPropertiesStandardPriceMatrix = ({ showModalMediumStandardPriceMatrix, handleCloseMediumStandardPriceMatrix }) => {
    const [dataGridStandardPrice, setDataGridStandardPrice] = useState([]);
    const [dataGridstandardPricecol, setDataGridStandardPricecol] = useState([]);
    const [dataGridPriceTypeAll, setDataGridPriceTypeAll] = useState([]);
    const [pivotModePrice, setPivotModePrice] = useState(false);
    const [selectPriceType, setSelectPriceType] = useState("");

    const [filterColumnsPrice,setFilterColumnsPrice]  = useState([]);
    const [filterButtonClick, setFilterButtonClick] = useState(false);

    const CompanyProductStandardPrice = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const tableStandardPriceRef = useRef();
    const switchbuttonStandardPriceRef = useRef();
    const pivotTableStandardPriceRef = useRef();
    const inputRefProductPriceTypeStandardPrice = useRef();
    const [filterRow, setFilterrow] = useState(true);
    const [isMaximizedStandardPrice, setIsMaximizedStandardPrice] = useState(false);

    const ProductIDSelect = useSelector((state) => state.selectProduct.selectProduct);

    useEffect(() => {
        if (CompanyProductStandardPrice) {
            setCompanyid(CompanyProductStandardPrice);
        }
        }, [CompanyProductStandardPrice]);
    
    const skipQuery = !ProductIDSelect?.productid?.trim();

    // API calls
    const { data: standardPricematrixdata, isLoading: standardPricematrixisLoading } = useGetProductStandardPriceMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelect.productid 
    },{skip:skipQuery});

    const { data: stocklevelcolmatrixdata, isLoading: stocklevelcolmatrixisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelect.productid
    },{skip:skipQuery});




    // // API calls
    // const { data: standardPricematrixdata, isLoading: standardPricematrixisLoading } = useGetProductStandardPriceMatrixLevelQuery({
    //     companyid: companyid,
    //     productid: ProductIDSelect.productid 
    // },{skip:(ProductIDSelect.productid === '') ? true:false});

    // const { data: stocklevelcolmatrixdata, isLoading: stocklevelcolmatrixisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
    //     companyid: companyid,
    //     productid: ProductIDSelect.productid
    // },{skip:(ProductIDSelect.productid === '') ? true:false});

    const [updateProductStandardPriceMatrixlevel] = useUpdateProductStandardPriceMatrixLevelMutation();
    
    
  

    /////////////// Price types data all
    const { data :pricedata,
        error:priceerror, 
        isLoading :priceisloading,
       isError :priceiserror
       } = useGetProductPriceTypesQuery({companyid:companyid,priceid:null});

    
    useEffect(() => {
        if (pricedata) {
            
            transformDataPriceData();
        }
    }, [priceisloading, pricedata]);

    useEffect(() => {
        if (selectPriceType !== '') {
            filterDataByPriceType();
        } else {
            setDataGridStandardPrice([]); // Clear the data grid if no warehouse is selected
        }
    }, [selectPriceType]);



    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStandardPrice([]);
        setDataGridStandardPricecol([]);
        setFilterrow(true);

        if (!standardPricematrixisLoading && standardPricematrixdata && stocklevelcolmatrixdata  && ProductIDSelect.productid) {

            const response = standardPricematrixdata.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardPrice([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardPricematrix();
            }
            
        }

        if (!stocklevelcolmatrixisLoading && standardPricematrixdata && stocklevelcolmatrixdata && ProductIDSelect.productid) {
            
            const response = standardPricematrixdata.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardPricecol([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardPricematrix();
                setFilterrow(true);
            }
            
            
        }
    }, [standardPricematrixisLoading, stocklevelcolmatrixisLoading, standardPricematrixdata, stocklevelcolmatrixdata, ProductIDSelect.productid]);

    const transformDataPriceData = () => {
        if (!pricedata) return [];
        const datagrid = pricedata.e4kTblproductProductPriceTypes.map(category => ({
            priceid: category.priceid,
            companyid: category.companyid.companyid,
            description: category.description,
            priceType: category.priceType
            }));
        const result  = datagrid.filter(category => category.priceType === 2)
        
        setDataGridPriceTypeAll(result);
    };

    
  

    const transformDataStandardPricematrix = () => {
        if (!standardPricematrixdata) return [];
        setDataGridStandardPrice(JSON.parse(standardPricematrixdata.e4kTblproductProductPriceStandardMatrix[0].stdpricematix));
    
        if (!stocklevelcolmatrixdata) return [];
    
        let standPricecolumns = JSON.parse(stocklevelcolmatrixdata.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
    
        
        if (!Array.isArray(standPricecolumns)) {
            standPricecolumns = [];
        }
        
        standPricecolumns = standPricecolumns.filter(column => column.dataField  && !column.dataField.includes('summary'));
        
        const updatedColumns = standPricecolumns.map(column => {
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
                col.allowEdit = true;
            }else{
                col.allowEdit = false;
            }
            return col;

        })
        setDataGridStandardPricecol(updatedColumn); // Check the updated columns
    };
    

    const filterDataByPriceType = () => {
        if (selectPriceType !== '') {

            if (!standardPricematrixdata) return [];

            const response = standardPricematrixdata.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardPrice([]);
            } else if (responseKeys.includes('stdpricematix')) {
                const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType )
                const filteredData = (JSON.parse(standardPricematrixdata.e4kTblproductProductPriceStandardMatrix[0].stdpricematix)).filter(item => item.pricetype === pricetypeid[0].priceid);
                
                setDataGridStandardPrice(filteredData);
            }
            
        }
    };


    const header = {
        visible: true,
        buttons: ['filter', 'sort', 'search']
    };

    const toggleMaximizeStandardPrice = () => {
        setIsMaximizedStandardPrice(!isMaximizedStandardPrice);
    };

    const dataSourceStandardPrice = useMemo(() => dataGridStandardPrice, [dataGridStandardPrice]);

    

    const onColumnRenderStandardPrice = (settings) => {
        if (settings.column.summary) {
            settings.text = settings.column.originalColumn.label.charAt(0).toUpperCase() +
                settings.column.originalColumn.label.slice(1);
        }
    };

    const handleChangePivotModeStandardPrice = (e) => {
        setPivotModePrice(e.detail.value);
        
    };



    //////////// Copy first
    const handleCopyFirstStandardPrice = () => {
       
        const table = document.getElementById('E4kTblProductPropertiesstandardPricematrixTable') 
        const state = table.getState();

        //if (filterButtonClick && state.filtered && state.filtered.rowFilters) {
            if (state.filtered && state.filtered.rowFilters) {
            const filters = state.filtered.rowFilters;
            const filterColumns = [];
            const filterValues = [];
            
        
            filters.forEach(([column, filterInfo]) => {
                filterColumns.push(column);
                filterValues.push(filterInfo.filters.map(f => f.value.toUpperCase()));
            });
        
            const filteredRows = dataGridStandardPrice.filter(row => {
                return filterColumns.every((column, index) => {
                    return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                });
            });
             if (filteredRows.length > 0) {
                    const firstRecord = filteredRows[0];
            
                    const updatedDataGridStandardPrice = dataGridStandardPrice.map(row => {
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

                    const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
                    const finaldata = updatedDataGridStandardPrice.filter(price => price.pricetype === pricetypeid[0].priceid)



                    const updatedDataGridStandardPricematupdate = finaldata.map((row, index) => {

                        tableStandardPriceRef.current.updateRow(index,row);
    
    
                    })

                    //setDataGridStandardPrice(finaldata);
            
                    
                    //setDataGridStandardPrice(updatedDataGridStandardPrice);
                } else {
                    console.log('No rows found matching the filters.');
                }
            //setFilterButtonClick(false);

        }else {
    
        if (filterColumnsPrice.length === 0) {
            if (dataGridStandardPrice.length > 0) {
                const firstRecord = dataGridStandardPrice[0];
    
                const updatedDataGridStandardPrice = dataGridStandardPrice.map(row => {
                    return {
                        ...row,
                        'price': firstRecord['price'],
                        'pricetype': firstRecord['pricetype'],
                    };
                });

                const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
                const finaldata = updatedDataGridStandardPrice.filter(price => price.pricetype === pricetypeid[0].priceid)

               
                const updatedDataGridStandardPricematupdate = finaldata.map((row, index) => {

                    tableStandardPriceRef.current.updateRow(index,row);


                })

                //setDataGridStandardPrice(finaldata);
                
               
    
            } else {
                console.log('No rows found in the data grid.');
            }
            //setFilterButtonClick(false);
         } 
        }
    };

    ///////// dropdown chnage data 
    const handleDropDownonChangeStandardPrice = (event) => {
        const value = event.detail.value;
        setSelectPriceType(value);
    };

    const handleCellEditStandardPrice = (event) => {
        //event.preventDefault();
        const detail = event.detail;
        const id = detail.id;
        const dataField = detail.dataField;
        const row = detail.row;
        const value = detail.value;

        tableStandardPriceRef.current.updateRow(id, row)

        // const newData = [...dataGridStandardPrice];
        // newData[id][dataField] = value;
        // setDataGridStandardPrice(newData);
    };

    const handleProductStandardPricelevelUpdate = async (category) => {
        try {
            const result = await updateProductStandardPriceMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpricestandardmatrixUpdate.success === "Success") {
                    toast.success('Standard Price Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                    setSelectPriceType('')
                } else {
                    toast.error(result.data.E4kTblproductProductpricestandardmatrixUpdate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };



    const handleSaveStandardPrice = () => {
        let update_standard_price_save = [];
    
        if (selectPriceType !== '') {
            if (!standardPricematrixdata) return;
    
            const response = standardPricematrixdata.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
                setDataGridStandardPrice([]);
            } else if (responseKeys.includes('stdpricematix')) {
                const pricetypeid = dataGridPriceTypeAll.find(priceType => priceType.description === selectPriceType).priceid;
                const filteredData = JSON.parse(response.stdpricematix).filter(item => item.pricetype !== pricetypeid);
               
                // Append filtered data to parent list
                update_standard_price_save = filteredData.map(item => JSON.stringify(item));
            }
        }
        
        // Add dataGridStandardPrice to parent list
        dataGridStandardPrice.forEach(row => {
            update_standard_price_save.push(JSON.stringify(row));
        });
        
        let Updatestandard_price_save = {
            companyid: companyid,
            productid: ProductIDSelect.productid,
            stdpricematix: update_standard_price_save,
        };
    
        handleProductStandardPricelevelUpdate(Updatestandard_price_save);
    }
    



    const handleCloseStandardPrice = () => {
        //setDataGridStandardPrice([]);
        //setDataGridStandardPricecol([]);
        setFilterrow(false);
        setPivotModePrice(false)
        setSelectPriceType('');
        setFilterButtonClick(false);
        handleCloseMediumStandardPriceMatrix()
        switchbuttonStandardPriceRef.current.checked = false;

    }


    const modalDialogclassName = isMaximizedStandardPrice ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumStandardPriceMatrix ? 'in' : ''}`} style={{ display: showModalMediumStandardPriceMatrix ? 'block' : 'none' }}>
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
                                                            {ProductIDSelect.productid} - Standard Sales Price
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveStandardPrice()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                            <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span>
                                                            <SwitchButton ref={switchbuttonStandardPriceRef} rightToLeft onChange={handleChangePivotModeStandardPrice}></SwitchButton>
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeStandardPrice}>
                                                                {isMaximizedStandardPrice ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseStandardPrice()}>
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
                                            <div className="customer-newbold">{ProductIDSelect.productid} - Standard Sales Price </div>
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
                                            ref={inputRefProductPriceTypeStandardPrice}
                                            id="TblProductProductPriceTypeDropdownstandardPrice"
                                            //selectedIndexes={[0]}
                                            filterable
                                            placeholder="Select Price Type"
                                            dataSource={dataGridPriceTypeAll.map(cat => cat.description)}
                                            className='px-8'
                                            onChange={(e) => handleDropDownonChangeStandardPrice(e)}
                                            value = {selectPriceType} 
                                        />

                                        {pivotModePrice ?  (
                                                <span>
                                                    <button className="btn alter-button" onClick={() => handleCopyFirstStandardPrice()} >Copy Frist</button>
                                                </span>
                                            ): (null)
                                        }
                                        
                                    </div>
                                </div>
                            </div> 


                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {selectPriceType !=="" ? (standardPricematrixisLoading || stocklevelcolmatrixisLoading ? (
                                                "Loading..."
                                            ) : (!pivotModePrice && dataGridStandardPrice.length > 0 ? (
                                                <PivotTable
                                                    ref={pivotTableStandardPriceRef}
                                                    id="E4kTblProductPropertiespivotstandardPricematrixTable"
                                                    dataSource={dataSourceStandardPrice}
                                                    freezeHeader  
                                                    keyboardNavigation
                                                    onColumnRender={onColumnRenderStandardPrice}
                                                    columns={dataGridstandardPricecol}
                                                />
                                            ) : (
                                                <Table
                                                    ref={tableStandardPriceRef}
                                                    id="E4kTblProductPropertiesstandardPricematrixTable"
                                                    dataSource={dataSourceStandardPrice}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridstandardPricecol}
                                                    editing
                                                    editMode={'row'}
                                                    filtering={true}
                                                    filterRow={showModalMediumStandardPriceMatrix ? true : filterRow}
                                                    //paging={true}
                                                    //pageIndex={0}
                                                    //pageSize={10}
                                                    sortMode='many'
                                                    onCellEndEdit={(e) => handleCellEditStandardPrice(e)}
                                                    //onFilter= {(e) => handleonFileterStandardPrice(e)}
                                                />
                                            ))): null}
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

export default E4kTblProductPropertiesStandardPriceMatrix;