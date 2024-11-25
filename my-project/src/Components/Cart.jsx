import React from "react";
import { useLocation } from "react-router-dom";

export const Cart = () => {
  const location = useLocation();
  const { cart, quantity } = location.state || {};

  const totalPrice = cart.reduce(
    (total, item) => total + item.costForTwo * (quantity[item.id] || 1),
    0
  );

  return (
    <div>
      <h2>Cart Summary</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>
            {quantity[item.info?.id]} x {item.name} - ₹
            {item.costForTwo * quantity[item.info?.id]}
          </p>
        </div>
      ))}
      <h3>Total Price: ₹{totalPrice}</h3>
      <button>Checkout</button>
    </div>
  );
};
