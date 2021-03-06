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
    // //console.log(exists);
    // //Updating the ordered Quantity

    const updatedCart = cartItems.map((item) => {
      if (item.productID === id) {
        const availableQuantity1 = item.maxQuantity - item.orderedQuantity - 1;
        if (item.maxQuantity && item.orderedQuantity < item.maxQuantity) {
          if (availableQuantity1 > 0) {
            toast(
              `${
                item.maxQuantity - item.orderedQuantity - 1
              } more items can be Added`
            );
          } else {
            toast(`No More Items can be added`);
          }

          return { ...item, orderedQuantity: item.orderedQuantity + 1 };
        } else if (
          item.maxQuantity &&
          item.orderedQuantity === item.maxQuantity
        ) {
          toast.error(
            `${item.productName}, Max quantity available was: ${item.maxQuantity}`
          );
          return {
            ...item,
            available: "OutOfStock",
          };
        } else {
          return { ...item, orderedQuantity: item.orderedQuantity + 1 };
        }
      }
      return item;
    });
    const exist = updatedCart.find((item) => {
      return item.productID === id;
    });

    const originalData = data.map((items) => {
      const availableQuantity = items.maxQuantity - exist.orderedQuantity;
      if (items.productID === id) {
        if (availableQuantity === 0) {
          return { ...items, available: "OutOfStock", availableQuantity: 0 };
        }
        if (items.maxQuantity) {
          return {
            ...items,
            availableQuantity: availableQuantity,
          };
        }
        return items;
      } else {
        return items;
      }
    });
    console.log(updatedCart, "hello");

    console.log(originalData, "Hi");
    setData(originalData);
    setCartItems(updatedCart);
  };

  //console.log(cartItems);
  //For No of Items Dispalying messages

  const minusHandler = (id) => {
    const exists = cartItems.find((items) => {
      return items.productID === id;
    });
    if (exists) {
      const updatedData = cartItems
        .map((items) => {
          //Updating the ordered Quantity for decreasing the quantity of Products
          if (
            items.productID === exists.productID &&
            items.orderedQuantity !== 0
          ) {
            return { ...items, orderedQuantity: exists.orderedQuantity - 1 };
          } else if (
            items.productID === exists.productID &&
            items.orderedQuantity === 0
          ) {
            return { ...items, orderedQuantity: 0 };
          } else {
            return items;
          }
        })
        .map((item) => {
          if (item.productID === exists.productID) {
            if (item.maxQuantity && item.orderedQuantity < item.maxQuantity) {
              return { ...item, available: "LimitedAvailability" };
            } else {
              return item;
            }
          } else {
            return item;
          }
        });
      setCartItems(updatedData);
    }

    const originalData = data.map((items) => {
      if (items.productID === exists.productID) {
        if (items.maxQuantity) {
          return {
            ...items,
            available: exists.available,
            availableQuantity: items.maxQuantity - exists.orderedQuantity,
          };
        }
        return { ...items, available: exists.available };
      } else {
        return items;
      }
    });
    setData(originalData);
  };

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
      <Toaster position="top-right" />
    </>
  );
}

export default App;
