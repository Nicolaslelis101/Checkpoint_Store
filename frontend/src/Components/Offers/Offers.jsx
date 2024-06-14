import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { Link } from 'react-router-dom'

export const Offers = () => {
  return (
    <div className='offercs'>
        <div className="offers-left">
            <h1>Exclusivo</h1>
            <h1>Oferta Relâmpago</h1>
            <p>CORRA ANTES QUE ACABE!</p>
            <Link to="/OFERTA DO DIA">
              <button>Veja Agora!</button>
            </Link>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers