import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementAmount, decrementAmount, removeItem, clearCart, checkout } from '../../store/cartSlice';
import './Cart.css';
import Navbar from '../Navbar/Navbar';
import en from '../../translation/en';
import geo from '../../translation/geo';

const Cart = () => {
    const allProducts = useSelector((state) => state.cart.allItems);
    const cartItems = useSelector(state => state.cart.allItems.filter(c => c.quantity > 0));
    const dispatch = useDispatch();
    const [content, setContent] = useState(en);
    const [lan, setLan] = useState("en");
    const [searchResults, setSearchResults] = useState(cartItems);

    // Use a flag to initialize language only once
    useEffect(() => {
        const language = localStorage.getItem("language");
        if (language) {
            language === "en" ? changeToEn() : changeToGeo();
        }
    }, []);

    // Update searchResults whenever cartItems changes
    useEffect(() => {
        setSearchResults(cartItems);
    }, [allProducts]);

    const handleSearch = (searchInput) => {
        const filteredResults = cartItems.filter(product =>
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

    const handleIncrement = (id) => {
        dispatch(incrementAmount(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementAmount(id));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };
    
    const handleCheckout = () => {
        dispatch(checkout());
        alert("Thank you for your purchase");
    };

    console.log(cartItems);

    return (
        <>
            <Navbar onSearch={handleSearch} lan={lan}></Navbar>
            <div className="container cart-container">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {searchResults.length > 0 ? (
                        searchResults.map((c, index) => (
                            <div className="blog-card" key={index}>
                                <div className="meta">
                                    <div className="photo" style={{backgroundImage: `url(${c.image})`}}></div>
                                </div>
                                <div className="description">
                                    <h1>{c.title}</h1>
                                    <h2>{c.category}</h2>
                                    <p>{c.description}</p>
                                    <p>${c.price}</p>
                                    <p className="item-quantity">
                                        <button className='quantity-btn' onClick={() => handleDecrement(c.id)}>-</button>
                                        <span>{c.quantity}</span>
                                        <button className='quantity-btn' onClick={() => handleIncrement(c.id)}>+</button>
                                    </p>
                                    <button className='btn-primary' style={{backgroundColor: "#dc3545"}} onClick={() => handleRemove(c.id)}>{content.Cart.remove}</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 style={{marginTop: '50%'}}>{lan === "en" ? "No item selected" : "კალათა ცარიელია."}</h1>
                    )}
                </div>
                <div>
                    <div className="cart-summary">
                        <h2>{content.Cart.summary}</h2>
                        <div>
                            <p>{content.Cart.total}: ${calculateTotal()}</p>
                            <button className='btn-primary' onClick={handleCheckout}>{content.Cart.checkout}</button>
                        </div>
                        <button className='btn-primary' style={{backgroundColor: "#dc3545"}} onClick={handleClearCart}>{content.Cart.clear}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
