import { useState } from 'react';
import { formatMoney } from "../../utils/money";
import CheckMark from './../../assets/images/icons/checkmark.png';
import axios from 'axios';

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [add, setAdd] = useState(false);

  const selectedQuantity = (event) => {
    const selectQuantity = Number(event.target.value);
    setQuantity(selectQuantity);
  }
  const addToCart = async () => {
    await axios.post('/api/cart-items', {
      productId: product.id,
      quantity: quantity
    })
    await loadCart();
    setAdd(true);
    setTimeout(() => {
      setAdd(false);
    }, 2000);
  }

  return (
    <div key={product.id} className="product-container"
      data-testid="product-container">
      <div className="product-image-container">
        <img className="product-image"
          data-testid="product-image"
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectedQuantity}
          data-testid='product-quantity-container'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart"
        style={{ opacity: add ? 1 : 0 }}>
        <img src={CheckMark} />
        Added
      </div>

      <button className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}