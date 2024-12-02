

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
   
    useGetProductStandardCostMatrixLevelQuery
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';


import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

const E4kTblProductPropertiesPriceComparisonMatrix = ({ showModalMediumPriceCompareMatrix, handleCloseMediumPriceCompareMatrix }) => {
    const [dataGridStandardPricePriceCompare, setDataGridStandardPricePriceCompare] = useState([]);
    const [dataGridStandardCostPriceCompare, setDataGridStandardCostPriceCompare] = useState([]);
    
    const [dataGridstandardPricecolPriceCompare, setDataGridStandardPricecolPriceCompare] = useState([]);
    const [dataGridPriceTypeAllPriceCompare, setDataGridPriceTypeAllPriceCompare] = useState([]);
    const [pivotModePricePriceCompare, setPivotModePricePriceCompare] = useState(false);


    const CompanyProductPriceCompare = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const tableStandardPricePriceCompareRef = useRef();
    const pivotTableStandardPricePriceCompareRef = useRef();
    const inputRefProductPriceTypeStandardPricePriceCompare = useRef();
    const switchbuttonPriceCompareRef = useRef();
    const [filterRowPriceCompare, setFilterrowPriceCompare] = useState(true);
    const [isMaximizedStandardPricePriceCompare, setIsMaximizedStandardPricePriceCompare] = useState(false);

    const ProductIDSelectPriceCompare = useSelector((state) => state.selectProduct.selectProduct);


    useEffect(() => {
        if (CompanyProductPriceCompare) {
            setCompanyid(CompanyProductPriceCompare);
        }
        }, [CompanyProductPriceCompare]);
    
    const skipQuery = !ProductIDSelectPriceCompare?.productid?.trim();
    
    // API calls
    const { data: standardPricematrixdataPriceCompare, isLoading: standardPricematrixisLoadingPriceCompare } = useGetProductStandardPriceMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelectPriceCompare.productid 
    },{skip:skipQuery});

    const { data: stocklevelcolmatrixdataPriceCompare, isLoading: stocklevelcolmatrixisLoadingPriceCompare } = useGetProductPropertiesLevelColMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelectPriceCompare.productid
    },{skip:skipQuery});



    ///////////// Api call from Propery level api file 
    const { data : standardCostmatrixdataPriceCompare, 
        error :standardCostmatrixerrorPriceCompare, 
        isLoading:standardCostmatrixisLoadingPriceCompare,
        isError : standardCostmatrixisErrorPriceCompare } = useGetProductStandardCostMatrixLevelQuery({
                                                companyid:companyid,
                                                productid:ProductIDSelectPriceCompare.productid},{skip:skipQuery});


   

// // API calls
// const { data: standardPricematrixdataPriceCompare, isLoading: standardPricematrixisLoadingPriceCompare } = useGetProductStandardPriceMatrixLevelQuery({
//     companyid: companyid,
//     productid: ProductIDSelectPriceCompare.productid 
// },{skip:(ProductIDSelectPriceCompare.productid === '') ? true:false});

// const { data: stocklevelcolmatrixdataPriceCompare, isLoading: stocklevelcolmatrixisLoadingPriceCompare } = useGetProductPropertiesLevelColMatrixLevelQuery({
//     companyid: companyid,
//     productid: ProductIDSelectPriceCompare.productid
// },{skip:(ProductIDSelectPriceCompare.productid === '') ? true:false});



