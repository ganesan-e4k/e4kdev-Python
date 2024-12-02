import React, { useState } from 'react';

const GridComponent = ({
  dropDownMode,
  dataSourcePrice,
  dataSourceSettingsPrice,
  selectionPrice,
  layoutPrice,
  editingPrice,
  columnsPrice,
  filteringPrice,
  headerPrice,
  message,
  selectProduct,
  handleProductRowClick,
  dropdownGridCustomerPriceProductRelateRefCustomer,
}) => {
  // Inline style object for the grid
  const gridStyles = {
    backgroundColor: '#f8f8f8',     // Light background color
    padding: '20px',                 // Padding around the grid
    border: '1px solid #ccc',       // Border around the grid
    borderRadius: '8px',            // Rounded corners
    overflow: 'hidden',             // Prevent overflow
    fontFamily: 'Arial, sans-serif', // Font for the grid
  };

  // Inline style object for the dropdown button
  const dropdownButtonStyles = {
    backgroundColor: '#007bff',      // Dropdown background color
    color: '#fff',                   // Text color (white)
    padding: '10px 15px',            // Padding for the button
    borderRadius: '4px',             // Rounded corners for the button
    cursor: 'pointer',              // Change cursor on hover
    display: 'inline-flex',          // Ensure it displays properly
    alignItems: 'center',            // Align icon and text
    justifyContent: 'space-between', // Space between text and icon
  };

  // Inline style for the dropdown button icon
  const dropdownIconStyles = {
    fontSize: '18px',                // Size of the dropdown arrow
    marginLeft: '8px',               // Space between text and icon
  };

  // Inline style for action button inside the grid
  const actionButtonStyles = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    cursor: 'pointer',
    padding: '8px 12px',
    border: 'none',
    backgroundColor: '#f1f1f1',      // Light background for action button
    borderRadius: '4px',             // Rounded corners for the action button
  };

  // Inline style for the dropdown container
  const dropdownContainerStyles = {
    maxHeight: '200px',
    overflowY: 'auto',               // Enable vertical scrolling for dropdown
    border: '1px solid #ccc',        // Border for dropdown container
    borderRadius: '4px',             // Rounded corners
    backgroundColor: '#fff',         // White background for the dropdown
  };

  return (
    <div id="CustomerPriceSetup" style={gridStyles}>
      {/* Action button inside the grid */}
      <div style={actionButtonStyles}>
        <span className="smart-action-button">{selectProduct}</span>
      </div>

      {/* Dropdown button */}
      <div style={dropdownButtonStyles}>
        <span className="smart-action-button">{selectProduct}</span>
        <span className="smart-drop-down-button-icon" style={dropdownIconStyles} id="arrow" aria-hidden="true"></span>
      </div>

      {/* Grid component */}
      <Grid
        id="CustomerPriceSetup"
        ref={dropdownGridCustomerPriceProductRelateRefCustomer}
        dropDownMode={dropDownMode}
        dataSource={dataSourcePrice}
        dataSourceSettings={dataSourceSettingsPrice}
        selection={selectionPrice}
        layout={layoutPrice}
        editing={editingPrice}
        columns={columnsPrice}
        filtering={filteringPrice}
        header={headerPrice}
        onRowClick={handleProductRowClick}
        messages={message}
        setDropDownLabel={selectProduct}
        style={gridStyles}  // Apply grid styles directly to the Grid component
      >
        {/* Dropdown content */}
        <div style={dropdownContainerStyles}>
          {/* Dropdown options would go here */}
        </div>
      </Grid>
    </div>
  );
};

export default GridComponent;
