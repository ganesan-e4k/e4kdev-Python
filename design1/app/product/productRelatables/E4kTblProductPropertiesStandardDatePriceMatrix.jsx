

'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import { toast } from 'react-toastify';
import Draggable from 'react-draggable';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import {
    useGetProductStandardPriceDateMatrixLevelQuery,
    useUpdateProductStandardPriceDateMatrixLevelMutation,
    useDeleteProductStandardPriceDateMatrixLevelMutation,

} from '../../store/services/e4kTblProductProductPropertyLevelAPI';



import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

import E4kTblProductStandardDatePriceDropDownComponent from './E4kTblProductStandardDatePriceDropDownComponent';
import E4kTblProductStandardDatePriceColourDropDown from './dropdownComponent/E4kTblProductStandardDatePriceColourDropDown';

// Extend dayjs with the UTC plugin
dayjs.extend(utc);


const E4kTblProductPropertiesStandardDatePriceMatrix = ({ showModalMediumStandardDatePriceMatrix, handleCloseMediumStandardDatePriceMatrix }) => {
    const [dataGridStandardDatePrice, setDataGridStandardDatePrice] = useState([]);
    // const [dataGridstandardPricecol, setDataGridStandardDatePricecol] = useState([]);
    const [dataGridPriceTypeAll, setDataGridPriceTypeAll] = useState([]);
    const [selectPriceType, setSelectPriceType] = useState("");


    const CompanyProductStandardDatePrice = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');

    const inputRefProductPriceTypeStandardDatePrice = useRef();

    const [isMaximizedStandardDatePrice, setIsMaximizedStandardDatePrice] = useState(false);
    const [filterColumnsPrice,setFilterColumnsPrice]  = useState([]);

    const [selectedValues, setSelectedValues] = useState({});
     const [combinationsKeys, setCombinationsKeys] = useState([]);
    const [selectGridColumns, setSelectGridColumns] = useState([]);

    const ProductIDSelect = useSelector((state) => state.selectProduct.selectProduct);

    /// get property select
    const Stdpricedate_PropertySelect = useSelector((state) => state.selectProductAddProperty.selectProductProperty);

    /////// Grid Ref variables
    const gridProductStandardDatePriceMatrix = useRef();


    // ///////////////////////////////////////// date compare states
    // const [uniqueData, setUniqueData] = useState([]);
    // const [overlappingData, setOverlappingData] = useState([]);


    /////////////////// delete row properties
    const [showConfirmStandardDatePrice, setShowConfirmStandardDatePrice] = useState(false);
    const [recordToDeleteStandardDatePrice, setRecordToDeleteStandardDatePrice] = useState(null);

  

    useEffect(() => {
        if (CompanyProductStandardDatePrice) {
            setCompanyid(CompanyProductStandardDatePrice);
        }
        }, [CompanyProductStandardDatePrice]);
    
    const skipQuery = !ProductIDSelect?.productid?.trim();

    // API calls
    const { data: standardDatePricematrixdata, isLoading: standardPricematrixisLoading } = useGetProductStandardPriceDateMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelect.productid 
    },{skip:skipQuery});

    const [updateProductStandardDatePriceMatrixlevel] = useUpdateProductStandardPriceDateMatrixLevelMutation();

    const [deleteProductStandardDatePriceMatrixlevel, { isLoading: isDeletingProductStandardDatePriceMatrixlevel }]  = useDeleteProductStandardPriceDateMatrixLevelMutation();
    
    
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
            setDataGridStandardDatePrice([]); // Clear the data grid if no warehouse is selected
        }
    }, [selectPriceType]);


    useEffect(() => {

        if (Stdpricedate_PropertySelect) {
            const Data = Stdpricedate_PropertySelect.map((prop) => ({
              description: prop.description,
            }));
            
            setCombinationsKeys(Data);
        }
    
    },[standardDatePricematrixdata])

    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStandardDatePrice([]);
        setSelectGridColumns([]);

        if (!standardPricematrixisLoading && standardDatePricematrixdata && ProductIDSelect.productid) {

            const response = standardDatePricematrixdata.e4kTblproductProductPriceStandardDateMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardDatePrice([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardDatePricematrix();
            }
            
        }

    }, [standardPricematrixisLoading, standardDatePricematrixdata, ProductIDSelect.productid]);



    useEffect(() => {
        //if (Object.keys(selectedValues).length > 0 && dataGridStandardDatePrice.length > 0) {
            if (Object.keys(selectedValues).length > 0 ) {
            const keys = Object.keys(selectedValues); 
    

                ///////////// create columns 
                    const columns = keys.map(key => {
                    return {
                        label: key,      
                        dataField: key,  
                        allowEdit: false,
                    };
                });
                

                columns.push(
                    {
                        label: "From Date",
                        dataField: "fromdate",                     
                        editor: {
                            template: 'dateTimePicker',                          
                            formatString: 'd',
                        }
                    },
                    {
                        label: "To Date",
                        dataField: "todate",
                        
                        editor: {
                            template: 'dateTimePicker',
                            formatString: 'd',
                        }
                        
                    },
                    {
                        label: "Price",
                        dataField: "price",
                        
                        editor: 'numberInput',
                        cellsFormat: 'f2' ,
                        
                        
                    }
                );

                
                setSelectGridColumns(columns)


        }


    },[selectedValues,ProductIDSelect,standardDatePricematrixdata])

