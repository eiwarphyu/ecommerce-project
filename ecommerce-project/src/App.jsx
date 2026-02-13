import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import './App.css'
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { Tracking } from './pages/Tracking';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [cart, setCart] = useState([]);
  
  useEffect(()=>{
    axios.get('/api/cart-items?expand=product')
      .then((response)=>{
        setCart(response.data);
      })
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>}/>
      <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
      <Route path="orders" element={<OrdersPage cart={cart}/>}/>
      <Route path="tracking" element={<Tracking/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    
    
  )
}

export default App
