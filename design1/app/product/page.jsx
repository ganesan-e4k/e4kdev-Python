"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChain, faChainBroken, faTh, faThList } from '@fortawesome/free-solid-svg-icons';
//import ProductGrid from "./ProductGrid";
import ProductGridPagination from "./ProductGridPagination";
import CreateProduct from "./CreateProduct";
//import e4kTblProduct from "../productapi/e4kTblProduct";

import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../store/slices/productSlice';

const addImageKey = (record) => {
    const imagePathParts = record.styleimage.split('\\');
    const imageName = imagePathParts[imagePathParts.length - 1];
    //console.log('imagePath: ' + imageName);
    return { ...record, styleimage: imageName };
};

const page = () => {
    const [isCardView, setIsCardView] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [Data, setData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);
	

    const dispatch = useDispatch();
    const items = useSelector((state) => state.data.items);
    const status = useSelector((state) => state.data.status);
    const error = useSelector((state) => state.data.error);

    const endcursor = useSelector((state) => state.data.endCursor);
    const hasnextpage = useSelector((state) => state.data.hasNextPage);
    const CompanyProductCreate = useSelector((state) => state.selectCompanyid.Companyid);

    

      useEffect(() => {
        if (status === 'succeeded') {
          const processedData = items.map(item => ({
            productid: item.productid,
                    description: item.description,
                    category1id: item.category1id?.description,
                    category2id: item.category2id?.description,
                    category3id: item.category3id?.description,
                    weight: item.weight,
                    classid: item.classid?.description,
                    commodityCode: item.commodityCode?.description,
                    issueuom: item.issueuom?.description,
                    notes: item.notes,
                    obsoleteClass: item.obsoleteClass?.description,
                    styleimage: item.styleimage,
                    supplimentaryunits: item.supplimentaryunits,
                    batchcontrol: item.batchcontrol,
                    live: item.live,
                    stockingtype: item.stockingtype?.description,
                    country: item.countryid?.country,
          }));
          const Data = processedData.map(addImageKey);
            setData(Data);
          setLoading(false);

        }
      }, [items, status]);

   
	const [isColumn2Visible, setIsColumn2Visible] = useState(true);
    const pageCount = Math.ceil(Data.length / pageSize);

    const handleLayoutToggle = () => {
        setIsCardView(!isCardView);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
	const handleToggle = () => {
      setIsColumn2Visible(!isColumn2Visible);
    };   

	const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleProductEdit = () => {
        setShowModal(true)
    }

    const handleNewProductCreate = () => {


    }


    const renderPaginationButtons = () => {
        if (pageCount <= 1) return null;
    
        const pages = [];
        const maxPages = 5; // Number of pages to show in pagination
        const halfMaxPages = Math.floor(maxPages / 2);
    
        let startPage = Math.max(1, currentPage - halfMaxPages);
        let endPage = Math.min(pageCount, currentPage + halfMaxPages);
    
        if (currentPage <= halfMaxPages) {
            endPage = Math.min(maxPages, pageCount);
        } else if (currentPage + halfMaxPages >= pageCount) {
            startPage = Math.max(1, pageCount - maxPages + 1);
        }
    
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{ color: currentPage === i ? '#fff' : 'inherit', background: currentPage === i ? '#00c292' : '#a9a9a973' }}
                    disabled={currentPage === i}
                >
                    {i}
                </button>
            );
        }
    
        return (
            <div className="pagination-buttons" style={{ display: 'flex' }}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'disabled' : ''}
                    disabled={currentPage === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {startPage > 1 && (
                    <>
                        <button onClick={() => handlePageChange(1)}>1</button>
                        {startPage > 2 && <span style={{ margin: '0.5rem' }}>...</span>}
                    </>
                )}
                {pages}
                {endPage < pageCount && (
                    <>
                        {endPage < pageCount - 1 && <span style={{ margin: '0.5rem' }}>...</span>}
                        <button onClick={() => handlePageChange(pageCount)}>{pageCount}</button>
                    </>
                )}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === pageCount ? 'disabled' : ''}
                    disabled={currentPage === pageCount}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        );
    };
    
    const fetchMoreProducts = () => {
        dispatch(fetchProduct({ after: endcursor, companyid: CompanyProductCreate, first: 1000 }));
      };
    
    return (
        <>
            {/* <!-- Breadcomb area Start--> */}
            <div className="breadcomb-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="breadcomb-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="breadcomb-wp">
                                            <div className="breadcomb-ctn">
                                                <span><a href="#" onClick={handleNewProductCreate}> <i className="fa fa-plus"></i> Create</a> | </span>
                                                <span><a href=""> <i className="fa fa-trash"></i> Delete</a> | </span>
                                                <span><a href="" onClick={handleProductEdit}> <i className="fa fa-pencil"></i> Edit</a></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="breadcomb-wp right-barmenu">
                                            <div className="breadcomb-ctn">
                                                <span><a href="#" onClick={handleToggle}><FontAwesomeIcon icon={isColumn2Visible ? faChain : faChainBroken} /></a> | </span>
                                                <span><a href="#" id="layoutview" onClick={handleLayoutToggle}><FontAwesomeIcon icon={isCardView ? faTh : faThList} /></a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcomb area End--> */}

            {/* <!-- Data Table area Start--> */}
            <div className="data-table-area">
                <div className="container-fluid">
                    <div className="row">
                        <div id="column1" className={isColumn2Visible ? 'col-md-9' : 'col-md-12'}>
							<div className="cmp-tb-hd">
                                        <h2>Product list</h2>
							</div>
                            {isCardView ? (
                                <div id="cardview" className="" style={{ display: 'block' }}>
                                    {/* Card view content */}
                                    {loading && <p>Loading...</p>}
                                    {Data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((product, index) => (
                                        <div key={index} className={`col-lg-3 col-md-6 col-sm-6 col-xs-12 ${index >= 1 ? 'sm-res-mg-t-30' : ''} ${index >= 2 ? 'tb-res-mg-t-30' : ''} ${index >= 3 ? 'dk-res-mg-t-30' : ''}`}>
                                            <div className="product-list">
                                                <div className="product-win">
                                                    <div className="product-img">
                                                        <img src={`product/${product.styleimage}`} alt={product.productid} />
                                                    </div>
                                                </div>
                                                <div className="product-ctn">
                                                        <h5>Product ID: {product.productid}</h5>
                                                </div>
                                                <div className="product-info-list">
                                                    <div className="product-cat">
                                                        <strong>Description: </strong><span>{product.description}</span>
                                                    </div>
                                                    <div className="product-cat">
                                                        <strong>Category1 ID: </strong><span>{product.category1id}</span>
                                                    </div>
                                                    <div className="product-cat">
                                                        <strong>Category2 ID: </strong>
                                                        <span>{product.category2id}</span>
                                                    </div>
                                                    <div className="product-cat">
                                                        <strong>Category3 ID: </strong>
                                                        <span>{product.category3id}</span>
                                                    </div>
                                                    <div className="product-cat">
                                                        <strong>Class:</strong>
                                                        <span>{product.class}</span>
                                                    </div>
                                                    <div className="product-cat">
                                                        <strong>Commodity Code:</strong>
                                                        <span>{product.commodityCode}</span>
                                                    </div>
                                                    <div className="product-cat">
                                                        <strong>Obsolete Class:</strong>
                                                        <span>{product.obsoleteClass}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Pagination buttons */}
                                    <div className='col-md-12'>
                                    <div>{renderPaginationButtons()}</div>
                                    </div>
                                    {/* <div>
                                    {hasnextpage && <button onClick={() => fetchMoreProducts()}>Load More</button>}
                                    </div> */}
                                </div>
                            ) : (
                                <div id="gridview" className="data-table-list" style={{ display: 'block' }}>
                                    <ProductGridPagination/>
									{/* <ProductGrid /> */}
                                </div>
                            )}
                        </div>
                        <div id="column2" className="col-md-3 col-xs-12" style={{ display: isColumn2Visible ? 'block' : 'none' }}>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="wb-traffic-inner e4k-shadow sm-res-mg-t-30 tb-res-mg-t-30">
                                    <div className="website-traffic-ctn">
                                        <h2><span className="counter">50,000</span></h2>
                                        <p>Total Website Traffics</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="wb-traffic-inner e4k-shadow sm-res-mg-t-30 tb-res-mg-t-30">
                                    <div className="website-traffic-ctn">
                                        <h2><span className="counter">90,000</span>k</h2>
                                        <p>Website Impressions</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="wb-traffic-inner e4k-shadow sm-res-mg-t-30 tb-res-mg-t-30 dk-res-mg-t-30">
                                    <div className="website-traffic-ctn">
                                        <h2>$<span className="counter">40,000</span></h2>
                                        <p>Total Online Sales</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="wb-traffic-inner e4k-shadow sm-res-mg-t-30 tb-res-mg-t-30 dk-res-mg-t-30">
                                    <div className="website-traffic-ctn">
                                        <h2><span className="counter">1,000</span></h2>
                                        <p>Total Support Tickets</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Data Table area End--> */}
            <CreateProduct showModal={showModal} handleClose={handleCloseModal} />
        </>
    );
};

export default page;
