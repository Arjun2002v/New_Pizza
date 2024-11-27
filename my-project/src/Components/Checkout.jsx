import React, { useState } from "react";
import Razorpay from "razorpay";

export const Checkout = () => {
  const [address, setAddress] = useState("");

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: 50000, // Amount in paise (e.g., 50000 paise = ₹500)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: address,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "Gabarito", fontSize: "40px" }}>Checkout</h1>
      <p style={{ fontSize: "18px" }}>
        Thank you for adding items to your cart. Please provide your delivery address and proceed to payment.
      </p>
      <input
        type="text"
        placeholder="Enter your delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "80%", padding: "10px", margin: "20px 0" }}
      />
      <button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: "18px" }}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout; 