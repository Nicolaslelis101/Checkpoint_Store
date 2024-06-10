import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigador">
            <div className="descriptionbox-nav-box">Descrição</div>
            <div className="descriptionbox-nav-box fade">Análises (122)</div>
        </div>
        <div className='descriptionbox-description'>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Repudiandae obcaecati amet fugit et eaque sequi numquam doloribus. 
                Animi dolores quae minima eveniet ullam laborum ex consectetur ratione mollitia, illo quasi?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Tenetur nihil, ad ullam sed modi odio doloribus cumque officiis iusto soluta distinctio vero quaerat, at aliquid. 
                Nostrum dolor exercitationem fugiat laboriosam.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox