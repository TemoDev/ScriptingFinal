import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import en from '../../translation/en';
import geo from '../../translation/geo';
import './Product.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';

function ProductCard({ product, lan }) {
  const navigate = useNavigate();
  const [content, setContent] = useState(en);
  const dispatch = useDispatch();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
 
  useEffect(() => {
    setContent(lan === "en" ? en : geo);
    setButtonDisabled(product.amount === 0); 
  }, [lan, product.amount]); 

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleCartClick = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="product-card">
      <div className='product-image-container'>
        <img src={product.image} alt={product.name} className={isButtonDisabled ? "product-image product-image_disabled" : "product-image"} onClick={handleProductClick} />
      </div>
      <div className="product-details">
        <h2 className="product-name">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className={isButtonDisabled ? "add-to-cart add-to-cart_disabled" : "add-to-cart"} disabled={isButtonDisabled} onClick={handleCartClick}>{content.Products.ProductBtn}</button>
      </div>
    </div>
  );
}

export default ProductCard;
