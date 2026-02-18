import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { PaymentSummary } from './PaymentSummary';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('Payment Summary Componet', () => {
  let loadCart;
  let paymentSummary;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();
    paymentSummary = {
      totalItems: 6,
      productCostCents: 7545,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 8044,
      taxCents: 804,
      totalCostCents: 8848
    }
    user = userEvent.setup();
  });

  it('displays the correct details', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Items (6):')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-product-cost')
    ).toHaveTextContent('$75.45');

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$80.44');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$8.04');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$88.48');

  });

  it('Place Order button', async ()=>{
    function Location(){
      const location = useLocation();
      return(
        <div data-testid='url-path'>
          {location.pathname}
        </div>
      )
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location/>
      </MemoryRouter>
    );

    const placeOrder = screen.getByTestId('place-order-button');
    await user.click(placeOrder);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(
      screen.getByTestId('url-path')
    ).toHaveTextContent('/orders');
  });
});
