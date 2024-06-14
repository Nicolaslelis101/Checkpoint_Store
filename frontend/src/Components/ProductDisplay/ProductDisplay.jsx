// src/Components/ProductDisplay/ProductDisplay.js
import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    if (!product) {
        return null; // Ou você pode retornar um spinner de carregamento ou um placeholder
    }

    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className='productdisplay-img-list'>
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className='productdisplay-right'>
                <h1>{product.name}</h1>
                <div className='productdisplay-right-star'>
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_dull_icon} alt="star" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className='productdisplay-right-price-old'>R${product.old_price}</div>
                    <div className='productdisplay-right-price-new'>R${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur quidem fugit, repellendus aliquam, labore quasi dolor consequuntur totam ab magnam sapiente itaque eius. Soluta accusamus sed facere consequatur! Quia, magni.
                </div>
                <button onClick={() => addToCart(product.id)}>ADICIONAR AO CARRINHO</button>
            </div>
        </div>
    );
};

export default ProductDisplay;
