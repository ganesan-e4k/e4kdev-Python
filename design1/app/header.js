// "use client";
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// // import '../public/assets/styles/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../public/assets/style.css';
// import '../public/assets/styles/font-awesome.min.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// // Define the Header component
// export default function Header() {

//     const [activeMenu, setActiveMenu] = useState("Customer");
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//           if (typeof window.Smart !== 'undefined') {
//             window.Smart.License = '0F5715AC-07E9-458A-9E1A-CB3411404093';
//           } else {
//             window.Smart = {
//               License: '0F5715AC-07E9-458A-9E1A-CB3411404093',
//             };
//           }
//         }
//       }, []);

//     const handleMenuClick = (menu) => {
//       setActiveMenu(menu);
//     };
 
//   return (
//     <>
    
//     <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     {/* <!-- Start Header Top Area --> */}
//     <div className="header-top-area">
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
//                     <div className="logo-area">
//                         <a href="#">e4k echo SCM</a>
//                     </div>
//                 </div>
//                 <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">

//                 </div>
//             </div>
//         </div>
//     </div>
//     {/* <!-- End Header Top Area --> */}


//     {/* <!-- Main Menu area start-->  */}
//     <div className="main-menu-area">
//         <div className="container-fluid">
//             <div className="row">
// 				<div className="col-lg-1 col-md-1 col-xs-12">
// 					<img className="company-logo" src="/assets/images/ue-logo.gif" alt="" />
// 				</div>
//                 <div className="col-lg-11 col-md-11 col-xs-12">
//                     <div id="nav-top">
//                         <ul id="nav-desktop">
//                             <li className={activeMenu === "Customer" ? "current" : ""}>
//                                 <a href="#" onClick={() => handleMenuClick("Customer")}>Customer</a>
//                             <ul>
//                                 <li>
//                                 <Link href="/customer">Customer List</Link>
                                
//                                 </li>
//                             </ul>
//                             </li>
//                             <li className={activeMenu === "Product" ? "current" : ""}>
//                                 <a href="#" onClick={() => handleMenuClick("Product")}>Product</a>
//                             <ul>
//                                 <li>
//                                     <Link href="/product/productlist">Product List</Link>
//                                    {/* <a href="/product/productlist">Product List</a> */}
//                                 </li>
//                             </ul>
//                             </li>
//                             <li className={activeMenu === "Supplier" ? "current" : ""}>
//                                 <a href="#" onClick={() => handleMenuClick("Supplier")}>Supplier</a>
//                             <ul>
//                                 <li>
//                                     <Link href="/supplier">Supplier List</Link>  
//                                 </li>
//                             </ul>
//                             </li>
//                         </ul>
//                     </div>

//                 </div> 
//             </div>
//         </div>
//     </div>
//     {/* <!-- Main Menu area End-->	 */}


//     </>
//   );
// }

// "use client";
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../public/assets/style.css';
// import '../public/assets/styles/font-awesome.min.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import BootstrapModalmyprofile from "./template-popup/profileinfo";
// Define the Header component





////////////////////////////////////////////// Header Component /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
// import '../public/assets/styles/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/assets/style.css';
import '../public/assets/styles/font-awesome.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-resizable/css/styles.css';
import { DropDownList, ListItem } from 'smart-webcomponents-react/dropdownlist';
import { Menu, MenuItem, MenuItemsGroup } from 'smart-webcomponents-react/menu';
import { BsGearFill } from "react-icons/bs";
import BootstrapModalmyprofile from '../../design1/app/template-popup/ProfileInfo';


