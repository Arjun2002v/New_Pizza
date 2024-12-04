import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { item, quantity } = location.state || {};

  // Check if item and quantity are valid
  if (
    !item ||
    !Array.isArray(item) ||
    !quantity ||
    typeof quantity !== "object"
  ) {
    return <div>No items in the cart or data is invalid.</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {item.map((product) => (
          <div key={product.id} style={{ marginBottom: "20px" }}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Quantity: {quantity[product.id] || 0}</p>
            <p>Price per item: ₹{product.price}</p>
            <p>Total: ₹{product.price * (quantity[product.id] || 0)}</p>
          </div>
        ))}
      </div>
      <h2>
        Total Price: ₹
        {item.reduce(
          (total, product) =>
            total + product.price * (quantity[product.id] || 0),
          0
        )}
      </h2>
    </div>
  );
};

export default Checkout;
