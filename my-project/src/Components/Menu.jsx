import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Nav } from "./Nav";

export const Menu = () => {
  const [resData, setResData] = useState(null);
  const { resID } = useParams();
  const location = useLocation();
  const { item } = location.state || {};

  const API_URL =
    "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.992311712735347&lng=77.70354036655421&restaurantId=";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL + resID);
        const data = await res.json();
        setResData(data.data);

        // Example logging, ensure the property exists before accessing
        console.log(
          data.data.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]
            .card.card.itemCards?.[0].card.info.imageId
        );
        console.log(
          data.data.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]
        );

        // console.log(data.data.cards?.[2]?.card.card);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [resID]);

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
          {" "}
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
            {" "}
            ⭐ {resData ? resData.cards?.[2]?.card.card.info.avgRating : <></>}
          </h4>
          <h4>
            {" "}
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
                    {" "}
                    <div
                      style={{
                        fontSize: "20px",
                        fontFamily: "Gabarito",
                        textDecoration: "underLine",
                      }}
                    >
                      {item.card.info.category}
                    </div>
                    <div style={{ fontSize: "20px", fontFamily: "Gabarito" }}>
                      Ingredients : {item.card.info.description}
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
                  {" "}
                  <img
                    src={
                      `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}.png` ||
                      `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2024${item.card.info.imageId}.png`
                    }
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                  />
                  <button
                    style={{
                      color: "green",

                      borderRadius: "15px",
                      padding: "5px",
                      width: "100px",
                      height: "50px",
                      fontSize: "30px",
                      fontFamily: "Gabarito",
                      fontWeight: "700",
                      border: "none",
                      alignItems: "center",
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              <h4 style={{ fontFamily: "Poiret One", fontWeight: "900" }}>
                {" "}
                Rs:{" "}
                {item.card.info.defaultPrice / 100 ||
                  item.card.info.price / 100}
              </h4>
            </div>
          )
        )
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Menu;
