import "./App.css";
import Navbar from "./Components/Navbar";
import Data from "./Components/Data.json";
import Main from "./Components/Main";
import { useEffect, useState } from "react";
import Cart from "./Components/Cart";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  //for Counting items

  const [data, setData] = useState(Data);
  const [itemCount, setItemCount] = useState(0);
  //For adding items
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setData(Data);
  }, []);

  const plusHandler = () => {};

  const minusHandler = () => {};

  const addItemsHandler = () => {};
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar itemCount={itemCount} />
                <Main
                  data={data}
                  addItemsHandler={addItemsHandler}
                  setData={setData}
                />
              </>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                minusHandler={minusHandler}
                plusHandler={plusHandler}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
