import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import About from './Pages/About';
import Product from './Pages/Product';
import CartItems from './Components/CartItems/CartItems';
import LoginSingup from './Pages/LoginSingup';
import Banner_Games from './Components/Assets/Banner_Games.png';
import Banner_Oferta_Dia from './Components/Assets/Banner_Oferta_Dia.png';
import Footer from './Components/Footer/Footer';
import Payment from './Pages/Payment'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/HARDWARE' element={<ShopCategory category="HARDWARE" />} />
          <Route path='/OFERTA DO DIA' element={<ShopCategory banner={Banner_Oferta_Dia} category="OFERTA DO DIA" />} />
          <Route path='/GAMES' element={<ShopCategory banner={Banner_Games} category="GAMES" />} />
          <Route path='/SOBRE NÓS' element={<About />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<CartItems />} />
          <Route path='/login' element={<LoginSingup />} />
          <Route path='/payment' element={<Payment />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
