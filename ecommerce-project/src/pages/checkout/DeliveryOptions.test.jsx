import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";

vi.mock('axios');

describe('DeliveryOptions component', () => {
  let cartItem;
  let deliveryOptions;
  let loadCart;
  let user;

  beforeEach(() => {
    cartItem = {
      "id": 3,
      "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "quantity": 1,
      "deliveryOptionId": "1",
      "createdAt": "2026-02-16T05:01:21.668Z",
      "updatedAt": "2026-02-16T05:01:21.668Z"
    }

    deliveryOptions = [
      {
        "id": "1",
        "deliveryDays": 7,
        "priceCents": 0,
        "estimatedDeliveryTimeMs": 1771831187592
      },
      {
        "id": "2",
        "deliveryDays": 3,
        "priceCents": 499,
        "estimatedDeliveryTimeMs": 1771485587592
      },
      {
        "id": "3",
        "deliveryDays": 1,
        "priceCents": 999,
        "estimatedDeliveryTimeMs": 1771312787593
      }
    ]
    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('renders delivery options correctly', () => {
    render(
      <DeliveryOptions
        cartItem={cartItem}
        loadCart={loadCart}
        deliveryOptions={deliveryOptions}
      />
    );

    expect(
      screen.getByText('Choose a delivery option:')
    ).toBeInTheDocument();

    const deliveryOptionElems = screen.getAllByTestId('delivery-option');
    expect(deliveryOptionElems.length).toBe(3);

    expect(deliveryOptionElems[0]).toHaveTextContent('Monday, February 23');
    expect(deliveryOptionElems[0]).toHaveTextContent('Free Shipping');

    expect(
      within(deliveryOptionElems[0]).getByTestId('delivery-option-input').checked
    ).toBe(true);

    expect(deliveryOptionElems[1]).toHaveTextContent('Thursday, February 19');
    expect(deliveryOptionElems[1]).toHaveTextContent('$4.99 - Shipping');

    expect(
      within(deliveryOptionElems[1]).getByTestId('delivery-option-input').checked
    ).toBe(false);

    expect(deliveryOptionElems[2]).toHaveTextContent('Tuesday, February 17');
    expect(deliveryOptionElems[2]).toHaveTextContent('$9.99 - Shipping');

    expect(
      within(deliveryOptionElems[2]).getByTestId('delivery-option-input').checked
    ).toBe(false);

  });

  it('updates the delivery option', async () => {
    render(
      <DeliveryOptions
        cartItem={cartItem}
        loadCart={loadCart}
        deliveryOptions={deliveryOptions}
      />
    );

    const deliveryOptionElems = screen.getAllByTestId('delivery-option');
    await user.click(deliveryOptionElems[2]);

    expect(axios.put).toHaveBeenCalledWith(
      '/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      { deliveryOptionId: '3' }
    );
    expect(loadCart).toHaveBeenCalledTimes(1);

    await user.click(deliveryOptionElems[0]);
    expect(axios.put).toHaveBeenCalledWith(
      '/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      { deliveryOptionId: '1' }
    );
    expect(loadCart).toHaveBeenCalledTimes(2);
  })

});