export default function Header() {
    const [activeMenu, setActiveMenu] = useState("");

    useEffect(() => {
    if (typeof window !== 'undefined') {
    if (typeof window.Smart !== 'undefined') {
        window.Smart.License = '0F5715AC-07E9-458A-9E1A-CB3411404093';
    } else {
        window.Smart = {
        License: '0F5715AC-07E9-458A-9E1A-CB3411404093',
        };
    }
    }
}, []);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/customer')) {
            setActiveMenu("Customer");
        } else if (currentPath.includes('/product')) {
            setActiveMenu("Product");
        } else if (currentPath.includes('/supplier')) {
            setActiveMenu("Supplier");
        }
    }, []);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };


    const [selectedStyle, setSelectedStyle] = useState('/assets/style.css'); // Default style

    useEffect(() => {
        // Function to update the stylesheet dynamically
        const updateStylesheet = (style) => {
            console.log("JHJHJHJHJHJHJHJHJHJHJHJHJHJH", style);
            let link = document.getElementById('dynamic-stylesheet');
            if (link) {
                console.log("link", link);
                link.href = `${style}`;
            } else {
                link = document.createElement('link');
                link.id = 'dynamic-stylesheet';
                link.rel = 'stylesheet';
                link.href = `${style}`;
                document.head.appendChild(link);
            }
        };

        updateStylesheet(selectedStyle);
    }, [selectedStyle]);

    const handleStyleChange = (event) => {
        setSelectedStyle(event.target.value);
    };

    const [showModalmyprofile, setShowModalmyprofile] = useState(false);

    const handleOpenModalmyprofile = () => {
      setShowModalmyprofile(true);
    };
  
    const handleCloseModalmyprofile = () => {
      setShowModalmyprofile(false);
    };	


    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
             <div className="header-top-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="logo-area">
                                <a href="#">e4k echo SCM</a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                            <div className='topbar-rightdiv'>
                                <div className='padding-top15 '>
                                    <select onChange={handleStyleChange}>
                                        <option value="/assets/style.css">Green Theme</option>
                                        <option value="/assets/style2.css">Blue Theme</option>
                                        <option value="/assets/style3.css">Red Theme</option>
                                    </select>
                                </div>
                                <div className="topbar-rightdiv-options margin-left15">
                                    <Menu id="top-menu" dropDownAppendTo="body">
                                        <MenuItemsGroup id="settings">
                                            <BsGearFill />
                                            <MenuItem>My Settings</MenuItem>
                                            <MenuItem>User Settings</MenuItem>
                                        </MenuItemsGroup>
                                        <MenuItemsGroup id="user-info">
                                            <div className="customer-name">GS</div>
                                            <MenuItem className="custfullname">Ganesan S</MenuItem>

                                            <MenuItem onClick={handleOpenModalmyprofile}>My profile</MenuItem>
                                            <MenuItem>Change Password</MenuItem>
                                            <MenuItem>Help & Support</MenuItem>
                                            <MenuItem>Logout</MenuItem>
                                        </MenuItemsGroup>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* End Header Top Area */}

            {/* Main Menu area start */}
            <div className="main-menu-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-1 col-md-1 col-xs-12">
                            <img className="company-logo" src="/assets/images/ue-logo.gif" alt="" />
                        </div>
                        <div className="col-lg-11 col-md-11 col-xs-12">
                            <div id="nav-top">
                                <ul id="nav-desktop">
                                    <li className={activeMenu === "Customer" ? "current" : ""}>
                                        <a href="#" onClick={() => handleMenuClick("Customer")}>Customer</a>
                                        {activeMenu === "Customer" && (
                                            <ul>
                                                <li>
                                                    <Link href="/customer">Customer List</Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className={activeMenu === "Product" ? "current" : ""}>
                                        <a href="#" onClick={() => handleMenuClick("Product")}>Product</a>
                                        {activeMenu === "Product" && (
                                            <ul>
                                                <li>
                                                    <Link href="/product/productlist">Product List</Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className={activeMenu === "Supplier" ? "current" : ""}>
                                        <a href="#" onClick={() => handleMenuClick("Supplier")}>Supplier</a>
                                        {activeMenu === "Supplier" && (
                                            <ul>
                                                <li>
                                                    <Link href="/supplier">Supplier List</Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <BootstrapModalmyprofile showModalmyprofile={showModalmyprofile} handleClosemyprofile={handleCloseModalmyprofile} />

            {/* Main Menu area End */}
        </>
    );
}
