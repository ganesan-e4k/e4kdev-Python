import React, { useRef } from 'react';
import { useState,useEffect } from 'react';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { useSelector} from 'react-redux';
const E4kTblProductStandardDatePriceDropDownComponent = ({ propertydata, onSelect }) => {
  
  const inputRef = useRef(null);
  const [dataselectStdPriceDateColour,setdataselectStdPriceDateColour] = useState([])
  const [dataselectStdPriceDateSize,setdataselectStdPriceDateSize] = useState([])
  const [dataselectStdPriceDateProperty, setdataselectStdPriceDateProperty] = useState([]);
  const stdPricedatePropertyColour = useSelector((state) => state.selectProductAddPropertyColour.selectProductPropertyColour);
  const stdPricedatePropertyTypeValues = useSelector((state) => state.selectProductAddPropertyTypesValues.selectProductPropertyTypeValues);

  const stdPricedatePropertySize = useSelector(
    (state) => state.selectProductAddPropertySize.selectProductPropertySize
  );

  useEffect(() => {
    if (stdPricedatePropertyColour) {
      const Data = stdPricedatePropertyColour.map((prop) => ({
        colourid: prop.description,
      }));

      setdataselectStdPriceDateColour(Data);
    }
  }, [stdPricedatePropertyColour]);


  useEffect(() => {
    if (stdPricedatePropertySize && stdPricedatePropertySize.length > 0) {
      const Data = stdPricedatePropertySize.map((prop) => ({
        values: prop.values,
      }));
      
      setdataselectStdPriceDateSize(Data);
    }
  }, [stdPricedatePropertySize]);




  useEffect(() => {
    if (stdPricedatePropertyTypeValues ) {
      const data11 = stdPricedatePropertyTypeValues.filter(prop2 => prop2.propertyid === propertydata.propertyid)
      const Data = data11.map((prop) => ({
        propertyid: prop.propertyid,
        proptypeValues: prop.proptypeValues
      }));
     



      //findExtraPropertiesTypeValues();
      setdataselectStdPriceDateProperty(Data);
    }
  }, [stdPricedatePropertyTypeValues]);





  // Handle dropdown change dynamically
  const handleDropDownonChangeStandardDatePrice = (e) => {
    
    const selectedItem = inputRef.current.selectedValues; 
    if (onSelect) {
      onSelect(propertydata.description, selectedItem); 
      //inputRef.current.selectedValues = selectedItem;
    }
  };

  return (
    <>
      <DropDownList
        ref={inputRef} // Dynamic ref based on property name
        id={`TblProductpropertiesDropdownStandarddatePricemat-${propertydata.description}`} 
         filterable
        // selectedIndexes={[0]}
        selectionMode="checkBox"
        placeholder={`Select ${propertydata.description}`} 
        dataSource={
            propertydata.description ==='Colour' ? 
                    dataselectStdPriceDateColour.map(col => col.colourid): 
                        propertydata.description ==='Size' ? dataselectStdPriceDateSize.map(col => col.values):
                        dataselectStdPriceDateProperty.map(col => col.proptypeValues)} 
        onClose={(e) => handleDropDownonChangeStandardDatePrice(e)}
      />
    </>
  );
};

export default E4kTblProductStandardDatePriceDropDownComponent;
