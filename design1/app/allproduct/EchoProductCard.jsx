

// // ///////////// Card view
// // import { useState, useEffect } from 'react';
// // import { useSelector ,useDispatch } from 'react-redux';
// // import {Smart, Grid } from 'smart-webcomponents-react/grid';
// // import { CardView } from 'smart-webcomponents-react/cardview';
// // import { useRef } from "react";
// // import {setSelectProduct,addSelectProductProperty} from '../store/slices/e4kTblProductSelectSlice';

// // const addImageKey = (record) => {
// //     const imagePathParts = record.styleimage.split('\\');
// //     const imageName = imagePathParts[imagePathParts.length - 1];
// //     //console.log('imagePath: ' + imageName);
// //     return { ...record, styleimage: "http://localhost:3000/product/".concat(imageName) };
// // };

// // export default function EchoProductCard() {
// //     const [Data, setData] = useState([]);
// //     const AllProductcardview = useRef();
// //     const dispatch = useDispatch();
// //     const items = useSelector((state) => state.dataProduct.items);
// //     const status = useSelector((state) => state.dataProduct.status);
// //     const error = useSelector((state) => state.dataProduct.error);

// //     useEffect(() => {
// //         if (status === 'succeeded') {
// //           if (items) {
            
          
// //             const processedData_ = items.map(item => ({
// //                 productid: '#'.concat(item.ProductID),
// //                 description: item.Description || '0',
// //                 category1id: item.Category1ID || '0',
// //                 category2id: item.Category2ID || '0',
// //                 category3id: item.Category3ID || '0',
// //                 weight: item.Weight || 0,
// //                 classid: item.ClassID || '0' ,
// //                 commodityCode: item.CommodityCode || 'none',
// //                 issueuom: item.IssueUOM || '0',
// //                 notes: item.Notes || 'none',
// //                 obsoleteClass: item.Obsolete_Class || 'none',
// //                 styleimage: item.StyleImage || "none",
// //                 supplimentaryunits: item.SupplimentaryUnits || 'none',
// //                 batchcontrol: item.BatchControl || "false" ,
// //                 live: item.Live || false ,
// //                 stockingtype: item.StockingType || '0',
// //                 country: item.CountryID || 'uk',
// //                     }));
// //               const Data = processedData_.map(addImageKey);
// //               setData(Data);
// //               //console.log('#############Card##############View ',Data)

// //               //console.log("{`product/${product.styleimage}`}")
// //           }
// //         }
// //       }, [items, status]);


// //       useEffect(() => {
// //         // Define the handleClick function globally or attach it to the window object
// //         window.handleClick = (e) => {
// //           console.log('Span clicked!', e);
// //           // Your click handler logic here
// //         };
// //       }, []);



// //       const dataSourceSettings = {
// // 		dataFields: [
// // 			'productid: string',
// //             'description: string',
// //             'category1id: string',
// //             'category2id: string',
// //             'category3id: string',
// //             'weight: number',
// //             'classid: string',
// //             'commodityCode: string',
// //             'issueuom: string',
// //             'notes: string',
// //             'obsoleteClass: string',
// //             'styleimage: string',
// //             'supplimentaryunits: string',
// //             'batchcontrol: bool',
// //             'live: bool',
// //             'stockingtype: string',
// //             'country: string',
// // 		]
// // 	};



// //       const columns = [
// //         { 
// //           label: 'Product ID', 
// //           dataField: 'productid',
// //           formatFunction: function (settings) {
// //             settings.template = `<span onClick="handleClick(event)" class="smart-badge smart-badge-dark">${settings.value}</span>`;
// //           }
        
        
// //         },
// //         { label: 'Description', dataField: 'description' },
// //         { label: 'Category 1', dataField: 'category1id' },
// //         { label: 'Category 2', dataField: 'category2id' },
// //         { label: 'Category 3', dataField: 'category3id'},
// //         { label: 'Weight', dataField: 'weight' },
// //         { label: 'Class', dataField: 'classid' },
// //         { label: 'Commodity Code', dataField: 'commodityCode'},
// //         { label: 'Issue UOM', dataField: 'issueuom' },
// //         { label: 'Notes', dataField: 'notes' },
// //         { label: 'Obsolete Class', dataField: 'obsoleteClass' },
// //         { label: 'Style Image', dataField: 'styleimage',image: true },
// //         { label: 'Supplimentary Units', dataField: 'supplimentaryunits' },
// //         { label: 'Batch Control', dataField: 'batchcontrol'},
// //         { label: 'Live', dataField: 'live' },
// //         { label: 'Stocking Type', dataField: 'stockingtype' },
// //         { label: 'Country', dataField: 'country' },
// //       ];
// //         const collapsible = true;

