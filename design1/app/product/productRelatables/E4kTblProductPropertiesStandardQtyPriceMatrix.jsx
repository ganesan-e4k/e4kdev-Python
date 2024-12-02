

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
    useGetProductStandardPriceQtyMatrixLevelQuery,
    useUpdateProductStandardPriceQtyMatrixLevelMutation,
    useDeleteProductStandardPriceQtyMatrixLevelMutation,
    
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';



import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

import E4kTblProductStandardDatePriceDropDownComponent from './E4kTblProductStandardDatePriceDropDownComponent';


// Extend dayjs with the UTC plugin
dayjs.extend(utc);


const E4kTblProductPropertiesStandardQtyPriceMatrix = ({ showModalMediumStandardQtyPriceMatrix, handleCloseMediumStandardQtyPriceMatrix }) => {
    const [dataGridStandardQtyPrice, setdataGridStandardQtyPrice] = useState([]);
    // const [dataGridstandardPricecol, setdataGridStandardQtyPricecol] = useState([]);
    const [dataGridPriceTypeAll, setDataGridPriceTypeAll] = useState([]);
    const [selectPriceType, setSelectPriceType] = useState("");


    const CompanyProductStandardQtyPrice = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');

    const inputRefProductPriceTypeStandardQtyPrice = useRef();

    const [isMaximizedStandardQtyPrice, setisMaximizedStandardQtyPrice] = useState(false);


    const [selectedValues, setSelectedValues] = useState({});
     const [combinationsKeys, setCombinationsKeys] = useState([]);
    const [selectGridColumns, setSelectGridColumns] = useState([]);
    const [filterColumnsPrice,setFilterColumnsPrice]  = useState([]);

    const ProductIDSelect = useSelector((state) => state.selectProduct.selectProduct);

    /// get property select
    const Stdpriceqty_PropertySelect = useSelector((state) => state.selectProductAddProperty.selectProductProperty);

    /////// Grid Ref variables
    const gridProductStandardQtyPriceMatrix = useRef();

    /////////////////// delete row properties
    const [showConfirmStandardQtyPrice, setshowConfirmStandardQtyPrice] = useState(false);
    const [recordToDeleteStandardQtyPrice, setrecordToDeleteStandardQtyPrice] = useState(null);

  

    useEffect(() => {
        if (CompanyProductStandardQtyPrice) {
            setCompanyid(CompanyProductStandardQtyPrice);
        }
        }, [CompanyProductStandardQtyPrice]);
    
    const skipQuery = !ProductIDSelect?.productid?.trim();

    // API calls
    const { data: standardQtyPricematrixdata, isLoading: standardPriceqtymatrixisLoading } = useGetProductStandardPriceQtyMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelect.productid 
    },{skip:skipQuery});

 
    const [updateProductStandardQtyPriceMatrixlevel] = useUpdateProductStandardPriceQtyMatrixLevelMutation();

    const [deleteProductStandardQtyPriceMatrixlevel, { isLoading: isDeletingProductStandardDatePriceMatrixlevel }]  = useDeleteProductStandardPriceQtyMatrixLevelMutation();
    
    
  

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
            setdataGridStandardQtyPrice([]); // Clear the data grid if no warehouse is selected
        }
    }, [selectPriceType]);


    useEffect(() => {

        if (Stdpriceqty_PropertySelect) {
            const Data = Stdpriceqty_PropertySelect.map((prop) => ({
              description: prop.description,
            }));
            
            setCombinationsKeys(Data);
        }
    
    },[standardQtyPricematrixdata])

    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setdataGridStandardQtyPrice([]);
        setSelectGridColumns([]);

        if (!standardPriceqtymatrixisLoading && standardQtyPricematrixdata && ProductIDSelect.productid) {

            const response = standardQtyPricematrixdata.e4kTblproductProductPriceStandardQtyMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setdataGridStandardQtyPrice([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardQtyPricematrix();
            }
            
        }

    }, [standardPriceqtymatrixisLoading, standardQtyPricematrixdata, ProductIDSelect.productid]);



