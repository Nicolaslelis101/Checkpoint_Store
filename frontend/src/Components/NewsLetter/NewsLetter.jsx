import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Não Quer Perder as Ofertas no Seu Email?</h1>
        <p>Se inscreva na nossa newsletter e fique ligado!</p>
        <div>
            <input type="email" placeholder='Seu email'/>
            <button>Inscrever</button>
        </div>
    </div>
  )
}

export default NewsLetter