// //         const coverField = 'styleimage';
// //         const headerPosition = 'top';
// //         const coverMode = 'fit';
// //         const titleField = 'productid';
// //         const layout  = {
// //           cardVertical: true,
// //           cardMinWidth: 300,
// //           rowMinHeight: 45
// //       }


// //        ///////////////////////////////Row Click handlers

// //   const handleAllProductRowClick = (event) => {
    
// //         console.log('event.detail.row.data  = ',event.detail)
// //         // const productid = event.detail.row.data.productid;
// //         // if (productid) { 
// //         //     const clickdata = {
// //         //         productid : productid,
// //         //         description : event.detail.row.data.description,
// //         //         category1id : event.detail.row.data.category1id,
// //         //         category2id : event.detail.row.data.category2id, 
// //         //         category3id : event.detail.row.data.category3id,
// //         //         classid : event.detail.row.data.classid,
// //         //         commodityCode : event.detail.row.data.commodityCode,
// //         //         obsoleteClass: event.detail.row.data.obsoleteClass,
// //         //         live: event.detail.row.data.live,
// //         //         batchcontrol: event.detail.row.data.batchcontrol,
// //         //         styleimage: event.detail.row.data.styleimage,
// //         //         country: event.detail.row.data.country,


// //         //     };
// //         //     /////////////// Store select product data in to store
// //         //     const data1 = addImageKey(clickdata)

// //         //     dispatch(setSelectProduct(data1));
// //         //     console.log('selected businessid store  = ',data1)
            
// //         // }
// //       };

        
// //     return (
// // 		<div>
// // 			<CardView
// // 				        id="cardViewAllproduct"
// //                 ref={AllProductcardview}
// //                 dataSourceSettings={dataSourceSettings}
// // 				        dataSource={Data}
// // 				        columns={columns}
// // 				        collapsible={collapsible}
// //                 //layout={layout}
// //                 //editable = {true}
// //                 coverMode={coverMode}
// //                 headerPosition={headerPosition}
// // 				        coverField={coverField}
// // 				        titleField={titleField}
// //                 onOpen={handleAllProductRowClick}
// // 			></CardView>
// // 		</div >
// // 	)
// // }




// /////////////// Grid Card View


// import { useState, useEffect,useMemo } from 'react';
// import { useSelector ,useDispatch } from 'react-redux';
// import {Smart, Grid } from 'smart-webcomponents-react/grid';
// import { CardView } from 'smart-webcomponents-react/cardview';
// import { useRef } from "react";
// import {setSelectProduct} from '../store/slices/e4kTblProductSelectSlice';
// import {useGetAllProductsQuery} from  '../store/services/e4kTblProduct';

// const addImageKey = (record) => {
//   if(record.styleimage){
//       const imagePathParts = record.styleimage.split('\\');
//       const imageName = imagePathParts[imagePathParts.length - 1];
//       return { ...record, styleimage: "../product/".concat(imageName) };
//   } else {
//     return { ...record, styleimage: "" };
//   }
// };

// export default function EchoProductCard() {
//     const [Data, setData] = useState([]);
//     const [companyid, setCompanyid] = useState('001');
//     const AllProductcardview = useRef();
//     const dispatch = useDispatch();
//     //const items = useSelector((state) => state.dataProduct.items);
//     //const status = useSelector((state) => state.dataProduct.status);
//     //const error = useSelector((state) => state.dataProduct.error);

//     const { data:allproductdata, error:allproducterror, isLoading:allproductisLoading, isError:allproductisError } =  useGetAllProductsQuery(companyid);
    
//     useEffect(() => {
//       if (allproductdata) {
//         if (!allproductdata) return [];
  
//           const sss = allproductdata.e4kTblproductProductAll.map(jsonString => JSON.parse(jsonString));
//           const processedData = sss.map(item => ({
//             productid: item.ProductID,
//             description: item.Description,
//             category1id: item.Category1ID,
//             category2id: item.Category2ID,
//             category3id: item.Category3ID,
//             weight: item.Weight,
//             classid: item.ClassID,
//             commodityCode: item.CommodityCode,
//             Nominal : item.Nominal,
//             StockingUOM: item.StockingUOM,
//             issueuom: item.IssueUOM,
//             notes: item.Notes,
//             obsoleteClass: item.Obsolete_Class,
//             styleimage: item.StyleImage,
//             supplimentaryunits: item.SupplimentaryUnits,
//             batchcontrol: item.BatchControl,
//             live: item.Live,
//             stockingtype: item.StockingType,
//             country: item.CountryID,
//           }));
//           const Data = processedData.map(addImageKey);
            
//           setData(Data);
//       }
//     }, [allproductisLoading, allproductdata]);




//     const dataSource11 = useMemo(() => new Smart.DataAdapter({
//         dataSource: Data,
//         dataFields: [
//           'productid: string',
//           'description: string',
//           'category1id: string',
//           'category2id: string',
//           'category3id: string',
//           'weight: number',
//           'classid: string',
//           'commodityCode: string',
//           'Nominal: string',
//           'StockingUOM: string',
//           'issueuom: string',
//           'notes: string',
//           'obsoleteClass: string',
//           'styleimage: string',
//           'supplimentaryunits: string',
//           'batchcontrol: bool',
//           'live: bool',
//           'stockingtype: string',
//           'country: string',
//         ],
//       }), [Data]);



//       const columns = [

//         { label: 'Product', dataField: 'styleimage' ,template: 'image',cardHeight: 6},
//         { 
//           label: 'Product ID', 
//           dataField: 'productid',
        
//         },
//         { label: 'Description', dataField: 'description' },
//         { label: 'Category1', dataField: 'category1id' },
//         { label: 'Category2', dataField: 'category2id' },
//         { label: 'Category3', dataField: 'category3id'},
//         { label: 'Weight', dataField: 'weight' },
//         { label: 'Class', dataField: 'classid' },
//         { label: 'Commodity Code', dataField: 'commodityCode'},
//         { label: 'Nominal', dataField: 'Nominal' },
//         { label: 'Issue UOM', dataField: 'issueuom' },
//         { label: 'Stocking UOM', dataField: 'StockingUOM'},
//         { label: 'Notes', dataField: 'notes' },
//         { label: 'Obsolete Class', dataField: 'obsoleteClass' },
//         { label: 'Supplimentary Units', dataField: 'supplimentaryunits' },
//         { label: 'Batch Control', dataField: 'batchcontrol'},
//         { label: 'Live', dataField: 'live' },
//         { label: 'Stocking Type', dataField: 'stockingtype' },
//         { label: 'Country of Origin', dataField: 'country' },
//       ];
       

        
//       const behavior = {
//         columnResizeMode: 'growAndShrink',
//       };
    
//       const filtering = {
//         enabled: true,
//         filterRow: {
//           visible: true,
//         },
//       };
    
//       const appearance = {
//         alternationCount: 2,
//         showRowHeader: true,
//       };
    
//       const paging = {
//         enabled: true,
//         pageSize: 500,
//       };
    
//       const pager = {
//         visible: true,
//       };
    
//       const sorting = {
//         enabled: true,
//         mode: 'many'
//       };
    
//       const editing = {
//         enabled: false,
//       };
    
//       const selection = {
//         enabled: true,
//         allowCellSelection: false,
//         allowRowHeaderSelection: true,
//         allowColumnHeaderSelection: true,
//         mode: 'extended',
//       };
    
//       const header = {
//         visible: true,
//         buttons: ['filter','sort','search']
//       };
    
//       const grouping = {
//         enabled: true,
//       };

//        ///////////////////////////////Row Click handlers

//   const handleAllProductRowClick = (event) => {
    
