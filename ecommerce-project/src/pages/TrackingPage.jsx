import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import './../components/Header.css';
import './TrackingPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {
  // const params = useParams();
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const productOrder = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = productOrder.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs*0.3) * 100;
  if(deliveryPercent > 100){
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" href="./../../public/images/tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100? "Delivered on " : "Arriving on "} 
            {dayjs(productOrder.
              estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
              {productOrder.product.name}
          </div>

          <div className="product-info">
            Quantity: {productOrder.quantity}
          </div>

          <img className="product-image" src={productOrder.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}