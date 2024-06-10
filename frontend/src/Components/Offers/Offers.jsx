import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div className='offercs'>
        <div className="offers-left">
            <h1>Exclusivo</h1>
            <h1>Oferta Relâmpago</h1>
            <p>CORRA ANTES QUE ACABE!</p>
            <button>Veja Agora!</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers