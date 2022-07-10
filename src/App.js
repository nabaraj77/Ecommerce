import "./App.css";
import Navbar from "./Components/Navbar";
import Data from "./Components/Data.json";
import Main from "./Components/Main";
import { useEffect, useState } from "react";
import Cart from "./Components/Cart";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  //for Counting items

  const [data, setData] = useState(Data);
  const [itemCount, setItemCount] = useState(0);
  //For adding items
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setData(Data);
  }, []);

  const plusHandler = (id) => {
    const exists = cartItems.find((items) => {
      return items.productID === id;
    });
    //console.log(exists);

    //Updating the ordered Quantity
    exists &&
      setCartItems(
        cartItems.map((items) => {
          //Updating the ordered Quantity
          if (items.productID === id) {
            return { ...items, orderedQuantity: exists.orderedQuantity + 1 };
          } else {
            return items;
          }
        })
      );
  };

  const minusHandler = (id) => {
    const exists = cartItems.find((items) => {
      return items.productID === id;
    });
    if (exists) {
      setCartItems(
        cartItems.map((items) => {
          //Updating the ordered Quantity
          if (items.productID === id && items.orderedQuantity !== 0) {
            return { ...items, orderedQuantity: exists.orderedQuantity - 1 };
          } else if (items.productID === id && items.orderedQuantity === 0) {
            return { ...items, orderedQuantity: 0 };
          } else {
            return items;
          }
        })
      );
    }
  };
  console.log(cartItems);

  //ADDING ITEMS TO THE CART
  const addItemsHandler = (id) => {
    //Checking Whether the product exists or not
    const exists = cartItems.find((item) => {
      return item.productID === id;
    });
    if (exists) {
      toast.success("Item Already exists");
    } else {
      const cart = [
        ...cartItems,
        ...Data.filter((items) => {
          return items.productID === id;
        }),
      ];

      // Adding Quantity Ordered Numbers to the cart
      const quantityAddedCart = cart.map((items) => {
        if (items.productID === id) {
          return { ...items, orderedQuantity: 1 };
        } else {
          return items;
        }
      });
      setCartItems(quantityAddedCart);
      toast.success("Item Added to the Cart");

      //INCREASING THE CART ITEMS NUMBER
      setItemCount((prev) => {
        return prev + 1;
      });
    }
  };

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
      <Toaster position="top-right" />{" "}
    </>
  );
}

export default App;
