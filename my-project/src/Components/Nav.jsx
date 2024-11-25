import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div
      className="nav"
      style={{
        fontFamily: "Gabarito",
        fontWeight: "100",
        textDecoration: "none",
        fontSize: "20 px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <h2 style={{ color: "orange" }}>ChiggyApp</h2>
      <h2 style={{ color: "white" }}>Chiggy</h2>
      <h2 style={{ color: "white" }}>Chiggy</h2>
      <h2 style={{ color: "white" }}>Chiggy</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/menu" style={{ textDecoration: "none" }}>
          Menu
        </Link>
      </div>
    </div>
  );
};
