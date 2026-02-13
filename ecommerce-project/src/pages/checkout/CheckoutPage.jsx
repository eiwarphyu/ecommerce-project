import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async ()=>{
      let response = await axios.get('api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);

      response = axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    
    fetchCheckoutData();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" href="../../../public/images/cart-favicon.png" />
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>

          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}