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
  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div style={styles.modal}>
        <h2 style={{ fontFamily: "Gabarito" }}>Add to Cart</h2>
        <p style={{ margin: "20px 0" }}>
          Add {item.card.info.name} to your cart?
        </p>
        <p style={{ fontWeight: "bold", margin: "10px 0" }}>
          Price: ₹
          {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
        </p>
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
  console.log(item.card.info.addon[2].choices[0].name);
};

export const Menu = () => {
  const [resData, setResData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { resID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [loading, setLoading] = useState(false);

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
            fontWeight: "100",
            padding: "10px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "flex-start",
            paddingLeft: "30px",
          }}
        >
          {resData ? resData.cards?.[2]?.card.card.info.name : <></>}
        </h3>
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
      {resData ? (
        resData.cards?.map((item, index) => {
          <>{}</>;
        })
      ) : (
        <></>
      )}

      {/* Conditional rendering to avoid accessing undefined */}
      {loading ? (
        <>
          <div></div>
        </>
      ) : (
        <>
          {" "}
          {resData ? (
            resData.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card?.itemCards?.map(
              (item, index) => (
                <div
                  key={index}
                  style={{ marginLeft: "15px", marginRight: "15px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignSelf: "stretch",
                    }}
                  >
                    <div>
                      <h5
                        style={{
                          fontSize: "30px",
                          fontFamily: "Gabarito",
                          fontWeight: "800",
                          color: "green",
                        }}
                      >
                        {item.card.info.name}
                      </h5>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "25px",
                        }}
                      >
                        <div>{item.card.title}</div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontFamily: "Gabarito",
                            textDecoration: "underline",
                          }}
                        >
                          {item.card.info.category}
                        </div>
                        <div
                          style={{ fontSize: "20px", fontFamily: "Gabarito" }}
                        >
                          Ingredients: {item.card.info.description}
                        </div>
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
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}.png`}
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

                  <h4 style={{ fontFamily: "Poiret One", fontWeight: "900" }}>
                    Rs:{" "}
                    {item.card.info.defaultPrice / 100 ||
                      item.card.info.price / 100}
                  </h4>
                </div>
              )
            )
          ) : (
            <h3> Loading...</h3>
          )}
        </>
      )}

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
