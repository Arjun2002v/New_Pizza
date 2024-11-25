import React from "react";

const Restaurents = ({ item }) => {
  const {
    info: {
      name,
      avgRating,
      costForTwo,
      totalRatingsString,
      cloudinaryImageId,
      cuisines,
      sla: { deliveryTime },
    },
  } = item;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <h3 style={{ fontSize: "16px", margin: 0 }}>{name}</h3>
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt={name}
        style={{
          height: "150px",
          width: "200px",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {" "}
        <h3>Rating: ⭐{avgRating}</h3>
        <li
          style={{ display: "flex", flexDirection: "row", fontWeight: "900" }}
        >
          {cuisines.join(",")}
        </li>
        <h3>Only {costForTwo}</h3>
        <div
          style={{
            display: "flex",
            gap: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3> Delivery in {deliveryTime} Min</h3>
          {/* <button
            style={{
              width: "40px",
              height: "30px",
              color: "green",
              borderRadius: "10px",
              border: "none",
              fontFamily: "Jost Regular",
              padding: "10px",
              fontSize: "17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Add
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Restaurents;
