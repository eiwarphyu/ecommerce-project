import { formatMoney } from "../../utils/money";
import axios from 'axios';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
  const [showBox, setShowBox] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async ()=>{
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const updateQuantityInput = (event)=>{
    setQuantity(Number(event.target.value));
  }

  const updateCartItem = async ()=>{
    if(showBox){
      await axios.put(`/api/cart-items/${cartItem.productId}`,{
        quantity: quantity
      });
      await loadCart();
      setShowBox(false);
    }else{
      setShowBox(true);
    }
  }

  const pressKey = (event)=>{
    if(event.key === 'Enter'){
      updateCartItem();
    }else if(event.key === 'Escape'){
      setQuantity(cartItem.quantity);
      setShowBox(false);
    }
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {showBox 
              ? <input type='text'
                className="textbox" 
                value={quantity} 
                onChange={updateQuantityInput}
                onKeyDown={pressKey}/>
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
            
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateCartItem}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" 
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}