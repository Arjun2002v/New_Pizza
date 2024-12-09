import { useAtom } from "jotai";
import React, { useContext } from "react";
import { activeAtom, totalQuantityAtom } from "./Menu";

const Cart = () => {
  const [totalQuantity] = useAtom(totalQuantityAtom);
  const [activeData] = useAtom(activeAtom);

  return (
    <div>
      <h1>Cart</h1>
      <h3>Total Quantity: {totalQuantity}</h3>
      <div>
        {activeData.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: Rs. {item.price / 100 || item.defaultPrice / 100}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