/////////////////////////////// delete row useEffect
useEffect(() => {
    window.commandColumnProductStandardQtyPriceDeleteMatrix = function (row) {
        
    
        const deletedatarow = row.data; 
        
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
            deleteqtyprice: jsonString,
            };
            
            setrecordToDeleteStandardQtyPrice(deletedata);
            setshowConfirmStandardQtyPrice(true);
      }
    
}
  }, [standardQtyPricematrixdata]);


  

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
                        label: "From Quantity",
                        dataField: "fromqty",
                        cellsFormat: 'f2' ,
                        editor: 'numberInput',
                    },
                    {
                        label: "To Quantity",
                        dataField: "toqty",
                        cellsFormat: 'f2' ,
                        editor: 'numberInput',
                       
                        
                        
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


        }


    },[selectedValues,ProductIDSelect,standardQtyPricematrixdata])




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

    
  

    const transformDataStandardQtyPricematrix = () => {
        if (!standardQtyPricematrixdata) return [];
       
        const filteredData = (JSON.parse(standardQtyPricematrixdata.e4kTblproductProductPriceStandardQtyMatrix[0].stdpricematix));
  
        setdataGridStandardQtyPrice(filteredData);
    };
    

    const filterDataByPriceType = () => {
       
        setdataGridStandardQtyPrice([]);
        setSelectGridColumns([])
        
        if (selectPriceType !== '') {

            if (!standardQtyPricematrixdata) return [];

            const response = standardQtyPricematrixdata.e4kTblproductProductPriceStandardQtyMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setdataGridStandardQtyPrice([]);
            } else if (responseKeys.includes('stdpricematix')) {
                // setdataGridStandardQtyPrice([]);
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
                            label: "From Quantity",
                            dataField: "fromqty",
                            cellsFormat: 'f2' ,
                            editor: 'numberInput',
                        },
                        {
                            label: "To Quantity",
                            dataField: "toqty",
                            cellsFormat: 'f2' ,
                            editor: 'numberInput',
                           
                            
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
                const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType )
                const filteredData = (JSON.parse(standardQtyPricematrixdata.e4kTblproductProductPriceStandardQtyMatrix[0].stdpricematix)).filter(item => item.pricetype === pricetypeid[0].priceid);
                
               
                setdataGridStandardQtyPrice(filteredData);
                
                };
                
            }
            
        }
    };


    const header = {
        visible: true,
        buttons: ['filter', 'sort', 'search']
    };

    const toggleMaximizeStandardQtyPrice = () => {
        setisMaximizedStandardQtyPrice(!isMaximizedStandardQtyPrice);
    };
  

    ///////// dropdown chnage data 
    const handleDropDownonChangeStandardQtyPrice = (event) => {
        const value = event.detail.value;
        setSelectPriceType(value);
    };

    

    const handleProductStandardDatePricelevelUpdate = async (category) => {
        try {
            const result = await updateProductStandardQtyPriceMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpricestandardqtymatrixUpdate.success === "Success") {
                    toast.success('Standard Quantity Price Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                    setSelectPriceType('')
                } else {
                    toast.error(result.data.E4kTblproductProductpricestandardqtymatrixUpdate.success, { position: "top-center" });
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
        gridProductStandardQtyPriceMatrix.current.forEachRow((row) => { 
            Updatedatasourcec.push(row.data)
        } );

        const old_datesorce = Updatedatasourcec//gridProductStandardQtyPriceMatrix.current.props.dataSource._dataSource

        const new_datesorce = old_datesorce.map(row =>{
            return(
                row
            )
        })
        
        const data_update = new_datesorce.map(({ $: _, ...rest }) => rest);

        data_update.forEach((item) => {
            const reducedDict = Object.keys(item).reduce((acc, key) => {
              if (!['fromqty', 'toqty', 'price'].includes(key)) {
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
                if (compareItems(item, existingItem) && compareQuantity(existingItem,item)) {
                overlaps.push({ new: item, existing: existingItem });
              }
            }
          });
      
        if (overlaps.length > 0 ) {

        const existingIds = findExistingIds(new_datesorce, overlaps);
        setdataGridStandardQtyPrice(data_update)

        gridProductStandardQtyPriceMatrix.current.selectRows(existingIds);
        toast.error('Quantity are overlapping Between Selected Rows',{
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
        })

        }else{
            if (selectPriceType !=='') {
                const pricetypeid = dataGridPriceTypeAll.find(priceType => priceType.description === selectPriceType).priceid;
                const updatedData = data_update.map(record => ({
                    ...record,  
                    pricetype: pricetypeid       
                }));
        

            if (selectPriceType !== '') {
                if (!standardQtyPricematrixdata) return;
        
                const response = standardQtyPricematrixdata.e4kTblproductProductPriceStandardQtyMatrix[0];
                const responseKeys = Object.keys(response);
        
                if (responseKeys.includes('message')) {
                    setdataGridStandardQtyPrice([]);
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
            if(gridProductStandardQtyPriceMatrix?.current) {
                gridProductStandardQtyPriceMatrix.current.clearRows()
            };
        }
        }
    }
    
/////////////////////////////////////////////// Compare dates 

 const compareQuantity = (item1, item2) => {
    const start1 = Number(item1.fromqty)
    const end1 = Number(item1.toqty)

    const start2 = Number(item2.fromqty)
    const end2 = Number(item2.toqty)
 
    if (start1 === end1) {
        // Check if start1 (point in time) falls between start2 and end2
        if (start1 <= end2 && start2 >= end1){
            return start1 <= end2 && start2 >= end1
        }
        return start1 >= start2 && start1 <= end2;
      }
    
      if (start2 === end2) {
        // Check if start2 (point in time) falls between start1 and end1
        if (start1 >= end2 && start2 <= end1){
            return start1 >= end2 && start2 <= end1
        }
        return start2 >= start1 && start2 <= end1;
      }


    
    return start1 <= end2 && start2 <= end1 ;
   
  };

  const compareItems = (item1, item2, excludeKeys = ['fromqty', 'toqty', 'price']) => {
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
       
    const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
    // Recursive function to create combinations
    const combine = (index, currentCombination) => {
      if (index === keys.length) {
        // Append fromdate, enddate, and price to the final combination
        return [{
          ...currentCombination,
          fromqty: 0.0,   
          toqty: 0.0,     
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




const handleAddStandardQtyPricematGrid = () => {
    if (Object.keys(selectedValues).length > 0 && dataGridPriceTypeAll.length > 0) {
      const generatedCombinationsResult = generateCombinationsMatrix(selectedValues);
      
      

      setdataGridStandardQtyPrice(prevCombinations => {
    
                
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
    // batch: true,
     mode: 'row',
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
            command: 'commandColumnProductStandardQtyPriceDeleteMatrix',
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


const dataSourceQuantityPrice = useMemo(() => new Smart.DataAdapter({
    dataSource: dataGridStandardQtyPrice,
   
  }), [dataGridStandardQtyPrice]);


////////////////////////// Delete API Call
const handleConfirmQuantityPriceDelete = async () => {
    setshowConfirmStandardQtyPrice(false);
    if (recordToDeleteStandardQtyPrice) {
      try {
        const result = await deleteProductStandardQtyPriceMatrixlevel(recordToDeleteStandardQtyPrice);
        if (result.error) {
          console.error('Mutation Error:', result.error);
        } else {
          if (result.data.E4kTblproductProductpricestandarqtymatrixDelete.success === 'Success') {
            toast.success('Standard Quantity Price Deleted Successfully', {
              position: 'top-center',
              autoClose: 500,
              hideProgressBar: true,
            });
            setSelectPriceType('')
            
          } else {
            toast.error(result.data.E4kTblproductProductpricestandarqtymatrixDelete.success, {
                position: 'top-center',
                autoClose: 500,
                hideProgressBar: true,
              });
          }
        }
      } catch (error) {
        console.error('Mutation Error:', error);
      }
    }
  };



 //////////// Copy first
 const handleCopyFirstStandardQuantityPrice = () => {
       
    // const table = document.getElementById('E4kTblProductStandardQtyPriceMatrixGridIDProduct') 
    // const state = table.getState();

    if (gridProductStandardQtyPriceMatrix.current && gridProductStandardQtyPriceMatrix.current.getFilteredColumns().length > 0){

            const filteredData = gridProductStandardQtyPriceMatrix.current.getFilteredColumns();
            const filterColumns = [];
            const filterValues = [];

            Object.entries(filteredData).forEach(([column, filterInfo]) => {
            
            filterColumns.push(column);

            
            const values = filterInfo.filters.map(f => f.value.toUpperCase());
            
            
            filterValues.push(values);
            });

           const old_datesorce = gridProductStandardQtyPriceMatrix.current.getVisibleRows();

            const new_datesorce = old_datesorce.map(row =>{
                return(
                    row.data
                )
            })
       
            const data_update = new_datesorce.map(({ $: _, ...rest }) => rest);

         if (data_update.length > 0) {
                const firstRecord = data_update[0];
        
                const updatedDataGridStandardQtyPrice = dataGridStandardQtyPrice.map(row => {
                    const isMatch = filterColumns.every((column, index) => {
                        return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                    });
        
                    if (isMatch) {
                        return {
                            ...row,
                            fromqty: Number(firstRecord.fromqty),
                            toqty: Number(firstRecord.toqty),
                            price: Number(firstRecord.price),
                            pricetype: Number(firstRecord.pricetype),
                           
                        };
                    }
                    return row;
                });
                
                const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
                const finaldata = updatedDataGridStandardQtyPrice.filter(price => price.pricetype === pricetypeid[0].priceid)
                
              

                const updatedDataGridStandardQtyPricematupdate = updatedDataGridStandardQtyPrice.map((row, index) => {

                    gridProductStandardQtyPriceMatrix.current.updateRow(index,row);


                })

                
            } else {
                console.log('No rows found matching the filters.');
            }
       

    }else {

    if (filterColumnsPrice.length === 0) {
        if (dataGridStandardQtyPrice.length > 0) {
            //const firstRecord = dataGridStandardQtyPrice[0];
            const old_datesorce = gridProductStandardQtyPriceMatrix.current.getVisibleRows();

            const new_datesorce = old_datesorce.map(row =>{
                return(
                    row.data
                )
            })
            
       
            const data_update = new_datesorce.map(({ $: _, ...rest }) => rest);
            const firstRecord = data_update[0];
            const updatedDataGridStandardQtyPrice = dataGridStandardQtyPrice.map(row => {
                return {
                    ...row,
                    'fromqty': Number(firstRecord['fromqty']),
                    'toqty': Number(firstRecord['toqty']),
                    'price': Number(firstRecord['price']),
                    'pricetype': Number(firstRecord['pricetype']),
                };
            });


            const pricetypeid = dataGridPriceTypeAll.filter(priceType => priceType.description === selectPriceType ) 
            const finaldata = updatedDataGridStandardQtyPrice.filter(price => price.pricetype === pricetypeid[0].priceid)
          
            const updatedDataGridStandardPricematupdate = updatedDataGridStandardQtyPrice.map((row, index) => {

                gridProductStandardQtyPriceMatrix.current.updateRow(index,row);


            })

            //setdataGridStandardQtyPrice(finaldata);
            
           

        } else {
            console.log('No rows found in the data grid.');
        }
        //setFilterButtonClick(false);
     } 
    }
};

/////////////////////////////////////////////////// cell edit place
const handleCellEditStandardQtyPrice = (event) => {
    //event.preventDefault();
    const detail = event.detail;
    const id = detail.id;
    const dataField = detail.dataField;
    const row = detail.row;
    const value = detail.value;
    
    const rowdata = detail.data

    if (Number(rowdata.fromqty) < Number(rowdata.toqty)) {
        
        gridProductStandardQtyPriceMatrix.current.updateRow(id, row)

    }else{
        gridProductStandardQtyPriceMatrix.current.selectRows([id]);
        toast.error('From Quantity should be less than To Quantity', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: true,
          });
        
    }
    

};

///////////////////////////////////////////////

const handleCloseStandardQtyPrice = () => {
       
    setSelectPriceType('');
    setSelectedValues({})
    setrecordToDeleteStandardQtyPrice(null)
    setshowConfirmStandardQtyPrice(false)
    
    if(gridProductStandardQtyPriceMatrix.current) {
        gridProductStandardQtyPriceMatrix.current.clearRows()
    };
    handleCloseMediumStandardQtyPriceMatrix()


}




    const modalDialogclassName = isMaximizedStandardQtyPrice ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumStandardQtyPriceMatrix ? 'in' : ''}`} style={{ display: showModalMediumStandardQtyPriceMatrix ? 'block' : 'none' }}>
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
                                                            {ProductIDSelect.productid} - Discount Sales Price - Quantity
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
                                                           
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeStandardQtyPrice}>
                                                                {isMaximizedStandardQtyPrice ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseStandardQtyPrice()}>
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
                                            <div className="customer-newbold">{ProductIDSelect.productid} - Discount Sales Price - Quantity </div>
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
                                            ref={inputRefProductPriceTypeStandardQtyPrice}
                                            id="TblProductProductPriceTypeDropdownstandardPrice"
                                            //selectedIndexes={[0]}
                                            filterable
                                            placeholder="Select Price Type"
                                            dataSource={dataGridPriceTypeAll.map(cat => cat.description)}
                                            className=''
                                            onChange={(e) => handleDropDownonChangeStandardQtyPrice(e)}
                                            value = {selectPriceType} 
                                        />
                                       
                                    </div>
                                </div>
                            </div> 

                            {selectPriceType !=='' ? Stdpriceqty_PropertySelect.map((property, index) => (           
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
                                                    <button className="btn alter-button" onClick={() => handleAddStandardQtyPricematGrid()} >ADD</button>
                                                </span>

                                                <span>
                                                    <button className="btn alter-button" onClick={() => handleCopyFirstStandardQuantityPrice()} >Copy Frist</button>
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
                                            {selectPriceType !=="" && dataGridStandardQtyPrice.length > 0 && selectGridColumns.length > 0 ? (
                                                
                                                <Grid
                                                    id='E4kTblProductStandardQtyPriceMatrixGridIDProduct'
                                                    ref={gridProductStandardQtyPriceMatrix}
                                                    dataSource={dataSourceQuantityPrice}
                                                    columns={selectGridColumns}
                                                    appearance={appearance}
                                                    behavior={behavior}
                                                    selection={selection}
                                                    //paging={paging}
                                                    //pager={pager}
                                                    sorting={sorting}
                                                    editing={editing}
                                                    filtering={filtering}
                                                    //onEndEdit={(e) => handleEndEditStandardPriceGridDate(e)}
                                                    onEndEdit={(e) => handleCellEditStandardQtyPrice(e)}
                                                >
                                                </Grid>) : null
                                                
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showConfirmStandardQtyPrice && (
                                        <div className="modal fade in" style={{ display: 'block' }}>
                                        <div className="modal-dialog modal-confirm">
                                            <div className="modal-content">
                                            <div className="modal-header justify-content-center modal-header-error">
                                                <div className="icon-box">
                                                <i className="fa fa-exclamation" aria-hidden="true"></i>
                                                </div>
                                                <button type="button" className="close" onClick={() => setshowConfirmStandardQtyPrice(false)}>
                                                &times;
                                                </button>
                                            </div>
                                            <div className="modal-body text-center">
                                                <h4>Confirm Delete</h4>
                                                <p>Are you sure you want to delete this record?</p>
                                                <button type="button" className="btn btn-default" onClick={() => setshowConfirmStandardQtyPrice(false)}>
                                                Cancel
                                                </button>
                                                <button type="button" className="btn btn-danger" onClick={handleConfirmQuantityPriceDelete}>
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

export default E4kTblProductPropertiesStandardQtyPriceMatrix;