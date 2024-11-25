import React, { useEffect, useState } from "react";
import Restaurents from "./Restaurents";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  const [menuData, setMenuData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [text, setText] = useState(""); // State for search input
  const nav = useNavigate();

  const API_URL =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.992311712735347&lng=77.70354036655421&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  useEffect(() => {
    const fetchApiData = async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      const restaurants =
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []; //conditoinalyy rendering the data according to the structure
      setMenuData(restaurants);
      setFilteredData(restaurants); // Initially show all restaurants
    };
    fetchApiData();
  }, []);

  // Filter by rating > 4
  const filterByRating = () => {
    const filtered = menuData.filter(
      (restaurant) => restaurant.info.avgRating > 4
    );
    setFilteredData(filtered);
  };

  // Filter by delivery time (ascending order)
  const filterByDelivery = () => {
    const sorted = [...menuData].sort(
      (a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime
    );
    setFilteredData(sorted);
  };

  // Search restaurants by name
  const filterBySearch = () => {
    const filtered = menuData.filter(
      (item) => item.info.name.toLowerCase().includes(text.toLowerCase()) //this is the
    );
    setFilteredData(filtered);
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "20vh" }}
      onClick={(item) => nav(`/menu/${item.info.id}`)}
    >
      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Your Food"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={filterBySearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <h1 style={{ marginBottom: "50px", fontfamily: "Gabarito" }}>
        Top Restaurants Around Bangalore
      </h1>

      {/* Buttons for Filters */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={filterByRating}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
            fontfamily: "Gabarito",
          }}
        >
          Sort by Rating 4★
        </button>
        <button
          onClick={filterByDelivery}
          style={{
            padding: "10px 20px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontfamily: "Gabarito",
          }}
        >
          Sort by Delivery Time
        </button>
      </div>

      {/* Restaurant Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredData.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              backgroundColor: "#f4f4f4",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "350px",
              height: "400px",
            }}
            onClick={() => nav("/menu/" + item.info.id, { state: { item } })}
          >
            {" "}
            <Restaurents key={item.info.id} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