//         console.log('event.detail.row.data  = ',event.detail)
//         const productid = event.detail.row.data.productid;
//         if (productid) { 
//             const clickdata = {
//                 productid : productid,
//                 description : event.detail.row.data.description,
//                 category1id : event.detail.row.data.category1id,
//                 category2id : event.detail.row.data.category2id, 
//                 category3id : event.detail.row.data.category3id,
//                 classid : event.detail.row.data.classid,
//                 commodityCode : event.detail.row.data.commodityCode,
//                 Nominal: event.detail.row.data.Nominal,
//                 obsoleteClass: event.detail.row.data.obsoleteClass,
//                 issueuom: event.detail.row.data.issueuom,
//                 StockingUOM: event.detail.row.data.StockingUOM,
//                 stockingtype: event.detail.row.data.stockingtype,
//                 weight: event.detail.row.data.weight,
//                 supplimentaryunits: event.detail.row.data.supplimentaryunits || 'none',
//                 notes: event.detail.row.data.notes || 'none',
//                 live: event.detail.row.data.live,
//                 batchcontrol: event.detail.row.data.batchcontrol,
//                 styleimage: event.detail.row.data.styleimage,
//                 country: event.detail.row.data.country,


//             };
//             /////////////// Store select product data in to store
//             //const data1 = addImageKey(clickdata)

//             dispatch(setSelectProduct(clickdata));
//             console.log('selected businessid store  = ',clickdata)
            
//         }
//       };

        
//     return (
// 		<div>
			
//       <Grid
//         id = "TblProductAllProductard"
//         view='card'
//         header={header}
//         dataSource={dataSource11}
//         columns={columns}
//         appearance={appearance}
//         behavior={behavior}
//         selection={selection}
//         paging={paging}
//         pager={pager}
//         sorting={sorting}
//         editing={editing}
//         filtering={filtering}
//         //grouping={grouping}
//         onRowClick={handleAllProductRowClick}
//         className="lg w-full"
//       />
// 		</div >
// 	)
// }

// ///////////// Card view
// import { useState, useEffect } from 'react';
// import { useSelector ,useDispatch } from 'react-redux';
// import {Smart, Grid } from 'smart-webcomponents-react/grid';
// import { CardView } from 'smart-webcomponents-react/cardview';
// import { useRef } from "react";
// import {setSelectProduct,addSelectProductProperty} from '../store/slices/e4kTblProductSelectSlice';

// const addImageKey = (record) => {
//     const imagePathParts = record.styleimage.split('\\');
//     const imageName = imagePathParts[imagePathParts.length - 1];
//     //console.log('imagePath: ' + imageName);
//     return { ...record, styleimage: "http://localhost:3000/product/".concat(imageName) };
// };

// export default function EchoProductCard() {
//     const [Data, setData] = useState([]);
//     const AllProductcardview = useRef();
//     const dispatch = useDispatch();
//     const items = useSelector((state) => state.dataProduct.items);
//     const status = useSelector((state) => state.dataProduct.status);
//     const error = useSelector((state) => state.dataProduct.error);

//     useEffect(() => {
//         if (status === 'succeeded') {
//           if (items) {
            
          
//             const processedData_ = items.map(item => ({
//                 productid: '#'.concat(item.ProductID),
//                 description: item.Description || '0',
//                 category1id: item.Category1ID || '0',
//                 category2id: item.Category2ID || '0',
//                 category3id: item.Category3ID || '0',
//                 weight: item.Weight || 0,
//                 classid: item.ClassID || '0' ,
//                 commodityCode: item.CommodityCode || 'none',
//                 issueuom: item.IssueUOM || '0',
//                 notes: item.Notes || 'none',
//                 obsoleteClass: item.Obsolete_Class || 'none',
//                 styleimage: item.StyleImage || "none",
//                 supplimentaryunits: item.SupplimentaryUnits || 'none',
//                 batchcontrol: item.BatchControl || "false" ,
//                 live: item.Live || false ,
//                 stockingtype: item.StockingType || '0',
//                 country: item.CountryID || 'uk',
//                     }));
//               const Data = processedData_.map(addImageKey);
//               setData(Data);
//               //console.log('#############Card##############View ',Data)

//               //console.log("{`product/${product.styleimage}`}")
//           }
//         }
//       }, [items, status]);


//       useEffect(() => {
//         // Define the handleClick function globally or attach it to the window object
//         window.handleClick = (e) => {
//           console.log('Span clicked!', e);
//           // Your click handler logic here
//         };
//       }, []);



