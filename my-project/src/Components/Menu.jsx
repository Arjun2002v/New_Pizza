import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Nav } from "./Nav";

// Styles object for better organization
const styles = {
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    minWidth: "300px",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  },
  modalButton: {
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontFamily: "Gabarito",
  },
  addButton: {
    color: "green",
    borderRadius: "15px",
    padding: "5px",
    width: "100px",
    height: "50px",
    fontSize: "30px",
    fontFamily: "Gabarito",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
  },
};

// Modal Component
const Modal = ({ item, onClose, onConfirm }) => {
  if (!item) return null; // Safeguard against undefined item
  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.modal}>
        <h2 style={{ fontFamily: "Gabarito" }}>Add to Cart</h2>
        <p style={{ margin: "20px 0", fontSize: "18px" }}>
          Add <strong>{item.name}</strong> to your cart?
        </p>
        <p style={{ fontWeight: "bold", margin: "10px 0" }}>
          Price: ₹{item.price / 100 || item.defaultPrice / 100}
        </p>
        {item.description && (
          <p style={{ fontStyle: "italic", color: "gray" }}>
            {item.description}
          </p>
        )}
        {item.imageId && (
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}.png`}
            alt={item.name}
            style={{ width: "150px", height: "150px", borderRadius: "10px" }}
          />
        )}
        <div>
          <button
            style={{
              ...styles.modalButton,
              backgroundColor: "green",
              color: "white",
            }}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            style={{ ...styles.modalButton, backgroundColor: "#ddd" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export const Menu = () => {
  const [resData, setResData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { resID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const press = (index) => {
    setShow(show === index ? null : index);
  };
  const API_URL =
    "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.992311712735347&lng=77.70354036655421&restaurantId=";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URL + resID);
        const data = await res.json();
        setResData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [resID]);

  const handleAddClick = (item) => {
    setSelectedItem(item);
  };

  const handleConfirm = () => {
    console.log("Added to cart:", selectedItem);
    setSelectedItem(null);
    navigate("/checkout"); // Navigate to checkout page
  };

  return (
    <div>
      <div>
        <h3
          style={{
            fontSize: "40px",
            color: "black",
            fontFamily: "Gabarito",
            fontWeight: "700",
            padding: "10px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "flex-start",
            paddingLeft: "30px",
          }}
        >
          {resData ? resData.cards?.[2]?.card.card.info.name : <></>}
        </h3>
        <div>
          <h2
            style={{
              fontFamily: "Gabarito",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            {resData
              ? resData?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
                  ?.slice(1) // Exclude the first element
                  ?.map((item, index) => (
                    <>
                      {" "}
                      <div
                        key={index} // Ideally, replace `index` with a unique identifier like `item.card.id` if available
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <div className={show == index ? "accord" : ""}>
                          <h4>{item?.card?.card?.title}</h4>

                          <div onClick={() => press(index)}>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Add">
                                <path
                                  id="Shape"
                                  d="M20 11.5C20.2519 11.5 20.461 11.6868 20.4951 11.9291L20.4999 12.012C20.4941 12.2585 20.3094 12.4615 20.0709 12.4951L19.9856 12.5H13H12.5V13V20C12.5 20.2519 12.3132 20.461 12.0709 20.4951L11.988 20.4999C11.7415 20.4941 11.5385 20.3094 11.5049 20.0709L11.5 19.9856V13V12.5H11H4C3.74805 12.5 3.53902 12.3132 3.50492 12.0708L3.50014 11.988C3.50595 11.7415 3.69062 11.5385 3.92915 11.5049L4.01442 11.5H11H11.5V11V4C11.5 3.74805 11.6868 3.53902 11.9292 3.50492L12.012 3.50014C12.2585 3.50595 12.4615 3.69062 12.4951 3.92915L12.5 4.01442V11V11.5H13H20Z"
                                  fill="#494A4E"
                                  stroke="#494A4E"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                        {show === index ? (
                          <div>
                            {item?.card?.card?.itemCards?.map(
                              (dish, dishIndex) => (
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      flexDirection: "row",
                                      gap: "50px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "50px",
                                      }}
                                    >
                                      {" "}
                                      <div
                                        key={dishIndex}
                                        style={{
                                          color: "green",
                                          fontSize: "30px",
                                        }}
                                      >
                                        {dish?.card?.info?.name ??
                                          "Unnamed Dish"}
                                      </div>
                                      <div
                                        style={{
                                          color: "black",
                                          fontSize: "15px",
                                          alignItems: "self-stretch",
                                        }}
                                      >
                                        {dish?.card?.info?.description}
                                      </div>
                                      <div
                                        style={{
                                          color: "green",
                                          fontSize: "15px",
                                        }}
                                      >
                                        Rs :{" "}
                                        {dish?.card?.info?.price / 100 ||
                                          dish?.card?.info?.defaultPrice / 100}
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${dish.card.info.imageId}.png`}
                                        alt=""
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                          objectFit: "cover",
                                          borderRadius: "30px",
                                        }}
                                      />
                                      <button
                                        style={styles.addButton}
                                        onClick={() => handleAddClick(item)}
                                      >
                                        Add
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </>
                  ))
              : null}
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
            fontSize: "18px",
            color: "black",
            fontFamily: "Gabarito",
            fontWeight: "800",
            marginLeft: "20px ",
          }}
        >
          <h4>
            ⭐ {resData ? resData.cards?.[2]?.card.card.info.avgRating : <></>}
          </h4>
          <h4>
            {resData ? (
              resData.cards?.[2]?.card.card.info.sla.deliveryTime
            ) : (
              <></>
            )}{" "}
            min
          </h4>
        </div>
      </div>
      {resData ? resData.cards?.[2]?.card.card.title : <></>}

      {/* Conditional rendering to avoid accessing undefined */}

      {selectedItem && (
        <Modal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Menu;
