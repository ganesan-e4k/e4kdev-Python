// components/AdminLayout.js
import React from 'react';
import BaseLayout from '../BaseLayout'

import Header from '../header';
import Footer from '../footer';
import Script from 'next/script';

const ProductLayout = ({ children }) => {
  return (
    <div>
        <Script 
            src="/assets/js/jquery-1.12.4.min.js" 
             
        />
        <Script 
            src="/assets/js/bootstrap.min.js" 
             
        />
        <Header />   
            <main>{children}</main>
        <Footer />
         
        
      
    </div>
  );
};

export default ProductLayout;
