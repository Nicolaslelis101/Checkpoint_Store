import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>Novos Produtos!</h2>
            <div className="hero-hand-icon">
                <p>Nova</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>Coleção</p>
            <p>Para Todos!</p>
            <Link to={'/GAMES'}>
              <div className="hero-latest-btn">
                  <div>Ultima coleção</div>
                  <img src={arrow_icon} alt="" />
              </div>
            </Link>
        </div>
        <div className="hero-right">
           <img src={hero_image} alt="" />
        </div>
        
    </div>
  )
}

export default Hero