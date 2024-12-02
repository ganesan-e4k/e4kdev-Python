

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
    useGetProductCustomerPriceMatrixLevelQuery,
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useUpdateProductCustomerPriceMatrixLevelMutation,
    useCreateProductCustomerPriceMatrixLevelMutation,
    useGetProductStandardPriceMatrixLevelQuery
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';

import {useGetAllCustomerQuery} from '../../store/services/e4kTblCustomer';



import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

const E4kTblProductPropertiesCustomerPriceMatrix = ({ showModalMediumCustomerPriceMatrix, handleCloseMediumCustomerPriceMatrix }) => {
    const [dataGridCustomerPrice, setDataGridCustomerPrice] = useState([]);

    const [dataGridStandardPriceCopy, setDataGridStandardPriceCopy] = useState([]);

    const [dataGridCustomerPricecol, setDataGridCustomerPricecol] = useState([]);
    const [dataGridPriceTypeAllCustomer, setDataGridPriceTypeAllCustomer] = useState([]);
    const [pivotModeCustomerPrice, setPivotModeCustomerPrice] = useState(false);
    const [selectCustomerPriceType, setSelectCustomerPriceType] = useState("");

    const [filterColumnsCustomerPrice,setFilterColumnsCustomerPrice]  = useState([]);
    const [filterButtonClickCustomer, setFilterButtonClickCustomer] = useState(false);

    const CompanyProductCustomerPriceMatrix = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');

    const [customerlist, setCustomerlist] = useState([]);
    const [allcustomerlist, setAllCustomerlist] = useState([]);
    const [newCustomer ,setnewCustomer] =useState(false);



    const [selectCustomer,setSelectCustomer] = useState('')
    const [selectCustomerDropDownChange,setSelectCustomerDropDownChange] = useState('')
    const tableCustomerPriceRef = useRef();
    const inputRefProductPriceTypeCustomerPriceCustomerList = useRef();
    const pivotTableCustomerPriceRef = useRef();
    const switchbuttonCustomerPriceRef = useRef();
    const inputRefProductPriceTypeCustomerPrice = useRef();
    const [filterRowCustomer, setFilterrowCustomer] = useState(true);
    const [isMaximizedCustomerPrice, setIsMaximizedCustomerPrice] = useState(false);

    const ProductIDSelectCustomer = useSelector((state) => state.selectProduct.selectProduct);

    useEffect(() => {
        if (CompanyProductCustomerPriceMatrix) {
            setCompanyid(CompanyProductCustomerPriceMatrix);
        }
        }, [CompanyProductCustomerPriceMatrix]);
    
    const skipQuery = !ProductIDSelectCustomer?.productid?.trim();

    // API calls
    const { data: customerPricematrixdata, isLoading: customerPricematrixisLoading } = useGetProductCustomerPriceMatrixLevelQuery({
        companyid: companyid,
        customerid: '',
        productid: ProductIDSelectCustomer.productid 
    },{skip:skipQuery});

    ////// Copy standardPrice data
    // API calls
    const { data: standardPricematrixdataCopy, isLoading: standardPricematrixisLoadingCopy } = useGetProductStandardPriceMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelectCustomer.productid 
    },{skip:skipQuery});
    ////////////


    const { data: stocklevelcolmatrixdataCustomer, isLoading: stocklevelcolmatrixCustomerisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelectCustomer.productid
    },{skip:skipQuery});



    // // API calls
    // const { data: customerPricematrixdata, isLoading: customerPricematrixisLoading } = useGetProductCustomerPriceMatrixLevelQuery({
    //     companyid: companyid,
    //     customerid: '',
    //     productid: ProductIDSelectCustomer.productid 
    // },{skip:(ProductIDSelectCustomer.productid === '') ? true:false});

    // ////// Copy standardPrice data
    // // API calls
    // const { data: standardPricematrixdataCopy, isLoading: standardPricematrixisLoadingCopy } = useGetProductStandardPriceMatrixLevelQuery({
    //     companyid: companyid,
    //     productid: ProductIDSelectCustomer.productid 
    // },{skip:(ProductIDSelectCustomer.productid === '') ? true:false});
    // ////////////


    // const { data: stocklevelcolmatrixdataCustomer, isLoading: stocklevelcolmatrixCustomerisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
    //     companyid: companyid,
    //     productid: ProductIDSelectCustomer.productid
    // },{skip:(ProductIDSelectCustomer.productid === '') ? true:false});

    const [updateProductCustomerPriceMatrixlevel] = useUpdateProductCustomerPriceMatrixLevelMutation();
    
    const [createProductCustomerPriceMatrixlevel] = useCreateProductCustomerPriceMatrixLevelMutation();
  

    /////////////// Price types data all
    const { data :customerpricedata,
        error:customerpriceerror, 
        isLoading :customerpriceisloading,
       isError :customerpriceiserror
       } = useGetProductPriceTypesQuery({companyid:companyid,priceid:null});


