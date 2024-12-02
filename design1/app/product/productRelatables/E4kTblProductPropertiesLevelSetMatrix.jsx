


import { Grid } from 'smart-webcomponents-react/grid';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { 
    useGetProductProductPropertiesLevelQuery,
    useUpdateProductPropertiesLevelMutation,
    useCreateProductPropertiesLevelMutation,
    useGetProductPropertiesSelectLevelQuery,
 } from '../../store/services/e4kTblProductProductPropertyLevelAPI';
import {useGetProductProductPropertiesLevelTypesQuery} from '../../store/services/e4kTblProductPropertyLevelTypesGetAPI';
import { 
    useGetProductPropertiesSelectQuery,
} from '../../store/services/e4kTblProductPropertiesSelectAPI';

//import {setPropertyLevelResetState } from '../../store/slices/e4kTblProductPropertyLevelResetState';



export default function E4kTblProductPropertiesLevelSetMatrix() {
    const ProductAddPropertyLevelSet = useSelector((state) => state.selectProductAddProperty.selectProductProperty);
    const ProductidSelectlevel = useSelector((state) => state.selectProduct.selectProduct);

   // const Product_property_reset  = useSelector((state) => state.propertylevelreset.propertylevelreset);

    const [dataselectlevel, setDataSelectLevel] = useState([]);
    const [dataGridLevelSet, setDataGridLevelSet] = useState([]);
    const [propertyLevelTypes,setPropertyLevelTypes] = useState([]);
    const gridProductPropertiesLevelSet = useRef();
    const CompanyProductPropertyLevelset = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState('');
    const [dataselectProperties, setDataSelectProperties] = useState([]);

    //////////////pop up refresh
    const [showConfirmPropertyLevelReset, setShowConfirmPropertyLevelReset] = useState(false);
    const [updatedatalevel, setupdatedatalevel] = useState(null);
    const property_reset  = useDispatch()

    // const { data: ProductproeprtiesDataSeq,
    //     isLoading:ProductproeprtiesDataSeqisLoading, 
    //    } = useGetProductPropertiesSelectQuery({
    //     companyid: companyid,
    //     productid: ProductidSelectlevel.productid,
    //     propertyid: null,
    //   },{skip:(ProductidSelectlevel.productid === '') ? true:false});


    useEffect(() => {
        if (CompanyProductPropertyLevelset) {
            setCompanyid(CompanyProductPropertyLevelset);
        }
        }, [CompanyProductPropertyLevelset]);
    
    const skipQuery = !ProductidSelectlevel?.productid?.trim();


         ////////
    const { data: ProductproeprtiesDataSeq,
        isLoading:ProductproeprtiesDataSeqisLoading, 
       } = useGetProductPropertiesSelectLevelQuery({
        companyid: companyid,
        productid: ProductidSelectlevel.productid,
        propertyid: null,
      },{skip:skipQuery});
   

    const { data: ProductPropertyLevelSetData, 
        error: ProductPropertyLevelSetDataError, 
        isLoading: ProductPropertyLevelSetDataisLoading, 
        isError: ProductPropertyLevelSetDataisError } = useGetProductProductPropertiesLevelQuery({
                                                                            companyid: companyid,
                                                                            productid: ProductidSelectlevel.productid,
                                                                        },{skip:skipQuery});


    // ////////
    // const { data: ProductproeprtiesDataSeq,
    //     isLoading:ProductproeprtiesDataSeqisLoading, 
    //    } = useGetProductPropertiesSelectLevelQuery({
    //     companyid: companyid,
    //     productid: ProductidSelectlevel.productid,
    //     propertyid: null,
    //   },{skip:(ProductidSelectlevel.productid === '') ? true:false});
   

    // const { data: ProductPropertyLevelSetData, 
    //     error: ProductPropertyLevelSetDataError, 
    //     isLoading: ProductPropertyLevelSetDataisLoading, 
    //     isError: ProductPropertyLevelSetDataisError } = useGetProductProductPropertiesLevelQuery({
    //                                                                         companyid: companyid,
    //                                                                         productid: ProductidSelectlevel.productid,
    //                                                                     },{skip:(ProductidSelectlevel.productid === '') ? true:false});

    const { data: ProductPropertyLevelTypeData, 
        error: ProductPropertyLevelTypeDataError, 
        isLoading: ProductPropertyLevelTypeDataisLoading, 
        isError: ProductPropertyLevelTypeDataisError } = useGetProductProductPropertiesLevelTypesQuery({
                                                                            companyid: companyid});

////////////// Update Product Property level
const [updateProductPropertiesLevelSet, { isLoading: isUpdatingProductPropertiesLevelSet }] = useUpdateProductPropertiesLevelMutation();


/////////////// Create property level
const [createProductPropertiesLevelSet, { isLoading: isCreatingProductPropertiesLevelSet }] = useCreateProductPropertiesLevelMutation();



    useEffect(() => {
        if (ProductAddPropertyLevelSet) {
            const Data = ProductAddPropertyLevelSet.map((prop) => ({
                description: prop.description,
            }));
            setDataSelectLevel(Data);
           //console.log(`ProductAddPropertyLevelSet`, Data);

        }
    }, [ProductAddPropertyLevelSet]);

    ////////////// properties and seqno
    useEffect(() => {
        if (ProductproeprtiesDataSeq) {
          const transformDataProductpropertiesSelect = () => {
            if (!ProductproeprtiesDataSeq) return;
            const datagrid = ProductproeprtiesDataSeq.e4kTblproductProductProperties.map((category) => {
              return {
                seqno: category.seqno,
                propertyid: category.propertyid.propertyid,
                description: category.propertyid.description,
              };
            });
        
            setDataSelectProperties(datagrid);
        
          };
          if (ProductidSelectlevel.productid !== ''  && ProductproeprtiesDataSeq.e4kTblproductProductProperties.length > 0){
            
          
            const response = ProductproeprtiesDataSeq.e4kTblproductProductProperties[0];
            const responseKeys = Object.keys(response);
    
            if (responseKeys.includes('message')) {
            
                setDataSelectProperties([]);
            } else if (responseKeys.includes('propertyid')) {
                transformDataProductpropertiesSelect();
            }


          }

          
        }
      }, [ProductproeprtiesDataSeq,ProductAddPropertyLevelSet]);/////// extrea added ProductAddPropertyLevelSet 08_03_24


    useEffect(() => {
        if (ProductPropertyLevelTypeData) {
        const Data = ProductPropertyLevelTypeData.e4kTblproductPropertyLevelTypes.map(prop => prop.description)
        
        setPropertyLevelTypes(Data);
        }
    }, [ProductPropertyLevelTypeData]);


    useEffect(() => {
        if (ProductPropertyLevelSetData) {
            const transformDataProductLevelSelect = () => {
                // if (!ProductPropertyLevelSetData) return [];

                const datagrid1 = ProductPropertyLevelSetData.e4kTblproductProductPropertyLevel.map((category) => {
                    //console.log('ProductPropertyLevelSetData, ->>>>>>>>>>>>>> ' ,category)
                    return {
                        "Stock": JSON.parse(category.stockmatrix),
                        "Price": JSON.parse(category.pricematrix),
                        "Stock Level": JSON.parse(category.stklvlmatrix),
                        "Stock Location": JSON.parse(category.stklocmatrix),
                        "Stocking Type": JSON.parse(category.stktypematrix),
                        "Obsolete" : JSON.parse(category.obslmatrix),
                    };
                });

               
                setDataGridLevelSet(datagrid1[0]);
            };


            const response = ProductPropertyLevelSetData.e4kTblproductProductPropertyLevel[0];
            const responseKeys = Object.keys(response);
            
    
            if (responseKeys.includes('message') && ProductproeprtiesDataSeq.e4kTblproductProductProperties.length > 0) {
                
                const propertyMap = ProductproeprtiesDataSeq.e4kTblproductProductProperties.reduce((acc, prop) => {
                    acc[prop.propertyid.description] = prop.seqno;
                    return acc;
                }, {});
                
                
                let dataCreate = {
                    companyid:companyid,
                    productid: ProductidSelectlevel.productid,
                    "stockmatrix":JSON.stringify(propertyMap),
                    "pricematrix":JSON.stringify(propertyMap),
                    "stklocmatrix":JSON.stringify(propertyMap),
                    "stklvlmatrix":JSON.stringify(propertyMap),
                    "stktypematrix":JSON.stringify(propertyMap),
                    "obslmatrix":JSON.stringify(propertyMap),
        
                }

               // console.log(ProductproeprtiesDataSeq.e4kTblproductProductProperties,'********************************',"Create Function shoule be called here.....",dataCreate);
                
                handleProductPropertieslevelsetCreate(dataCreate)

                //setDataGridLevelSet([]);
            } else if (responseKeys.includes('stockmatrix')) {
                transformDataProductLevelSelect();
            }

        }
    }, [ProductPropertyLevelSetData,ProductAddPropertyLevelSet]); ///////// this was change on 03-08-24 added ProductAddPropertyLevelSet

    const selection = {
        enabled: true,
        allowCellSelection: true,
        allowRowHeaderSelection: true,
        allowColumnHeaderSelection: true,
        mode: 'extended'
    };

    const behavior = {
        columnResizeMode: 'split'
    };

    const sorting = {
        enabled: true
    };

    const filtering = {
        enabled: true
    };

    const editing = {
        enabled: true,
        mode: 'row',
    };

    const columns = [{
        label: 'Fields',
        dataField: 'fields',
        allowEdit: false,
    }];

    const columns1 = useMemo(() => {
        return columns.concat(ProductAddPropertyLevelSet.map((prop) => ({
            label: prop.description,
            dataField: prop.description,
            template: 'checkBox',
            editor: 'checkBox'
        })));
    }, [ProductAddPropertyLevelSet,dataGridLevelSet]);//// extra added ProductproeprtiesDataSeq on 03-08_24


  

    const datasource = useMemo(() => {
        const sourcedata = propertyLevelTypes.map((row) => {
            let rowData = { fields: row };

            if (ProductidSelectlevel.productid){

                    ProductAddPropertyLevelSet.forEach((prop) => {
                        const matchingData = dataGridLevelSet[row];
                        if (matchingData) {
                            rowData[prop.description] = matchingData.some(item => item[prop.description] !== undefined) ? false : null;
                            
                        } else {
                            rowData[prop.description] = false;
                        }
                    });
            } 
            // else {
            //     ProductAddPropertyLevelSet.forEach((prop) => {
            //         const matchingData = dataGridLevelSet[row];
            //         if (matchingData) {
            //             rowData[prop.description] = null;
            //         } 
                    
            //     });
            // }

            return rowData;
        });
        return sourcedata;
    }, [ProductAddPropertyLevelSet, dataGridLevelSet]);

    const datasource12 =  useMemo(() => {

        const sourcedata = propertyLevelTypes.map((row) => {
            let rowData = { fields: row };

             
                ProductAddPropertyLevelSet.forEach((prop) => {
                    const matchingData = dataGridLevelSet[row];
                    if (matchingData) {
                        rowData[prop.description] = null;
                    } 
                    
                });
            

            return rowData;
        });
        return sourcedata;



    }, [ProductAddPropertyLevelSet, dataGridLevelSet]);


    const dataSource10level = useMemo(() => new Smart.DataAdapter({
        dataSource: datasource,
    }), [dataGridLevelSet,ProductAddPropertyLevelSet]);//// added ProductAddPropertyLevelSet on 08_03_24

//////////////////// row Click events
    const handleRowClickPropertiesLevelSet = (event) => {
        const rowClickdata = event.detail.data;
        const field = rowClickdata.fields; 

        let updatedDataGridLevelSet = { ...dataGridLevelSet };



        for (let prop in updatedDataGridLevelSet){
            for (let inprops in updatedDataGridLevelSet[prop][0]){
                updatedDataGridLevelSet[prop][0][inprops] = Number(updatedDataGridLevelSet[prop][0][inprops]);
            }
        }

    
        // Initialize the dictionaries if they don't exist
        if (!updatedDataGridLevelSet["Stock"]) updatedDataGridLevelSet["Stock"] = {};
        if (!updatedDataGridLevelSet["Price"]) updatedDataGridLevelSet["Price"] = {};
        if (!updatedDataGridLevelSet["Stock Level"]) updatedDataGridLevelSet["Stock Level"] = {};
        if (!updatedDataGridLevelSet["Stock Location"]) updatedDataGridLevelSet["Stock Location"] = {};
        if (!updatedDataGridLevelSet["Stocking Type"]) updatedDataGridLevelSet["Stocking Type"] = {};
        if (!updatedDataGridLevelSet["Obsolete"]) updatedDataGridLevelSet["Obsolete"] = {};
        // Create selectedProperties based on rowClickdata
        let selectedProperties = {};
        for (let key in rowClickdata) {
            if (rowClickdata[key] === true) {
                let property = dataselectProperties.find(prop => prop.description === key);
              
               if (property) {
                    selectedProperties[key] = property.seqno;
                }
            }
        }
    
        // Replace the entire content of updatedDataGridLevelSet[field] with selectedProperties
        if (field && selectedProperties) {
            updatedDataGridLevelSet[field] = [selectedProperties];
        }

        let dataUpdate = {
            companyid:companyid,
            productid: ProductidSelectlevel.productid,
            "stockmatrix":JSON.stringify(updatedDataGridLevelSet['Stock'][0]),
            "pricematrix":JSON.stringify(updatedDataGridLevelSet['Price'][0]),
            "stklocmatrix":JSON.stringify(updatedDataGridLevelSet['Stock Location'][0]),
            "stklvlmatrix":JSON.stringify(updatedDataGridLevelSet['Stock Level'][0]),
            "stktypematrix":JSON.stringify(updatedDataGridLevelSet['Stocking Type'][0]),
            "obslmatrix":JSON.stringify(updatedDataGridLevelSet['Obsolete'][0]),

        }

       // console.log('Updated Data Grid:', dataUpdate);
        setShowConfirmPropertyLevelReset(true);
        setupdatedatalevel(dataUpdate)
        //handleProductPropertieslevelsetUpdate(dataUpdate)


    };
    
////////////////// Update the levels via api functions
 /////////////// Product Properties level update
 const handleProductPropertieslevelsetUpdate = async () => {

    setShowConfirmPropertyLevelReset(false);
    if (updatedatalevel) {
            try {
            const result = await updateProductPropertiesLevelSet(updatedatalevel);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpropertylevelUpdate.updateProductPropertyLevel === "Success") {
                toast.success('Attribute Level Updated', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    
                });
                
                } else {
                toast.error(result.data.E4kTblproductProductpropertylevelUpdate.updateProductPropertyLevel, { position: "top-center" });
                }
            }
            } catch (error) {
            console.error('Mutation Error:', error);
            }

        }
  };


  /////////////// Product Properties Level create
 const handleProductPropertieslevelsetCreate = async (createdata) => {

    
   // if (updatedatalevel) {
            try {
            const result = await createProductPropertiesLevelSet(createdata);
            if (result.error) {
                console.error('Mutation Error:', result.error);
            } else {
                console.log('Mutation Success:', result.data);
                if (result.data.E4kTblproductProductpropertylevelCreate.createProductPropertyLevel === "Success") {
                toast.success('Attribute Level Created Successfully', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    
                });
                
                } else {
                toast.error(result.data.E4kTblproductProductpropertylevelCreate.createProductPropertyLevel, { position: "top-center" });
                }
            }
            } catch (error) {
            console.error('Mutation Error:', error);
            }

        
  };


    return (
        <>
        {ProductAddPropertyLevelSet.length > 0 ? (
            <Grid id="TblProductPropertiesLevelMatrixSettings"
                ref={gridProductPropertiesLevelSet}
                dataSource={ProductidSelectlevel.productid ? dataSource10level : datasource12 }
                selection={selection}
                behavior={behavior}
                sorting={sorting}
                filtering={filtering}
                editing={editing}
                columns={columns1}
                onEndEdit={handleRowClickPropertiesLevelSet}
            ></Grid>
            ) : null}
            
       
            {/* <<<<<<<<<<<<Pop up code >>>>>>>>>                         */}
            {showConfirmPropertyLevelReset && (
                <div className="modal fade in" style={{ display: 'block' }}>
                     <div className="modal-dialog modal-confirm">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center modal-header-error">
                                    <div className="icon-box">
                                        <i className="fa fa-exclamation" aria-hidden="true"></i>
                                    </div>
                                
                                    <button type="button" className="close"  onClick={() => setShowConfirmPropertyLevelReset(false)}>&times;</button>
                            </div>

                                <div className="modal-body text-center">
                                <h4>Confirm Update Level</h4>	
                                <p> Please wait till page get refreshed</p>
                                {/* <button type="button" className="btn btn-default" onClick={() => setShowConfirmPropertyLevelReset(false)}>Cancel</button> */}
                                    <button type="button" className="btn btn-danger" onClick={() => handleProductPropertieslevelsetUpdate()}>Confirm</button>
                                </div>
                            </div>
                    </div>
                </div>
            )}

</>
    );
}