//       const dataSourceSettings = {
// 		dataFields: [
// 			'productid: string',
//             'description: string',
//             'category1id: string',
//             'category2id: string',
//             'category3id: string',
//             'weight: number',
//             'classid: string',
//             'commodityCode: string',
//             'issueuom: string',
//             'notes: string',
//             'obsoleteClass: string',
//             'styleimage: string',
//             'supplimentaryunits: string',
//             'batchcontrol: bool',
//             'live: bool',
//             'stockingtype: string',
//             'country: string',
// 		]
// 	};



//       const columns = [
//         { 
//           label: 'Product ID', 
//           dataField: 'productid',
//           formatFunction: function (settings) {
//             settings.template = `<span onClick="handleClick(event)" class="smart-badge smart-badge-dark">${settings.value}</span>`;
//           }
        
        
//         },
//         { label: 'Description', dataField: 'description' },
//         { label: 'Category 1', dataField: 'category1id' },
//         { label: 'Category 2', dataField: 'category2id' },
//         { label: 'Category 3', dataField: 'category3id'},
//         { label: 'Weight', dataField: 'weight' },
//         { label: 'Class', dataField: 'classid' },
//         { label: 'Commodity Code', dataField: 'commodityCode'},
//         { label: 'Issue UOM', dataField: 'issueuom' },
//         { label: 'Notes', dataField: 'notes' },
//         { label: 'Obsolete Class', dataField: 'obsoleteClass' },
//         { label: 'Style Image', dataField: 'styleimage',image: true },
//         { label: 'Supplimentary Units', dataField: 'supplimentaryunits' },
//         { label: 'Batch Control', dataField: 'batchcontrol'},
//         { label: 'Live', dataField: 'live' },
//         { label: 'Stocking Type', dataField: 'stockingtype' },
//         { label: 'Country', dataField: 'country' },
//       ];
//         const collapsible = true;

//         const coverField = 'styleimage';
//         const headerPosition = 'top';
//         const coverMode = 'fit';
//         const titleField = 'productid';
//         const layout  = {
//           cardVertical: true,
//           cardMinWidth: 300,
//           rowMinHeight: 45
//       }


//        ///////////////////////////////Row Click handlers

//   const handleAllProductRowClick = (event) => {
    
//         console.log('event.detail.row.data  = ',event.detail)
//         // const productid = event.detail.row.data.productid;
//         // if (productid) { 
//         //     const clickdata = {
//         //         productid : productid,
//         //         description : event.detail.row.data.description,
//         //         category1id : event.detail.row.data.category1id,
//         //         category2id : event.detail.row.data.category2id, 
//         //         category3id : event.detail.row.data.category3id,
//         //         classid : event.detail.row.data.classid,
//         //         commodityCode : event.detail.row.data.commodityCode,
//         //         obsoleteClass: event.detail.row.data.obsoleteClass,
//         //         live: event.detail.row.data.live,
//         //         batchcontrol: event.detail.row.data.batchcontrol,
//         //         styleimage: event.detail.row.data.styleimage,
//         //         country: event.detail.row.data.country,


//         //     };
//         //     /////////////// Store select product data in to store
//         //     const data1 = addImageKey(clickdata)

//         //     dispatch(setSelectProduct(data1));
//         //     console.log('selected businessid store  = ',data1)
            
//         // }
//       };

        
//     return (
// 		<div>
// 			<CardView
// 				        id="cardViewAllproduct"
//                 ref={AllProductcardview}
//                 dataSourceSettings={dataSourceSettings}
// 				        dataSource={Data}
// 				        columns={columns}
// 				        collapsible={collapsible}
//                 //layout={layout}
//                 //editable = {true}
//                 coverMode={coverMode}
//                 headerPosition={headerPosition}
// 				        coverField={coverField}
// 				        titleField={titleField}
//                 onOpen={handleAllProductRowClick}
// 			></CardView>
// 		</div >
// 	)
// }




/////////////// Grid Card View

import React from 'react';
import { useState, useEffect,useMemo } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import {Smart, Grid } from 'smart-webcomponents-react/grid';
import { CardView } from 'smart-webcomponents-react/cardview';
import { useRef } from "react";
import {setSelectProduct} from '../store/slices/e4kTblProductSelectSlice';
import {useGetAllProductsQuery} from  '../store/services/e4kTblProduct';

