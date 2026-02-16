import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router';

describe('Header component', () => {
  let cart;
  beforeEach(() => {
    cart = [
      {
        "id": 3,
        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        "quantity": 1,
        "deliveryOptionId": "1",
        "createdAt": "2026-02-16T05:01:21.668Z",
        "updatedAt": "2026-02-16T05:01:21.668Z"
      }
    ]
  });

  it('displays the header correct', ()=>{
    render(
      <MemoryRouter>
        <Header cart={cart}/>
      </MemoryRouter>
    );

    expect(
      screen.getByTestId('header-logo')
    ).toHaveAttribute('src','/src/assets/images/logo-white.png');

    expect(
      screen.getByTestId('header-mobile-logo')
    ).toHaveAttribute('src','/src/assets/images/mobile-logo-white.png');

    expect(
      screen.getByTestId('header-search-bar')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('header-search-button')
    ).toBeInTheDocument();

    const orderLink= screen.getByTestId('header-orders-link');
    expect(orderLink).toHaveTextContent('Orders');
    expect(orderLink).toHaveAttribute('href','/orders');

    const cartLink = screen.getByTestId('header-cart-link');
    expect(cartLink).toHaveAttribute('href','/checkout');
    expect(cartLink).toHaveTextContent('Cart');
    expect(cartLink).toHaveTextContent('1');
  });
});