// ///////////// Api call from Propery level api file 
// const { data : standardCostmatrixdataPriceCompare, 
//     error :standardCostmatrixerrorPriceCompare, 
//     isLoading:standardCostmatrixisLoadingPriceCompare,
//     isError : standardCostmatrixisErrorPriceCompare } = useGetProductStandardCostMatrixLevelQuery({
//                                             companyid:companyid,
//                                             productid:ProductIDSelectPriceCompare.productid},{skip:(ProductIDSelectPriceCompare.productid === '') ? true:false});






    /////////////// Price types data all
    const { data :pricedataPriceCompare,
        error:priceerrorPriceCompare, 
        isLoading :priceisloadingPriceCompare,
       isError :priceiserrorPriceCompare
       } = useGetProductPriceTypesQuery({companyid:companyid,priceid:null});

    
    useEffect(() => {
        if (pricedataPriceCompare) {
            
            transformDataPriceDataPriceCompare();
        }
    }, [priceisloadingPriceCompare, pricedataPriceCompare]);



    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStandardPricePriceCompare([]);
        setDataGridStandardPricecolPriceCompare([]);
        setFilterrowPriceCompare(true);

        if (!standardPricematrixisLoadingPriceCompare && standardPricematrixdataPriceCompare && stocklevelcolmatrixdataPriceCompare  && ProductIDSelectPriceCompare.productid) {

            const response = standardPricematrixdataPriceCompare.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardPricePriceCompare([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardPricematrixPriceCompare();
            }
            
        }


        if (!standardCostmatrixisLoadingPriceCompare && standardCostmatrixdataPriceCompare && stocklevelcolmatrixdataPriceCompare && ProductIDSelectPriceCompare.productid) {
            const response = standardCostmatrixdataPriceCompare.e4kTblproductProductCostStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardCostPriceCompare([]);
            } else if (responseKeys.includes('stdcostmatix')) {
                transformDataStandardPricematrixPriceCompare();
            }
        }



        if (!stocklevelcolmatrixisLoadingPriceCompare && standardPricematrixdataPriceCompare && stocklevelcolmatrixdataPriceCompare && ProductIDSelectPriceCompare.productid) {
            
            const response = standardPricematrixdataPriceCompare.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardPricecolPriceCompare([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardPricematrixPriceCompare();
                setFilterrowPriceCompare(true);
            }
            
            
        }
    }, [standardPricematrixisLoadingPriceCompare,standardCostmatrixisLoadingPriceCompare,standardCostmatrixdataPriceCompare, stocklevelcolmatrixisLoadingPriceCompare, standardPricematrixdataPriceCompare, stocklevelcolmatrixdataPriceCompare, ProductIDSelectPriceCompare.productid]);





    const transformDataPriceDataPriceCompare = () => {
        if (!pricedataPriceCompare) return [];
        const datagrid = pricedataPriceCompare.e4kTblproductProductPriceTypes.map(category => ({
            priceid: category.priceid,
            companyid: category.companyid.companyid,
            description: category.description,
            priceType: category.priceType
            }));
        const result  = datagrid.filter(category => category.priceType === 2)
        
        setDataGridPriceTypeAllPriceCompare(result);
    };

    const transformDataStandardPricematrixPriceCompare = () => {
        if (!standardPricematrixdataPriceCompare || !standardCostmatrixdataPriceCompare || !dataGridPriceTypeAllPriceCompare) return [];
    
        // Parse the data
        const StandarPricedata = JSON.parse(standardPricematrixdataPriceCompare.e4kTblproductProductPriceStandardMatrix[0].stdpricematix);
        const CostStandardPricedata = JSON.parse(standardCostmatrixdataPriceCompare.e4kTblproductProductCostStandardMatrix[0].stdcostmatix);
        if (StandarPricedata[0]){
            // Extract price types and their descriptions
            const priceTypes = dataGridPriceTypeAllPriceCompare.map(item => ({
                id: item.priceid,
                description: item.description.replace(/\s+/g, '').toLowerCase() // e.g., 'Price 1' -> 'price1'
            }));
        
            
            // Extract all keys from the first entry of StandarPricedata except 'price' and 'pricetype'
            const allKeys = Object.keys(StandarPricedata[0]).filter(key => key !== 'price' && key !== 'pricetype');
        
            // Create a map to hold the merged data by a combination of relevant attributes
            const mergedDataMap = {};
        
            // Initialize the map with the unique combinations of relevant attributes from the StandardPriceData
            StandarPricedata.forEach(price => {
                const key = allKeys.map(k => price[k]).join('-'); // Create a unique key based on dynamic attributes
                if (!mergedDataMap[key]) {
                    mergedDataMap[key] = {
                        ...price,
                        cost: 0,
                    };
                    // Initialize all price types to 0
                    priceTypes.forEach(({ description }) => {
                        mergedDataMap[key][description] = 0;
                    });
                }
            });
        
            // Add prices for each price type to the map
            priceTypes.forEach(({ id, description }) => {
                StandarPricedata.forEach(price => {
                    const key = allKeys.map(k => price[k]).join('-');
                    if (price.pricetype === id) {
                        mergedDataMap[key][description] = price.price;
                    }
                });
            });
        
            // Add cost data to the map
            CostStandardPricedata.forEach(cost => {
                const key = allKeys.map(k => cost[k]).join('-');
                if (mergedDataMap[key]) {
                    mergedDataMap[key].cost = cost.price;
                }
            });
        
            // Convert the merged data map to an array
            const mergedData = Object.values(mergedDataMap);
        
            // Prepare the data for the grid
            const columns1data = mergedData.map(column => {
                const { price, pricetype, ...rest } = column;
                return rest;
            });
        
            setDataGridStandardPricePriceCompare(columns1data);
            
            if (!stocklevelcolmatrixdataPriceCompare) return [];
        
            // Prepare columns
            let standPricecolumns = JSON.parse(stocklevelcolmatrixdataPriceCompare.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
            if (!Array.isArray(standPricecolumns)) {
                standPricecolumns = [];
            }
        
            standPricecolumns = standPricecolumns.filter(column => column.dataField && !column.dataField.includes('summary'));
        
            // Add cost column
            const colCost = {
                "label": "Cost", 
                "summary": "sum", 
                "dataType": "number", 
                "dataField": "cost",
                summarySettings: {
                    decimalPlaces: 2
                }
            };
        
            standPricecolumns.push(colCost);
        
            // Dynamically add columns for each price type
            priceTypes.forEach(({ description }) => {
                const colPrice = {
                    "label": description.charAt(0).toUpperCase() + description.slice(1), // Capitalize first letter
                    "summary": "sum",
                    "dataType": "number",
                    "dataField": description,
                    summarySettings: {
                        decimalPlaces: 2
                    }
                };
                standPricecolumns.push(colPrice);
            });
        
            const columns = standPricecolumns.filter(column => column.dataField !== 'pricetype' && column.dataField !== 'price');
        
            setDataGridStandardPricecolPriceCompare(columns);

        }
        
    };
    
    
    
    

    
  

    // const transformDataStandardPricematrixPriceCompare = () => {
    //     if (!standardPricematrixdataPriceCompare || !standardCostmatrixdataPriceCompare) return [];
    
    //     // Parse the data
    //     const StandarPricedata = JSON.parse(standardPricematrixdataPriceCompare.e4kTblproductProductPriceStandardMatrix[0].stdpricematix);
    //     const CostStandardPricedata = JSON.parse(standardCostmatrixdataPriceCompare.e4kTblproductProductCostStandardMatrix[0].stdcostmatix);
    


    //     console.log('##################################### ',dataGridPriceTypeAllPriceCompare)

    //     const priceTypes = dataGridPriceTypeAllPriceCompare.map(item => ({
    //         id: item.priceid,
    //         description: item.description.replace(/\s+/g, '').toLowerCase() // e.g., 'Price 1' -> 'price1'
    //     }));
    
    //     // Create a map to hold the merged data by key
    //     const mergedDataMap = {};

    //     const dataprice1 = StandarPricedata.filter(d => d.pricetype === 2)
    //     const dataprice2 = StandarPricedata.filter(d => d.pricetype === 3)
    //     const datarrp = StandarPricedata.filter(d => d.pricetype === 4)
    //     const dataprice4 = StandarPricedata.filter(d => d.pricetype === 5)

    //     const price1map = dataprice1.reduce((accc,price1) =>{  
    //         accc[price1.key] = price1.price
    //         return accc
    
    //     },{})


    //     const price2map = dataprice2.reduce((accc,price2) =>{
         
    //         accc[price2.key] = price2.price
    //         return accc
        
    //     },{})

    //     const RRPmap = datarrp.reduce((accc,rrp) =>{
           
    //         accc[rrp.key] = rrp.price
    //         return accc
        
    //     },{})

    //     const price4map = dataprice4.reduce((accc,price4) =>{
           
    //         accc[price4.key] = price4.price
    //         return accc
        
    //     },{})


    //     const costMap = CostStandardPricedata.reduce((acc, cost) => {
    //         acc[cost.key] = cost.price; // Assuming 'key' is the unique identifier
    //         return acc;
    //     }, {});
    
    //     // Merge cost data into price data
    //     const mergedData = dataprice1.map(price => ({
    //         ...price,
    //         cost: costMap[price.key] || 0 ,
    //         price1: price1map[price.key] || 0 ,
    //         price2: price2map[price.key] || 0 ,
    //         rrp: RRPmap[price.key] || 0 ,
    //         price4: price4map[price.key] || 0 ,
    //     }));

    //     const columns1data = mergedData.map(column => {
    //         const { price, pricetype, ...rest } = column;
    //         return rest;
    //     });
     
    
    //     setDataGridStandardPricePriceCompare(columns1data);
    //     console.log(mergedData, 'Merged data with cost');
    
    //     if (!stocklevelcolmatrixdataPriceCompare) return [];
    
    //     // Prepare columns
    //     let standPricecolumns = JSON.parse(stocklevelcolmatrixdataPriceCompare.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
    //     if (!Array.isArray(standPricecolumns)) {
    //         standPricecolumns = [];
    //     }
    
    //     standPricecolumns = standPricecolumns.filter(column => column.dataField && !column.dataField.includes('summary'));
    
    
    //     const colCost = {
    //         "label": "Cost", 
    //         "summary": "sum", 
    //         "dataType": "number", 
    //         "dataField": "cost",
    //         summarySettings: {
    //             decimalPlaces: 2
    //         }
    //     };

    //     const colprice1 = {
    //         "label": "Price1", 
    //         "summary": "sum", 
    //         "dataType": "number", 
    //         "dataField": "price1",
    //         summarySettings: {
    //             decimalPlaces: 2
    //         }
    //     };

    //     const colprice2 = {
    //         "label": "Price2", 
    //         "summary": "sum", 
    //         "dataType": "number", 
    //         "dataField": "price2",
    //         summarySettings: {
    //             decimalPlaces: 2
    //         }
    //     };
    //     const colrrp = {
    //         "label": "RRP", 
    //         "summary": "sum", 
    //         "dataType": "number", 
    //         "dataField": "rrp",
    //         summarySettings: {
    //             decimalPlaces: 2
    //         }
    //     };

    //     const colprice4 = {
    //         "label": "Price4", 
    //         "summary": "sum", 
    //         "dataType": "number", 
    //         "dataField": "price4",
    //         summarySettings: {
    //             decimalPlaces: 2
    //         }
    //     };
    
    //     standPricecolumns.push(colCost);
    //     standPricecolumns.push(colprice1);
    //     standPricecolumns.push(colprice2);
    //     standPricecolumns.push(colrrp);
    //     standPricecolumns.push(colprice4);
    
    
    //     const columns = standPricecolumns.filter(column => column.dataField !== 'pricetype' && column.dataField !== 'price');
    
    //     setDataGridStandardPricecolPriceCompare(columns);
    // };
    


    const dataSourceStandardPrice = useMemo(() => dataGridStandardPricePriceCompare, [dataGridStandardPricePriceCompare]);

    
    const toggleMaximizeStandardPricePriceCompare = () => {
        setIsMaximizedStandardPricePriceCompare(!isMaximizedStandardPricePriceCompare);
    };

    const onColumnRenderStandardPricePriceCompare = (settings) => {
        if (settings.column.summary) {
            settings.text = settings.column.originalColumn.label.charAt(0).toUpperCase() +
                settings.column.originalColumn.label.slice(1);
        }
    };

    const handleChangePivotModeStandardPricePriceCompare = (e) => {
        setPivotModePricePriceCompare(e.detail.value);
        
    };


    const handleCloseStandardPricePriceCompare = () => {
        setFilterrowPriceCompare(false);
        setPivotModePricePriceCompare(false)
        switchbuttonPriceCompareRef.current.checked = false;
        handleCloseMediumPriceCompareMatrix()
        
    }


    const modalDialogclassName = isMaximizedStandardPricePriceCompare ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumPriceCompareMatrix ? 'in' : ''}`} style={{ display: showModalMediumPriceCompareMatrix ? 'block' : 'none' }}>
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
                                                            {ProductIDSelectPriceCompare.productid} - Standard Price Comparison
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        {/* <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveStandardPricePriceCompare()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            </div>
                                                        </div> */}
                                                    
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                            <span className="innerpopup-top-rightdiv">Switch To Table:</span>
                                                            <SwitchButton ref={switchbuttonPriceCompareRef} rightToLeft onChange={handleChangePivotModeStandardPricePriceCompare}></SwitchButton>
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeStandardPricePriceCompare}>
                                                                {isMaximizedStandardPricePriceCompare ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseStandardPricePriceCompare()}>
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
                                            <div className="customer-newbold">{ProductIDSelectPriceCompare.productid} - Standard Price Comparison </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        <div className='height-alignment'>                                      
                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {standardPricematrixisLoadingPriceCompare || stocklevelcolmatrixisLoadingPriceCompare ? (
                                                "Loading..."
                                            ) : (!pivotModePricePriceCompare && dataGridStandardPricePriceCompare.length > 0 ? (
                                                <PivotTable
                                                    ref={pivotTableStandardPricePriceCompareRef}
                                                    id="E4kTblProductPropertiespivotstandardPricematrixTablePriceCompare"
                                                    dataSource={dataSourceStandardPrice}
                                                    freezeHeader  
                                                    keyboardNavigation
                                                    onColumnRender={onColumnRenderStandardPricePriceCompare}
                                                    columns={dataGridstandardPricecolPriceCompare}
                                                />
                                            ) : (
                                                <Table
                                                    ref={tableStandardPricePriceCompareRef}
                                                    id="E4kTblProductPropertiesstandardPricematrixTable"
                                                    dataSource={dataSourceStandardPrice}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridstandardPricecolPriceCompare}
                                                    filtering={true}
                                                    filterRow={showModalMediumPriceCompareMatrix ? true : filterRowPriceCompare}
                                                    paging={true}
                                                    pageIndex={0}
                                                    pageSize={10}
                                                    sortMode='many'
                                                
                                                   
                                                />
                                            ))}
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

export default E4kTblProductPropertiesPriceComparisonMatrix;