/////////////////////////////// delete row useEffect
useEffect(() => {
    window.commandColumnProductStandardDatePriceDeleteMatrix = function (row) {
        
     
        const deletedatarow = row.data; // Clone the row data to avoid mutation
       
        const jsonString = JSON.stringify(deletedatarow, (key, value) => {
        if (key === "$") {
                return undefined; // Exclude the "$" key
            }
            return value;
        });
        if (jsonString) {
       
            let deletedata = {
            companyid: companyid,
            productid: ProductIDSelect.productid,
            deletedateprice: jsonString,
            };
            console.log('delete data',deletedata)
            setRecordToDeleteStandardDatePrice(deletedata);
            setShowConfirmStandardDatePrice(true);
      }
    
}
  }, [standardDatePricematrixdata]);




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

    
  

    const transformDataStandardDatePricematrix = () => {
        if (!standardDatePricematrixdata) return [];
        //setDataGridStandardDatePrice(JSON.parse(standardDatePricematrixdata.e4kTblproductProductPriceStandardDateMatrix[0].stdpricematix));
    
        
        const filteredData = (JSON.parse(standardDatePricematrixdata.e4kTblproductProductPriceStandardDateMatrix[0].stdpricematix));
                

        // const filteredData1 = filteredData.map(record => {
        //     const { pricetype, ...rest } = record; // Use destructuring to remove pricetype
        //     return rest; // Return the rest of the object
        // });

        setDataGridStandardDatePrice(filteredData);

    //     if (combinationsKeys.length > 0){
    //     const keys = combinationsKeys.map(item => item.description);
    //     ///////////// create columns 
    //         const columns = keys.map(key => {
    //         return {
    //             label: key,      
    //             dataField: key,  
    //             allowEdit: false,
    //         };
    //     });
        

    //     columns.push(
    //         {
    //             label: "From Date",
    //             dataField: "fromdate",
    //             //cellsFormat:'dd/MM/yyyy, HH:mm:ss tt',
    //             //cellsFormat:'dd/MM/yyyy',
                
    //             //cellsFormat:'d',
    //             editor: {
    //                 template: 'dateTimePicker',
    //                 //template: 'dateInput',
    //                 //formatString: 'dd-MM-yyyy',
    //                 //formatString: 'd',
    //             }
    //         },
    //         {
    //             label: "To Date",
    //             dataField: "todate",
    //             //cellsFormat:'dd/MM/yyyy, HH:mm:ss tt',
    //             //cellsFormat:'dd/MM/yyyy',
    //             //cellsFormat:'d',
    //             editor: {
    //                 template: 'dateTimePicker',
    //                 //template: 'dateInput',
    //             // formatString: 'dd-MM-yyyy',
    //             //formatString: 'd',
    //             }
                
    //         },
    //         {
    //             label: "Price",
    //             dataField: "price",
                
    //             editor: 'numberInput',
    //             cellsFormat: 'f2' ,
    //             // formatSettings:{
    //             //         // prefix: '$',
    //             //         decimalPlaces: 2
    //             // }
                
    //         }
    //     );

        
    //     setSelectGridColumns(columns)
    // };
    };
    

    const filterDataByPriceType = () => {
        // setSelectGridColumns([]);
        setDataGridStandardDatePrice([]);
        setSelectGridColumns([])
        
        if (selectPriceType !== '') {

            if (!standardDatePricematrixdata) return [];

            const response = standardDatePricematrixdata.e4kTblproductProductPriceStandardDateMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardDatePrice([]);
            } else if (responseKeys.includes('stdpricematix')) {
                // setDataGridStandardDatePrice([]);
                const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType )
                const filteredData = (JSON.parse(standardDatePricematrixdata.e4kTblproductProductPriceStandardDateMatrix[0].stdpricematix)).filter(item => item.pricetype === pricetypeid[0].priceid);
               
               
                // const filteredData1 = filteredData.map(record => {
                //     const { pricetype, ...rest } = record; // Use destructuring to remove pricetype
                //     return rest; // Return the rest of the object
                // });


                setDataGridStandardDatePrice(filteredData);
                if (combinationsKeys.length > 0){
                    const keys = combinationsKeys.map(item => item.description);
                    ///////////// create columns 
                        const columns = keys.map(key => {
                        return {
                            label: key,      
                            dataField: key,  
                            allowEdit: false,
                        };
                    });
                    
            
                    columns.push(
                        {
                            label: "From Date",
                            dataField: "fromdate",
                            //cellsFormat:'dd/MM/yyyy, HH:mm:ss tt',
                            //cellsFormat:'dd/MM/yyyy',
                            
                            //cellsFormat:'d',
                            editor: {
                                template: 'dateTimePicker',
                                //template: 'dateInput',
                                //formatString: 'dd-MM-yyyy',
                                formatString: 'd',
                            }
                        },
                        {
                            label: "To Date",
                            dataField: "todate",
                            //cellsFormat:'dd/MM/yyyy, HH:mm:ss tt',
                            //cellsFormat:'dd/MM/yyyy',
                            //cellsFormat:'d',
                            editor: {
                                template: 'dateTimePicker',
                                //template: 'dateInput',
                            // formatString: 'dd-MM-yyyy',
                            formatString: 'd',
                            }
                            
                        },
                        {
                            label: "Price",
                            dataField: "price",
                            
                            editor: 'numberInput',
                            cellsFormat: 'f2' ,
                          
                            
                        },
                        {
                            label: "Price Type",
                            dataField: "pricetype",
                            visible: false,
                            
                            
                        }
                    );
                    
                    setSelectGridColumns(columns)
                };
                
            }
            
        }
    };


    const header = {
        visible: true,
        buttons: ['filter', 'sort', 'search']
    };

    const toggleMaximizeStandardDatePrice = () => {
        setIsMaximizedStandardDatePrice(!isMaximizedStandardDatePrice);
    };
  

    ///////// dropdown chnage data 
    const handleDropDownonChangeStandardDatePrice = (event) => {
        const value = event.detail.value;
        setSelectPriceType(value);
    };

    

    const handleProductStandardDatePricelevelUpdate = async (category) => {
        try {
            const result = await updateProductStandardDatePriceMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpricestandarddatematrixUpdate.success === "Success") {
                    toast.success('Standard Date Price Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                    setSelectPriceType('')
                } else {
                    toast.error(result.data.E4kTblproductProductpricestandarddatematrixUpdate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };



    const handleSaveStandardDatePrice = () => {

        let update_standard_date_price_save = [];
        const seenDicts = {};
        const unique = [];
        const overlaps = [];
        const Updatedatasourcec = []
        gridProductStandardDatePriceMatrix.current.forEachRow((row) => { 
            Updatedatasourcec.push(row.data)
        } );

        const old_datesorce = Updatedatasourcec

        const new_datesorce = old_datesorce.map(row =>{
            return(
                row
            )
        })
        
       // console.log(new_datesorce,'data_source old ')
        const data_update = new_datesorce.map(({ $: _, ...rest }) => rest);

        data_update.forEach((item) => {
            const reducedDict = Object.keys(item).reduce((acc, key) => {
              if (!['fromdate', 'todate', 'price'].includes(key)) {
                acc[key] = item[key];
              }
              return acc;
            }, {});
      
            const reducedKey = JSON.stringify(reducedDict);
      
            if (!seenDicts[reducedKey]) {
              seenDicts[reducedKey] = item;
              unique.push(item);
            } else {
              const existingItem = seenDicts[reducedKey];
             // if (compareItems(item, existingItem) && compareDates(item, existingItem)) {
                if (compareItems(item, existingItem) && compareDates(existingItem,item)) {
                overlaps.push({ new: item, existing: existingItem });
              }
            }
          });
      
         if (overlaps.length > 0 ) {

        //const id_overlaps = findId(new_datesorce, overlaps[0].new);
        const existingIds = findExistingIds(new_datesorce, overlaps);
       
        setDataGridStandardDatePrice(data_update)

        gridProductStandardDatePriceMatrix.current.selectRows(existingIds);
        toast.error('Dates are overlapping Between Selected Rows',{
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
        })

        }else{
            //setCombinations(data_update)
            //setDataGridStandardDatePrice(data_update)
            

            if (selectPriceType !=='') {
                const pricetypeid = dataGridPriceTypeAll.find(priceType => priceType.description === selectPriceType).priceid;
                const updatedData = data_update.map(record => ({
                    ...record,  
                    pricetype: pricetypeid       
                }));
        

            if (selectPriceType !== '') {
                if (!standardDatePricematrixdata) return;
        
                const response = standardDatePricematrixdata.e4kTblproductProductPriceStandardDateMatrix[0];
                const responseKeys = Object.keys(response);
        
                if (responseKeys.includes('message')) {
                    setDataGridStandardDatePrice([]);
                } else if (responseKeys.includes('stdpricematix')) {
                    const pricetypeid = dataGridPriceTypeAll.find(priceType => priceType.description === selectPriceType).priceid;
                    const filteredData = JSON.parse(response.stdpricematix).filter(item => item.pricetype !== pricetypeid);
                   
                    // Append filtered data to parent list
                    update_standard_date_price_save = filteredData.map(item => JSON.stringify(item));
                }
            }
            updatedData.forEach(row => {
                update_standard_date_price_save.push(JSON.stringify(row));
            });
            
            let UpdatestandardDate_price_save = {
                companyid: companyid,
                productid: ProductIDSelect.productid,
                stdpricematix: update_standard_date_price_save,
            };


            handleProductStandardDatePricelevelUpdate(UpdatestandardDate_price_save);
            if(gridProductStandardDatePriceMatrix?.current) {
                gridProductStandardDatePriceMatrix.current.clearRows()
            };
        }
        }
    }
    
/////////////////////////////////////////////// Compare dates 

 const compareDates = (item1, item2) => {
    const start1 = dayjs.utc(item1.fromdate, 'MM/DD/YYYY, HH:mm:ss A').toDate();
    const end1 = dayjs.utc(item1.todate, 'MM/DD/YYYY, HH:mm:ss A').toDate();
    const start2 = dayjs.utc(item2.fromdate, 'MM/DD/YYYY, HH:mm:ss A').toDate();
    const end2 = dayjs.utc(item2.todate, 'MM/DD/YYYY, HH:mm:ss A').toDate();

 
    if (start1.getTime() === end1.getTime()) {
        // Check if start1 (point in time) falls between start2 and end2
        if (start1.getTime() <= end2.getTime() && start2.getTime() >= end1.getTime()){
            return start1.getTime() <= end2.getTime() && start2.getTime() >= end1.getTime()
        }
        return start1.getTime() >= start2.getTime() && start1.getTime() <= end2.getTime();
      }
    
      if (start2.getTime() === end2.getTime()) {
        // Check if start2 (point in time) falls between start1 and end1
        if (start1.getTime() >= end2.getTime() && start2.getTime() <= end1.getTime()){
            return start1.getTime() >= end2.getTime() && start2.getTime() <= end1.getTime()
        }
        return start2.getTime() >= start1.getTime() && start2.getTime() <= end1.getTime();
      }


    //return start1 <= end2 && start2 <= end1;
    return start1.getTime() <= end2.getTime() && start2.getTime() <= end1.getTime() ;
    //return start1 <= end2 && start2 <= end1 && start1 !== end1 && start2 !== end2;
  };

  const compareItems = (item1, item2, excludeKeys = ['fromdate', 'todate', 'price']) => {
    return Object.keys(item1).every(key => {
      if (excludeKeys.includes(key)) return true;
      return item1[key] === item2[key];
    });
  };



// Function to find IDs based on new records
const findExistingIds = (dataSource, newRecords) => {
    return newRecords.map(record => {
        const newValues = Object.values(record.new);
        
        // Find the matching existing item in the dataSource
        const matchingItem = dataSource.find(data => {
            const dataValues = Object.values(data).slice(0, -1); // Exclude the last element (the `$` property)
            return JSON.stringify(dataValues) === JSON.stringify(newValues);
        });

        return matchingItem ? matchingItem.$.id : null; // Return the id if found, otherwise null
    });
};

//////////////////////////////// Generate Combinations -----------------------------------


const generateCombinationsMatrix = (data) => {
    const keys = Object.keys(data); 
    const options = Object.values(data); 
   
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
  
    // Recursive function to create combinations
    const combine = (index, currentCombination) => {
      if (index === keys.length) {
        // Append fromdate, enddate, and price to the final combination
        return [{
          ...currentCombination,
          fromdate: '',   
          todate: '',     
          price: 0.0,
          pricetype: pricetypeid[0].priceid,        
        }];
      }
  
      const result = [];
      const keyOptions = options[index];
  
      for (let option of keyOptions) {
        result.push(...combine(index + 1, {
          ...currentCombination,
          [keys[index]]: option // Add current key-option pair
        }));
      }
      return result;
    };
  
    return combine(0, {}); // Start with an empty combination and first key
  };






  const handleSelect = (name, value) => {
    
    setSelectedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




const handleAddStandardDatePricematGrid = () => {
    if (Object.keys(selectedValues).length > 0 && dataGridPriceTypeAll.length > 0) {
      const generatedCombinationsResult = generateCombinationsMatrix(selectedValues);
      

      setDataGridStandardDatePrice(prevCombinations => {
    
                
        return [
            ...prevCombinations,  
            ...generatedCombinationsResult  
        ];
    });
   

   
    }
  };
  
  
/////////////////////// Grid properties //////////////////////
const behavior = {
    columnResizeMode: 'growAndShrink'
}

const appearance = {
    alternationCount: 2,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true
}

const paging = {
    enabled: true
}

const pager = {
    visible: true
}

const sorting = {
    enabled: true
}

const editing = {
    enabled: true,
    //batch: true,
    //mode: 'row',
    // action: 'click',
    // commandBar: {
    //     visible: true,
    //     position: 'far'
    // },
    commandColumn: {
        visible: true,
        dataSource: {
          commandColumnDelete: { visible: false },
          commandColumnEdit: { visible: false },
          commandColumnCustom: {
            icon: 'fa fa-trash',
            command: 'commandColumnProductStandardDatePriceDeleteMatrix',
            visible: true,
            label: '',
          },
        },
      },
   
}

const filtering = {
    enabled: true,
    filterRow: {
        visible: true
    }
};

const selection = {
    enabled: true,
    allowCellSelection: true,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    mode: 'extended'
}


const dataSourceDatePrice = useMemo(() => new Smart.DataAdapter({
    dataSource: dataGridStandardDatePrice,
   
  }), [dataGridStandardDatePrice]);


////////////////////////// Delete API Call
const handleConfirmSizePropertiesDelete = async () => {
    setShowConfirmStandardDatePrice(false);
    if (recordToDeleteStandardDatePrice) {
      try {
        const result = await deleteProductStandardDatePriceMatrixlevel(recordToDeleteStandardDatePrice);
        if (result.error) {
          console.error('Mutation Error:', result.error);
        } else {
          if (result.data.E4kTblproductProductpricestandardatematrixDelete.success === 'Success') {
            toast.success('Standard Date Deleted Successfully', {
              position: 'top-center',
              autoClose: 500,
              hideProgressBar: true,
            });
            setSelectPriceType('')
            
          } else {
            toast.error(result.data.E4kTblproductProductpricestandardatematrixDelete.success, {
              position: 'top-center',
              autoClose: 3000,
            });
          }
        }
      } catch (error) {
        console.error('Mutation Error:', error);
      }
    }
  };

///////////////////////////////////////////////

const handleCloseStandardDatePrice = () => {
       
    setSelectPriceType('');
    setSelectedValues({})
    setRecordToDeleteStandardDatePrice(null)
    setShowConfirmStandardDatePrice(false)
    // setCombinations([])
    if(gridProductStandardDatePriceMatrix.current) {
        gridProductStandardDatePriceMatrix.current.clearRows()
    };
    handleCloseMediumStandardDatePriceMatrix()


}

const handleCopyFirstStandardDatePrice = () => {
       
    // const table = document.getElementById('E4kTblProductStandardQtyPriceMatrixGridIDProduct') 
    // const state = table.getState();

    if (gridProductStandardDatePriceMatrix.current && gridProductStandardDatePriceMatrix.current.getFilteredColumns().length > 0){

            const filteredData = gridProductStandardDatePriceMatrix.current.getFilteredColumns();
            const filterColumns = [];
            const filterValues = [];

            Object.entries(filteredData).forEach(([column, filterInfo]) => {
            
            filterColumns.push(column);

            
            const values = filterInfo.filters.map(f => f.value.toUpperCase());
            
            
            filterValues.push(values);
            });

           const old_datesorce = gridProductStandardDatePriceMatrix.current.getVisibleRows();

            const new_datesorce = old_datesorce.map(row =>{
                return(
                    row.data
                )
            })
       
            const data_update = new_datesorce.map(({ $: _, ...rest }) => rest);

         if (data_update.length > 0) {
                const firstRecord = data_update[0];
        
                const updatedDataGridStandardQtyPrice = dataGridStandardDatePrice.map(row => {
                    const isMatch = filterColumns.every((column, index) => {
                        return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                    });
        
                    if (isMatch) {
                        return {
                            ...row,
                            fromdate: String(firstRecord.fromdate),
                            todate: String(firstRecord.todate),
                            price: Number(firstRecord.price),
                            pricetype: Number(firstRecord.pricetype),
                           
                        };
                    }
                    return row;
                });
                
                const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
                const finaldata = updatedDataGridStandardQtyPrice.filter(price => price.pricetype === pricetypeid[0].priceid)
                
              

                const updatedDataGridStandardQtyPricematupdate = updatedDataGridStandardQtyPrice.map((row, index) => {

                    gridProductStandardDatePriceMatrix.current.updateRow(index,row);


                })

                
            } else {
                console.log('No rows found matching the filters.');
            }
       

    }else {

    if (filterColumnsPrice.length === 0) {
        if (dataGridStandardDatePrice.length > 0) {
            //const firstRecord = dataGridStandardQtyPrice[0];
            const old_datesorce = gridProductStandardDatePriceMatrix.current.getVisibleRows();

            const new_datesorce = old_datesorce.map(row =>{
                return(
                    row.data
                )
            })
            
       
            const data_update = new_datesorce.map(({ $: _, ...rest }) => rest);
            const firstRecord = data_update[0];
            const updatedDataGridStandardQtyPrice = dataGridStandardDatePrice.map(row => {
                return {
                    ...row,
                    'fromdate': String(firstRecord['fromdate']),
                    'todate': String(firstRecord['todate']),
                    'price': Number(firstRecord['price']),
                    'pricetype': Number(firstRecord['pricetype']),
                };
            });


            const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
            const finaldata = updatedDataGridStandardQtyPrice.filter(price => price.pricetype === pricetypeid[0].priceid)
          
            const updatedDataGridStandardPricematupdate = updatedDataGridStandardQtyPrice.map((row, index) => {

                gridProductStandardDatePriceMatrix.current.updateRow(index,row);


            })

        } else {
            console.log('No rows found in the data grid.');
        }
        //setFilterButtonClick(false);
     } 
    }
};


const parseDate = (dateString) => {
    return new Date(dateString);
  };

/////////////////////////////////////////////////// cell edit place
const handleCellEditStandardDatePrice = (event) => {
    //event.preventDefault();
    const detail = event.detail;
    const id = detail.id;
    const dataField = detail.dataField;
    const row = detail.row;
    const value = detail.value;
    
    const rowdata = detail.data


    const date1 = parseDate(rowdata.fromdate);
    const date2 = parseDate(rowdata.todate);
    
    if (date1 < date2) {
        
        gridProductStandardDatePriceMatrix.current.updateRow(id, row)

    }else{
        gridProductStandardDatePriceMatrix.current.selectRows([id]);
        toast.error('From Date should be earlier than ToDate', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: true,
          });
        
    }
    

};


    const modalDialogclassName = isMaximizedStandardDatePrice ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumStandardDatePriceMatrix ? 'in' : ''}`} style={{ display: showModalMediumStandardDatePriceMatrix ? 'block' : 'none' }}>
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
                                                            {ProductIDSelect.productid} - Discount Sales Price - Date
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveStandardDatePrice()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                           
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeStandardDatePrice}>
                                                                {isMaximizedStandardDatePrice ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseStandardDatePrice()}>
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
                                            <div className="customer-newbold">{ProductIDSelect.productid} - Discount Sales Price - Date </div>
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
                                            ref={inputRefProductPriceTypeStandardDatePrice}
                                            id="TblProductProductPriceTypeDropdownstandardPrice"
                                            //selectedIndexes={[0]}
                                            filterable
                                            placeholder="Select Price Type"
                                            dataSource={dataGridPriceTypeAll.map(cat => cat.description)}
                                            className=''
                                            onChange={(e) => handleDropDownonChangeStandardDatePrice(e)}
                                            value = {selectPriceType} 
                                        />
                                       
                                    </div>
                                </div>
                            </div> 

                            {selectPriceType !=='' ? Stdpricedate_PropertySelect.map((property, index) => (           
                                        <div 
                                            key={"productpropertiesdropdownlistStddatePricemat" +property.description}
                                            id={"productpropertiesdropdownlistStddatePricemat" +property.propertyid}
                                        >
                                            <div className='popupmasterpage-topfield'>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <div className='input-lable'>
                                                        <span>{property.description}</span>
                                                    </div>
                                                </div>    
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <div className='form-group master-option'>   

                                                     {/* {property.isstatic === 1 ?
                                                     
                                                     property.description === 'Colour' ? (
                                                        // Render something for 'Colour'
                                                        <E4kTblProductStandardDatePriceColourDropDown 
                                                        
                                                        propertydatacolour = {property}
                                                        onSelectColour = {handleSelect}
                                                        />
                                                      ) : (null) : 
                                                     
                                                     
                                                        (
                                                     null
                                                        
                                                    )}    */}

                                                    
                                                        <E4kTblProductStandardDatePriceDropDownComponent 
                                                            propertydata = {property}
                                                            onSelect = {handleSelect}
                                                            
                                                        />
                                                    
                                                     </div>   
                                                    </div>
                                                </div>
                                            </div> 


                                          )): (null)}


                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option button-right'>   
                                        {selectPriceType !=='' ? (
                                            <div>
                                                <span>
                                                    <button className="btn alter-button" onClick={() => handleAddStandardDatePricematGrid()} >ADD</button>
                                                </span>

                                                <span>
                                                    <button className="btn alter-button" onClick={() => handleCopyFirstStandardDatePrice()} >Copy Frist</button>
                                                </span>
                                            </div>
                                        ): (null)}                             
                                        
                                    </div>
                                </div>
                            </div> 


                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {selectPriceType !=="" && dataGridStandardDatePrice.length > 0 && selectGridColumns.length > 0 ? (
                                                
                                                <Grid
                                                    id='E4kTblProductStandardDatePriceMatrixGridIDProduct'
                                                    ref={gridProductStandardDatePriceMatrix}
                                                    dataSource={dataSourceDatePrice}
                                                    columns={selectGridColumns}
                                                    appearance={appearance}
                                                    behavior={behavior}
                                                    selection={selection}
                                                    paging={paging}
                                                    pager={pager}
                                                    sorting={sorting}
                                                    editing={editing}
                                                    filtering={filtering}
                                                    //onEndEdit={(e) => handleEndEditStandardPriceGridDate(e)}
                                                    onEndEdit={(e) => handleCellEditStandardDatePrice(e)}
                                                >
                                                </Grid>) : null
                                                
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showConfirmStandardDatePrice && (
                                        <div className="modal fade in" style={{ display: 'block' }}>
                                        <div className="modal-dialog modal-confirm">
                                            <div className="modal-content">
                                            <div className="modal-header justify-content-center modal-header-error">
                                                <div className="icon-box">
                                                <i className="fa fa-exclamation" aria-hidden="true"></i>
                                                </div>
                                                <button type="button" className="close" onClick={() => setShowConfirmStandardDatePrice(false)}>
                                                &times;
                                                </button>
                                            </div>
                                            <div className="modal-body text-center">
                                                <h4>Confirm Delete</h4>
                                                <p>Are you sure you want to delete this record?</p>
                                                <button type="button" className="btn btn-default" onClick={() => setShowConfirmStandardDatePrice(false)}>
                                                Cancel
                                                </button>
                                                <button type="button" className="btn btn-danger" onClick={handleConfirmSizePropertiesDelete}>
                                                Confirm
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    )}



                        </div>
                    </div>
                </div>
            </div>

            


        </Draggable>
        </>
    );
};    

export default E4kTblProductPropertiesStandardDatePriceMatrix;