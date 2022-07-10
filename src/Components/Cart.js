import React from "react";
import "./Cart.css";

const Cart = ({ cartItems, minusHandler, plusHandler }) => {
  let totalAmount = cartItems.reduce((acc, val) => {
    acc += val.orderedQuantity * val.price;
    return acc;
  }, 0);
  //console.log("Cart");
  //console.log(cartItems);
  return (
    <div className="cart-wrapper">
      {cartItems.map((items) => {
        return (
          <div className="cart-wrapper-items" key={items.productID}>
            <p className="cart-item-name">{items.productName}</p>
            <img
              src={items.productImage}
              alt={items.productName}
              className="cart-image"
            />
            <div className="cart-item-quantity1">
              <button
                className="plus-minus"
                onClick={() => minusHandler(items.productID)}
              >
                -
              </button>
              <span className="cart-item-quantity">
                {items.orderedQuantity}
              </span>
              <button
                className="plus-minus"
                onClick={() => plusHandler(items.productID)}
              >
                +
              </button>
            </div>

            <p className="cart-price">Rs {items.price}</p>
            <p className="cart-total">
              Total: {items.orderedQuantity * items.price}
            </p>
          </div>
        );
      })}
      {cartItems.length > 0 ? (
        <h3 className="totalAmount">Total Amount: Rs {totalAmount}</h3>
      ) : (
        <h3>Your Cart is Empty</h3>
      )}
      <hr />
    </div>
  );
};

export default Cart;
