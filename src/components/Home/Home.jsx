import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import en from '../../translation/en';
import geo from '../../translation/geo';
import './Home.css'
import ProductCard from "../Product/Product";
import { useSelector } from 'react-redux';
import SortDropdown from "../Dropdown/SortDropdown";
import FilterDropDown from "../Dropdown/FilterDropDown";


function Home() {
    const allProducts = useSelector((state) => state.cart.allItems);
    const navigate = useNavigate();
    const [content, setContent] = useState(en);
    const [lan, setLan] = useState("en")
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const lan = localStorage.getItem("language");
        if (lan) {
            lan === "en" ? changeToEn() : changeToGeo();
        }
        setSearchResults(allProducts);
    }, [allProducts]);


    const handleSearch = (searchInput) => {
        const filteredResults = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const changeToEn = () => {
        setContent(en);
        setLan("en");
        localStorage.setItem("language", "en");
    };
    
    const changeToGeo = () => {
        setContent(geo);
        setLan("geo");
        localStorage.setItem("language", "geo");
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        selectedLanguage === "en" ? changeToEn() : changeToGeo();
    };


    const handleSort = (dir) => {
        const sortedResult = [...allProducts];
        if (dir === 'inc') {
            sortedResult.sort((a, b) => a.price - b.price);
        } else if (dir === "dec") {
            sortedResult.sort((a, b) => b.price - a.price);
        }
        applyFilter(sortedResult); 
    }
    
    const handleFilter = ({ categories, minPrice, maxPrice }) => {
        let filteredResults = [...allProducts];
        if (categories.length > 0) {
            filteredResults = filteredResults.filter(e => categories.includes(e.category));
        }
        
        filteredResults = filteredResults.filter(e => e.price >= minPrice && e.price <= maxPrice);
        
        applyFilter(filteredResults);
    }
    
    const applyFilter = (filteredResults) => {
        setSearchResults(filteredResults);
    }
    return (
        <>
            <Navbar onSearch={handleSearch} lan={lan} />
            <div className="container">        
                <div className="intro">
                    <h3 className="intro-title">{content.Home.introTitle}</h3>
                    <div className="dropdown">
                        <select className="select-box" value={lan} onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="geo">ქართული</option>
                        </select>
                        <div className="select-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                        </div>
                    </div>

                    <button className="btn-primary btn-intro" onClick={() => navigate('/auth')}>{content.Home.signIn}</button>

                    <div className="social__icons">
                        <a className="footer__social" href="https://www.facebook.com/">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Bold" enableBackground="new 0 0 24 24" height="512px"
                                viewBox="0 0 24 24" width="512px">
                                <g>
                                    <path
                                        d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z"
                                        data-original="#000000" className="active-path" data-old_color="#000000" fill="#CCCCCC" />
                                </g>
                            </svg>
                        </a>
                        <a className="footer__social" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                                id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: "new 0 0 512 512"}}
                                xmlSpace="preserve" width="512px" height="512px">
                                <g>
                                    <g>
                                        <g>
                                            <path
                                                d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016    c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992    c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056    c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152    c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792    c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44    C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568    C480.224,136.96,497.728,118.496,512,97.248z"
                                                data-original="#000000" className="active-path" data-old_color="#000000"
                                                fill="#CCCCCC" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                        <a className="footer__social" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512px" height="512px">
                                <g>
                                    <path
                                        d="m437 0h-362c-41.351562 0-75 33.648438-75 75v362c0 41.351562 33.648438 75 75 75h362c41.351562 0 75-33.648438 75-75v-362c0-41.351562-33.648438-75-75-75zm-180 390c-74.441406 0-135-60.558594-135-135s60.558594-135 135-135 135 60.558594 135 135-60.558594 135-135 135zm150-240c-24.8125 0-45-20.1875-45-45s20.1875-45 45-45 45 20.1875 45 45-20.1875 45-45 45zm0 0"
                                        data-original="#000000" className="active-path" data-old_color="#000000" fill="#CCCCCC" />
                                    <path
                                        d="m407 90c-8.277344 0-15 6.722656-15 15s6.722656 15 15 15 15-6.722656 15-15-6.722656-15-15-15zm0 0"
                                        data-original="#000000" className="active-path" data-old_color="#000000" fill="#CCCCCC" />
                                    <path
                                        d="m257 150c-57.890625 0-105 47.109375-105 105s47.109375 105 105 105 105-47.109375 105-105-47.109375-105-105-105zm0 0"
                                        data-original="#000000" className="active-path" data-old_color="#000000" fill="#CCCCCC" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="Product_section">
                    <h1>{content.Products.title}</h1>

                    <div style={{display: 'flex', gap: '1rem', alignItems: 'start'}}>
                        <SortDropdown lan={lan} onSort={handleSort}></SortDropdown>
                        <FilterDropDown lan={lan} onFilter={handleFilter}></FilterDropDown>
                    </div>
                </div>

                <div className="products-container">
                    <div className="products-inner-container">
                        {searchResults.map((e, key) => {
                            return <ProductCard key={key} lan={lan} product={e} />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
