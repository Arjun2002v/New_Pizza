import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const { cart, totalQuantity } = location.state || {};
  let product = cart?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  return (
    <>
      <h3>Total Quantity: {totalQuantity}</h3>
      {product ? (
        <>
          {product.slice(1).map((item, index) => (
            <div key={index}>
              <div>{item.card.card.title}</div>
              {item?.card?.card?.itemCards.map((product, prodIndex) => (
                <div key={prodIndex}>
                  <h3>{product.card.info.name}</h3>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div>Cant Load your Cart</div>
      )}

      <h1>Oi Oi</h1>
    </>
  );
};

export default Cart;
