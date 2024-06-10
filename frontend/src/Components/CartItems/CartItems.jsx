import React, { useContext, useState } from 'react';
import './CartItems.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_icon.png';
import { calcularTotalComDesconto } from './Pagamentos/Calculadora'; 
import MeiosdePagamentos from './Pagamentos/MeiosdePagamentos'; 

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const pagamentoPadrao = Object.keys(MeiosdePagamentos)[0]; 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(pagamentoPadrao);
  const navigate = useNavigate();

  const finalizePurchase = () => {
    console.log("Iniciando pagamento...");
    console.log("Pagamento concluído, redirecionando para a página de pagamento...");
    navigate('/payment');
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Produtos</p>
        <p>Título</p>
        <p>Preço</p>
        <p>Quantidade</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>R${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>R${e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Carrinho</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>R${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Frete</p>
              <p>Grátis</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>R${calcularTotalComDesconto(getTotalCartAmount(), selectedPaymentMethod).toFixed(2)} {selectedPaymentMethod === 'credit_card_installments' && '(5x com juros)'}</h3>
              
            </div>
          </div>
          <div>
            <label htmlFor="payment-method" className="cartitems-payment-label">Escolha o método de pagamento:</label>
            <select
              id="payment-method"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="cartitems-payment-select"
            >
              <option value="">Selecione...</option>
              {Object.keys(MeiosdePagamentos).map((metodo) => (
                <option key={metodo} value={metodo}>{MeiosdePagamentos[metodo].nome}</option>
              ))}
            </select>
          </div>
          <button onClick={finalizePurchase} className="cartitems-total-button">Finalizar compra</button>
        </div>
        <div className="cartitems-promocode">
          <p>Se tiver um código de desconto, digite aqui</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Código' />
            <button>Concluir</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
