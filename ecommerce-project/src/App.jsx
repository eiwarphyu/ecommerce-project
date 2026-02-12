import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import './App.css'
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { Tracking } from './pages/Tracking';

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />}/>
      <Route path="checkout" element={<CheckoutPage/>}/>
      <Route path="orders" element={<OrdersPage/>}/>
      <Route path="tracking" element={<Tracking/>}/>
    </Routes>
    
  )
}

export default App
