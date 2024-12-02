// components/AdminLayout.js
import React from 'react';
import Header from '../header';
import Footer from '../footer';
import Script from 'next/script';
// import RootLayout from '../layout';




const CustomerLayout = ({ children }) => {
  
  return (
    <div>
        <Script 
            src="/assets/js/jquery-1.12.4.min.js" 
        />
        <Script 
            src="/assets/js/bootstrap.min.js" 
        />

        {/* <RootLayout> */}

          
        <Header />   
            <main>{children}</main>
        <Footer />


        {/* </RootLayout> */}


       
      
    </div>
  );
};

export default CustomerLayout;
