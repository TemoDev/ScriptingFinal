import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import Navbar from '../Navbar/Navbar';
import en from '../../translation/en';
import geo from '../../translation/geo';

const ProductDetail = () => {
    const { id } = useParams();
    const product = useSelector(state => state.cart.allItems.find(item => item.id === parseInt(id)));
    const [content, setContent] = useState(en);
    const [lan, setLan] = useState("en")

    useEffect(() => {
        const lan = localStorage.getItem("language");
        if (lan) {
            lan === "en" ? changeToEn() : changeToGeo();
        }
    }, []);

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
    if (!product) {
        return <div className="product-detail-page">Product not found!</div>;
    }
    console.log(product);
    console.log(`../../assets/${product.image}`);

    return (
        <>
            <Navbar lan={lan}></Navbar>
            <div className="container detail-container">
                <div className="detail-image">
                    <img src={`../${product.image}`} alt={product.title} className="product-image" />
                </div>
                <div className="detail-content">
                    <p className='detail-category'>{product.category}</p>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>{content.ProductDetail.price}: <b>${product.price}</b></p>
                    <p>{content.ProductDetail.amount}: <b>{product.amount}</b></p>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