/////////////////////// All Customer Business id
 /////////////// Price types data all
 const { data :AllCustomerdata,
    error:AllCustomerdataerror, 
    isLoading :AllCustomerdataisloading,
   isError :AllCustomerdataiserror
   } = useGetAllCustomerQuery(companyid);

    
    useEffect(() => {
        if (customerpricedata) {
            
            transformDataCustomerPriceData();
        }
    }, [customerpriceisloading, customerpricedata]);

///////////////// DropDown change


    
    useEffect(() => {
        if (AllCustomerdata) {
            
            if (!AllCustomerdata) return [];
            const datagrid11 = AllCustomerdata.e4kTblcustomerAll.map(category => ({
                name: category.name,
                businessid: category.businessid,
                
                }));
            setAllCustomerlist(datagrid11);
            }
    }, [AllCustomerdataisloading, AllCustomerdata]);




    useEffect(() => {
        if (selectCustomerPriceType !== '' && selectCustomer !=='') {
            filterDataByCustomerPriceType();
        } else {
            setDataGridCustomerPrice([]); // Clear the data grid if no warehouse is selected
            setDataGridCustomerPricecol([]);
            setCustomerlist([]);
        }
    }, [selectCustomerPriceType,selectCustomer]);

    


    //////////// Standprice copy data
    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridStandardPriceCopy([]);
        

        if (!standardPricematrixisLoadingCopy && standardPricematrixdataCopy && stocklevelcolmatrixdataCustomer  && ProductIDSelectCustomer.productid) {

            const response = standardPricematrixdataCopy.e4kTblproductProductPriceStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridStandardPriceCopy([]);
            } else if (responseKeys.includes('stdpricematix')) {
                transformDataStandardPriceCopymatrix();
            }
            
        }

    },[standardPricematrixdataCopy,standardPricematrixisLoadingCopy,stocklevelcolmatrixdataCustomer,ProductIDSelectCustomer.productid]);
   


    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridCustomerPrice([]);
        setDataGridCustomerPricecol([]);
        setFilterrowCustomer(true);
        setCustomerlist([]);
    
        if (!customerPricematrixisLoading && customerPricematrixdata && stocklevelcolmatrixdataCustomer && ProductIDSelectCustomer.productid) {
            const response = customerPricematrixdata.e4kTblproductProductPriceCustomerMatrix;
            
    
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridCustomerPrice([]);
            } else if (response.some(item => 'cuspricematix' in item)) {
                //const cus_list = response.map(cus => cus.businessid.businessid);
                
                const busineename  = response.map(cus => {
                    return {
                        businessid: cus.businessid.businessid,
                        name: cus.businessid.businessid + ' - '+ cus.businessid.name
                    }
                    });
                setCustomerlist(busineename)
                //setCustomerlist(cus_list);
                if (selectCustomer !=='' && selectCustomerPriceType !== '') {
                    transformDataCustomerPricematrix();
                }
            }
        }
    
        if (!stocklevelcolmatrixCustomerisLoading && stocklevelcolmatrixdataCustomer && customerPricematrixdata && ProductIDSelectCustomer.productid) {
            const response = customerPricematrixdata.e4kTblproductProductPriceCustomerMatrix;
    
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridCustomerPricecol([]);
            } else if (response.some(item => 'cuspricematix' in item)) {
                
                if (selectCustomer !== '' && selectCustomerPriceType !== '') {
                    transformDataCustomerPricematrix();
                    setFilterrowCustomer(true);
                }
            }
        }
    }, [customerPricematrixisLoading,showModalMediumCustomerPriceMatrix, stocklevelcolmatrixCustomerisLoading, customerPricematrixdata, stocklevelcolmatrixdataCustomer, ProductIDSelectCustomer.productid]);
    

    const transformDataStandardPriceCopymatrix = () => {
        if (!standardPricematrixdataCopy) return [];
        setDataGridStandardPriceCopy(JSON.parse(standardPricematrixdataCopy.e4kTblproductProductPriceStandardMatrix[0].stdpricematix));
    
    }

    const transformDataCustomerPriceData = () => {
        if (!customerpricedata) return [];
        const datagrid = customerpricedata.e4kTblproductProductPriceTypes.map(category => ({
            priceid: category.priceid,
            companyid: category.companyid.companyid,
            description: category.description,
            priceType: category.priceType
            }));
        const result  = datagrid.filter(category => category.priceType === 2)
        
        setDataGridPriceTypeAllCustomer(result);
    };

    
  

    const transformDataCustomerPricematrix = () => {
        if (!customerPricematrixdata) return [];

        const cuspricetypeid = dataGridPriceTypeAllCustomer.filter(priceType => priceType.description === selectCustomerPriceType )
        const cuspricedata = customerPricematrixdata.e4kTblproductProductPriceCustomerMatrix
        if (cuspricedata){
            const select_cus_list = cuspricedata.filter(cus =>cus.businessid.businessid === selectCustomer)
            const filteredData = (JSON.parse(select_cus_list[0].cuspricematix)).filter(item => item.pricetype === cuspricetypeid[0].priceid);
            setDataGridCustomerPrice(filteredData);
        }

        if (!stocklevelcolmatrixdataCustomer) return [];
    
        let cusPricecolumns = JSON.parse(stocklevelcolmatrixdataCustomer.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
    
        
        if (!Array.isArray(cusPricecolumns)) {
            cusPricecolumns = [];
        }
        
        cusPricecolumns = cusPricecolumns.filter(column => column.dataField  && !column.dataField.includes('summary') );
        
        const updatedColumns = cusPricecolumns.map(column => {
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
        setDataGridCustomerPricecol(updatedColumn); // Check the updated columns
    };
    

    const filterDataByCustomerPriceType = () => {
        if (selectCustomerPriceType !== '' && selectCustomer !== '') {

            if (!customerPricematrixdata) return [];


            if (!customerPricematrixisLoading && customerPricematrixdata && stocklevelcolmatrixdataCustomer && ProductIDSelectCustomer.productid) {
                const response = customerPricematrixdata.e4kTblproductProductPriceCustomerMatrix;
        
                if (response.some(item => 'message' in item)) {
                    console.log('Message received');
                    setDataGridCustomerPrice([]);
                } else if (response.some(item => 'cuspricematix' in item)) {
                    // const cus_list = response.map(cus => cus.businessid.businessid);
                    // setCustomerlist(cus_list);
                    const busineename  = response.map(cus => {
                        return {
                            businessid: cus.businessid.businessid,
                            name: cus.businessid.businessid + ' - '+ cus.businessid.name
                        }
                        });
                    setCustomerlist(busineename)
                    if (selectCustomer !=='') {
                        transformDataCustomerPricematrix();
                    }
                }
            }
            
        }
    };


    const toggleMaximizeCustomerPrice = () => {
        setIsMaximizedCustomerPrice(!isMaximizedCustomerPrice);
    };

    const dataSourceCustomerPrice = useMemo(() => dataGridCustomerPrice, [dataGridCustomerPrice]);

    const onColumnRenderCustomerPrice = (settings) => {
        if (settings.column.summary) {
            settings.text = settings.column.originalColumn.label.charAt(0).toUpperCase() +
                settings.column.originalColumn.label.slice(1);
        }
    };

    const handleChangePivotModeCustomerPrice = (e) => {
        setPivotModeCustomerPrice(e.detail.value);
        
    };

    //////////// Copy first
    const handleCopyFirstCustomerPrice = () => {
       
        const table = document.getElementById('E4kTblProductPropertiescustomerPricematrixTable') 
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
        
            const filteredRows = dataGridCustomerPrice.filter(row => {
                return filterColumns.every((column, index) => {
                    return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                });
            });
             if (filteredRows.length > 0) {
                    const firstRecord = filteredRows[0];
            
                    const updatedDataGridCustomerPrice = dataGridCustomerPrice.map(row => {
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

                const pricetypeid = dataGridPriceTypeAllCustomer.filter(priceType => priceType.description === selectCustomerPriceType ) 
                const finaldata = updatedDataGridCustomerPrice.filter(price => price.pricetype === pricetypeid[0].priceid)

                const updatedDataGridCustomerPricematupdate = finaldata.map((row, index) => {

                    tableCustomerPriceRef.current.updateRow(index,row);


                })
               
            
                    //setDataGridCustomerPrice(finaldata);
                } else {
                    console.log('No rows found matching the filters.');
                }
            

        }else {
    
        if (filterColumnsCustomerPrice.length === 0) {
            if (dataGridCustomerPrice.length > 0) {
                const firstRecord = dataGridCustomerPrice[0];
    
                const updatedDataGridCustomerPrice = dataGridCustomerPrice.map(row => {
                    return {
                        ...row,
                        'price': firstRecord['price'],
                        'pricetype': firstRecord['pricetype'],
                    };
                });
                const pricetypeid = dataGridPriceTypeAllCustomer.filter(priceType => priceType.description === selectCustomerPriceType ) 
                const finaldata = updatedDataGridCustomerPrice.filter(price => price.pricetype === pricetypeid[0].priceid)
            

                const updatedDataGridCustomerPricematupdate = finaldata.map((row, index) => {

                    tableCustomerPriceRef.current.updateRow(index,row);


                })

                //setDataGridCustomerPrice(finaldata);
               
    
            } else {
                console.log('No rows found in the data grid.');
            }
            
         } 
        }
    };

    ///////// dropdown chnage data 
    const handleDropDownonChangeCustomerPrice = (event) => {
        const value = event.detail.value;
        setSelectCustomerPriceType(value);
    };

     ///////// dropdown business id data chnage data 
     const handleDropDownonChangeCustomerlist = (event) => {
        const value = event.detail.value;
       // setSelectCustomer(value);
        const waredata = value.split(' -')[0];
        setSelectCustomer(waredata);
        setSelectCustomerDropDownChange(value)
        if (newCustomer){
            console.log('New Customer list selected =>',waredata)
            let customerdata = {
                companyid: companyid,
                customerid: waredata,
                productid: ProductIDSelectCustomer.productid,
            }
            handleProductCustomerPricelevelCreate(customerdata)
            setnewCustomer(false)
            setSelectCustomer('');
            setSelectCustomerDropDownChange('')
        }
    };

    

    const handleCellEditCustomerPrice = (event) => {
        //event.preventDefault();
        const detail = event.detail;
        const id = detail.id;
        const dataField = detail.dataField;
        const row = detail.row;
        const value = detail.value;

        tableCustomerPriceRef.current.updateRow(id, row)
        

        // const newData = [...dataGridCustomerPrice];
        // newData[id][dataField] = value;
        // setDataGridCustomerPrice(newData);
    };

    const handleProductCustomerPricelevelUpdate = async (category) => {
        try {
            const result = await updateProductCustomerPriceMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpricecustomermatrixUpdate.success === "Success") {
                    toast.success('Customer Price Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                } else {
                    toast.error(result.data.E4kTblproductProductpricecustomermatrixUpdate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };
    
    const handleSaveCustomerPrice = () => {
        let update_customer_price_save = []




        if (selectCustomerPriceType !== '' && selectCustomer !== '') {

            if (!customerPricematrixdata) return [];


            if (!customerPricematrixisLoading && customerPricematrixdata && stocklevelcolmatrixdataCustomer && ProductIDSelectCustomer.productid) {
                const response = customerPricematrixdata.e4kTblproductProductPriceCustomerMatrix;
        
                if (response.some(item => 'message' in item)) {
                    console.log('Message received');
                    setDataGridCustomerPrice([]);
                } else if (response.some(item => 'cuspricematix' in item)) {
                    //const cus_list = response.map(cus => cus.businessid.businessid);
                    //setCustomerlist(cus_list);
                    const busineename  = response.map(cus => {
                        return {
                            businessid: cus.businessid.businessid,
                            name: cus.businessid.businessid + ' - '+ cus.businessid.name
                        }
                        });
                    setCustomerlist(busineename)
                    if (selectCustomer !=='') {
                        const cuspricetypeid = dataGridPriceTypeAllCustomer.filter(priceType => priceType.description === selectCustomerPriceType )
                        const cuspricedata = customerPricematrixdata.e4kTblproductProductPriceCustomerMatrix
                        if (cuspricedata){
                            const select_cus_list = cuspricedata.filter(cus =>cus.businessid.businessid === selectCustomer)
                            const filteredData = (JSON.parse(select_cus_list[0].cuspricematix)).filter(item => item.pricetype !== cuspricetypeid[0].priceid);
                            update_customer_price_save = filteredData.map(item => JSON.stringify(item));
                        }
                    }
                }
            }
            
        }
        

        dataGridCustomerPrice.map(row => {
            
            update_customer_price_save.push(JSON.stringify(row))

        })
       
        let Updatecustomer_price_save = {
                companyid: companyid,
                customerid: selectCustomer,
                productid: ProductIDSelectCustomer.productid,
                "cuspricematix": update_customer_price_save,
            };
       handleProductCustomerPricelevelUpdate(Updatecustomer_price_save)

    }

    const handleCopyStandardPriceApifunction = () => {
        
        const price_type_sp = dataGridPriceTypeAllCustomer.filter(cus => cus.description === selectCustomerPriceType)
        
        const all_price_sp = dataGridStandardPriceCopy.filter(cus => cus.pricetype === price_type_sp[0].priceid)
        if(all_price_sp && selectCustomer !==''){
            setDataGridCustomerPrice(all_price_sp)
        }else{
            toast.error('Not all standard price exist for selected customer price type', { 
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true});
        }
    }


    ///////////////// Create new Customer Price 
    const handleCreateNewCustomerPrice =() => {

        setnewCustomer(true)
        setSelectCustomerPriceType('')

        if (allcustomerlist && allcustomerlist.length > 0) {
            //const datagrid11 = allcustomerlist.map(category => category.businessid);

            // const datagrid11 = allcustomerlist
            //         .map(category =>  category.businessid)
            //         .filter(businessid => !customerlist.includes(businessid));
            // setCustomerlist(datagrid11)
            
            const datacustomerbusiness = customerlist.map(category => category.businessid);
            const datagrid11 = allcustomerlist
                                .map(category => ({
                                    businessid: category.businessid,
                                    name: category.businessid + ' - ' + category.name,
                                }))
                                .filter(category => !datacustomerbusiness.includes(category.businessid));

                            setCustomerlist(datagrid11);

        }

    }

    // const handleNewCustomerPrice =() => {
    //     let customerdata = {
    //         companyid: companyid,
    //         customerid: selectCustomer,
    //         productid: ProductIDSelectCustomer.productid,
    //     }
    //     handleProductCustomerPricelevelCreate(customerdata)
    //     //setnewCustomer(false);

    // }


    ///////////////////// Api for create new Customer Price api
    const handleProductCustomerPricelevelCreate = async (category) => {
        try {
            const result = await createProductCustomerPriceMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpricecustomermatrixCreate.success === "Success") {
                    toast.success('Customer Price Created', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                    setnewCustomer(false)
                    setSelectCustomer('');
                    setSelectCustomerDropDownChange('')
                } else {
                    toast.error(result.data.E4kTblproductProductpricecustomermatrixCreate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };

    const handleCloseCustomerPrice = () => {
        //setDataGridStandardPrice([]);
        //setDataGridStandardPricecol([]);
        setFilterrowCustomer(false);
        setPivotModeCustomerPrice(false)
        setSelectCustomerPriceType('');
        setSelectCustomer('');
        setCustomerlist([]);
        setnewCustomer(false);
        setFilterButtonClickCustomer(false);

        const droplist = inputRefProductPriceTypeCustomerPriceCustomerList.current
        if (droplist) {
            droplist.clearItems()
        }
        switchbuttonCustomerPriceRef.current.checked = false;
        handleCloseMediumCustomerPriceMatrix()

    }


    const modalDialogclassNameCustomerPrice = isMaximizedCustomerPrice ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumCustomerPriceMatrix ? 'in' : ''}`} style={{ display: showModalMediumCustomerPriceMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassNameCustomerPrice}>
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
                                                            {ProductIDSelectCustomer.productid} - Customer Sales Price
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveCustomerPrice()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            
                                                                    {/* <span onClick={() => handleNewCustomerPrice()}><a href="#"> <i className="fa fa-check" ></i> Create</a></span>  */}
                                                                    <span onClick={() => handleCreateNewCustomerPrice()}><a href="#"> <i className="fa fa-plus" ></i> New</a></span>
                                                            
                                                           
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                            <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span>
                                                            <SwitchButton ref={switchbuttonCustomerPriceRef} rightToLeft onChange={(e) => handleChangePivotModeCustomerPrice(e)}></SwitchButton>
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeCustomerPrice}>
                                                                {isMaximizedCustomerPrice ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseCustomerPrice()}>
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
                                            <div className="customer-newbold"> {ProductIDSelectCustomer.productid} - Customer Sales Price </div>    
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='height-alignment'> 
                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='input-lable'>
                                        <span>Customer </span>
                                    </div>
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option'>                                
                                        <DropDownList
                                            ref={inputRefProductPriceTypeCustomerPriceCustomerList}
                                            id="TblProductProductPriceTypeDropdowncustomerPriceCustomerlist"
                                           // selectedIndexes={[0]}
                                            filterable
                                            placeholder="Select Customer"
                                            dataSource={customerlist.length > 0 ? customerlist.map(cus => cus.name) : []}
                                            className='px-8'
                                            onChange={(e) => handleDropDownonChangeCustomerlist(e)}
                                            value = {selectCustomerDropDownChange} 
                                        />
                                        {pivotModeCustomerPrice ? (
                                            <span>
                                                <button className="btn alter-button" onClick={() => handleCopyStandardPriceApifunction()}>Copy Standard Price</button>
                                            </span>) : (null)
                                        }

                                        
                                        
                                    </div>
                                </div>
                            </div> 
                            <div style={{display: newCustomer ? "none":"block"}}>
                                <div className='popupmasterpage-topfield'>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className='input-lable'>
                                            <span>Price Type</span>
                                        </div>
                                        
                                    </div>    
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className='form-group master-option'>                                
                                            <DropDownList
                                                ref={inputRefProductPriceTypeCustomerPrice}
                                                id="TblProductProductPriceTypeDropdowncustomerPrice"
                                                //selectedIndexes={[0]}
                                                filterable
                                                disabled={newCustomer}
                                                placeholder="Select Price Type"
                                                dataSource={dataGridPriceTypeAllCustomer.map(cat => cat.description)}
                                                className='px-8'
                                                onChange={(e) => handleDropDownonChangeCustomerPrice(e)}
                                                value = {selectCustomerPriceType} 
                                            />

                                        {pivotModeCustomerPrice ? (
                                            <span>
                                                <button className="btn alter-button" onClick={() => handleCopyFirstCustomerPrice()} >Copy Frist</button>
                                            </span>) : (null)
                                        }
                                        </div>
                                    </div>
                                </div> 
                            </div>       
                            


                            <div className="medium-modal-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {customerPricematrixisLoading || stocklevelcolmatrixCustomerisLoading ? (
                                                "Loading..."
                                            ) : (!pivotModeCustomerPrice && dataGridCustomerPrice.length > 0 ? (
                                                <PivotTable
                                                    ref={pivotTableCustomerPriceRef}
                                                    id="E4kTblProductPropertiespivotcustomerPricematrixTable"
                                                    dataSource={dataSourceCustomerPrice}
                                                    freezeHeader  
                                                    keyboardNavigation
                                                    onColumnRender={onColumnRenderCustomerPrice}
                                                    columns={dataGridCustomerPricecol}
                                                />
                                            ) : (
                                                <Table
                                                    ref={tableCustomerPriceRef}
                                                    id="E4kTblProductPropertiescustomerPricematrixTable"
                                                    dataSource={dataSourceCustomerPrice}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridCustomerPricecol}
                                                    editing
                                                    editMode={'row'}
                                                    filtering={true}
                                                    filterRow={showModalMediumCustomerPriceMatrix ? true : filterRowCustomer}
                                                    //paging={true}
                                                    //pageIndex={0}
                                                    //pageSize={10}
                                                    sortMode='many'
                                                    onCellEndEdit={(e) => handleCellEditCustomerPrice(e)}
                                                    //onFilter= {(e) => handleonFileterStandardPrice(e)}
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

export default E4kTblProductPropertiesCustomerPriceMatrix;