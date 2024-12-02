import React, { useRef } from 'react';
import { useState,useEffect } from 'react';
import { DropDownList } from 'smart-webcomponents-react/dropdownlist';
import { useSelector} from 'react-redux';

const E4kTblProductStandardDatePriceColourDropDown = ({ propertydatacolour, onSelectColour }) => {

    const stdPriceColourDropdowninputRef = useRef(null);
  const [dataselectStdPriceDateColour,setdataselectStdPriceDateColour] = useState([])
  const stdPricedatePropertyColour = useSelector((state) => state.selectProductAddPropertyColour.selectProductPropertyColour);


  useEffect(() => {
    if (stdPricedatePropertyColour) {
      const Data = stdPricedatePropertyColour.map((prop) => ({
        colourid: prop.description,
      }));

      setdataselectStdPriceDateColour(Data);
    }
  }, [stdPricedatePropertyColour]);

  // Handle dropdown change dynamically
  const handleDropDownonChangeStandardDatePriceColour = (e) => {
     //console.log(stdPriceColourDropdowninputRef.current.selectedValues,'##################################')
    const selectedItem = stdPriceColourDropdowninputRef.current.selectedValues; 
    
    if (onSelectColour) {
        onSelectColour(propertydatacolour.description, selectedItem); 
    }
  };

  return (
    <div>
      
      <DropDownList
        ref={stdPriceColourDropdowninputRef} // Dynamic ref based on property name
        id={`TblProductpropertiesDropdownStandarddatePricematcolourdropdown`} // Dynamic id based on property name
         filterable
        // selectedIndexes={[0]}
        selectionMode="checkBox"
        placeholder={`Select Colour`} // Dynamic placeholder
        dataSource={dataselectStdPriceDateColour.map(col => col.colourid)} // Dynamically set the data source based on property values
        onClose={(e) => handleDropDownonChangeStandardDatePriceColour(e)} // Dynamic onChange handler
      />


    </div>
  )
}

export default E4kTblProductStandardDatePriceColourDropDown