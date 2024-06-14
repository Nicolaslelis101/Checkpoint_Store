// src/Components/Breadcrums/Breadcrum.js
import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

export const Breadcrum = ({ product }) => {
    if (!product) {
        return null; // Ou você pode retornar um spinner de carregamento ou um placeholder
    }

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="arrow" /> SHOP <img src={arrow_icon} alt="arrow" /> {product.tag} <img src={arrow_icon} alt="arrow" /> {product.name} <img src={arrow_icon} alt="arrow" />
        </div>
    );
};

export default Breadcrum;