import { 
  resetSelectProductPropertySize } from '../store/slices/e4kTblProductPropertySizeRangeSelect';

  import { 
  
    resetSelectProductPropertyTypesValues 
  } from '../store/slices/e4kTblProductProductPropertyTypeValues';

  import {
    resetSelectProductPropertyColour} from '../store/slices/e4kTblProductPropertyColourSelect'

  import {  
    resetSelectProductSalesPeople
} from '../store/slices/e4kTblProductSalesPeopleAdd';

import { 
  resetSelectProductProperty ,
  
} from '../store/slices/e4kTblProductPropertyAddSelect';
const addImageKey = (record) => {
  if(record.styleimage){
      const imagePathParts = record.styleimage.split('\\');
      const imageName = imagePathParts[imagePathParts.length - 1];
      return { ...record, styleimage: "../product/".concat(imageName) };
  } else {
    return { ...record, styleimage: "" };
  }
};

const EchoProductCard = React.memo(() => {
    const [Data, setData] = useState([]);
    const CompanyallProductCard = useSelector((state) => state.selectCompanyid.Companyid);
    const [companyid, setCompanyid] = useState(CompanyallProductCard);
    const AllProductcardview = useRef();
    const dispatch = useDispatch();
    //const items = useSelector((state) => state.dataProduct.items);
    //const status = useSelector((state) => state.dataProduct.status);
    //const error = useSelector((state) => state.dataProduct.error);
    const NonLiveProductcard = useSelector((state) => state.selectNonLiveProduct.selectNonLiveproduct);

    const { data:allproductdata, error:allproducterror, isLoading:allproductisLoading, isError:allproductisError } =  useGetAllProductsQuery(companyid);
    
    useEffect(() => {
      if (allproductdata) {
        if (!allproductdata) return [];
  
        const sss_josn = allproductdata.e4kTblproductProductAll.map(jsonString => JSON.parse(jsonString));
        
        if (NonLiveProductcard === false){
          const sss = sss_josn.filter(jsonString => jsonString.Live !== false);
          
          const processedData = sss.map(item => ({
          productid: item.ProductID,
          description: item.Description,
          category1id: item.Category1ID,
          category2id: item.Category2ID,
          category3id: item.Category3ID,
          weight: item.Weight,
          classid: item.ClassID,
          commodityCode: item.CommodityCode,
          Nominal : item.Nominal,
          StockingUOM: item.StockingUOM,
          issueuom: item.IssueUOM,
          notes: item.Notes,
          obsoleteClass: item.Obsolete_Class,
          styleimage: item.StyleImage,
          supplimentaryunits: item.SupplimentaryUnits,
          batchcontrol: item.BatchControl,
          live: item.Live,
          stockingtype: item.StockingType,
          country: item.CountryID,
        }));
        const Data = processedData.map(addImageKey);
        
        setData(Data);
        } else if (NonLiveProductcard === true) {

        const sss = sss_josn.filter(jsonString => jsonString.Live === false);
        const processedData = sss.map(item => ({
          productid: item.ProductID,
          description: item.Description,
          category1id: item.Category1ID,
          category2id: item.Category2ID,
          category3id: item.Category3ID,
          weight: item.Weight,
          classid: item.ClassID,
          commodityCode: item.CommodityCode,
          Nominal : item.Nominal,
          StockingUOM: item.StockingUOM,
          issueuom: item.IssueUOM,
          notes: item.Notes,
          obsoleteClass: item.Obsolete_Class,
          styleimage: item.StyleImage,
          supplimentaryunits: item.SupplimentaryUnits,
          batchcontrol: item.BatchControl,
          live: item.Live,
          stockingtype: item.StockingType,
          country: item.CountryID,
        }));
        const Data = processedData.map(addImageKey);
        
        setData(Data);
      }
      }
    }, [allproductisLoading, allproductdata,NonLiveProductcard]);




    const dataSource11 = useMemo(() => new Smart.DataAdapter({
        dataSource: Data,
        dataFields: [
          'productid: string',
          'description: string',
          'category1id: string',
          'category2id: string',
          'category3id: string',
          'weight: number',
          'classid: string',
          'commodityCode: string',
          'Nominal: string',
          'StockingUOM: string',
          'issueuom: string',
          'notes: string',
          'obsoleteClass: string',
          'styleimage: string',
          'supplimentaryunits: string',
          'batchcontrol: bool',
          'live: bool',
          'stockingtype: string',
          'country: string',
        ],
      }), [Data]);



      const columns = [

        
        { 
          label: 'Product ID', 
          dataField: 'productid',
          cellsClassName : 'product-title-card',
        
        },{ label: '', dataField: 'styleimage' ,template: 'image',cardHeight: 6},
        { label: 'Description', dataField: 'description', cellsClassName : 'product-title-des' },
        { label: 'Category1', dataField: 'category1id' },
        { label: 'Category2', dataField: 'category2id' },
        { label: 'Category3', dataField: 'category3id'},
        { label: 'Weight', dataField: 'weight' },
        { label: 'Class', dataField: 'classid' },
        { label: 'Commodity Code', dataField: 'commodityCode'},
        { label: 'Nominal', dataField: 'Nominal' },
        { label: 'Issue UOM', dataField: 'issueuom' },
        { label: 'Stocking UOM', dataField: 'StockingUOM'},
        { label: 'Notes', dataField: 'notes' },
        { label: 'Obsolete Class', dataField: 'obsoleteClass' },
        { label: 'Supplimentary Units', dataField: 'supplimentaryunits', cellsClassName : 'product-list-height' },
        { label: 'Batch Control', dataField: 'batchcontrol'},
        { label: 'Live', dataField: 'live' },
        { label: 'Stocking Type', dataField: 'stockingtype' },
        { label: 'Country of Origin', dataField: 'country' },
      ];
       

        
      const behavior = {
        columnResizeMode: 'growAndShrink',
      };
    
      const filtering = {
        enabled: true,
        filterRow: {
          visible: true,
        },
      };
    
      const appearance = {
        alternationCount: 2,
        showRowHeader: true,
      };
    
      const paging = {
        enabled: true,
        pageSize: 500,
      };
    
      const pager = {
        visible: true,
      };
    
      const sorting = {
        enabled: true,
        mode: 'many'
      };
    
      const editing = {
        enabled: false,
      };
    
      const selection = {
        enabled: true,
        allowCellSelection: false,
        allowRowHeaderSelection: true,
        allowColumnHeaderSelection: true,
        mode: 'extended',
      };
    
      const header = {
        visible: true,
        buttons: ['filter','sort','search']
      };
    
      const grouping = {
        enabled: true,
      };

       ///////////////////////////////Row Click handlers

  const handleAllProductRowClick = (event) => {
    

    dispatch(resetSelectProductPropertySize())
    dispatch(resetSelectProductPropertyColour());
    dispatch(resetSelectProductPropertyTypesValues());
    dispatch(resetSelectProductSalesPeople());
    dispatch(resetSelectProductProperty());

        const productid = event.detail.row.data.productid;
        if (productid) { 
            const clickdata = {
                productid : productid,
                description : event.detail.row.data.description,
                category1id : event.detail.row.data.category1id,
                category2id : event.detail.row.data.category2id, 
                category3id : event.detail.row.data.category3id,
                classid : event.detail.row.data.classid,
                commodityCode : event.detail.row.data.commodityCode,
                Nominal: event.detail.row.data.Nominal,
                obsoleteClass: event.detail.row.data.obsoleteClass,
                issueuom: event.detail.row.data.issueuom,
                StockingUOM: event.detail.row.data.StockingUOM,
                stockingtype: event.detail.row.data.stockingtype,
                weight: event.detail.row.data.weight,
                supplimentaryunits: event.detail.row.data.supplimentaryunits || 'none',
                notes: event.detail.row.data.notes || 'none',
                live: event.detail.row.data.live,
                batchcontrol: event.detail.row.data.batchcontrol,
                styleimage: event.detail.row.data.styleimage,
                country: event.detail.row.data.country,


            };


            dispatch(setSelectProduct(clickdata));
            console.log('selected businessid store  = ',clickdata)
            
        }
      };

        
    return (
		<div>
			
      <Grid
        id = "tblproductallproductard"
        view='card'
        header={header}
        dataSource={dataSource11}
        columns={columns}
        appearance={appearance}
        behavior={behavior}
        selection={selection}
        paging={paging}
        pager={pager}
        sorting={sorting}
        editing={editing}
        filtering={filtering}
        //grouping={grouping}
        onRowClick={handleAllProductRowClick}
        className="product-cardview lg w-full"
      />
		</div >
	)
});

export default EchoProductCard;