import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'



export const Navbar = () => {
    
    const [menu,setMenu] = useState("HARDWARE");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    } 

  return (
    <div className='navbar'>
        <div className='nav-logo'> 
            <img src={logo} alt="logo"/>
            <p>CHECKPOINT STORE</p>
        </div>
        <img className='nav_dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("HARDWARE")}}><Link style={{textDecoration: 'none'}} to='/'>HARDWARE</Link>{menu==="HARDWARE"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("OFERTA DO DIA")}}><Link style={{textDecoration: 'none'}} to='/OFERTA DO DIA'>OFERTA DO DIA</Link>{menu==="OFERTA DO DIA"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("GAMES")}}><Link style={{textDecoration: 'none'}} to='/GAMES'>GAMES</Link>{menu==="GAMES"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("SOBRE NÓS")}}><Link style={{textDecoration: 'none'}} to='/SOBRE NÓS'>SOBRE NÓS</Link>{menu ==="SOBRE NÓS"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link style={{textDecoration: 'none'}} to='/Login'><button>LOGIN</button></Link>}
            <Link style={{textDecoration: 'none'}} to='/Cart'><img src={cart_icon} alt="carrinho"/></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar