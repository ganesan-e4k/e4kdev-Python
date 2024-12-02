

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
    useGetProductSupplierCostMatrixLevelQuery,
    useGetProductPropertiesLevelColMatrixLevelQuery,
    useGetProductStandardCostMatrixLevelQuery,
    useCreateProductSupplierCostMatrixLevelMutation,
    useUpdateProductSupplierCostMatrixLevelMutation,
} from '../../store/services/e4kTblProductProductPropertyLevelAPI';

import {useGetAllSupplierQuery} from '../../store/services/e4kTblSupplier';

import {
    useGetProductPriceTypesQuery,
} from '../../store/services/e4kTblProductPriceTypes';

const E4kTblProductPropertiesSupplierCostMatrix = ({ showModalMediumSupplierCostMatrix, handleCloseMediumSupplierCostMatrix }) => {
    const [dataGridSupplierCost, setDataGridSupplierCost] = useState([]);

    const [dataGridCostStandardCopy, setDataGridCostStandardCopy] = useState([]);


    const [dataGridSupplierCostcol, setDataGridSupplierCostcol] = useState([]);
    const [dataGridPriceTypeAllSupplier, setDataGridPriceTypeAllSupplier] = useState([]);
    const [pivotModeSupplierCost, setPivotModeSupplierCost] = useState(false);
    const [selectSupplierCostType, setSelectSupplierCostType] = useState("");

    const [filterColumnsSupplierCost,setFilterColumnsSupplierCost]  = useState([]);
    const [filterButtonClickSupplier, setFilterButtonClickSupplier] = useState(false);

    const CompanyProductSupplierCost = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');

    const [supplierlist, setSupplierlist] = useState([]);
    const [allsupplierlist, setAllSupplierlist] = useState([]);
    const [newSupplier ,setnewSupplier] =useState(false);

    const [selectSupplier,setSelectSupplier] = useState('')
    const [SelectSupplierDropDownChange,setSelectSupplierDropDownChange] = useState('');

    const tableSupplierCostRef = useRef();
    const switchbuttonSupplierCostRef = useRef();
    const inputRefProductPriceTypeSupplierCostSupplierList = useRef();
    const pivotTableSupplierCostRef = useRef();
    const inputRefProductPriceTypeSupplierCost = useRef();
    const [filterRowSupplier, setFilterrowSupplier] = useState(true);
    const [isMaximizedSupplierCost, setIsMaximizedSupplierCost] = useState(false);

    const ProductIDSelectSupplier = useSelector((state) => state.selectProduct.selectProduct);
    const selectedSupplier = useSelector(state => state.supplierSelect.selectedSupplier);
   

    useEffect(() => {
        if (CompanyProductSupplierCost) {
            setCompanyid(CompanyProductSupplierCost);
        }
        }, [CompanyProductSupplierCost]);
    
    const skipQuery = !ProductIDSelectSupplier?.productid?.trim();


    // API calls
    const { data: supplierPricematrixdata, isLoading: supplierPricematrixisLoading } = useGetProductSupplierCostMatrixLevelQuery({
        companyid: companyid,
        supplierid: String(selectedSupplier.BusinessID),
        productid: ProductIDSelectSupplier.productid 
    },{skip:skipQuery});

    //  // API calls
    //  const { data: supplierPricematrixdata, isLoading: supplierPricematrixisLoading } = useGetProductSupplierCostMatrixLevelQuery({
    //     companyid: companyid,
    //     supplierid: '',
    //     productid: ProductIDSelectSupplier.productid 
    // },{skip:(ProductIDSelectSupplier.productid === '') ? true:false});

    const { data: stocklevelcolmatrixdataSupplier, isLoading: stocklevelcolmatrixSupplierisLoading } = useGetProductPropertiesLevelColMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelectSupplier.productid
    },{skip:skipQuery});



     ////// Copy Coststandard data
    // API calls
    const { data: coststandardmatrixdataCopy, isLoading: coststandardmatrixisLoadingCopy } = useGetProductStandardCostMatrixLevelQuery({
        companyid: companyid,
        productid: ProductIDSelectSupplier.productid 
    },{skip:skipQuery});


    // // API calls
    // const { data: coststandardmatrixdataCopy, isLoading: coststandardmatrixisLoadingCopy } = useGetProductStandardCostMatrixLevelQuery({
    //     companyid: companyid,
    //     productid: ProductIDSelectSupplier.productid 
    // },{skip:(ProductIDSelectSupplier.productid === '') ? true:false});
    ////////////

    const [updateProductSupplierCostMatrixlevel] = useUpdateProductSupplierCostMatrixLevelMutation();
    
      
    const [createProductSupplierPriceMatrixlevel] = useCreateProductSupplierCostMatrixLevelMutation();
  

  

    /////////////// Price types data all
    const { data :suppliercostdata,
        error:suppliercosterror, 
        isLoading :suppliercostisloading,
       isError :suppliercostiserror
       } = useGetProductPriceTypesQuery({companyid:companyid,priceid:null});



     /////////////// Price types data all
 const { data :AllSupplierdata,
    error:AllSupplierdataerror, 
    isLoading :AllSupplierdataisloading,
   isError :AllSupplierdataiserror
   } = useGetAllSupplierQuery(companyid);

    
    useEffect(() => {
        if (suppliercostdata) {
            
            transformDataSupplierCostData();
        }
    }, [suppliercostisloading, suppliercostdata]);



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
        if (selectSupplierCostType !== '' && selectSupplier !=='') {
            filterDataBySupplierCostType();
        } else {
            setDataGridSupplierCost([]); // Clear the data grid if no warehouse is selected
            setDataGridSupplierCostcol([]);
            setSupplierlist([]);
        }
    }, [selectSupplierCostType,selectSupplier]);

    

     //////////// Standcost copy data
     useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridCostStandardCopy([]);
        

        if (!coststandardmatrixisLoadingCopy && coststandardmatrixdataCopy && stocklevelcolmatrixdataSupplier  && ProductIDSelectSupplier.productid) {

            const response = coststandardmatrixdataCopy.e4kTblproductProductCostStandardMatrix[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataGridCostStandardCopy([]);
            } else if (responseKeys.includes('stdcostmatix')) {
                transformDataCostStandardCopymatrix();
            }
            
        }

    },[coststandardmatrixdataCopy,coststandardmatrixisLoadingCopy,stocklevelcolmatrixdataSupplier,ProductIDSelectSupplier.productid]);







    useEffect(() => {
        // Clear the data and columns when either of the API data is loading or changes
        setDataGridSupplierCost([]);
        setDataGridSupplierCostcol([]);
        setFilterrowSupplier(true);
        setSupplierlist([]);
    
        if (!supplierPricematrixisLoading && supplierPricematrixdata && stocklevelcolmatrixdataSupplier && ProductIDSelectSupplier.productid) {
            const response = supplierPricematrixdata.e4kTblproductProductCostSupplierMatrix;
            
    
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridSupplierCost([]);
            } else if (response.some(item => 'supcostmatix' in item)) {
                const cus_list = response.map(cus => cus.businessid.businessid);

                const busineename  = response.map(cus => {
                    return {
                        businessid: cus.businessid.businessid,
                        name: cus.businessid.businessid + ' - '+ cus.businessid.name
                    }
                    });
                //setCustomerlist(busineename)


                setSupplierlist(busineename);
                if (selectSupplier !=='' && selectSupplierCostType !== '') {
                    transformDataSupplierCostmatrix();
                }
            }
        }
    
        if (!stocklevelcolmatrixSupplierisLoading && stocklevelcolmatrixdataSupplier && supplierPricematrixdata && ProductIDSelectSupplier.productid) {
            const response = supplierPricematrixdata.e4kTblproductProductCostSupplierMatrix;
    
            if (response.some(item => 'message' in item)) {
                console.log('Message received');
                setDataGridSupplierCostcol([]);
            } else if (response.some(item => 'supcostmatix' in item)) {
                
                if (selectSupplier !== '' && selectSupplierCostType !== '') {
                    transformDataSupplierCostmatrix();
                    setFilterrowSupplier(true);
                }
            }
        }
    }, [supplierPricematrixisLoading,showModalMediumSupplierCostMatrix, stocklevelcolmatrixSupplierisLoading, supplierPricematrixdata, stocklevelcolmatrixdataSupplier, ProductIDSelectSupplier.productid]);
    



    //////// Copyt cost price 

    const transformDataCostStandardCopymatrix = () => {
        if (!coststandardmatrixdataCopy) return [];
        setDataGridCostStandardCopy(JSON.parse(coststandardmatrixdataCopy.e4kTblproductProductCostStandardMatrix[0].stdcostmatix));
    
    }



    const transformDataSupplierCostData = () => {
        if (!suppliercostdata) return [];
        const datagrid = suppliercostdata.e4kTblproductProductPriceTypes.map(category => ({
            priceid: category.priceid,
            companyid: category.companyid.companyid,
            description: category.description,
            priceType: category.priceType
            }));
        const result  = datagrid.filter(category => category.priceType === 1)
        
        setDataGridPriceTypeAllSupplier(result);
    };

    
  

    const transformDataSupplierCostmatrix = () => {
        if (!supplierPricematrixdata) return [];

        const cuscosttypeid = dataGridPriceTypeAllSupplier.filter(priceType => priceType.description === selectSupplierCostType )
        const cuscostdata = supplierPricematrixdata.e4kTblproductProductCostSupplierMatrix
        if (cuscostdata){
            const select_cus_list = cuscostdata.filter(cus =>cus.businessid.businessid === selectSupplier)
            const filteredData = (JSON.parse(select_cus_list[0].supcostmatix)).filter(item => item.pricetype === cuscosttypeid[0].priceid);
            setDataGridSupplierCost(filteredData);
        }

        if (!stocklevelcolmatrixdataSupplier) return [];
    
        let cusPricecolumns = JSON.parse(stocklevelcolmatrixdataSupplier.e4kTblproductProductPropertyLevelColmatrix[0].pricecolmatrix);
    
        
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
                col.label = 'Cost';
                col.allowEdit = true;
            }else{
                col.allowEdit = false;
            }
            return col;

        })
        setDataGridSupplierCostcol(updatedColumn); // Check the updated columns
    };
    

    const filterDataBySupplierCostType = () => {
        if (selectSupplierCostType !== '' && selectSupplier !== '') {

            if (!supplierPricematrixdata) return [];


            if (!supplierPricematrixisLoading && supplierPricematrixdata && stocklevelcolmatrixdataSupplier && ProductIDSelectSupplier.productid) {
                const response = supplierPricematrixdata.e4kTblproductProductCostSupplierMatrix;
        
                if (response.some(item => 'message' in item)) {
                    console.log('Message received');
                    setDataGridSupplierCost([]);
                } else if (response.some(item => 'supcostmatix' in item)) {

                    const busineename  = response.map(cus => {
                        return {
                            businessid: cus.businessid.businessid,
                            name: cus.businessid.businessid + ' - '+ cus.businessid.name
                        }
                        });
                    //setCustomerlist(busineename)
    
    
                    setSupplierlist(busineename);


                    // const cus_list = response.map(cus => cus.businessid.businessid);
                    // setSupplierlist(cus_list);
                    if (selectSupplier !=='') {
                        transformDataSupplierCostmatrix();
                    }
                }
            }
            
        }
    };


    const toggleMaximizeSupplierCost = () => {
        setIsMaximizedSupplierCost(!isMaximizedSupplierCost);
    };

    const dataSourceSupplierCost = useMemo(() => dataGridSupplierCost, [dataGridSupplierCost]);

    const onColumnRenderSupplierCost = (settings) => {
        if (settings.column.summary) {
            settings.text = settings.column.originalColumn.label.charAt(0).toUpperCase() +
                settings.column.originalColumn.label.slice(1);
        }
    };

    const handleChangePivotModeSupplierCost = (e) => {
        setPivotModeSupplierCost(e.detail.value);
        
    };

    //////////// Copy first
    const handleCopyFirstSupplierCost = () => {
       
        const table = document.getElementById('E4kTblProductPropertiessupplierPricematrixTable') 
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
        
            const filteredRows = dataGridSupplierCost.filter(row => {
                return filterColumns.every((column, index) => {
                    return filterValues[index].some(value => row[column].toUpperCase().includes(value));
                });
            });
             if (filteredRows.length > 0) {
                    const firstRecord = filteredRows[0];
            
                    const updatedDataGridSupplierCost = dataGridSupplierCost.map(row => {
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


                    const updatedDataGridSupplierCostmatupdate = updatedDataGridSupplierCost.map((row, index) => {

                        tableSupplierCostRef.current.updateRow(index,row);
    
    
                    })
            
                    //setDataGridSupplierCost(updatedDataGridSupplierCost);
                } else {
                    console.log('No rows found matching the filters.');
                }
            

        }else {
    
        if (filterColumnsSupplierCost.length === 0) {
            if (dataGridSupplierCost.length > 0) {
                const firstRecord = dataGridSupplierCost[0];
    
                const updatedDataGridSupplierCost = dataGridSupplierCost.map(row => {
                    return {
                        ...row,
                        'price': firstRecord['price'],
                        'pricetype': firstRecord['pricetype'],
                    };
                });

                const updatedDataGridSupplierCostmatupdate = updatedDataGridSupplierCost.map((row, index) => {

                    tableSupplierCostRef.current.updateRow(index,row);


                })

                //setDataGridSupplierCost(updatedDataGridSupplierCost);
               
    
            } else {
                console.log('No rows found in the data grid.');
            }
            
         } 
        }
    };

    ///////// dropdown chnage data 
    const handleDropDownonChangeSupplierCost = (event) => {
        const value = event.detail.value;
        setSelectSupplierCostType(value);
    };

     ///////// dropdown business id data chnage data 
     const handleDropDownonChangeSupplierlist = (event) => {
        const value = event.detail.value;
        setSelectSupplier(value);

        const suppdata = value.split(' -')[0];
        setSelectSupplier(suppdata);
        setSelectSupplierDropDownChange(value)


        if (newSupplier){
            console.log('New Customer list selected =>',suppdata)
            let supplierdata = {
                companyid: companyid,
                supplierid: suppdata,
                productid: ProductIDSelectSupplier.productid,
            }
            handleProductSupplierPricelevelCreate(supplierdata)
            setnewSupplier(false)
            setSelectSupplier('');
            setSelectSupplierDropDownChange('')
        }
    };

    

    const handleCellEditSupplierCost = (event) => {
        //event.preventDefault();
        const detail = event.detail;
        const id = detail.id;
        const dataField = detail.dataField;
        const row = detail.row;
        const value = detail.value;

        tableSupplierCostRef.current.updateRow(id, row)
        


        // const newData = [...dataGridSupplierCost];
        // newData[id][dataField] = value;
        // setDataGridSupplierCost(newData);
    };

    const handleProductSupplierCostlevelUpdate = async (category) => {
        try {
            const result = await updateProductSupplierCostMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductcostsuppliermatrixUpdate.success === "Success") {
                    toast.success('Supplier Price Updated', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                } else {
                    toast.error(result.data.E4kTblproductProductcostsuppliermatrixUpdate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };
    
    const handleSaveSupplierCost = () => {
        let update_supplier_cost_save = []



        if (selectSupplierCostType !== '' && selectSupplier !== '') {

            if (!supplierPricematrixdata) return [];


            if (!supplierPricematrixisLoading && supplierPricematrixdata && stocklevelcolmatrixdataSupplier && ProductIDSelectSupplier.productid) {
                const response = supplierPricematrixdata.e4kTblproductProductCostSupplierMatrix;
        
                if (response.some(item => 'message' in item)) {
                    console.log('Message received');
                    setDataGridSupplierCost([]);
                } else if (response.some(item => 'supcostmatix' in item)) {

                    const busineename  = response.map(cus => {
                        return {
                            businessid: cus.businessid.businessid,
                            name: cus.businessid.businessid + ' - '+ cus.businessid.name
                        }
                        });
                    //setCustomerlist(busineename)
    
    
                    setSupplierlist(busineename);


                    // const cus_list = response.map(cus => cus.businessid.businessid);
                    // setSupplierlist(cus_list);
                    if (selectSupplier !=='') {
                        const cuscosttypeid = dataGridPriceTypeAllSupplier.filter(priceType => priceType.description === selectSupplierCostType )
                        const cuscostdata = supplierPricematrixdata.e4kTblproductProductCostSupplierMatrix
                        if (cuscostdata){
                            const select_cus_list = cuscostdata.filter(cus =>cus.businessid.businessid === selectSupplier)
                            const filteredData = (JSON.parse(select_cus_list[0].supcostmatix)).filter(item => item.pricetype !== cuscosttypeid[0].priceid);
                            update_supplier_cost_save = filteredData.map(item => JSON.stringify(item));
                        }
                    }
                }
            }
            
        }

        dataGridSupplierCost.map(row => {
            
            update_supplier_cost_save.push(JSON.stringify(row))

        })

        let Updatesupplier_cost_save = {
                companyid: companyid,
                supplierid: selectSupplier,
                productid: ProductIDSelectSupplier.productid,
                "supcostmatix": update_supplier_cost_save,
            };
       handleProductSupplierCostlevelUpdate(Updatesupplier_cost_save)

    }


    const handleCopyCostStandardPrieApifunction = () => {
        
        const price_type_sp = dataGridPriceTypeAllSupplier.filter(cus => cus.description === selectSupplierCostType)
        
        //const all_price_sp = dataGridCostStandardCopy.every(cus => cus.pricetype === price_type_sp[0].priceid)
        const all_price_sp = dataGridCostStandardCopy.filter(cus => cus.pricetype === price_type_sp[0].priceid)
        if(all_price_sp && selectSupplier !==''){
            setDataGridSupplierCost(all_price_sp)
        }else{
            toast.error('Not all Cost standard  exist for selected Supplier price type', { 
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true});
        }
    }


        ///////////////// Create new Customer Price 
    const handleCreateNewSupplierPrice =() => {

        setnewSupplier(true)
        setSelectSupplierCostType('')

        if (allsupplierlist && allsupplierlist.length > 0) {

            // const datagrid11 = allsupplierlist
            //         .map(category => category.businessid)
            //         .filter(businessid => !supplierlist.includes(businessid));
            // setSupplierlist(datagrid11)

            const datasupplierbusiness = supplierlist.map(category => category.businessid);
            const datagrid11 = allsupplierlist
                                .map(category => ({
                                    businessid: category.businessid,
                                    name: category.businessid + ' - ' + category.name,
                                }))
                                .filter(category => !datasupplierbusiness.includes(category.businessid));

                                setSupplierlist(datagrid11);



            //setDataGridPriceTypeAllCustomer([])
            

        }

    }



    
    ///////////////////// Api for create new Supplier Price api
    const handleProductSupplierPricelevelCreate = async (category) => {
        try {
            const result = await createProductSupplierPriceMatrixlevel(category);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductcostsuppliermatrixCreate.success === "Success") {
                    toast.success('Supplier Cost Created', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: true,
                    });
                    setnewSupplier(false)
                    setSelectSupplier('')
                    setSelectSupplierDropDownChange('')
                } else {
                    toast.error(result.data.E4kTblproductProductcostsuppliermatrixCreate.success, { position: "top-center" });
                }
            }
        } catch (error) {
            console.error('Mutation Error:', error);
        }
    };


    const handleCloseSupplierCost = () => {
        //setDataGridStandardPrice([]);
        //setDataGridStandardPricecol([]);
        setFilterrowSupplier(false);
        setPivotModeSupplierCost(false)
        setSelectSupplierCostType('');
        setSelectSupplier('');
        setSupplierlist([]);
        setnewSupplier(false);
        setFilterButtonClickSupplier(false);

        const droplist = inputRefProductPriceTypeSupplierCostSupplierList.current
        if (droplist) {
            droplist.clearItems()
        }
        switchbuttonSupplierCostRef.current.checked = false;
        handleCloseMediumSupplierCostMatrix()

    }


    const modalDialogclassNameSupplierCost = isMaximizedSupplierCost ? 'modal-dialog modal-fullscreen' : 'modal-dialog medium-popup';

    return (
        <>
        <Draggable>
            <div className={`modal fade ${showModalMediumSupplierCostMatrix ? 'in' : ''}`} style={{ display: showModalMediumSupplierCostMatrix ? 'block' : 'none' }}>
                <div className={modalDialogclassNameSupplierCost}>
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
                                                            {ProductIDSelectSupplier.productid} - Supplier Cost
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className="breadcomb-wp">
                                                            <div className="breadcomb-ctn">
                                                            <span onClick={() => handleSaveSupplierCost()}><a href="#"> <i className="fa fa-check" ></i> Save</a></span>
                                                            <span onClick={() => handleCreateNewSupplierPrice()}><a href="#"> <i className="fa fa-plus" ></i> New</a></span>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                        <div className='popup-top-rightdiv'>
                                                            <span className="innerpopup-top-rightdiv">Switch To Edit Mode:</span>
                                                            <SwitchButton ref={switchbuttonSupplierCostRef} rightToLeft onChange={(e) => handleChangePivotModeSupplierCost(e)}></SwitchButton>
                                                            <button type="button" className="btn-link" onClick={toggleMaximizeSupplierCost}>
                                                                {isMaximizedSupplierCost ? <i className='fa fa-compress'></i> : <i className='fa fa-expand'></i>}
                                                            </button>
                                                            <button type="button" className="close" onClick={() => handleCloseSupplierCost()}>
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
                                            <div className="customer-newbold">{ProductIDSelectSupplier.productid} - Supplier Cost </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='height-alignment'> 
                            <div className='popupmasterpage-topfield'>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='input-lable'>
                                        <span>Supplier </span>
                                    </div>
                                </div>    
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className='form-group master-option'>                                
                                        <DropDownList
                                            ref={inputRefProductPriceTypeSupplierCostSupplierList}
                                            id="TblProductProductPriceTypeDropdownsupplierPriceSupplierlist"
                                           // selectedIndexes={[0]}
                                            filterable
                                            placeholder="Select Supplier"
                                            dataSource={supplierlist.length > 0 ? supplierlist.map(cus => cus.name) : []}
                                            className='px-8'
                                            onChange={(e) => handleDropDownonChangeSupplierlist(e)}
                                            value = {SelectSupplierDropDownChange} 
                                        />

                                        {pivotModeSupplierCost ? (
                                            <span>
                                                <button className="btn alter-button" onClick={() => handleCopyCostStandardPrieApifunction()}>Copy Cost Standard</button>
                                            </span>

                                            ) : (null)
                                        }
                                        
                                        
                                    </div>
                                </div>
                            </div> 
                            <div style={{display: newSupplier ? "none":"block"}}>
                                <div className='popupmasterpage-topfield' >
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className='input-lable'>
                                            <span>Price Type</span>
                                        </div>
                                    </div>    
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className='form-group master-option'>                                
                                            <DropDownList
                                                ref={inputRefProductPriceTypeSupplierCost}
                                                id="TblProductProductPriceTypeDropdownsupplierPrice"
                                                //selectedIndexes={[0]}
                                                filterable
                                                disabled={newSupplier}
                                                placeholder="Select Price Type"
                                                dataSource={dataGridPriceTypeAllSupplier.map(cat => cat.description)}
                                                className='px-8'
                                                onChange={(e) => handleDropDownonChangeSupplierCost(e)}
                                                value = {selectSupplierCostType} 
                                            />
                                            {pivotModeSupplierCost ? (
                                                <span>
                                                    <button className="btn alter-button" onClick={() => handleCopyFirstSupplierCost()} >Copy Frist</button>
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
                                            {supplierPricematrixisLoading || stocklevelcolmatrixSupplierisLoading ? (
                                                "Loading..."
                                            ) : (!pivotModeSupplierCost && dataGridSupplierCost.length > 0 ? (
                                                <PivotTable
                                                    ref={pivotTableSupplierCostRef}
                                                    id="E4kTblProductPropertiespivotsupplierPricematrixTable"
                                                    dataSource={dataSourceSupplierCost}
                                                    freezeHeader  
                                                    keyboardNavigation
                                                    onColumnRender={onColumnRenderSupplierCost}
                                                    columns={dataGridSupplierCostcol}
                                                />
                                            ) : (
                                                <Table
                                                    ref={tableSupplierCostRef}
                                                    id="E4kTblProductPropertiessupplierPricematrixTable"
                                                    dataSource={dataSourceSupplierCost}
                                                    freezeHeader
                                                    keyboardNavigation
                                                    columns={dataGridSupplierCostcol}
                                                    editing
                                                    editMode={'row'}
                                                    filtering={true}
                                                    filterRow={showModalMediumSupplierCostMatrix ? true : filterRowSupplier}
                                                    //paging={true}
                                                    //pageIndex={0}
                                                    //pageSize={10}
                                                    sortMode='many'
                                                    onCellEndEdit={(e) => handleCellEditSupplierCost(e)}
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

export default E4kTblProductPropertiesSupplierCostMatrix;