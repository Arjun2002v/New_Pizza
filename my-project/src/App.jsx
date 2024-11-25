import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Menu } from "./Components/Menu";
import { Cart } from "./Components/Cart";
import { Nav } from "./Components/Nav";

const App = () => {
  const [menuData, setMenuData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  return (
    <BrowserRouter>
      <Nav
        menuData={menuData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        setMenuData={setMenuData}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              menuData={menuData}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              setMenuData={setMenuData}
            />
          }
        />
        <Route path="/menu/:resID" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
